import { useCandidates } from "@/hooks/useCandidiates";
import {
  formatDate,
  getCountryNameFromISO,
  getErrorMessage,
} from "@/lib/utils";
import { ResumeStep3FormData } from "@/types";
import { useEffect } from "react";
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
  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  useEffect(() => {
    if (singleCandidate) {      
      const foundCandidate = singleCandidate;
      setValue("city", foundCandidate.city_current_reside || "");
      setValue("state", foundCandidate.state_of_birth || "");
      setValue(
        "country",
        getCountryNameFromISO(foundCandidate.country_of_birth) || ""
      );
      setValue("degree", foundCandidate.education[0].degree_type || "");
      setValue("classOfDegree", foundCandidate.education[0].class_of_degree || "");
      setValue("kindOfDegree", foundCandidate.education[0].degree_type || "");
      setValue(
        "tertiaryInstitutionAttended",
        foundCandidate.education[0].school_name || ""
      );
      setValue(
        "course",
        foundCandidate.education[0].specific_course_of_study || ""
      );
      setValue(
        "startDate",
        formatDate(foundCandidate.education[0].admission_date) || ""
      );
      setValue(
        "endDate",
        formatDate(foundCandidate.education[0].graduation_date) || ""
      );
    }
  }, [singleCandidate, id, setValue]);

  if (singleCandidateLoading) {
    return <div>Loading...</div>;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  // const degreeTypes = ["bachelor", "master", "phd"];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-[#344054]">
          What degrees do you have?
        </label>
        <input
          id="degree"
          {...register("degree")}
          placeholder="Enter a degree type..."
          className="border capitalize border-gray-border rounded-md w-full block h-[42px] py-2 px-4"
          disabled
        >
          {/* <option value="">Select your degree type</option>
          {degreeTypes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))} */}
        </input>
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
                className="border capitalize border-gray-border rounded-md py-2 px-4"
                id="kindOfDegree"
                {...register("kindOfDegree")}
                placeholder="Master of Science"
                disabled
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
                className="border border-gray-border rounded-md py-2 px-4"
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
                className="border border-gray-border rounded-md py-2 px-4"
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
                className="border border-gray-border bg-white rounded-md h-[42px] py-2 px-4"
                disabled
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
                className="border border-gray-border bg-white rounded-md h-[42px] py-2 px-4"
                disabled
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
                className="border border-gray-border rounded-md py-2 px-4"
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
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="startDate"
                {...register("startDate")}
                disabled
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
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="endDate"
                {...register("endDate")}
                disabled
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
