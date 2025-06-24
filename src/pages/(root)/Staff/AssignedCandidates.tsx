import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import SmallBox from "@/components/SmallBox";
import { columns } from "@/components/ui/Columns";
import icon1 from "@/assets/Icon1.svg";
import icon2 from "@/assets/Icon2.svg";
import icon3 from "@/assets/Icon3.svg";
import RootLayout from "@/layouts/RootLayout";
import { CandidateData } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import DottedBox from "@/components/DottedBox";
import { Link, useSearchParams } from "react-router-dom";
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
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStaffAccountDetails,
  getStaffDetails,
} from "@/lib/actions/staff.actions";
import {
  serviceWithAgent,
  singleCandidateReminder,
} from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SaveBtn from "@/components/SaveBtn";
const AssignedCandidates = () => {
  const { loggedInUser } = useAuth();
  const [selectedRowData, setSelectedRowData] = useState<CandidateData | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [loading, setLoading] = useState(false);

  const pageSize = 50;

  const queryClient = useQueryClient();

  const { data: staffAccountDetails, isLoading } = useQuery({
    queryKey: ["staffAccountDetails"],
    queryFn: getStaffAccountDetails,
    staleTime: 10 * 1000 * 60,
  });

  const { data: loggedInStaff, isLoading: isStaffLoading } = useQuery({
    queryKey: ["staffDetails", page, debouncedSearch],
    queryFn: async () => getStaffDetails(page, debouncedSearch),
    staleTime: 5 * 60 * 1000,
    enabled: debouncedSearch.length >= 2 || debouncedSearch === "",
  });

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

  useEffect(() => {
    localStorage.setItem("resumeCurrentPage", "0");
    localStorage.setItem("sopCurrentPage", "0");
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 700);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (loggedInStaff?.next) {
      const nextPage = parseInt(
        new URL(loggedInStaff.next).searchParams.get("page") || "1",
        10
      );
      queryClient.prefetchQuery({
        queryKey: ["staffCandidates", nextPage],
        queryFn: () => getStaffDetails(nextPage),
      });
    }
  }, [page, loggedInStaff, queryClient]);

  const assignedCandidates =
    staffAccountDetails?.number_of_assigned_candidates || 0;

  const totalCandidates = loggedInStaff?.count || 0;
  const totalPages = Math.ceil(totalCandidates / pageSize);

  const totalApplications = 2 * (loggedInStaff?.count || 0);

  const completedApplications = staffAccountDetails?.jobs_completed || 0;

  const pendingJobs = totalApplications - completedApplications;

  const smallBox = loggedInStaff
    ? [
        {
          name: "Jobs / Applications Completed",
          number: completedApplications || 0,
          icon: icon1,
        },
        {
          name: "Total Applications",
          number: totalApplications || 0,
          icon: icon1,
        },
        {
          name: "Pending Jobs / Applications",
          number: pendingJobs || 0,
          icon: icon2,
        },
        {
          name: "Assigned Candidates",
          number:
            loggedInStaff?.count ||
            staffAccountDetails?.number_of_assigned_candidates ||
            0,
          icon: icon3,
        },
      ]
    : [];

  const candidateTableData: CandidateData[] =
    loggedInStaff?.results.map((candidate: CandidateData, index: number) => ({
      ...candidate,
      serial_number: (page - 1) * pageSize + index + 1,
      full_name: `${candidate.full_name}` || "No name",
      status: candidate.status || "Inactive",
      assigned_course1: candidate.assigned_course1 || "No course assigned",
      assigned_school1: candidate.assigned_university1 || "No school assigned",
      first_country: candidate.first_country || "No country",
      second_country: candidate.second_country || "No country",
      resume_status: candidate.resume_status || "Not Started",
      assigned_course2: candidate.assigned_course2 || "No course assigned",
      assigned_school2: candidate.assigned_university2 || "No school assigned",
      sop_status1: candidate.sop_status1 || "Not Started",
      sop_status2: candidate.sop_status2 || "Not Started",
      school_application_status1:
        candidate.school_application_status1 || "Not available",
      school_application_status2:
        candidate.school_application_status2 || "Not available",
    })) || [];

  const completedData = candidateTableData.filter(
    (candidate) =>
      candidate.school_application_status1 === "True" &&
      candidate.school_application_status2 === "True"
  );

  const inCompleteData = candidateTableData.filter(
    (candidate) =>
      candidate.school_application_status1 !== "True" &&
      candidate.school_application_status2 !== "True"
  );

  const handleRowClick = (row: CandidateData) => {
    setSelectedRowData(row);
    setIsDialogOpen(true);
  };

  const handleNextPage = () => {
    if (loggedInStaff?.next) {
      const nextPage = new URL(loggedInStaff.next).searchParams.get("page");
      if (nextPage)
        setSearchParams({
          page: nextPage,
        });
    }
  };

  const handlePreviousPage = () => {
    if (loggedInStaff?.previous) {
      const previousUrl = new URL(loggedInStaff.previous);
      const previousPage = previousUrl.searchParams.get("page") || "1";
      setSearchParams({
        page: previousPage,
      });
    } else {
      setSearchParams({ page: "1" });
    }
  };

  const handleServiceWithAgent = async (id: string) => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }

    setLoading(true);
    try {
      const agentData = await serviceWithAgent(id);
      toast({
        description:
          `${agentData?.message}, ${agentData?.note}` || "Successfully running",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["singleCandidate"],
      });
    } catch (error: any) {
      console.error("Failed to fetch agent data:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.detail ||
          error?.message ||
          "Failed to fetch agent data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootLayout title="Assigned Candidates">
      <p className="text-red text-[32px] font-semibold">
        Welcome, {loggedInUser?.full_name}!
      </p>
      <div className="flex justify-between w-full gap-3 flex-wrap mt-4">
        {isLoading
          ? [1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex-1 p-4">
                <Skeleton className="h-24 w-full mb-2" />
              </div>
            ))
          : smallBox.map((box) => (
              <SmallBox
                key={box.name}
                name={box.name}
                number={box.number}
                icon={box.icon}
              />
            ))}
      </div>
      <div className="border-2 border-gray rounded-lg mt-8">
        <div className="px-2 md:px-5 py-5 flex items-center md:gap-4 justify-between md:justify-normal">
          <p className="font-medium text-base md:text-xl">
            Assigned Candidates
          </p>
          <span className="text-xs md:text-sm bg-pale-bg py-2 px-4 rounded-3xl text-red">
            {isLoading
              ? "0"
              : assignedCandidates === 1
              ? `${assignedCandidates} new candidate`
              : `${assignedCandidates} new candidates`}
          </span>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="w-full md:w-[400px] bg-transparent justify-between">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
            >
              Completed Jobs
            </TabsTrigger>
            <TabsTrigger
              value="not-completed"
              className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
            >
              Not Completed
            </TabsTrigger>
          </TabsList>
          <div className="relative">
            <input
              type="text"
              placeholder="Search candidates by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3 bg-white z-10 p-2 border rounded-md mb-4 absolute top-3 left-4"
            />
            {isStaffLoading ? (
              <div className="p-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex justify-between mt-16 mb-4">
                    <Skeleton className="h-6 w-1/12" />
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <TabsContent value="all">
                  <DataTable
                    columns={columns}
                    data={candidateTableData}
                    onRowClick={handleRowClick}
                  />
                </TabsContent>
                <TabsContent value="completed">
                  <DataTable
                    columns={columns}
                    data={completedData}
                    onRowClick={handleRowClick}
                  />
                </TabsContent>
                <TabsContent value="not-completed">
                  <DataTable
                    columns={columns}
                    data={inCompleteData}
                    onRowClick={handleRowClick}
                  />
                </TabsContent>
              </div>
            )}
          </div>
        </Tabs>

        {selectedRowData && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-[364px] max-h-[500px] md:w-full overflow-y-auto">
              <DialogHeader>
                <div className="flex w-full justify-between mt-4">
                  <DialogTitle className="text-red">
                    Candidate Details
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                  <Link
                    to={`/assigned-candidates/${selectedRowData.id}`}
                    target="_blank"
                    className="underline text-sm text-red font-medium"
                  >
                    View All
                  </Link>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-5 md:gap-8 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 md:col-span-1 flex flex-col items-start">
                    <label>Full Name</label>
                    <span
                      onClick={() =>
                        copyToClipboard(
                          selectedRowData.full_name || "No name",
                          toast
                        )
                      }
                      className="flex items-center gap-1"
                    >
                      <p className="text-primary font-medium">
                        {selectedRowData.full_name || "No name"}
                      </p>
                      <CopyIcon size={16} cursor="pointer" />
                    </span>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex flex-col items-start">
                    <label>Status</label>
                    <div className="flex gap-3 items-start justify-start">
                      <p
                        className={`${
                          selectedRowData.status === "completed"
                            ? "bg-green-200 text-green-800"
                            : "text-red bg-pale-bg"
                        } text-[10px] p-1 rounded-xl`}
                      >
                        {selectedRowData.status}{" "}
                      </p>
                      <Button
                        className="border-red py-0 w-fit"
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
                            <BellRingIcon stroke="red" size={12} />
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 md:col-span-1">
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
                  <div className="col-span-2 md:col-span-1">
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
                      {selectedRowData.email_address || "No email"}
                      <CopyIcon size={16} cursor="pointer" />
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 md:col-span-1">
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
                  <div className="col-span-2 md:col-span-1">
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

                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 md:col-span-1">
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
                  <div className="col-span-2 md:col-span-1">
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
                  <DottedBox
                    className="border-red rounded-md text-sm font-bold p-2 hover:bg-pale-bg"
                    href={`/craft-sop/${selectedRowData.id}?type=school1`}
                    docType="Draft SOP 1"
                    icon=""
                  />
                  <DottedBox
                    className="border-red rounded-md text-sm font-bold p-2 hover:bg-pale-bg"
                    href={`/craft-sop/${selectedRowData.id}?type=school2`}
                    docType="Draft SOP 2"
                    icon=""
                  />

                  <Link
                    to={`/refine-resume/${selectedRowData.id}`}
                    className="bg-red p-2 hover:bg-pale-bg text-white hover:text-red border hover:border-red text-center py-2 rounded-md"
                  >
                    Refine Resume
                  </Link>
                  <Button
                    variant={"outline"}
                    onClick={() => handleServiceWithAgent(selectedRowData.id!)}
                    className="p-2 border-red text-red h-fit w-fit"
                  >
                    {loading ? (
                      <SaveBtn text="Servicing" />
                    ) : (
                      "Service with agent"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={!loggedInStaff?.previous}
          className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!loggedInStaff?.next}
          className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </RootLayout>
  );
};

export default AssignedCandidates;
