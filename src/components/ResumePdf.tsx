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
import { getCountryNameFromISO } from "@/lib/utils";
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

  console.log(formData);

  if (singleCandidateLoading) {
    return <FinalResumeSkeleton />;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="border md:min-w-[484px] space-y-4 pb-5 max-w-[800px] mx-auto min-h-svh rounded-lg overflow-hidden">
      <div className="bg-[#F1F8F9] p-5 w-full flex flex-col items-center gap-3">
        <h1 className="font-bold text-4xl uppercase">
          {formData?.first_name} {formData?.middle_name} {formData?.last_name}
        </h1>
        <div className="flex items-center flex-wrap justify-center gap-3">
          <p className="text-sm text-blue-900">{formData?.email_address}</p>
          <hr className="h-4 w-[2px] bg-black" />
          <p className="text-sm">{formData?.phone_number}</p>
          <hr className="h-4 w-[2px] bg-black" />
          <div>
            <p className="text-sm">
              {formData?.city_of_birth}, {formData?.state_of_birth} State,{" "}
              {getCountryNameFromISO(formData?.country_of_birth)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold">{formData?.career[0].sector}</p>
          <hr className="h-4 w-[2px] bg-black" />
          <p className="text-sm font-semibold">
            {formData?.career[0].profession}
          </p>
          <hr className="h-4 w-[2px] bg-black" />
          <p className="text-sm font-semibold">Global Citizen</p>
          <hr className="h-4 w-[2px] bg-black" />
          <p className="text-sm font-semibold">
            {formData?.job_experience[0].job_title}
          </p>
        </div>
      </div>

      <div className="px-5 w-full">
        <h2 className="text-[#102694] font-bold text-base">
          CAREER STRATEGIC PURPOSE
        </h2>
        <p className="text-sm">
          {formData?.career_strategic_purpose ||
            formData?.sop?.[0]?.text ||
            "Not Provided"}
        </p>
      </div>

      <div className="px-5 w-full">
        <h2 className="text-[#102694] font-bold text-base">PERSONAL BIODATA</h2>
        <div>
          <div className="flex">
            <p className="font-bold w-[200px] text-sm">Date of Birth:</p>
            <p className="w-[200px] text-sm">{formData?.birth_date}</p>
          </div>
          <div className="flex">
            <p className="font-bold w-[200px] text-sm">Gender:</p>
            <p className="w-[200px] text-sm">{formData?.gender}</p>
          </div>
          <div className="flex">
            <p className="font-bold w-[200px] text-sm">Nationality:</p>
            <p className="w-[200px] text-sm">
              {getCountryNameFromISO(formData?.country_of_birth)}
            </p>
          </div>
          <div className="flex">
            <p className="font-bold w-[200px] text-sm">Interests:</p>
            <p className="text-sm">
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
            <p className="font-bold w-[200px] text-sm">Preferred Call Name:</p>
            <p className="w-[200px] text-sm capitalize">
              {formData?.preferred_call_name || "Not Provided"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 w-full">
        <h2 className="text-[#102694] font-bold text-base">WORK EXPERIENCE</h2>
        {formData?.job_experience?.map((experience: JobExperience) => (
          <div key={experience.id}>
            <div>
              <p className="font-bold text-sm">
                {experience.business_name}: {experience.job_title}
              </p>
              <div className="flex gap-3 items-center">
                <p className="font-medium text-sm">
                  Location: {experience.state}, {experience.country}
                </p>
                <hr className="h-4 w-[2px] bg-black" />
                <p className="font-medium text-sm">
                  Duration: {experience.year_started} - {experience.year_ended}
                </p>
              </div>
            </div>
            <div className="">
              <p className="text-red font-bold text-sm">
                Job Description and Key Achievements
              </p>
              <p className="text-sm">{experience.job_summary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 w-full">
        <h2 className="text-[#102694] font-bold text-base">
          EDUCATION AND TRAINING
        </h2>
        {formData?.education?.map((item: EducationHistory) => (
          <div key={item.id}>
            <p className="font-semibold capitalize text-sm">
              {item.degree_type} ({item.specific_course_of_study}){" "}
            </p>
            <p className="text-sm flex gap-2 items-center">
              {item.school_name}, {getCountryNameFromISO(item.country)}{" "}
              <hr className="h-4 w-[2px] bg-black" />
              Graduated {item.year_graduated}
            </p>
          </div>
        ))}
        {formData?.advanced_education?.map((item: AdvancedEducation) =>
          item.year_admitted === null ? (
            ""
          ) : (
            <div key={item.id}>
              <p className="font-semibold flex gap-2 text-sm capitalize">
                {item.advanced_degree_type} ({item.graduate_type}){" "}
                <hr className="h-4 w-[2px] bg-black" />
                Graduated {item.year_graduated}
              </p>
              <p className="text-sm">
                {item.school_name}, {getCountryNameFromISO(item.country)}
              </p>
            </div>
          )
        )}
      </div>

      <div className="px-5 w-full">
        <h2 className="text-[#102694] font-bold text-base">REFERENCES</h2>
        <p className="text-sm">Available on request</p>
      </div>
    </div>
  );
};

export default ResumePdf;
