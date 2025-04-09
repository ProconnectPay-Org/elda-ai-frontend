import { useParams } from "react-router-dom";
import FinalResumeSkeleton from "@/components/FinalResumeSkeleton";
import { useCandidates } from "@/hooks/useCandidiates";
import {
  AdvancedEducation,
  CandidateCareer,
  CareerInterest,
  EducationHistory,
  JobExperience,
} from "@/types";
import {
  formatDate,
  formatMonthDay,
  getCountryNameFromISO,
  getDemonymFromISO,
} from "@/lib/utils";
import "../index.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const processJobExperiences = (formData: any) => {
  return formData.job_experience
    .sort((a: JobExperience, b: JobExperience) => a.id - b.id)
    .slice(0, 3);
};

const manageCookies = (jobExperiences: JobExperience[]) => {
  jobExperiences.forEach((job, index) => {
    Cookies.set(`work_experience_id${index + 1}`, String(job.id), {
      expires: 7,
    });
  });
};

const manageAdvancedEducationCookies = (educationData: AdvancedEducation[]) => {
  if (educationData.length > 0) {
    const sortedAdvancedEducation = educationData.sort((a, b) => a.id - b.id);

    Cookies.set(
      "advanced_education1_id",
      String(sortedAdvancedEducation[0].id),
      {
        expires: 7,
      }
    );
  } else {
    Cookies.remove("advanced_education1_id");
  }
};

const retrieveAdvancedEducationFromCookies = (formData: any) => {
  const advancedEducationIdFromCookie = Cookies.get("advanced_education1_id");

  if (!advancedEducationIdFromCookie) return null;

  const matchedEducation = formData?.advanced_education?.find(
    (edu: AdvancedEducation) => String(edu.id) === advancedEducationIdFromCookie
  );

  return matchedEducation || null;
};

const retrieveJobsFromCookies = (formData: any) => {
  const workExperienceIdsFromCookies = [
    Cookies.get("work_experience_id1"),
    Cookies.get("work_experience_id2"),
    Cookies.get("work_experience_id3"),
  ].filter(Boolean);

  const retrievedIds =
    formData?.job_experience?.map((job: JobExperience) => job.id) || [];

  return retrievedIds
    .filter((id: string) => workExperienceIdsFromCookies.includes(String(id)))
    .sort((a: any, b: any) => a - b);
};

