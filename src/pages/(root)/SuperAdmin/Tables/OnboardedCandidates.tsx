import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AdminLayout from "@/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { ACSCandidateProps } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { onboardColumns } from "@/components/OnboardColumns";
import {
  deleteACSCandidate,
  getAllOnboardedCandidateData,
} from "@/lib/actions/acs.actions";

const bankOptions = [
  { value: "", label: "All Banks" },
  { value: "Sycamore", label: "Sycamore" },
  { value: "Union", label: "Union Bank" },
  { value: "EcoBank", label: "EcoBank" },
  { value: "Wema", label: "Wema Bank" },
  { value: "Polaris", label: "Polaris Bank" },
  { value: "NIM", label: "NIM" },
  { value: "Paid through website", label: "Paid through website" },
];

const OnboardedCandidates = () => {
  // State and Router Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("");

  // Pagination
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;
  const queryClient = useQueryClient();

  // Query: Fetch candidates
  const {
    data: allCandidates,
    error: allCandidatesError,
    isLoading: allCandidatesLoading,
  } = useQuery({
    queryKey: ["onboardedCandidates", page, searchQuery],
    queryFn: async () => getAllOnboardedCandidateData(page, searchQuery),
    staleTime: 5 * 1000 * 60,
  });

  // Mutation: Delete candidate
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

  // Handlers
  const handleDeleteCandidate = async (userId: string, fullName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${fullName}'s account?`
    );
    if (confirmed) {
      deleteCandidateMutation.mutate(userId);
    }
  };

  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
    setSearchParams({
      paid: tabValue === "paid" ? "true" : "false",
      page: page.toString(),
    });
  };

  const handleNextPage = () => {
    if (!allCandidates?.next) return;
    try {
      const nextPage = new URL(
        allCandidates.next,
        window.location.origin
      ).searchParams.get("page");

      if (nextPage) {
        setSearchParams({
          assigned: currentTab === "paid" ? "true" : "false",
          page: nextPage,
        });
      }
    } catch (error) {
      console.error("Error parsing next page URL:", error);
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
        queryKey: ["onboardedCandidates", nextPage],
        queryFn: () => getAllOnboardedCandidateData(nextPage),
      });
    }
  }, [page, allCandidates, queryClient]);

  const totalCandidates = allCandidates?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCandidates / pageSize));
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
    .filter((c) => c.has_paid)
    .map((c, i) => ({
      ...c,
      serialNumber: i + 1,
    }));

  const unpaidCandidates = tableData
    .filter((c) => !c.has_paid)
    .map((c, i) => ({
      ...c,
      serialNumber: i + 1,
    }));

  if (allCandidatesError) return <p>Error: {allCandidatesError.message}</p>;

  return (
    <AdminLayout>
      <Tabs
        className="w-full flex justify-center items-center flex-col"
        value={currentTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full md:w-[400px] bg-transparent justify-between">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="paid"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
          >
            Paid
          </TabsTrigger>
          <TabsTrigger
            value="unpaid"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
          >
            Unpaid
          </TabsTrigger>

          <TabsTrigger
            value="bank"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
          >
            Banks
          </TabsTrigger>
        </TabsList>

        <div className="w-full relative">
          <div className="flex gap-4 absolute top-6 min-w-[600px]">
            <input
              type="text"
              placeholder="Search candidates by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 p-2 border rounded-md bg-white z-10 "
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
