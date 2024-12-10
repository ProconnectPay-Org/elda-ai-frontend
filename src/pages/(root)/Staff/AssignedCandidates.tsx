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
import useStaffDetails from "@/hooks/useStaffDetails";
const AssignedCandidates = () => {
  const [assignedCandidates, setAssignedCandidates] = useState(0);
  const { loggedInUser } = useAuth();
  const { loggedInStaff, isStaffLoading } = useStaffDetails();

  useEffect(() => {
    if (loggedInStaff) {
      setAssignedCandidates(loggedInStaff.number_of_assigned_candidates);
    }
  }, [loggedInStaff]);

  const smallBox = loggedInStaff
    ? [
        {
          name: "Jobs Completed",
          number: loggedInStaff.jobs_completed,
          icon: icon1,
        },
        {
          name: "Jobs Pending",
          number: loggedInStaff.jobs_pending,
          icon: icon2,
        },
        {
          name: "Assigned Candidates",
          number: loggedInStaff.number_of_assigned_candidates,
          icon: icon3,
        },
      ]
    : [];

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

    console.log(candidateTableData);
    

  return (
    <RootLayout title="Assigned Candidates">
      <p className="text-red text-[32px] font-semibold">
        Welcome, {loggedInUser?.full_name}!
      </p>
      <div className="flex justify-between w-full gap-8 flex-wrap mt-4">
        {isStaffLoading
          ? [1, 2, 3].map((_, i) => (
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
      <div className="border-2 border-gray w-full rounded-lg mt-8">
        <div className="px-2 md:px-5 py-5 flex items-center md:gap-4 justify-between md:justify-normal">
          <p className="font-medium text-base md:text-xl">
            Assigned Candidates
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

export default AssignedCandidates;
