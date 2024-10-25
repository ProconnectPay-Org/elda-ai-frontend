import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/ui/Columns";
import { Skeleton } from "@/components/ui/skeleton";
import useStaffDetails from "@/hooks/useStaffDetails";
import RootLayout from "@/layouts/RootLayout";
import { CandidateData } from "@/types";
import { useEffect, useState } from "react";

const CandidateSelection = () => {
  const { loggedInStaff, isStaffLoading } = useStaffDetails();
  const [assignedCandidates, setAssignedCandidates] = useState(0);

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
        name: `${candidate.user?.full_name}` || "No name",
        status: candidate.status || "Inactive",
        recommended_course: candidate.assigned_course || "No course assigned",
        recommended_school:
          candidate.assigned_university || "No school assigned",
        resume: candidate.resume_status || "Not Started",
        sop_status: candidate.sop_status || "Not Started",
        school_application_status:
          candidate.school_application_status || "Not available",
      })
    ) || [];

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
          <DataTable columns={columns} data={candidateTableData} />
        )}
      </div>
    </RootLayout>
  );
};

export default CandidateSelection;
