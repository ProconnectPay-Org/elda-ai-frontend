// components/TabsComponent.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { allTabsColumns } from "./AllTabsColumns";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  deleteStaff,
  getAllTableCandidates,
  singleCandidateReminder,
} from "@/lib/actions/user.actions";
import { Link } from "react-router-dom";
import usePagination from "@/hooks/usePagination";
import Pagination from "./Pagination";
import useDeleteCandidate from "@/hooks/useDeleteCandidate";
import {
  BellRingIcon,
  CopyIcon,
  Loader2,
  MailIcon,
  PhoneCallIcon,
} from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import ReAssignModal from "./ReAssignModal";
import { useCandidateState } from "@/hooks/useCandidateState";
import { useEffect } from "react";
import { CandidateData } from "@/types";

const TabsComponent = () => {
  const {
    state: {
      page,
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
      setIsDialogOpen,
      setSelectedFilter,
    },
    utils: { fetchAllCandidates },
  } = useCandidateState();

  const token = Cookies.get("access_token");

  // Pre-fetch all candidates data for CSV when component mounts
  useEffect(() => {
    const prefetchCSVData = async () => {
      try {
        const allData = await fetchAllCandidates("", "", undefined);
        setCachedCSVData(allData);
        setLastCacheUpdate(Date.now());
      } catch (error) {
        console.error("Error pre-fetching CSV data:", error);
      }
    };

    const shouldRefreshCache =
      !cachedCSVData || Date.now() - lastCacheUpdate > CACHE_TTL || !token;
    if (token && shouldRefreshCache) {
      prefetchCSVData();
    }
  }, [token, fetchAllCandidates, setCachedCSVData, setLastCacheUpdate]);

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

  // Pagination Controls
  const { handleNextPage, handlePreviousPage } = usePagination(
    allCandidates,
    currentTab,
    "assigned",
    setSearchParams
  );

  const handleReminders = async (id: string) => {
    setIsSendingReminder(true);
    try {
      const response = await singleCandidateReminder(id);
      toast({
        title: "Success",
        description: response?.success,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSendingReminder(false);
    }
  };

  const startingIndex = (page - 1) * 50; // pageSize is 50
  const totalCandidates = allCandidates?.count || 0;
  const totalPages = Math.ceil(totalCandidates / 50);

  const tableData: CandidateData[] =
    allCandidates?.results
      // .filter(
      //   (candidate: CandidateData) =>
      //     candidate?.email_address !== "victoryicha98@gmail.com"
      // )
      .map((candidate: CandidateData, index: number) => ({
        ...candidate,
        serialNumber: startingIndex + index + 1,
        full_name: candidate?.full_name || "No name",
        email_address: candidate?.email_address || "No name",
        first_country: candidate.first_country || "No country",
        second_country: candidate.second_country || "No country",
        assigned_university1: candidate.assigned_university1 || "None Assigned",
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
      })) || [];

  const unassignedData = tableData
    .filter((candidate) => !candidate.assigned)
    .map((candidate, index) => ({
      ...candidate,
      serialNumber: index + 1,
    }));

  if (allCandidatesError) return <p>Error: {allCandidatesError.message}</p>;

  return (
    <div>
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
          {/* Display all candidates */}
          <TabsContent value="all">
            <DataTable
              columns={allTabsColumns(handleDeleteCandidate)}
              data={tableData}
              isLoading={allCandidatesLoading}
              onRowClick={handleRowClick}
            />
          </TabsContent>

          {/* Display only assigned candidates */}
          <TabsContent value="assigned">
            <DataTable
              columns={allTabsColumns(handleDeleteCandidate)}
              data={tableData}
              isLoading={allCandidatesLoading}
              onRowClick={handleRowClick}
            />
          </TabsContent>

          {/* Display only unassigned candidates */}
          <TabsContent value="unassigned">
            <DataTable
              columns={allTabsColumns(handleDeleteCandidate)}
              data={unassignedData}
              isLoading={allCandidatesLoading}
              onRowClick={handleRowClick}
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

      {selectedRowData && (
        <>
          {isAssignModalOpen && (
            <ReAssignModal
              onClose={closeAssignModal}
              id={selectedRowData?.id}
              mode={"assign"}
            />
          )}
          {isReAssignModalOpen && (
            <ReAssignModal
              onClose={closeReAssignModal}
              id={selectedRowData?.id}
              mode={"reassign"}
            />
          )}
          {isUnAssignModalOpen && (
            <ReAssignModal
              onClose={closeUnAssignModal}
              id={selectedRowData?.id}
              mode={"unassign"}
            />
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-[364px] md:w-full overflow-y-scroll">
              <DialogHeader>
                <div className="flex w-full justify-between mt-4">
                  <DialogTitle className="text-red">
                    Candidate Details
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                  <Link
                    to={`/candidates/${selectedRowData.id}`}
                    target="_blank"
                    className="underline text-sm text-red font-medium"
                  >
                    View All
                  </Link>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-8 text-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                  <div className="w-1/2">
                    <label>Full Name</label>
                    <p className="text-primary font-medium">
                      {selectedRowData.full_name || "No name"}
                    </p>
                  </div>
                  <div className="w-1/2 flex flex-col items-start">
                    <label>Send Reminder</label>
                    <Button
                      className="border-red"
                      variant={"outline"}
                      onClick={() => {
                        if (selectedRowData?.id) {
                          handleReminders(selectedRowData.id);
                        }
                      }}
                    >
                      {isSendingReminder ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <div className="flex text-red gap-3 items-center">
                          <BellRingIcon stroke="red" />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                  <div className="w-1/2">
                    <label>Phone Number</label>
                    <span
                      onClick={() =>
                        copyToClipboard(
                          selectedRowData.phone_number || "No phone number",
                          toast
                        )
                      }
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <PhoneCallIcon size={16} />
                      {selectedRowData.phone_number || "No phone number"}
                      <CopyIcon size={16} cursor="pointer" />
                    </span>
                  </div>
                  <div className="w-1/2">
                    <label>Email Address</label>
                    <span
                      onClick={() =>
                        copyToClipboard(
                          selectedRowData.email_address || "",
                          toast
                        )
                      }
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <MailIcon size={16} />
                      <p className="max-w-full overflow-hidden">
                        {" "}
                        {selectedRowData.email_address || "No email"}
                      </p>
                      <CopyIcon size={16} cursor="pointer" />
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                  <div className="md:max-w-48">
                    <label>Recommended School 1</label>
                    <p className="text-primary font-medium">
                      <span
                        onClick={() =>
                          copyToClipboard(
                            selectedRowData.assigned_university1 || "",
                            toast
                          )
                        }
                        className="text-primary font-medium flex items-center gap-1"
                      >
                        {selectedRowData.assigned_university1}
                        <CopyIcon size={16} cursor="pointer" />
                      </span>
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <label>Recommended Course 1</label>
                    <p className="text-primary font-medium">
                      <span
                        onClick={() =>
                          copyToClipboard(
                            selectedRowData.assigned_course1 || "",
                            toast
                          )
                        }
                        className="text-primary font-medium flex items-center gap-1"
                      >
                        {selectedRowData.assigned_course1}
                        <CopyIcon size={16} cursor="pointer" />
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                  <div className="md:w-1/2">
                    <label>Recommended School 2</label>
                    <p className="text-primary font-medium">
                      <span
                        onClick={() =>
                          copyToClipboard(
                            selectedRowData.assigned_university2 || "",
                            toast
                          )
                        }
                        className="text-primary font-medium flex items-center gap-1"
                      >
                        {selectedRowData.assigned_university2}
                        <CopyIcon size={16} cursor="pointer" />
                      </span>
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <label>Recommended Course 2</label>
                    <p className="text-primary font-medium">
                      <span
                        onClick={() =>
                          copyToClipboard(
                            selectedRowData.assigned_course2 || "",
                            toast
                          )
                        }
                        className="text-primary font-medium flex items-center gap-1"
                      >
                        {selectedRowData.assigned_course2}
                        <CopyIcon size={16} cursor="pointer" />
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-5 md:gap-0 justify-between">
                  <Button
                    className="border-red text-red"
                    onClick={openAssignModal}
                    variant={"outline"}
                  >
                    Assign
                  </Button>
                  <Button
                    className="border-red text-red"
                    onClick={openUnAssignModal}
                    variant={"outline"}
                  >
                    Unassign
                  </Button>
                  <Button className="bg-red" onClick={openReAssignModal}>
                    Reassign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default TabsComponent;