import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { CandidateData } from "@/types";
import { allTabsColumns } from "./AllTabsColumns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { deleteStaff, getAllTableCandidates } from "@/lib/actions/user.actions";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

const TabsComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;

  const queryClient = useQueryClient();

  const deleteCandidateMutation = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Candidate deleted successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allTableCandidates"] });
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

  const token = Cookies.get("access_token");

  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: allCandidates,
    error: allCandidatesError,
    isLoading: allCandidatesLoading,
  } = useQuery({
    queryKey: ["allTableCandidates", page, searchQuery],
    queryFn: async () => {
      return getAllTableCandidates(page, searchQuery);
    },
    enabled: !!token,
    staleTime: 5 * 1000 * 60,
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchParams({ page: "1" });
      queryClient.invalidateQueries({ queryKey: ["allCandidates"] });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, queryClient]);

  useEffect(() => {
    if (token && allCandidates?.next) {
      const nextPage = parseInt(
        new URL(allCandidates.next).searchParams.get("page") || "1",
        10
      );
      queryClient.prefetchQuery({
        queryKey: ["allCandidates", nextPage],
        queryFn: () => getAllTableCandidates(nextPage),
      });
    }
  }, [page, allCandidates, queryClient]);

  const totalCandidates = allCandidates?.count || 0;
  const totalPages = Math.ceil(totalCandidates / pageSize);

  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
    setSearchParams({
      assigned: tabValue === "assigned" ? "true" : "false",
      page: "1",
    });
  };

  const handleNextPage = () => {
    if (allCandidates?.next) {
      const nextPage = new URL(allCandidates.next).searchParams.get("page");
      if (nextPage)
        setSearchParams({
          assigned: currentTab === "assigned" ? "true" : "false",
          page: nextPage,
        });
    }
  };

  const handlePreviousPage = () => {
    if (allCandidates?.previous) {
      const previousUrl = new URL(allCandidates.previous);
      const previousPage = previousUrl.searchParams.get("page") || "1";
      setSearchParams({
        assigned: currentTab === "assigned" ? "true" : "false",
        page: previousPage,
      });
    } else {
      setSearchParams({ assigned: "false", page: "1" });
    }
  };

  const startingIndex = (page - 1) * pageSize;

  const tableData: CandidateData[] =
    allCandidates?.results.map((candidate: CandidateData, index: number) => ({
      ...candidate,
      serialNumber: startingIndex + index + 1,
      full_name: candidate?.full_name || "No name",
      first_country: candidate.first_country || "No country",
      second_country: candidate.second_country || "No country",
      assigned_university1: candidate.assigned_university1 || "None Assigned",
      assigned_course1: candidate.assigned_course1 || "No course assigned",
      assigned_course2: candidate.assigned_course2 || "No course assigned",
      assigned_school2: candidate.assigned_university2 || "No school assigned",
      school_application_status1:
        candidate.school_application_status1 || "No status",
      school_application_status2:
        candidate.school_application_status2 || "No status",
      resume_status: candidate.resume_status || "No status",
      sop_status1: candidate.sop_status1 || "No status",
      sop_status2: candidate.sop_status2 || "No status",
      duplicate: candidate.duplicate || "none",
    })) || [];

  const assignedData = tableData
    .filter((candidate) => candidate.assigned)
    .map((candidate, index) => ({
      ...candidate,
      serialNumber: index + 1,
    }));

  const unassignedData = tableData
    .filter((candidate) => !candidate.assigned)
    .map((candidate, index) => ({
      ...candidate,
      serialNumber: index + 1,
    }));

  if (allCandidatesError) return <p>Error: {allCandidatesError.message}</p>;

  return (
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
          value="assigned"
          className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
        >
          Assigned
        </TabsTrigger>
        <TabsTrigger
          value="unassigned"
          className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
        >
          Unassigned
        </TabsTrigger>
      </TabsList>
      <div className="w-full relative">
        {/* Display all candidates */}
          <input
            type="text"
            placeholder="Search candidates by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded-md bg-white z-10 mb-4 absolute top-6"
          />
        <TabsContent value="all">

          <DataTable
            columns={allTabsColumns(handleDeleteCandidate)}
            data={tableData}
            isLoading={allCandidatesLoading}
          />
        </TabsContent>

        {/* Display only assigned candidates */}
        <TabsContent value="assigned">
          <DataTable
            columns={allTabsColumns(handleDeleteCandidate)}
            data={assignedData}
            isLoading={allCandidatesLoading}
          />
        </TabsContent>

        {/* Display only unassigned candidates */}
        <TabsContent value="unassigned">
          <DataTable
            columns={allTabsColumns(handleDeleteCandidate)}
            data={unassignedData}
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
  );
};

export default TabsComponent;