const ResumePdf = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const {
    singleCandidate: formData,
    singleCandidateLoading,
    singleCandidateError,
  } = useCandidates(id);

  const [myJobs, setMyJobs] = useState<JobExperience[]>([]);
  const [selectedEducation, setSelectedEducation] =
    useState<AdvancedEducation | null>(null);

  useEffect(() => {
    if (formData) {
      const sortedJobExperiences = processJobExperiences(formData);

      manageCookies(sortedJobExperiences);

      const matchingSortedIds = retrieveJobsFromCookies(formData);

      const jobExperiences = formData.job_experience
        ?.filter((job: JobExperience) => matchingSortedIds.includes(job.id))
        .sort(
          (a: JobExperience, b: JobExperience) =>
            matchingSortedIds.indexOf(a.id) - matchingSortedIds.indexOf(b.id)
        );

      setMyJobs(jobExperiences);

      // Process advanced education
      if (formData?.advanced_education?.length) {
        manageAdvancedEducationCookies(formData.advanced_education);
      }
      const matchedEducation = retrieveAdvancedEducationFromCookies(formData);
      setSelectedEducation(matchedEducation);
    }
  }, [formData]);

  if (singleCandidateLoading) {
    return <FinalResumeSkeleton />;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  const businessNameWithCurrentJob =
    myJobs?.find((job: JobExperience) => job.job_status === "current")
      ?.job_title || "No current job";

  return (
    <div className="resume-class">
      <div className="resume-flex-container">
        <h1 className="resume-username">
          <span>{formData?.first_name}</span>
          <span>&nbsp;</span> {/* Explicit space */}
          <span>{formData?.middle_name}</span>
          <span>&nbsp;</span> {/* Explicit space */}
          <span>{formData?.last_name}</span>
        </h1>
        <div className="flex-items-center-gap-3 flex-wrap justify-center">
          <div className="flex items-center justify-center gap-1">
            ✉️
            <p className="text-sm text-blue">
              {formData?.email_address || formData?.user?.email}
            </p>
          </div>
          <p className="font-semibold">|</p>
          <div className="flex items-center justify-center gap-1">
            📞
            <p className="text-sm">{formData?.phone_number}</p>
          </div>
          <p className="font-semibold">|</p>
          <div className="flex items-center justify-center gap-1">
            🌎
            <p className="text-sm">
              {formData?.city_current_reside}, {formData?.state_current_reside}{" "}
              State, {getCountryNameFromISO(formData?.country_of_birth)}
            </p>
          </div>
        </div>

        <div className="flex-items-center-gap-3">
          <p className="small-bold">{formData?.career[0].profession}</p>
          <p className="font-semibold">|</p>
          <p className="small-bold">Global Citizen</p>
          <p className="font-semibold">|</p>
          <p className="small-bold">{businessNameWithCurrentJob}</p>
        </div>
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">CAREER STRATEGIC PURPOSE</h2>
        <p className="text-sm text-justify">
          {formData?.career_strategic_purpose || "Not Generated yet"}
        </p>
      </div>

      {/* PERSONAL DETAILS */}
      <div className="resume-inner-container">
        <h2 className="resume-title-text">PERSONAL BIODATA</h2>
        <div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Date of Birth:</p>
            <p className="width-200-text-sm">
              {formatMonthDay(formData?.birth_date || "")}
            </p>
          </div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Gender:</p>
            <p className="width-200-text-sm">{formData?.gender}</p>
          </div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Nationality:</p>
            <p className="width-200-text-sm">
              {getDemonymFromISO(formData?.country_of_birth)}
            </p>
          </div>
          <div className="flex">
            <p className="font-bold width-200-text-sm">Interests:</p>
            <p className="text-sm">
              {formData?.career
                ?.flatMap((item: CandidateCareer) =>
                  item.career_interests
                    .slice(0, 3)
                    .map((interest: CareerInterest) => interest.name)
                )
                .join(", ") || "Not Provided"}
            </p>
          </div>

          <div className="flex">
            <p className="font-bold width-200-text-sm">Preferred Call Name:</p>
            <p className="width-200-text-sm capitalize">
              {formData?.preferred_call_name || "Not Provided"}
            </p>
          </div>
        </div>
      </div>

      {/* WORK EXPERIENCE */}
      <div className="resume-inner-container">
        <h2 className="resume-title-text">WORK EXPERIENCE</h2>
        {myJobs
          .filter((job: JobExperience) => job.business_name)
          .slice(0, formData?.career?.[0]?.jobs_to_show || 3)
          .map((experience: JobExperience) => (
            <div key={experience.id} className="mb-2">
              <div>
                <p className="font-bold text-sm">
                  {experience.business_name}: {experience.job_title}
                </p>
                <div className="flex-items-center-gap-3">
                  <p className="font-medium text-sm">
                    📍 Location: {experience.state}, {experience.country}
                  </p>
                  <p className="font-semibold">|</p>
                  <p className="font-medium text-sm">
                    📅 Duration: {formatDate(experience.year_started)} -{" "}
                    {experience.year_ended === "1960-01-01"
                      ? "Till Date"
                      : formatDate(experience.year_ended) || "Till Date"}
                  </p>
                </div>
              </div>
              <div className="">
                <p className="text-red font-bold text-sm">
                  Job Description and Key Achievements
                </p>
                <p className="text-sm text-justify">{experience.job_summary}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">EDUCATION AND TRAINING</h2>
        {formData?.education?.map((item: EducationHistory) => (
          <div key={item.id} className="my-1">
            <p className="capitalize small-bold">
              {item.degree_type} ({item.specific_course_of_study}){" "}
            </p>
            <div className="text-sm flex-items-center-gap-3">
              {item.school_name}, {getCountryNameFromISO(item.country)}{" "}
              <p className="font-semibold">|</p>
              <p className="font-semibold">
                Graduated {formatDate(String(item.graduation_date))}
              </p>
            </div>
          </div>
        ))}

        {/* ADVANCED EDUCATION */}
        {formData?.education[0]?.has_advanced_degree && selectedEducation && (
          <div>
            <div className="font-semibold flex-items-center-gap-3 text-sm capitalize">
              {selectedEducation.advanced_degree_type} (
              {selectedEducation.graduate_type})
              <p className="font-semibold">|</p>
              Graduated {formatDate(String(selectedEducation.graduation_date))}
            </div>
            <p className="text-sm">
              {selectedEducation.school_name},{" "}
              {getCountryNameFromISO(selectedEducation.country)}
            </p>
          </div>
        )}
      </div>

      <div className="resume-inner-container">
        <h2 className="resume-title-text">REFERENCES</h2>
        <p className="text-sm">Available on request</p>
      </div>
    </div>
  );
};

export default ResumePdf;
