// hooks/useCandidateState.ts
import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { downloadCSV } from "@/lib/utils";
import { getAllTableCandidates } from "@/lib/actions/user.actions";
import { CandidateData } from "@/types";

export const useCandidateState = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;

  // Main state
  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [course, setCourse] = useState("");
  const [assigned, setAssigned] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [isCSVLoading, setIsCSVLoading] = useState(false);
  const [cachedCSVData, setCachedCSVData] = useState<CandidateData[] | null>(
    null
  );
  const [selectedRowData, setSelectedRowData] = useState<CandidateData | null>(
    null
  );
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isReAssignModalOpen, setIsReAssignModalOpen] = useState(false);
  const [isUnAssignModalOpen, setIsUnAssignModalOpen] = useState(false);
  const [lastCacheUpdate, setLastCacheUpdate] = useState<number>(Date.now());
  const CACHE_TTL = 5 * 60 * 1000;

  // Memoized actions
  const handleTabChange = useCallback(
    (tabValue: string) => {
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
    },
    [setSearchParams]
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      if (selectedFilter === "name") {
        setSearchQuery(value);
        setCourse("");
      } else {
        setCourse(value);
        setSearchQuery("");
      }
    },
    [selectedFilter]
  );

  const handleRowClick = useCallback((row: CandidateData) => {
    setSelectedRowData(row);
    setIsDialogOpen(true);
  }, []);

  // CSV related functions
  const fetchAllCandidates = useCallback(
    async (searchQuery: string, course: string, assigned?: boolean) => {
      let page = 1;
      let allResults: any[] = [];
      let hasNext = true;

      while (hasNext) {
        const response = await getAllTableCandidates(
          page,
          searchQuery,
          course,
          assigned
        );
        const filtered =
          response?.results?.filter(
            (candidate: any) =>
              candidate.email_address !== "victoryicha98@gmail.com"
          ) || [];
        allResults = [...allResults, ...filtered];
        hasNext = !!response?.next;
        page += 1;
      }
      return allResults;
    },
    []
  );

  const formatCSVHeaders = useCallback((data: any[]) => {
    const headerMapping: Record<string, string> = {
      serialNumber: "Serial Number",
      full_name: "Full Name",
      email_address: "Email Address",
      first_country: "First Country",
      second_country: "Second Country",
      assigned_university1: "Assigned University 1",
      assigned_course1: "Assigned Course 1",
      assigned_course2: "Assigned Course 2",
      assigned_school2: "Assigned School 2",
      program_type1: "Program Type 1",
      program_type2: "Program Type 2",
      school_application_status1: "School Application Status 1",
      school_application_status2: "School Application Status 2",
      resume_status: "Resume Status",
      sop_status1: "SOP Status 1",
      sop_status2: "SOP Status 2",
      duplicate: "Duplicate",
    };

    return data.map((item) => {
      const formattedItem: Record<string, any> = {};
      for (const key in item) {
        const newKey = headerMapping[key] || key;
        formattedItem[newKey] = item[key];
      }
      return formattedItem;
    });
  }, []);

  const handleDownloadCSV = useCallback(async () => {
    setIsCSVLoading(true);
    try {
      let dataToDownload;
      const assignedState =
        currentTab === "assigned"
          ? true
          : currentTab === "unassigned"
          ? false
          : null;

      if (cachedCSVData && !searchQuery && !course && assignedState === null) {
        dataToDownload = cachedCSVData;
      } else {
        dataToDownload = await fetchAllCandidates(
          searchQuery,
          course,
          assignedState === null ? undefined : assignedState
        );
      }

      const mappedData = dataToDownload.map(
        (candidate: CandidateData, index: number) => ({
          serialNumber: index + 1,
          full_name: candidate?.full_name || "No name",
          email_address: candidate?.email_address || "No email",
          first_country: candidate.first_country || "No country",
          second_country: candidate.second_country || "No country",
          assigned_university1:
            candidate.assigned_university1 || "None Assigned",
          assigned_course1: candidate.assigned_course1 || "No course assigned",
          assigned_course2: candidate.assigned_course2 || "No course assigned",
          assigned_school2:
            candidate.assigned_university2 || "No school assigned",
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
        })
      );

      const fileName =
        currentTab === "assigned"
          ? "assigned_candidates.csv"
          : currentTab === "unassigned"
          ? "unassigned_candidates.csv"
          : "all_candidates.csv";

      const formattedData = formatCSVHeaders(mappedData);
      downloadCSV(formattedData, fileName);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setIsCSVLoading(false);
    }
  }, [
    currentTab,
    searchQuery,
    course,
    cachedCSVData,
    fetchAllCandidates,
    formatCSVHeaders,
  ]);

  // Modal handlers
  const openAssignModal = useCallback(() => {
    setIsAssignModalOpen(true);
    setIsDialogOpen(false);
  }, []);

  const closeAssignModal = useCallback(() => {
    setIsAssignModalOpen(false);
  }, []);

  const openReAssignModal = useCallback(() => {
    setIsReAssignModalOpen(true);
    setIsDialogOpen(false);
  }, []);

  const closeReAssignModal = useCallback(() => {
    setIsReAssignModalOpen(false);
  }, []);

  const openUnAssignModal = useCallback(() => {
    setIsUnAssignModalOpen(true);
    setIsDialogOpen(false);
  }, []);

  const closeUnAssignModal = useCallback(() => {
    setIsUnAssignModalOpen(false);
  }, []);

  return {
    state: {
      page,
      pageSize,
      currentTab,
      searchQuery,
      course,
      assigned,
      selectedFilter,
      isCSVLoading,
      selectedRowData,
      isSendingReminder,
      isDialogOpen,
      isAssignModalOpen,
      isReAssignModalOpen,
      isUnAssignModalOpen,
      cachedCSVData,
      lastCacheUpdate,
      CACHE_TTL,
    },
    actions: {
      setCurrentTab,
      setSearchQuery,
      setCourse,
      setAssigned,
      setSelectedFilter,
      setSelectedRowData,
      setIsDialogOpen,
      handleTabChange,
      handleFilterChange,
      handleRowClick,
      handleDownloadCSV,
      openAssignModal,
      closeAssignModal,
      openReAssignModal,
      closeReAssignModal,
      openUnAssignModal,
      closeUnAssignModal,
      setIsSendingReminder,
      setCachedCSVData,
      setLastCacheUpdate,
      setSearchParams,
    },
    utils: {
      fetchAllCandidates,
      formatCSVHeaders,
    },
  };
};
