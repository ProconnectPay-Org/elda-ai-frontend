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

  if (singleCandidateLoading) {
    return <FinalResumeSkeleton />;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="border md:min-w-[484px] space-y-5 pb-5 max-w-[800px] mx-auto min-h-svh rounded-lg overflow-hidden">
      {" "}
      <div className="bg-[#F1F8F9] p-5 w-full flex flex-col items-center gap-3">
        <h1 className="font-bold underline text-lg uppercase">
          {formData?.user?.full_name}
        </h1>
        <div className="flex items-center flex-wrap justify-center gap-3">
          <div>
            <img src="" alt="" />
            <p className="text-xs md:text-sm">{formData?.user?.email}</p>
          </div>
          <div>
            <img src="" alt="" />
            <p className="text-xs md:text-sm">{formData?.phone_number}</p>
          </div>
          <div>
            <img src="" alt="" />
            <p className="text-xs md:text-sm">
              {formData?.city_current_reside}, {formData?.state_of_birth}{" "}
              {formData?.country_of_birth}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {formData?.career.map((item: CandidateCareer, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <p className="text-sm font-semibold">{item.profession}</p>
              <hr className="h-4 w-[2px] bg-black" />
              {item.career_interests.map(
                (interest: CareerInterest, interestIndex: number) => (
                  <div key={interest.id} className="flex items-center gap-3">
                    <p className="text-sm font-semibold">{interest.name}</p>
                    {interestIndex < item.career_interests.length - 1 && (
                      <hr className="h-4 w-[2px] bg-black" />
                    )}
                  </div>
                )
              )}
              {index < formData.career.length - 1 && (
                <hr className="h-4 w-[2px] bg-black" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 px-5 w-full">
        <h2 className="text-[#102694] font-bold text-lg">
          CAREER STRATEGIC PURPOSE
        </h2>
        <p className="text-sm">
          {formData?.career_strategic_purpose ||
            formData?.sop?.[0]?.text ||
            "Not Provided"}
        </p>
      </div>
      <div className="space-y-2 px-5 w-full">
        <h2 className="text-[#102694] font-bold text-lg">BIODATA</h2>
        <div>
          <div className="flex">
            <p className="font-medium w-[200px]">Date of Birth:</p>
            <p className="font-medium w-[200px]">{formData?.birth_date}</p>
          </div>
          <div className="flex">
            <p className="font-medium w-[200px]">Gender:</p>
            <p className="font-medium w-[200px]">{formData?.gender}</p>
          </div>
          <div className="flex">
            <p className="font-medium w-[200px]">Nationality:</p>
            <p className="font-medium w-[200px]">
              {formData?.country_of_birth}
            </p>
          </div>
          <div className="flex">
            <p className="font-medium w-[200px]">Interests:</p>
            <p className="font-medium">
              {formData?.career
                ?.flatMap((item: CandidateCareer) =>
                  item.career_interests.map(
                    (interest: CareerInterest) => interest.name
                  )
                )
                .join(", ") || "Not Provided"}
            </p>
          </div>

          <div className="flex">
            <p className="font-medium w-[200px]">Preferred Call Name:</p>
            <p className="font-medium w-[200px]">
              {formData?.preferred_call_name || "Not Provided"}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 px-5 w-full">
        <h2 className="text-[#102694] font-bold text-lg">WORK EXPERIENCE</h2>
        {formData?.job_experience?.map((experience: JobExperience) => (
          <div key={experience.id}>
            <div>
              <p className="font-bold">
                {experience.business_name} - {experience.job_title}
              </p>
              <div className="flex gap-3 items-center">
                <p className="font-medium">
                  Location: {experience.state}, {experience.country}
                </p>
                <hr className="h-4 w-[2px] bg-black" />
                <p className="font-medium">
                  Duration: {experience.year_started} - {experience.year_ended}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-red font-bold">
                JOB DESCRIPTION AND KEY ACHIEVEMENT(S)
              </p>
              <p className="text-sm font-semibold">
                {experience.company_description}
              </p>
              <p className="text-sm">{experience.job_summary}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-1 px-5 w-full">
        <h2 className="text-[#102694] font-bold text-lg">
          TRAININGS AND EDUCATION
        </h2>
        {formData?.education?.map((item: EducationHistory) => (
          <div key={item.id}>
            <p className="font-semibold capitalize">
              {item.degree_type} ({item.specific_course_of_study}){" "}
              {item.year_graduated}
            </p>
            <p className="text-sm">
              {item.school_name}, {item.country}
            </p>
          </div>
        ))}
        {formData?.advanced_education?.map((item: AdvancedEducation) =>
          item.year_admitted === null ? (
            ""
          ) : (
            <div key={item.id}>
              <p className="font-semibold capitalize">
                {item.advanced_degree_type} ({item.graduate_type}){" "}
                {item.year_graduated}
              </p>
              <p className="text-sm">
                {item.school_name}, {item.country}
              </p>
            </div>
          )
        )}
      </div>
      <div className="px-5 w-full">
        <h2 className="text-[#102694] font-bold text-lg">REFERENCES</h2>
        <p className="text-sm">Available on request</p>
      </div>
    </div>
  );
};

export default ResumePdf;
