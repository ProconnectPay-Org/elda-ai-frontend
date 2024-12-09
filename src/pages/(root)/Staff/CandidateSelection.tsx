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
import { Link } from "react-router-dom";
import DottedBox from "@/components/DottedBox";

const CandidateSelection = () => {
  const { loggedInStaff, isStaffLoading } = useStaffDetails();
  const [assignedCandidates, setAssignedCandidates] = useState(0);
  const [selectedRowData, setSelectedRowData] = useState<CandidateData | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (loggedInStaff) {
      setAssignedCandidates(loggedInStaff.number_of_assigned_candidates);
    }
  }, [loggedInStaff]);

  const candidateTableData: CandidateData[] =
    loggedInStaff?.staff_candidates.map(
      (candidate: CandidateData, index: number) => ({
        ...candidate,
        serial_number: index + 1,
        full_name: `${candidate.user?.full_name}` || "No name",
        status: candidate.status || "Inactive",
        assigned_course: candidate.assigned_course1 || "No course assigned",
        assigned_school: candidate.assigned_university1 || "No school assigned",

        resume_status: candidate.resume_status || "Not Started",
        sop_status: candidate.sop_status || "Not Started",
        school_application_status:
          candidate.school_application_status || "Not available",
      })
    ) || [];

  const handleRowClick = (row: CandidateData) => {
    setSelectedRowData(row);
    setIsDialogOpen(true);
  };

  return (
    <RootLayout title="A candidate must be selected">
      <div className="border-2 border-gray w-full rounded-lg mt-8">
        <div className="px-2 md:px-5 py-5 flex items-center md:gap-4 justify-between md:justify-normal">
          <p className="font-medium text-base md:text-xl">
            Your Assigned Candidates
          </p>
          <span className="text-xs md:text-sm bg-pale-bg py-2 px-4 rounded-3xl text-red">
            {assignedCandidates === 1
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
          <DataTable
            columns={columns}
            data={candidateTableData}
            onRowClick={handleRowClick}
          />
        )}

        {selectedRowData && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-[364px] md:w-full">
              <DialogHeader>
                <div className="flex w-full justify-between mt-4">
                  <DialogTitle className="text-red">
                    Candidate Details
                  </DialogTitle>
                  <Link
                    to={`/assigned-candidates/${selectedRowData.id}`}
                    className="underline text-sm text-red font-medium"
                  >
                    View All
                  </Link>
                </div>
              </DialogHeader>
              <DialogDescription className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                  <div className="w-1/2">
                    <label>Full Name</label>
                    <p className="text-primary font-medium">
                      {selectedRowData.user?.full_name}
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
                          selectedRowData.phone_number || "",
                          toast
                        )
                      }
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <PhoneCallIcon size={16} />
                      {selectedRowData.phone_number}
                      <CopyIcon size={16} cursor="pointer" />
                    </span>
                  </div>
                  <div className="w-1/2">
                    <label>Email Address</label>
                    <span
                      onClick={() =>
                        copyToClipboard(
                          selectedRowData.user?.email || "",
                          toast
                        )
                      }
                      className="text-primary font-medium flex items-center gap-1"
                    >
                      <MailIcon size={16} />
                      {selectedRowData.user?.email}
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
                    href={`/craft-sop/${selectedRowData.id}`}
                    docType="Draft Statement Of Purpose"
                    icon=""
                  />
                  <Link
                    to={`/refine-resume/${selectedRowData.id}`}
                    className="bg-red w-1/2 hover:bg-pale-bg text-white hover:text-red border hover:border-red text-center py-2 rounded-md"
                  >
                    Refine Resume
                  </Link>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </RootLayout>
  );
};

export default CandidateSelection;
