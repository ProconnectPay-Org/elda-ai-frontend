import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import AdminLayout from "@/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { ACSCandidateProps } from "@/types";
import { onboardColumns } from "@/components/OnboardColumns";
import {
  deleteACSCandidate,
  getAllOnboardedCandidateData,
} from "@/lib/actions/acs.actions";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";
import useDeleteCandidate from "@/hooks/useDeleteCandidate";

const bankOptions = [
  { value: "", label: "All Banks" },
  { value: "Sycamore", label: "Sycamore" },
  { value: "Union", label: "Union Bank" },
  { value: "EcoBank", label: "EcoBank" },
  { value: "Wema", label: "Wema Bank" },
  { value: "Polaris", label: "Polaris Bank" },
  { value: "NIM", label: "NIM" },
  { value: "Paid through website", label: "Paid through website" },
  { value: "Manually Onboarded", label: "Manually Onboarded" },
];

const OnboardedCandidates = () => {
  // State and Router Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isCSVLoading, setIsCSVLoading] = useState(false);

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

  // Delete Candidates
  const { handleDeleteCandidate } = useDeleteCandidate(
    deleteACSCandidate,
    "onboardedCandidates"
  );

  // Pagination Controls
  const { handleNextPage, handlePreviousPage } = usePagination(
    allCandidates,
    currentTab,
    "paid",
    setSearchParams
  );

  // Tab Controls
  const handleTabChange = (tabValue: string) => {
    setCurrentTab(tabValue);
    setSearchParams({
      paid: tabValue === "paid" ? "true" : "false",
      page: page.toString(),
    });
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

  const bankCandidates = tableData
    .filter((candidate) =>
      selectedBank ? candidate.bank === selectedBank : true
    )
    .map((candidate, i) => ({
      ...candidate,
      serialNumber: i + 1,
    }));

    const handleDownloadCSV = async () => {
      try {
        setIsCSVLoading(true);
    
        let allResults: ACSCandidateProps[] = [];
        let page = 1;
        let hasNext = true;
    
        // Fetch all pages
        while (hasNext) {
          const response = await getAllOnboardedCandidateData(page, searchQuery);
          const results = response.results.map((candidate: ACSCandidateProps, index: number) => ({
            serialNumber: (page - 1) * pageSize + index + 1,
            full_name: candidate?.full_name || "No name",
            first_country: candidate.first_country || "No country",
            second_country: candidate.second_country || "No country",
            assigned_university1: candidate.assigned_university1 || "None Assigned",
            assigned_university2: candidate.assigned_university2 || "None assigned",
            assigned_course1: candidate.assigned_course1 || "No course assigned",
            assigned_course2: candidate.assigned_course2 || "No course assigned",
            program_type1: candidate.program_type1 || "No program assigned",
            program_type2: candidate.program_type2 || "No program assigned",
            has_paid: candidate.has_paid ? "Yes" : "No",
            bank: candidate.bank || "N/A",
            email: candidate.email,
            phone: candidate.phone_number,
            whatsapp: candidate.whatsapp,
            gender: candidate.gender,
            age: candidate.age,
            date_of_birth: candidate.date_of_birth,
            class_of_degree: candidate.class_of_degree,
            specific_cgpa: candidate.specific_cgpa,
            graduate_of: candidate.graduate_of,
            has_masters_degree: candidate.has_masters_degree,
            state_of_residence: candidate.state_of_residence,
            resume: candidate.resume,
            created_at: candidate.created_at,
            updated_at: candidate.updated_at,
          }));
    
          allResults = [...allResults, ...results];
    
          hasNext = !!response.next;
          page++;
        }
    
        // Convert to CSV
        const headers = Object.keys(allResults[0]);
        const csvRows = [
          headers.join(","), // header row
          ...allResults.map((row) =>
            headers.map((field) => `"${(row as any)[field] ?? ""}"`).join(",")
          ),
        ];
    
        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
    
        // Download CSV
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "onboarded_candidates.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("CSV Download Error:", error);
        alert("Failed to download CSV");
      } finally {
        setIsCSVLoading(false);
      }
    };

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
          <div className="flex gap-4 absolute top-6 md:min-w-[600px]">
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
          <div className="w-full flex justify-end mb-2 px-4 mt-4">
            <button
              onClick={handleDownloadCSV}
              className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 text-sm flex items-center gap-2"
            >
              {isCSVLoading ? (
                <>
                  <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Downloading...
                </>
              ) : (
                "Download CSV"
              )}
            </button>
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
              data={bankCandidates}
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
    </AdminLayout>
  );
};

export default OnboardedCandidates;
