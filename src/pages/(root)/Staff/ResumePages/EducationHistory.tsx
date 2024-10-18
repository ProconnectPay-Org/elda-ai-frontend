import {
  fetchEducationData,
  getStaffDetails,
} from "@/lib/actions/staff.actions";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep3FormData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";

const EducationHistory = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeStep3FormData>();

  const { id } = useParams<{ id: string }>();
  const [foundCandidate, setFoundCandidate] =
    useState<ResumeStep3FormData | null>(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ["staffCandidateDetails", id],
    queryFn: getStaffDetails,
    staleTime: 5 * 1000,
  });

  const { isLoading: educationLoading, data: educationData } = useQuery({
    queryKey: ["fetchEducationData", foundCandidate?.education[0]],
    queryFn: () => fetchEducationData(foundCandidate?.education[0]),
    enabled: !!foundCandidate?.education[0],
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    if (data) {
      const candidate = data.staff_candidates.find(
        (candidate: ResumeStep3FormData) => String(candidate.id) === String(id)
      );
      setFoundCandidate(candidate || null);
      if (foundCandidate) {
        setValue("city", foundCandidate.city_current_reside || "");
        setValue("state", foundCandidate.state_of_birth || "");
      }
    }
  }, [data, id, setValue, foundCandidate]);

  useEffect(() => {
    if (educationData) {
      setValue("degree", educationData.degree_type || "");
      setValue("kindOfDegree", educationData.degree_type || "");
      setValue("tertiaryInstitutionAttended", educationData.school_name || "");
      setValue("country", educationData.country || "");
      setValue("course", educationData.specific_course_of_study || "");
      setValue("startDate", String(educationData.year_admitted) || "");
      setValue("endDate", String(educationData.year_graduated) || "");
    }
  }, [educationData, setValue]);

  if (isLoading || educationLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const degreeTypes = ["bachelor", "master", "phd"];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-[#344054]">
          What degrees do you have?
        </label>
        <select
          id="degree"
          {...register("degree")}
          className="border capitalize border-gray-border rounded-full w-full block h-[42px] py-2 px-4"
        >
          <option value="">Select your degree type</option>
          {degreeTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-xs text-[#667085]">Choose the correct degree type</p>
      </div>
      <div className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <h3 className="font-bold mb-4 text-lg">Eductaion Information</h3>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="kindOfDegree" className="text-[#344054]">
                Kind of Degree
              </label>
              <input
                className="border capitalize border-gray-border rounded-full py-2 px-4"
                id="kindOfDegree"
                {...register("kindOfDegree")}
                placeholder="Master of Science"
              />
              {errors.kindOfDegree && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.kindOfDegree)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label
                htmlFor="tertiaryInstitutionAttended"
                className="text-[#344054]"
              >
                Tertiary Institution Attended
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="tertiaryInstitutionAttended"
                {...register("tertiaryInstitutionAttended")}
              />
              {errors.tertiaryInstitutionAttended && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.tertiaryInstitutionAttended)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="city" className="text-[#344054]">
                City
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="city"
                {...register("city")}
                placeholder="Enter your city"
              />
              {errors.city && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.city)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="state" className="text-[#344054]">
                State
              </label>
              <input
                type="text"
                {...register("state")}
                className="border border-gray-border rounded-full h-[42px] py-2 px-4"
              />
              {errors.state && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.state)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="country" className="text-[#344054]">
                Country
              </label>
              <input
                type="text"
                {...register("country")}
                className="border border-gray-border rounded-full h-[42px] py-2 px-4"
              />
              {errors.country && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.country)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="course" className="text-[#344054]">
                Course Studied
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="course"
                {...register("course")}
              />
              {errors.course && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.course)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="startDate" className="text-[#344054]">
                Start Date
              </label>
              <input
                type="text"
                className="border border-gray-border h-[42px] rounded-full py-2 px-4"
                id="startDate"
                {...register("startDate")}
              />
              {errors.startDate && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.startDate)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="endDate" className="text-[#344054]">
                End Date
              </label>
              <input
                type="text"
                className="border border-gray-border h-[42px] rounded-full py-2 px-4"
                id="endDate"
                {...register("endDate")}
              />
              {errors.endDate && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.endDate)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationHistory;
