import { Link, useParams } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import {
  AdvancedEducation,
  CandidateData,
  VerificationDocument,
} from "@/types";
import { ChevronDown, CopyIcon, MailIcon, PhoneCallIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  copyToClipboard,
  getCountryNameFromISO,
  getInitials,
} from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleCandidate } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import CopyText from "@/components/CopyText";
import { useState } from "react";

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { loggedInUser } = useAuth();
  const { toast } = useToast();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

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

  console.log(candidate);

  const documents: Record<
    keyof Omit<VerificationDocument, "id" | "candidate">,
    string
  > = {
    bsc_hnd_certificate: "BSC/HND Certificate",
    bank_statement: "Bank Statement",
    first_degree_transcript: "First Degree Transcript",
    current_cv: "Current CV",
    intl_passport: "International Passport",
    nin_slip: "NIN Slip",
    utility_bill: "Utility Bill",
    post_graduate_certificate: "Post Graduate Certificate",
    post_graduate_transcript: "Post Graduate Transcript",
  };

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
              {candidate?.career[0]?.profession || "No profession provided"}
            </p>
            <p className="capitalize">
              Course: {candidate?.assigned_course1 || "No course provided"}
            </p>
            <p className="capitalize">
              School: {candidate?.assigned_university1 || "No school provided"}
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
                      : `/sop/${id}`
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
          <p>
            {candidate.assigned_manager[0]?.user?.full_name ||
              loggedInUser?.full_name ||
              "Manager not found"}
          </p>
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
                {jobExperienceData?.year_ended || "Till Date"}
              </p>
              <p className="font-semibold capitalize">{`${
                jobExperienceData?.job_title || "No job title"
              } at ${jobExperienceData?.business_name}`}</p>
            </span>
          ) : null
        )}
      </div>

      <hr className="w-full h-2 my-8" />

      {/* JOB SUMMARY */}
      <div>
        <h3 className="font-semibold text-lg mb-4">JOB SUMMARY</h3>
        <div className="text-[#5E6366]">
          {candidate?.job_experience?.length ? (
            candidate.job_experience.map((job) =>
              job.job_summary ? (
                <div key={job.id}>
                  <p className="mb-3">{job.job_summary}</p>
                  <CopyIcon
                    size={16}
                    cursor="pointer"
                    onClick={() => copyToClipboard(job.job_summary, toast)}
                  />
                </div>
              ) : null
            )
          ) : (
            <span className="flex gap-4 items-center">
              <p>No job summary provided</p>
            </span>
          )}
        </div>
      </div>

      <hr className="w-full h-2 my-8" />

      {/* OTHER INFO */}
      <div>
        <div
          onClick={toggleAccordion}
          className="flex justify-between cursor-pointer"
        >
          <h3 className="font-semibold text-lg mb-4">OTHER INFO</h3>
          <ChevronDown
            className={`transition-transform transform ${
              isAccordionOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        
        <div
          className={`space-y-4 overflow-hidden transition-all duration-500 ${
            isAccordionOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Personal Details */}
          <div>
            <h3 className="font-semibold text-base mb-4">Personal Details</h3>
            <div className="flex flex-col gap-2">
              <CopyText label="First Name" text={candidate?.first_name} />
              <CopyText label="Middle Name" text={candidate?.middle_name} />
              <CopyText label="Last Name" text={candidate?.last_name} />
              <CopyText label="Gender" text={candidate?.gender} />
              <CopyText label="Birth Date" text={candidate?.birth_date} />
              <CopyText
                label="City of Residence"
                text={candidate?.city_current_reside}
              />
              <CopyText
                label="State of Residence"
                text={candidate?.state_current_reside}
              />
              <CopyText
                label="Country of Residence"
                text={getCountryNameFromISO(candidate?.country_current_reside)}
              />
              <CopyText label="City Of Birth" text={candidate?.city_of_birth} />
              <CopyText
                label="State Of Birth"
                text={candidate?.state_of_birth}
              />
              <CopyText
                label="Country of Birth"
                text={getCountryNameFromISO(candidate?.country_of_birth)}
              />
              <CopyText
                label="Current House Address"
                text={candidate?.current_house_address}
              />
              <CopyText label="Postal Code" text={candidate?.postal_code} />
            </div>
          </div>

          {/* Education Details */}
          <div>
            <h3 className="font-semibold text-base mb-4">Education Details</h3>
            {candidate?.education.map((edu) => (
              <div className="flex flex-col gap-2" key={edu?.id}>
                <CopyText label="Current Status" text={edu.current_status} />
                <CopyText label="Degree Type" text={edu.degree_type} />
                <CopyText label="Country" text={edu.country} />
                <CopyText
                  label="Course Of Study"
                  text={edu.specific_course_of_study}
                />
                <CopyText
                  label="Tertiary Institution Attended"
                  text={edu.school_name}
                />
                <CopyText label="Class of Degree" text={edu.class_of_degree} />
                <CopyText label="Specific CGPA" text={edu.specific_cgpa} />
                <CopyText
                  label="Year Admitted"
                  text={String(edu.year_admitted)}
                />
                <CopyText
                  label="Year Graduated"
                  text={String(edu.year_graduated)}
                />

                {/* ADVANCED DEGREE */}
                {edu.has_advanced_degree &&
                  candidate?.advanced_education?.map(
                    (advanced_edu: AdvancedEducation) => (
                      <div key={advanced_edu?.id}>
                        <h3 className="font-semibold text-base mb-2">
                          Advanced Degree
                        </h3>
                        <CopyText
                          label="Advanced Degree Type"
                          text={advanced_edu?.advanced_degree_type || "N/A"}
                        />
                        <CopyText
                          label="Class of Degree"
                          text={advanced_edu?.class_of_degree || "N/A"}
                        />
                        <CopyText
                          label="Country"
                          text={advanced_edu?.country || "N/A"}
                        />
                        <CopyText
                          label="Graduate Type"
                          text={advanced_edu?.graduate_type || "N/A"}
                        />
                        <CopyText
                          label="School Name"
                          text={advanced_edu?.school_name || "N/A"}
                        />
                        <CopyText
                          label="Specific CGPA"
                          text={advanced_edu?.specific_cgpa || "N/A"}
                        />
                        <CopyText
                          label="Year Admitted"
                          text={String(advanced_edu?.year_admitted) || "N/A"}
                        />
                        <CopyText
                          label="Year Graduated"
                          text={String(advanced_edu?.year_graduated) || "N/A"}
                        />
                      </div>
                    )
                  )}
              </div>
            ))}
          </div>

          {/* Work Experience Details */}
          <div>
            <h3 className="font-semibold text-base mb-4">
              Work Experience Details
            </h3>
            {/* Career */}
            {candidate?.career.map((car) => (
              <div key={car?.id} className="flex flex-col gap-2">
                <CopyText label="Profession" text={car?.profession} />
                <CopyText label="Sector" text={car?.sector} />
                <CopyText label="Technical Skill" text={car?.technical_skill} />
                <CopyText
                  label="Year of Experience Post Degree"
                  text={String(car?.years_of_experience_post_degree)}
                />
                <CopyText
                  label="Year of Experience Pre Graduation"
                  text={String(car?.years_of_experience_pre_graduation)}
                />
              </div>
            ))}

            {/* Job Experience */}
            {candidate?.job_experience.map((job) => {
              if (job?.business_name === "") return null;

              return (
                <div key={job?.id} className="flex my-5 flex-col gap-2">
                  <CopyText label="Business Name" text={job?.business_name} />
                  <CopyText
                    label="Company Description"
                    text={job?.company_description}
                  />
                  <CopyText label="Country" text={job?.country} />
                  <CopyText
                    label="Employment Type"
                    text={job?.employment_type}
                  />
                  <CopyText label="Job Status" text={job?.job_status} />
                  <CopyText label="Job Summary" text={job?.job_summary} />
                  <CopyText label="Job Title" text={job?.job_title} />
                  <CopyText
                    label="Professional Status"
                    text={job?.professional_status}
                  />
                  <CopyText label="State" text={job?.state} />
                  <CopyText
                    label="Year Started"
                    text={String(job?.year_started)}
                  />
                  <CopyText label="Year Ended" text={String(job?.year_ended)} />
                </div>
              );
            })}
          </div>

          {/* LOAN REFERREES */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Loan Referees</h3>
            <div className="space-y-4 m-4">
              {candidate?.loan_referees?.map((referee, index) => (
                <div key={index} className="flex justify-between items-center">
                  <CopyText label="Referee Name" text={referee.name} />
                  <CopyText label="Relationship" text={referee.relationship} />
                  <CopyText label="Email" text={referee.email} />
                  <CopyText label="Phone Number" text={referee.phone_number} />
                </div>
              ))}
            </div>
          </div>

          {/* VERIFICATION DOCUMENTS */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              VERIFICATION DOCUMENTS
            </h3>
            <div className="space-y-4 m-4">
              {Object.entries(documents).map(([key, label]) => (
                <div key={key} className="flex justify-between items-center">
                  <p className="text-base">{label}</p>
                  {candidate?.verification_documents[0]?.[
                    key as keyof VerificationDocument
                  ] ? (
                    <a
                      href={
                        candidate.verification_documents[0][
                          key as keyof VerificationDocument
                        ] as string
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      Uploaded
                    </a>
                  ) : (
                    <span className="text-red">Not Uploaded</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default CandidateProfile;
