import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { ACSCandidateProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import AdminLayout from "@/layouts/AdminLayout";
import { useACSCandidates } from "@/hooks/useACSCandidates";
import { onboardColumns } from "@/components/OnboardColumns";
import {
  deleteACSCandidate,
  getAllOnboardedCandidateData,
} from "@/lib/actions/acs.actions";

const OnboardedCandidates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;
  const {
    data: allCandidates,
    isLoading: allCandidatesLoading,
    error: allCandidatesError,
  } = useACSCandidates();

  const queryClient = useQueryClient();

  const deleteCandidateMutation = useMutation({
    mutationFn: deleteACSCandidate,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Candidate deleted successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["onboardedCandidates"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete candidate. Please try again.",
      });
    },
  });

  const handleDeleteCandidate = async (userId: string, fullName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${fullName}'s account?`
    );
    if (confirmed) {
      deleteCandidateMutation.mutate(userId);
    }
  };

  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("");

  const bankOptions = [
    { value: "", label: "All Banks" },
    { value: "GTBank", label: "GTBank" },
    { value: "FirstBank", label: "First Bank" },
    { value: "UBA", label: "UBA" },
    { value: "paid through website", label: "Paid through website" },
  ];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchParams({ page: "1" });
      queryClient.invalidateQueries({ queryKey: ["allCandidates"] });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, queryClient]);

  useEffect(() => {
    if (allCandidates?.next) {
      const nextPage = parseInt(
        new URL(allCandidates.next).searchParams.get("page") || "1",
        10
      );
      queryClient.prefetchQuery({
        queryKey: ["allCandidates", nextPage],
        queryFn: () => getAllOnboardedCandidateData(nextPage),
      });
    }
  }, [page, allCandidates, queryClient]);

  const totalCandidates = allCandidates?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCandidates / pageSize));

  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
    setSearchParams({
      paid: tabValue === "paid" ? "true" : "false",
      page: page.toString(),
    });
  };

  const handleNextPage = () => {
    if (allCandidates?.next) {
      try {
        const nextPage = new URL(allCandidates.next).searchParams.get("page");
        if (nextPage)
          setSearchParams({
            assigned: currentTab === "paid" ? "true" : "false",
            page: nextPage,
          });
      } catch (error) {
        console.error("Error parsing next page URL:", error);
      }
    }
  };

  const handlePreviousPage = () => {
    if (allCandidates?.previous) {
      const previousUrl = new URL(allCandidates.previous);
      const previousPage = previousUrl.searchParams.get("page") || "1";
      setSearchParams({
        assigned: currentTab === "paid" ? "true" : "false",
        page: previousPage,
      });
    } else {
      setSearchParams({ assigned: "false", page: "1" });
    }
  };

  const startingIndex = (page - 1) * pageSize;

  const tableData: ACSCandidateProps[] =
    allCandidates?.results.map(
      (candidate: ACSCandidateProps, index: number) => ({
        ...candidate,
        serialNumber: startingIndex + index + 1,
        full_name: candidate?.full_name || "No name",
        first_country: candidate.first_country || "No country",
        second_country: candidate.second_country || "No country",
        assigned_university1: candidate.assigned_university1 || "None Assigned",
        assigned_university2: candidate.assigned_university2 || "None assigned",
        assigned_course1: candidate.assigned_course1 || "No course assigned",
        assigned_course2: candidate.assigned_course2 || "No course assigned",
        program_type1: candidate.program_type1 || "No program assigned",
        program_type2: candidate.program_type2 || "No program assigned",
      })
    ) || [];

  const paidCandidates = tableData
    .filter((candidate) => candidate.has_paid)
    .map((candidate, index) => ({
      ...candidate,
      serialNumber: index + 1,
    }));

  const unpaidCandidates = tableData
    .filter((candidate) => !candidate.has_paid)
    .map((candidate, index) => ({
      ...candidate,
      serialNumber: index + 1,
    }));

  if (allCandidatesError) return <p>Error: {allCandidatesError.message}</p>;

  return (
    <AdminLayout>
      <Tabs
        className="w-full flex justify-center items-center flex-col"
        value={currentTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full md:w-[500px] bg-transparent justify-between">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          <TabsTrigger value="bank">Banks</TabsTrigger>
        </TabsList>
        <div className="w-full relative">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search candidates by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3 p-2 border rounded-md bg-white"
            />
            {currentTab === "bank" && (
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-md bg-white"
              >
                {bankOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          <TabsContent value="all">
            <DataTable
              columns={onboardColumns(handleDeleteCandidate)}
              data={tableData}
              isLoading={allCandidatesLoading}
            />
          </TabsContent>

          <TabsContent value="paid">
            <DataTable
              columns={onboardColumns(handleDeleteCandidate)}
              data={paidCandidates}
              isLoading={allCandidatesLoading}
            />
          </TabsContent>

          <TabsContent value="unpaid">
            <DataTable
              columns={onboardColumns(handleDeleteCandidate)}
              data={unpaidCandidates}
              isLoading={allCandidatesLoading}
            />
          </TabsContent>

          <TabsContent value="bank">
            <DataTable
              columns={onboardColumns(handleDeleteCandidate)}
              data={tableData.filter((candidate) =>
                selectedBank ? candidate.bank === selectedBank : true
              )}
              isLoading={allCandidatesLoading}
            />
          </TabsContent>
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={!allCandidates?.previous}
            className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!allCandidates?.next}
            className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </Tabs>
    </AdminLayout>
  );
};

export default OnboardedCandidates;
