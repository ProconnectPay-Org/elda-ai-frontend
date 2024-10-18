import { ResumeStep2FormData } from "@/types";
import { getErrorMessage } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { genderOptions } from "@/constants";
import { useEffect, useState } from "react";
import { fetchCareerData, getStaffDetails } from "@/lib/actions/staff.actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const BioData = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeStep2FormData>();
  const { id } = useParams<{ id: string }>();
  const [callName, setCallName] = useState("");
  const [foundCandidate, setFoundCandidate] =
    useState<ResumeStep2FormData | null>(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ["staffCandidateDetails", id],
    queryFn: getStaffDetails,
    staleTime: 5 * 1000,
  });

  const { isLoading: careerLoading, data: careerData } = useQuery({
    queryKey: ["fetchCareerData", foundCandidate?.career[0]],
    queryFn: () => fetchCareerData(foundCandidate?.career[0]),
    enabled: !!foundCandidate?.career[0],
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      const candidate = data.staff_candidates.find(
        (candidate: ResumeStep2FormData) => String(candidate.id) === String(id)
      );
      setFoundCandidate(candidate || null);
      if (candidate) {
        setValue("gender", candidate.gender || "");
        setValue("dateOfBirth", candidate.birth_date || "");
        setValue("nationality", candidate.city_current_reside || "");
        setCallName(candidate.preferred_call_name);
      }
    }
  }, [data, id, setValue]);

  useEffect(() => {
    if (careerData) {
      const careerInterestsString =
        careerData.career_interests
          ?.map((interest: { id: string; name: string }) => interest.name)
          .join(", ") || "";
      setValue("interest", careerInterestsString);
    }
  }, [careerData, setValue]);

  if (isLoading || careerLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p>PREFERRED CALL NAME: {callName}</p>
      </div>
      <div className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="gender" className="text-[#344054]">
                Gender <span className="text-red">*</span>
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="border border-gray-border h-[42px] rounded-full py-2 px-4"
              >
                <option value="">Select your gender</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.gender)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="dateOfBirth" className="text-[#344054]">
                Date of Birth <span className="text-red">*</span>
              </label>
              <input
                type="date"
                className="border border-gray-border h-[42px] rounded-full py-2 px-4"
                id="dateOfBirth"
                {...register("dateOfBirth")}
                placeholder="Enter your date of birth"
              />
              {errors.dateOfBirth && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.dateOfBirth)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="nationality" className="text-[#344054]">
                Nationality
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="nationality"
                {...register("nationality")}
                placeholder="Nigerian"
              />
              {errors.nationality && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.nationality)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="interest" className="text-[#344054]">
                Interest
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="interest"
                {...register("interest")}
              />
              {errors.interest && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.interest)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioData;
