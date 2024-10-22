import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RootLayout from "@/layouts/RootLayout";
import { CandidateData, Staff } from "@/types";
import { MailIcon, PhoneCallIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import {
  fetchCareerData,
  fetchEducationData,
  fetchJobExperienceData,
  getAdvancedDegree,
  // getStaffDetails,
} from "@/lib/actions/staff.actions";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import useStaffDetails from "@/hooks/useStaffDetails";

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [careerId, setCareerId] = useState("");
  const [education_id, setEducation_id] = useState("");
  const [advancedEducation_id, setAdvancedEducation_id] = useState("");
  const [jobExperienceId, setJobExperienceId] = useState("");
  const { loggedInUser } = useAuth();
  const { loggedInStaff, isStaffLoading } = useStaffDetails();

  const staffData = loggedInStaff as Staff | null;

  useEffect(() => {
    if (staffData) {
      const foundCandidate = staffData.staff_candidates.find(
        (candidate: CandidateData) => String(candidate.id) === String(id)
      );
      setCandidate(foundCandidate || null);
      setCareerId(foundCandidate?.career[0] || "");
      setEducation_id(foundCandidate?.education[0] || "");
      setJobExperienceId(foundCandidate?.job_experience[0] || "");
      setAdvancedEducation_id(foundCandidate?.advanced_education[0] || "");
    }
  }, [staffData, id]);

  const { data: educationData } = useQuery({
    queryKey: ["educationInfo", education_id],
    queryFn: () => fetchEducationData(education_id),
    enabled: !!education_id,
    staleTime: 10 * 60 * 1000,
  });  

  const { data: advancedEducationData } = useQuery({
    queryKey: ["advancedEducationInfo", advancedEducation_id],
    queryFn: () => getAdvancedDegree(advancedEducation_id),
    enabled: advancedEducation_id.length > 0,
    staleTime: 10 * 60 * 1000,
  });

  const combinedEducationData = [
    ...(educationData ? [educationData] : []),
    ...(advancedEducationData ? [advancedEducationData] : []),
  ];

  const { isLoading: isWorkExpLoading, data: careerData } = useQuery({
    queryKey: ["careerData", careerId],
    queryFn: () => fetchCareerData(careerId),
    enabled: !!careerId,
    staleTime: 10 * 60 * 1000,
  });

  const { isLoading: isJobExpLoading, data: jobExperienceData } = useQuery({
    queryKey: ["jobExperienceData", jobExperienceId],
    queryFn: () => fetchJobExperienceData(jobExperienceId),
    enabled: !!jobExperienceId,
    staleTime: 10 * 60 * 1000,
  });

  if (isStaffLoading || isWorkExpLoading || isJobExpLoading || !candidate) {
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
            <p>
              Profession: {careerData?.profession || "No profession provided"}
            </p>
            <p>
              Course: {educationData?.specific_course_of_study || "No course provided"}
            </p>
            <p>
              School: {educationData?.school_name || "No school provided"}
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
          <p className="text-[#5E6366] font-semibold">
            {combinedEducationData.length
              ? `${combinedEducationData.length} degrees`
              : "No education history provided"}
          </p>
        </span>
        {combinedEducationData.map((education, index: number) => (
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
      </div>
      <hr className="w-full h-2 my-8" />
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">WORK HISTORY</h3>
          <p className="text-[#5E6366] font-semibold"></p>
        </span>
        <span className="flex gap-5 items-center">
          <p className="text-[#5E6366] font-semibold md:w-60">
            {jobExperienceData?.year_started || "No start year"} -{" "}
            {jobExperienceData?.year_ended || "No end year"}
          </p>
          <p className="font-semibold capitalize">{`${
            jobExperienceData?.job_title || "No job title"
          } at ${jobExperienceData?.business_name || "No business name"}`}</p>
        </span>
      </div>
    </RootLayout>
  );
};

export default CandidateProfile;
