import { getErrorMessage } from "@/lib/utils";
import { EducationHistory, Step2FormData } from "@/types";
import { useFormContext, useWatch } from "react-hook-form";
import CountrySelect from "@/components/CountrySelect";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchEducationData,
  submitEducationDetails,
} from "@/lib/actions/candidate.actions";
import Cookies from "js-cookie";
import AdvancedDegree from "@/components/AdvancedDegree";
import { degreeOptions } from "@/constants";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const EducationDetails = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    control,
    getValues,
  } = useFormContext<Step2FormData>();
  const educationId = Cookies.get("education_id");

  const { isLoading: isEducationLoading, data } = useQuery({
    queryKey: ["educationData", educationId],
    queryFn: fetchEducationData,
    staleTime: 5 * 1000,
    enabled: !!educationId,
  });

  const id = Cookies.get("candidate_id");

  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Watch form values
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (data) {
      setValue("currentStatus", data.current_status || "");
      setValue("degreeType", data.degree_type || "");
      setValue("countryOfEducation", data.country || "");
      setValue("courseOfStudy", data.specific_course_of_study || "");
      setValue("institutionName", data.school_name || "");
      setValue("degreeClass", data.class_of_degree || "");
      setValue("currentCGPA", data.specific_cgpa || "");
      setValue("yearAdmitted", data.admission_date || "");
      setValue("yearGraduated", data.graduation_date || "");
      setValue("advancedDegree", data.has_advanced_degree ? "yes" : "no");
    }
  }, [data, setValue]);

  useEffect(() => {
    if (data) {
      // Define the type for initialValues explicitly
      const initialValues: Record<keyof typeof watchedValues, string> = {
        currentStatus: data.current_status || "",
        degreeType: data.degree_type || "",
        countryOfEducation: data.country || "",
        courseOfStudy: data.specific_course_of_study || "",
        institutionName: data.school_name || "",
        degreeClass: data.class_of_degree || "",
        currentCGPA: data.specific_cgpa || "",
        yearAdmitted: data.admission_date || "",
        yearGraduated: data.graduation_date || "",
        advancedDegree: data.has_advanced_degree ? "yes" : "no",
      };

      // Ensure keys match the watchedValues keys
      const hasChanges = (
        Object.keys(initialValues) as Array<keyof typeof initialValues>
      ).some((key) => watchedValues[key] !== initialValues[key]);

      setIsModified(hasChanges);
    }
  }, [watchedValues, data]);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const educationData: EducationHistory = {
      current_status: getValues("currentStatus"),
      degree_type: getValues("degreeType"),
      country: getValues("countryOfEducation"),
      school_name: getValues("institutionName"),
      specific_course_of_study: getValues("courseOfStudy"),
      class_of_degree: getValues("degreeClass"),
      specific_cgpa: getValues("currentCGPA"),
      graduation_date: getValues("yearGraduated"),
      admission_date: getValues("yearAdmitted"),
      has_advanced_degree: getValues("advancedDegree"),
      candidate: id,
    };

    try {
      await submitEducationDetails(educationData);
      toast({
        variant: "success",
        title: "Success",
        description: "Updated successfully!",
      });
      setIsModified(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasAdvancedDegree = watch("advancedDegree") === "yes";

  const inputClass =
    "border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 bg-white pr-8";
  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  const svgSpan = (
    <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </span>
  );

  const isLoading = isEducationLoading;

  return (
    <div className="flex flex-col gap-10">
      {isLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}

      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <div className={outerDivClass}>
            <div className={divClass}>
              <label htmlFor="currentStatus">
                Current Status <span className="text-red">*</span>
              </label>
              <div className="relative">
                <select
                  className={inputClass}
                  id="currentStatus"
                  {...register("currentStatus")}
                >
                  <option value="">Select status</option>
                  <option value="student">Student</option>
                  <option value="graduate">Graduate</option>
                </select>
                {svgSpan}
              </div>
              {errors.currentStatus && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.currentStatus)}
                </span>
              )}
            </div>
            <div className={divClass}>
              <label htmlFor="degreeType">
                Degree Type <span className="text-red">*</span>
              </label>
              <div className="relative">
                <select
                  className={inputClass}
                  id="degreeType"
                  {...register("degreeType")}
                >
                  {degreeOptions.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                  <option value="Higher National Diploma">
                    Higher National Diploma
                  </option>
                </select>
                {svgSpan}
              </div>
              {errors.degreeType && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.degreeType)}
                </span>
              )}
            </div>
          </div>

          <div className={outerDivClass}>
            <CountrySelect
              label="Country"
              name="countryOfEducation"
              smallText="location of the school you attended"
            />
            <div className={divClass}>
              <label htmlFor="courseOfStudy">
                Specific Course of study (Computer science, Electrical
                engineering) <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
                id="courseOfStudy"
                {...register("courseOfStudy")}
                placeholder="Enter your course of study"
              />
              <p className="text-xs text-gray-text">write in full</p>
              {errors.courseOfStudy && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.courseOfStudy)}
                </span>
              )}
            </div>
          </div>

          <div className={outerDivClass}>
            <div className={divClass}>
              <label htmlFor="institutionName">
                Name of Tertiary Institution attended{" "}
                <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
                id="institutionName"
                {...register("institutionName")}
                placeholder="Enter the name of institution"
              />
              <p className="text-xs text-gray-text">write in full</p>
              {errors.institutionName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.institutionName)}
                </span>
              )}
            </div>
            <div className={divClass}>
              <label htmlFor="degreeClass">
                Class of Degree <span className="text-red">*</span>
              </label>
              <div className="relative">
                <select
                  className={inputClass}
                  id="degreeClass"
                  {...register("degreeClass")}
                >
                  <option value="">Select class of degree</option>
                  <option value="first_class">First Class</option>
                  <option value="second_class">Second Class</option>
                  <option value="third_class">Third Class</option>
                  <option value="no_class">No Class</option>
                  <option value="other">Other</option>
                </select>
                {svgSpan}
              </div>
              <p className="text-xs text-gray-text">
                select your class of degree you graduated with
              </p>
              {errors.degreeClass && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.degreeClass)}
                </span>
              )}
            </div>
          </div>

          <div className={outerDivClass}>
            <div className={divClass}>
              <label htmlFor="currentCGPA">
                Specific CGPA (e.g 3.5/5.0) <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
                id="currentCGPA"
                {...register("currentCGPA")}
                placeholder="Enter your current CGPA"
              />
              {errors.currentCGPA && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.currentCGPA)}
                </span>
              )}
            </div>
            <div className={divClass}>
              <label htmlFor="yearAdmitted">
                Year Admitted <span className="text-red">*</span>
              </label>
              <input
                className={`${inputClass} pr-1`}
                id="yearAdmitted"
                type="date"
                {...register("yearAdmitted")}
                placeholder="Enter the year you were admitted"
              />
              {errors.yearAdmitted && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.yearAdmitted)}
                </span>
              )}
            </div>
          </div>

          <div className={outerDivClass}>
            <div className={divClass}>
              <label htmlFor="yearGraduated">
                Year Graduated <span className="text-red">*</span>
              </label>
              <input
                className={`${inputClass} pr-1`}
                id="yearGraduated"
                type="date"
                {...register("yearGraduated")}
                placeholder="Enter the year you graduated"
              />
              {errors.yearGraduated && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.yearGraduated)}
                </span>
              )}
            </div>
            <div className={divClass}>
              <label htmlFor="advancedDegree">
                Do you have an advanced degree?{" "}
                <span className="text-red">*</span>
              </label>
              <div className="relative">
                <select
                  className={inputClass}
                  id="advancedDegree"
                  {...register("advancedDegree")}
                  // onChange={handleAdvancedDegreeChange}
                >
                  <option value="">Select one</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {svgSpan}
              </div>
              {errors.advancedDegree && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.advancedDegree)}
                </span>
              )}
            </div>
          </div>

          <div className="w-full">
            <Button
              className={`bg-red w-full ${
                !isModified || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSave}
              disabled={!isModified || loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {hasAdvancedDegree && <AdvancedDegree />}
    </div>
  );
};

export default EducationDetails;
