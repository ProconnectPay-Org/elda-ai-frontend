import { formatDate, getErrorMessage } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import { AdvancedEducation, Step2FormData } from "@/types";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAdvancedDegree,
  updateAdvancedDegree,
} from "@/lib/actions/candidate.actions";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { degreeOptions } from "@/constants";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const AdvancedDegree = () => {
  const {
    register,
    setValue,
    formState: { errors },
    control,
    getValues,
  } = useFormContext<Step2FormData>();
  const advancedId = Cookies.get("advanced_education1_id");

  const { isLoading: isAdvancedLoading, data: advancedDegreeData } = useQuery({
    queryKey: ["advancedDegreeData", advancedId],
    queryFn: getAdvancedDegree,
    staleTime: 5 * 60 * 1000,
    enabled: !!advancedId,
  });

  const id = Cookies.get("candidate_id");

  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Watch form values
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (advancedDegreeData) {
      setValue(
        "advancedDegreeType",
        advancedDegreeData.advanced_degree_type || ""
      );
      setValue("graduateType", advancedDegreeData.graduate_type || "");
      setValue("advancedCountry", advancedDegreeData.country || "");
      setValue("advancedDegreeClass", advancedDegreeData.class_of_degree || "");
      setValue("advancedInstitutionName", advancedDegreeData.school_name || "");
      setValue("advancedCurrentCGPA", advancedDegreeData.specific_cgpa || "");
      setValue("advancedYearAdmitted", advancedDegreeData.admission_date || "");
      setValue(
        "advancedYearGraduated",
        advancedDegreeData.graduation_date || ""
      );
    }
  }, [advancedDegreeData, setValue]);

  useEffect(() => {
    if (advancedDegreeData) {
      // Define the type for initialValues explicitly
      const initialValues: Record<keyof typeof watchedValues, string> = {
        advancedDegreeType: advancedDegreeData.advanced_degree_type || "",
        graduateType: advancedDegreeData.graduate_type || "",
        advancedCountry: advancedDegreeData.country || "",
        advancedDegreeClass: advancedDegreeData.class_of_degree || "",
        advancedInstitutionName: advancedDegreeData.school_name || "",
        advancedCurrentCGPA: advancedDegreeData.specific_cgpa || "",
        advancedYearAdmitted: advancedDegreeData.admission_date || "",
        advancedYearGraduated: advancedDegreeData.graduation_date || "",
      };

      // Ensure keys match the watchedValues keys
      const hasChanges = (
        Object.keys(initialValues) as Array<keyof typeof initialValues>
      ).some((key) => watchedValues[key] !== initialValues[key]);

      setIsModified(hasChanges);
    }
  }, [watchedValues, advancedDegreeData]);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const advancedDegreeData = {
      advanced_degree_type: getValues("advancedDegreeType"),
      graduate_type: getValues("graduateType"),
      country: getValues("advancedCountry"),
      school_name: getValues("advancedInstitutionName"),
      class_of_degree: getValues("advancedDegreeClass"),
      specific_cgpa: getValues("advancedCurrentCGPA"),
      graduation_date: getValues("advancedYearGraduated"),
      admission_date: getValues("advancedYearAdmitted"),
      candidate: id,
    } as AdvancedEducation;

    try {
      await updateAdvancedDegree(advancedDegreeData);
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

  const inputClass =
    "border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none bg-white focus:outline-none focus:ring-2 pr-8";
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

  return (
    <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
      {isAdvancedLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8">
        <div className={outerDivClass}>
          <div className={divClass}>
            <label htmlFor="advancedDegreeType">
              Advanced Degree Type <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className={inputClass}
                id="advancedDegreeType"
                {...register("advancedDegreeType")}
              >
                <option value="">Select advanced degree type</option>
                {degreeOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              {svgSpan}
            </div>
            {errors.advancedDegreeType && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.advancedDegreeType)}
              </span>
            )}
          </div>
          <div className={divClass}>
            <label htmlFor="graduateType">
              Advanced Course Studied <span className="text-red">*</span>
            </label>
            <input
              className={inputClass}
              id="graduateType"
              {...register("graduateType")}
              placeholder="Enter the name of institution"
            />
            {errors.graduateType && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.graduateType)}
              </span>
            )}
          </div>
        </div>

        <div className={outerDivClass}>
          <CountrySelect
            label="Country"
            name="advancedCountry"
            smallText="location of the school you attended"
          />
          <div className={divClass}>
            <label htmlFor="advancedDegreeClass">
              Class of Degree <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className={inputClass}
                id="advancedDegreeClass"
                {...register("advancedDegreeClass")}
              >
                <option value="">Select class of degree</option>
                <option value="first_class">First Class</option>
                <option value="second_class">Second Class</option>
                <option value="third_class">Third Class</option>
                <option value="no_class">No Class</option>
              </select>
              {svgSpan}
            </div>
            {errors.advancedDegreeClass && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.advancedDegreeClass)}
              </span>
            )}
          </div>
        </div>

        <div className={outerDivClass}>
          <div className={divClass}>
            <label htmlFor="advancedInstitutionName">
              Name of tertiary institution attended{" "}
              <span className="text-red">*</span>
            </label>
            <input
              className={inputClass}
              id="advancedInstitutionName"
              {...register("advancedInstitutionName")}
              placeholder="Enter the name of institution"
            />
            {errors.advancedInstitutionName && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.advancedInstitutionName)}
              </span>
            )}
          </div>
          <div className={divClass}>
            <label htmlFor="advancedCurrentCGPA">
              Specific CGPA (e.g 3.5) <span className="text-red">*</span>
            </label>
            <input
              className={inputClass}
              id="advancedCurrentCGPA"
              {...register("advancedCurrentCGPA")}
              placeholder="Enter your current CGPA"
            />
            {errors.advancedCurrentCGPA && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.advancedCurrentCGPA)}
              </span>
            )}
          </div>
        </div>

        <div className={outerDivClass}>
          <div className={divClass}>
            <label htmlFor="advancedYearAdmitted">
              Year Admitted <span className="text-red">*</span>
            </label>
            <input
              className={`${inputClass} pr-1`}
              id="advancedYearAdmitted"
              type="date"
              {...register("advancedYearAdmitted")}
              placeholder="Enter the year you were admitted"
            />
            <p className="text-blue-500 text-sm mt-1">
              {watchedValues.advancedYearAdmitted
                ? formatDate(watchedValues.advancedYearAdmitted)
                : ""}
            </p>
            {errors.advancedYearAdmitted && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.advancedYearAdmitted)}
              </span>
            )}
          </div>
          <div className={divClass}>
            <label htmlFor="advancedYearGraduated">
              Year Graduated <span className="text-red">*</span>
            </label>
            <input
              className={`${inputClass} pr-1`}
              id="advancedYearGraduated"
              type="date"
              {...register("advancedYearGraduated")}
              placeholder="Enter the year you graduated"
            />
            <p className="text-blue-500 text-sm mt-1">
              {watchedValues.advancedYearGraduated
                ? formatDate(watchedValues.advancedYearGraduated)
                : ""}
            </p>
            {errors.advancedYearGraduated && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.advancedYearGraduated)}
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
  );
};

export default AdvancedDegree;
