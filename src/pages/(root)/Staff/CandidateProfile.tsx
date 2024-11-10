import { Link, useParams } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import { CandidateData } from "@/types";
import { MailIcon, PhoneCallIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleCandidate } from "@/lib/actions/user.actions";

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { loggedInUser } = useAuth();

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const { data: candidate, isLoading } = useQuery<CandidateData>({
    queryKey: ["candidateData", id],
    queryFn: () => getSingleCandidate(id),
    staleTime: 5 * 1000 * 60,
  });

  if (isLoading || !candidate) {
    return (
      <RootLayout title="Candidate Profile">
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0">
          <div className="flex items-start gap-5 flex-col md:flex-row">
            <div>
              <Skeleton className="w-20 h-20 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-40 h-8" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-40 h-6" />
              <div className="flex items-center gap-4">
                <Skeleton className="w-24 h-8" />
                <Skeleton className="w-24 h-8" />
              </div>
              <Skeleton className="w-24 h-4" />
            </div>
          </div>
          <div>
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-40 h-6" />
          </div>
        </div>
        <hr className="w-full h-2 my-8" />
        <Skeleton className="h-32" />
        <hr className="w-full h-2 my-8" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <hr className="w-full h-2 my-8" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </RootLayout>
    );
  }

  return (
    <RootLayout title="Candidate Profile">
      <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0">
        <div className="flex items-start gap-5 flex-col md:flex-row">
          <div>
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="font-bold">
                {getInitials(candidate.user?.full_name || "")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-2xl">
              {candidate.user?.full_name || ""}
            </p>
            <p className="capitalize">
              Preferred Call Name:{" "}
              {candidate?.preferred_call_name || "No name provided"}
            </p>
            <p className="capitalize">
              Profession:{" "}
              {candidate?.career[0].profession || "No profession provided"}
            </p>
            <p className="capitalize">
              Course:{" "}
              {candidate?.education?.map(
                (edu) => edu.specific_course_of_study || "No course provided"
              )}
            </p>
            <p className="capitalize">
              School:{" "}
              {candidate?.education?.map(
                (edu) => edu.school_name || "No school provided"
              )}
            </p>
            <div className="flex items-center gap-4">
              <div className="bg-pale-bg text-red rounded-xl px-2 text-xs flex items-center gap-1 py-1">
                <PhoneCallIcon size={16} />
                {candidate.phone_number || "No phone number provided"}
              </div>
              <div className="bg-pale-bg text-red rounded-xl px-2 text-xs flex items-center gap-1 py-1">
                <MailIcon size={16} />
                {candidate.user?.email ||
                  candidate.email_address ||
                  "No email provided"}
              </div>
            </div>
            <p className="text-xs">Candidate ID: {id}</p>
            <div className="flex items-center gap-4">
              <button className="text-sm bg-red text-white rounded-lg p-2">
                <Link
                  to={
                    candidate.resume_status === "Completed"
                      ? `/refine-resume/final-resume/${id}`
                      : `/refine-resume/${id}`
                  }
                >
                  {candidate.resume_status === "Completed"
                    ? "View Resume"
                    : "Refine Resume"}
                </Link>
              </button>
              <button className="text-sm bg-red text-white rounded-lg p-2">
                <Link
                  to={
                    candidate.sop_status === "Completed"
                      ? `${candidate.sop[0].file}`
                      : `/craft-sop/${id}`
                  }
                >
                  {candidate.sop_status === "Completed"
                    ? "View SOP"
                    : "Craft SOP"}
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Assigned Manager</h3>
          <p>{loggedInUser?.full_name || "Manager not found"}</p>
        </div>
      </div>
      <hr className="w-full h-2 my-8" />
      <div>
        <h3 className="font-semibold text-lg mb-4">CAREER STRATEGIC PURPOSE</h3>
        <div className="text-[#5E6366]">
          {candidate?.career_strategic_purpose || (
            <span className="flex gap-4 items-center">
              <p>No career strategic purpose provided</p>
              <Link
                to={`/craft-sop/${id}`}
                target="_blank"
                className="button bg-red text-white flex items-center justify-center text-center px-4 rounded-lg h-12"
              >
                Get Started
              </Link>
            </span>
          )}
        </div>
      </div>
      <hr className="w-full h-2 my-8" />
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">EDUCATION HISTORY</h3>
          {/* <p className="text-[#5E6366] font-semibold">
            {combinedEducationData.length
              ? `${combinedEducationData.length} degrees`
              : "No education history provided"}
          </p> */}
        </span>
        {candidate?.education?.map((education, index: number) => (
          <span key={index} className="flex gap-5 items-center">
            <p className="text-[#5E6366] font-semibold md:w-60">
              {`${education.year_admitted || "No year set"} - ${
                education.year_graduated || "No year set"
              }`}
            </p>
            <p className="font-semibold capitalize">
              {`${education.degree_type} in ${
                education.specific_course_of_study
              } at ${education.school_name || "No school"}`}
            </p>
          </span>
        )) || <p>No education history available</p>}

        {/* Advanced Education */}
        {candidate?.advanced_education?.map((education, index: number) =>
          education.year_admitted === null ? (
            ""
          ) : (
            <span key={index} className="flex gap-5 items-center">
              <p className="text-[#5E6366] font-semibold md:w-60">
                {`${education.year_admitted || "No year set"} - ${
                  education.year_graduated || "No year set"
                }`}
              </p>
              <p className="font-semibold capitalize">
                {`${education.advanced_degree_type} in ${
                  education.graduate_type
                } at ${education.school_name || "No school"}`}
              </p>
            </span>
          )
        ) || <p>No education history available</p>}
      </div>
      <hr className="w-full h-2 my-8" />
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">WORK HISTORY</h3>
          <p className="text-[#5E6366] font-semibold"></p>
        </span>
        {candidate?.job_experience?.map((jobExperienceData, index: number) =>
          jobExperienceData.business_name ? (
            <span key={index} className="flex gap-5 items-center">
              <p className="text-[#5E6366] font-semibold md:w-60">
                {jobExperienceData?.year_started || "No start year"} -{" "}
                {jobExperienceData?.year_ended || "No end year"}
              </p>
              <p className="font-semibold capitalize">{`${
                jobExperienceData?.job_title || "No job title"
              } at ${jobExperienceData?.business_name}`}</p>
            </span>
          ) : null
        )}
      </div>
      <hr className="w-full h-2 my-8" />
      <div>
        <h3 className="font-semibold text-lg mb-4">JOB SUMMARY</h3>
        <div className="text-[#5E6366]">
          {candidate?.job_experience?.map((job) => job.job_summary) || (
            <span className="flex gap-4 items-center">
              <p>No job summary provided</p>
            </span>
          )}
        </div>
      </div>
    </RootLayout>
  );
};

export default CandidateProfile;
