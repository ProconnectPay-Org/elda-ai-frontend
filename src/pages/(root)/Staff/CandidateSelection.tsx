import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/ui/Columns";
import { Skeleton } from "@/components/ui/skeleton";
import useStaffDetails from "@/hooks/useStaffDetails";
import RootLayout from "@/layouts/RootLayout";
import { CandidateData } from "@/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { copyToClipboard } from "@/lib/utils";
import { CopyIcon, MailIcon, PhoneCallIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link, useSearchParams } from "react-router-dom";
import DottedBox from "@/components/DottedBox";
import {
  getStaffAccountDetails,
  getStaffDetails,
} from "@/lib/actions/staff.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CandidateSelection = () => {
  const { loggedInStaff, isStaffLoading } = useStaffDetails();
  const [selectedRowData, setSelectedRowData] = useState<CandidateData | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;

  const queryClient = useQueryClient();

  const { data: staffAccountDetails, isLoading } = useQuery({
    queryKey: ["staffAccountDetails"],
    queryFn: getStaffAccountDetails,
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    localStorage.setItem("resumeCurrentPage", "0");
    localStorage.setItem("sopCurrentPage", "0");
  }, [loggedInStaff]);

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

  const totalCandidates = loggedInStaff?.count || 0;
  const totalPages = Math.ceil(totalCandidates / pageSize);

  const assignedCandidates =
    staffAccountDetails?.number_of_assigned_candidates || 0;

  const candidateTableData: CandidateData[] =
    loggedInStaff?.results.map((candidate: CandidateData, index: number) => ({
      ...candidate,
      serial_number: (page - 1) * pageSize + index + 1,
      full_name: `${candidate.full_name}` || "No name",
      status: candidate.status || "Inactive",
      assigned_course1: candidate.assigned_course1 || "No course assigned",
      assigned_school1: candidate.assigned_university1 || "No school assigned",
      assigned_course2: candidate.assigned_course2 || "No course assigned",
      assigned_school2: candidate.assigned_university2 || "No school assigned",
      resume_status: candidate.resume_status || "Not Started",
      sop_status: candidate.sop_status || "Not Started",
      school_application_status1:
        candidate.school_application_status1 || "Not available",
      school_application_status2:
        candidate.school_application_status2 || "Not available",
    })) || [];

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

  return (
    <RootLayout title="A candidate must be selected">
      <div className="border-2 border-gray w-full rounded-lg mt-8">
        <div className="px-2 md:px-5 py-5 flex items-center md:gap-4 justify-between md:justify-normal">
          <p className="font-medium text-base md:text-xl">
            Your Assigned Candidates
          </p>
          <span className="text-xs md:text-sm bg-pale-bg py-2 px-4 rounded-3xl text-red">
            {isLoading
              ? "0"
              : assignedCandidates === 1
              ? `${assignedCandidates} new candidate`
              : `${assignedCandidates} new candidates`}
          </span>
        </div>
        {isStaffLoading ? (
          <div className="p-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex justify-between mb-4">
                <Skeleton className="h-6 w-1/12" />
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={candidateTableData}
              onRowClick={handleRowClick}
            />
          </div>
        )}

        {selectedRowData && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-[364px] md:w-full overflow-y-scroll">
              <DialogHeader>
                <div className="flex w-full justify-between mt-4">
                  <DialogTitle className="text-red">
                    Candidate Details
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                  <Link
                    to={`/assigned-candidates/${selectedRowData.id}`}
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
                    <label>Status</label>
                    <p
                      className={`${
                        selectedRowData.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : "text-red bg-pale-bg"
                      } text-[10px] p-1 rounded-xl`}
                    >
                      {selectedRowData.status}
                    </p>
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
                      {selectedRowData.email_address || "No email"}
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
                    className="bg-red w-40 hover:bg-pale-bg text-white hover:text-red border hover:border-red text-center py-2 rounded-md"
                  >
                    Refine Resume
                  </Link>
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

export default CandidateSelection;
