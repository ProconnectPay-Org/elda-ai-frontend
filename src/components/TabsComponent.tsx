import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { CandidateData } from "@/types";
import { allTabsColumns } from "./AllTabsColumns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { deleteStaff, getAllTableCandidates } from "@/lib/actions/user.actions";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import usePagination from "@/hooks/usePagination";
import Pagination from "./Pagination";
import useDeleteCandidate from "@/hooks/useDeleteCandidate";

const TabsComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;

  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [course, setCourse] = useState("");
  const [assigned, setAssigned] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("name");

  const queryClient = useQueryClient();

  const token = Cookies.get("access_token");

  // Delete Candidates
  const { handleDeleteCandidate } = useDeleteCandidate(
    deleteStaff,
    "allTableCandidates"
  );

  const {
    data: allCandidates,
    error: allCandidatesError,
    isLoading: allCandidatesLoading,
  } = useQuery({
    queryKey: ["allTableCandidates", page, searchQuery, course, assigned],
    queryFn: async () => {
      return getAllTableCandidates(page, searchQuery, course, assigned);
    },
    enabled: !!token,
    staleTime: 5 * 1000 * 60,
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchParams({ page: "1" });
      queryClient.invalidateQueries({ queryKey: ["allTableCandidates"] });
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, course, queryClient]);

  useEffect(() => {
    if (token && allCandidates?.next) {
      const nextPage = parseInt(
        new URL(allCandidates.next).searchParams.get("page") || "1",
        10
      );
      queryClient.prefetchQuery({
        queryKey: ["allTableCandidates", nextPage],
        queryFn: () => getAllTableCandidates(nextPage),
      });
    }
  }, [page, allCandidates, queryClient]);

  const totalCandidates = allCandidates?.count || 0;
  const totalPages = Math.ceil(totalCandidates / pageSize);

  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
    setAssigned(tabValue === "assigned" ? true : false);
    setSearchParams({
      assigned:
        tabValue === "assigned"
          ? "true"
          : tabValue === "unassigned"
          ? "false"
          : "all",
      page: "1",
    });
  };

  // Pagination Controls
  const { handleNextPage, handlePreviousPage } = usePagination(
    allCandidates,
    currentTab,
    "assigned",
    setSearchParams
  );

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;

    if (selectedFilter === "name") {
      setSearchQuery(value);
      setCourse("");
    } else {
      setCourse(value);
      setSearchQuery("");
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
      program_type1: candidate.program_type1 || "No program",
      program_type2: candidate.program_type2 || "No program",
      school_application_status1:
        candidate.school_application_status1 || "No status",
      school_application_status2:
        candidate.school_application_status2 || "No status",
      resume_status: candidate.resume_status || "No status",
      sop_status1: candidate.sop_status1 || "No status",
      sop_status2: candidate.sop_status2 || "No status",
      duplicate: candidate.duplicate || "none",
    })) || [];

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
        <div className="flex w-full md:w-1/3 z-10 gap-3 items-center absolute top-6 mb-4">
          <input
            type="text"
            placeholder={`Search candidates by ${selectedFilter}`}
            onChange={handleFilterChange}
            className="text-sm font-medium p-2 border rounded-md w-2/3 bg-white"
          />
          <select
            name="filter"
            id="filter"
            onChange={(e) => {
              setSelectedFilter(e.target.value);
            }}
            className="border font-medium p-2 rounded-md text-sm bg-white"
          >
            <option value="name">Full Name</option>
            <option value="course">Assigned Course</option>
            <option value="program">Program Type</option>
          </select>
        </div>
        {/* Display all candidates */}
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
            data={tableData}
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

      <Pagination
        page={page}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        hasNext={!!allCandidates?.next}
        hasPrevious={!!allCandidates?.previous}
      />
    </Tabs>
  );
};

export default TabsComponent;
