import { Link, useParams } from "react-router-dom";
import { CandidateData, VerificationDocument } from "@/types";
import { CopyIcon, MailIcon, PhoneCallIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getSingleCandidate } from "@/lib/actions/user.actions";
import AdminLayout from "@/layouts/AdminLayout";
import {
  copyToClipboard,
  formatDate,
  getCountryNameFromISO,
} from "@/lib/utils";
import CopyText from "@/components/CopyText";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReAssignModal from "@/components/ReAssignModal";

const CandidatePage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return;
  }
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isUnAssignModalOpen, setIsUnAssignModalOpen] = useState(false);

  const openReAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const closeReAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  const openUnAssignModal = () => {
    setIsUnAssignModalOpen(true);
  };

  const closeUnAssignModal = () => {
    setIsUnAssignModalOpen(false);
  };

  const { toast } = useToast();

  const { data: candidate, isLoading } = useQuery<CandidateData>({
    queryKey: ["candidateData", id],
    queryFn: () => getSingleCandidate(id),
    staleTime: 5 * 1000 * 60,
  });

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
    admission_letter: "Admission Letter",
    gre_document: "GRE or GMAT result",
  };

  if (isLoading || !candidate) {
    return (
      <AdminLayout title="Candidate Profile">
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {isAssignModalOpen && (
        <ReAssignModal onClose={closeReAssignModal} id={id} mode={"reassign"} />
      )}
      {isUnAssignModalOpen && (
        <ReAssignModal onClose={closeUnAssignModal} id={id} mode={"unassign"} />
      )}
      <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0">
        <div className="flex items-start gap-5 flex-col md:flex-row">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-2xl">
              {candidate.user?.full_name || ""}
            </p>
            <CopyText
              label="Preferred Call Name"
              text={candidate?.preferred_call_name || "No name provided"}
            />
            <CopyText
              label="Profession"
              text={
                candidate?.career[0]?.profession || "No profession provided"
              }
            />
            <CopyText
              label="Assigned Course 1"
              text={candidate?.assigned_course1 || "No course provided"}
            />
            <CopyText
              label="Assigned School 1"
              text={candidate?.assigned_university1}
            />
            <CopyText
              label="Assigned Program Type 1"
              text={candidate?.program_type1 || "No program provided"}
            />
            <CopyText
              label="Assigned Country 1"
              text={candidate?.first_country || "No country provided"}
            />
            <CopyText
              label="Assigned Course 2"
              text={candidate?.assigned_course2 || "No course provided"}
            />
            <CopyText
              label="Assigned School 2"
              text={candidate?.assigned_university2 || "No school provided"}
            />
            <CopyText
              label="Assigned Country 2"
              text={candidate?.second_country || "No country provided"}
            />
            <CopyText
              label="Assigned Program Type 2"
              text={candidate?.program_type2 || "No program provided"}
            />

            <div className="flex items-center gap-4">
              <div className="bg-pale-bg text-red rounded-xl px-2 text-xs flex items-center gap-1 py-1">
                <PhoneCallIcon size={16} />
                {candidate?.phone_number || "No phone number provided"}
                <CopyIcon
                  size={16}
                  cursor="pointer"
                  onClick={() =>
                    copyToClipboard(candidate?.phone_number || "", toast)
                  }
                />
              </div>
              <div className="bg-pale-bg text-red rounded-xl px-2 text-xs flex items-center gap-1 py-1">
                <MailIcon size={16} />
                {(
                  <>
                    {candidate?.user?.email}
                    <CopyIcon
                      size={16}
                      cursor="pointer"
                      onClick={() =>
                        copyToClipboard(candidate?.user?.email || "", toast)
                      }
                    />
                  </>
                ) ||
                  candidate?.email_address ||
                  "No email provided"}
              </div>
            </div>
            <p className="text-xs">Candidate ID: {id}</p>
            <div className="flex items-center gap-4">
              <button className="text-sm bg-red text-white rounded-lg p-2">
                <Link
                  to={
                    candidate.resume_status === "Completed"
                      ? `/download-resume/${id}`
                      : ``
                  }
                >
                  {candidate.resume_status === "Completed"
                    ? "View Resume"
                    : "Resume not created"}
                </Link>
              </button>
              <button className="text-sm bg-red text-white rounded-lg p-2">
                <Link
                  to={
                    candidate.sop_status1 === "Completed"
                      ? `/sop/${id}?type=school1`
                      : ``
                  }
                >
                  {candidate.sop_status1 === "Completed"
                    ? "View SOP 1"
                    : "SOP 1 not created"}
                </Link>
              </button>
              <button className="text-sm bg-red text-white rounded-lg p-2">
                <Link
                  to={
                    candidate.sop_status2 === "Completed"
                      ? `/sop/${id}?type=school2`
                      : ``
                  }
                >
                  {candidate.sop_status2 === "Completed"
                    ? "View SOP 2"
                    : "SOP 2 not created"}
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Assigned Manager</h3>
          <p>
            {candidate.assigned_manager[0]?.user?.full_name ||
              "Manager not found"}
          </p>
          <div className="flex gap-3 mt-2">
            <Button className="border-red text-red" onClick={openUnAssignModal} variant={"outline"}>Unassign</Button>
            <Button className="bg-red" onClick={openReAssignModal}>Reassign</Button>
          </div>
        </div>
      </div>

      <hr className="w-full h-2 my-8" />

      {/* BIO DATA */}
      <div>
        <h3 className="font-semibold text-lg mb-4">BIO DATA</h3>
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
          <CopyText label="State Of Birth" text={candidate?.state_of_birth} />
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

      <hr className="w-full h-2 my-8" />

      {/* CAREER STRATEGIC PURPOSE */}
      <div>
        <h3 className="font-semibold text-lg mb-4">CAREER STRATEGIC PURPOSE</h3>
        <div className="text-[#5E6366]">
          {(
            <>
              {candidate?.career_strategic_purpose}
              <CopyIcon
                size={16}
                cursor="pointer"
                onClick={() =>
                  copyToClipboard(candidate?.career_strategic_purpose, toast)
                }
              />
            </>
          ) || (
            <span className="flex gap-4 items-center">
              <p>No career strategic purpose provided</p>
            </span>
          )}
        </div>
      </div>

      <hr className="w-full h-2 my-8" />

      {/* EDUCATION HISTORY */}
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">EDUCATION HISTORY</h3>
        </span>
        {candidate?.education?.map((education, index: number) => (
          <span key={index} className="flex gap-5 items-center">
            <p className="text-[#5E6366] font-semibold md:w-60">
              {`${
                formatDate(String(education.admission_date)) || "No year set"
              } - ${
                formatDate(String(education.graduation_date)) || "No year set"
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
          education.admission_date === null ? (
            ""
          ) : (
            <span key={index} className="flex gap-5 items-center">
              <p className="text-[#5E6366] font-semibold md:w-60">
                {`${
                  formatDate(String(education.admission_date)) || "No year set"
                } - ${
                  formatDate(String(education.graduation_date)) || "No year set"
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

      {/* COURSE DESCRIPTION */}
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">COURSE DESCRIPTION</h3>
        </span>
        <p>
          Course Description 1:{" "}
          {candidate?.course_description1 || "No course description"}
        </p>
        <CopyIcon
          size={16}
          cursor="pointer"
          onClick={() => copyToClipboard(candidate?.course_description1, toast)}
        />
        <p>
          Course Description 2:{" "}
          {candidate?.course_description2 || "No course description"}
        </p>
        <CopyIcon
          size={16}
          cursor="pointer"
          onClick={() => copyToClipboard(candidate?.course_description2, toast)}
        />
      </div>

      <hr className="w-full h-2 my-8" />

      {/* WORK HISTORY */}
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">WORK HISTORY</h3>
          <p className="text-[#5E6366] font-semibold"></p>
        </span>
        {candidate?.job_experience?.map((jobExperienceData, index: number) =>
          jobExperienceData.business_name ? (
            <span key={index} className="flex gap-5 items-center">
              <p className="text-[#5E6366] font-semibold md:w-60">
                {formatDate(String(jobExperienceData?.year_started)) ||
                  "No start year"}{" "}
                -{" "}
                {jobExperienceData?.year_ended === "1960-01-01"
                  ? "Present"
                  : formatDate(String(jobExperienceData?.year_ended)) ||
                    "Present"}
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
            candidate.job_experience.map(
              (job) =>
                job.job_summary ? (
                  <div key={job.id}>
                    <p className="mb-3">{job.job_summary}</p>
                    <CopyIcon
                      size={16}
                      cursor="pointer"
                      onClick={() => copyToClipboard(job.job_summary, toast)}
                    />
                  </div>
                ) : null // Don't render anything if job_summary is empty
            )
          ) : (
            <span className="flex gap-4 items-center">
              <p>No job summary provided</p>
            </span>
          )}
        </div>
      </div>

      <hr className="w-full h-2 my-8" />

      {/* RECOMMENDER DETAILS */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-red">
          Recommender Details
        </h3>
        <div className="space-y-4 m-4">
          {candidate?.recommenders?.map((referee, index) => (
            <div key={index}>
              <CopyText
                label="Recommender Type"
                text={referee.recommender_type}
                className="text-blue-500"
              />
              <div className="flex justify-between items-center flex-wrap">
                <CopyText label="Recommender Name" text={referee.full_name} />
                <CopyText
                  label="Recommender Relationship"
                  text={referee.relationship}
                />
                <CopyText label="Email" text={referee.email} />
                <CopyText label="Phone Number" text={referee.phone_number} />
                <CopyText label="Organization" text={referee.organization} />
                <CopyText label="Job Title" text={referee.job_title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="w-full h-2 my-8" />

      {/* LOAN REFERREES */}
      <div>
        <h3 className="font-semibold text-lg mb-4">LOAN REFEREES</h3>
        <div className="space-y-4 m-4">
          {candidate?.loan_referees?.map((referee, index) => (
            <div
              key={index}
              className="flex justify-between items-center flex-wrap"
            >
              <CopyText label="Referee Name" text={referee.name} />
              <CopyText label="Relationship" text={referee.relationship} />
              <CopyText label="Email" text={referee.email} />
              <CopyText label="Phone Number" text={referee.phone_number} />
            </div>
          ))}
        </div>
      </div>

      <hr className="w-full h-2 my-8" />

      {/* VERIFICATION DOCUMENTS */}
      <div>
        <h3 className="font-semibold text-lg mb-4">VERIFICATION DOCUMENTS</h3>
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
    </AdminLayout>
  );
};

export default CandidatePage;
