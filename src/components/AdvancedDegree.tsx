import { getErrorMessage } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import { Step2FormData } from "@/types";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdvancedDegree } from "@/lib/actions/candidate.actions";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const AdvancedDegree = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Step2FormData>();
  const advancedId = Cookies.get("advanced_education1_id");

  const { isLoading: isAdvancedLoading, data: advancedDegreeData } = useQuery({
    queryKey: ["advancedDegreeData", advancedId],
    queryFn: getAdvancedDegree,
    staleTime: 5 * 60 * 1000,
    enabled: !!advancedId,
  });

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
      setValue(
        "advancedYearAdmitted",
        String(advancedDegreeData.year_admitted) || ""
      );
      setValue(
        "advancedYearGraduated",
        String(advancedDegreeData.year_graduated) || ""
      );
    }
  }, [advancedDegreeData, setValue]);

  const inputClass =
    "border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8";
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
                <option value="masters">Masters</option>
                <option value="phd">PHD</option>
                <option value="other">Other</option>
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
              Graduate Type <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className={inputClass}
                id="graduateType"
                {...register("graduateType")}
              >
                <option value="">Select advanced degree type</option>
                <option value="research">Research</option>
                <option value="taught">Taught</option>
                <option value="other">Other</option>
              </select>
              {svgSpan}
            </div>
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
                <option value="other">Other</option>
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
              Specific CGPA (e.g 3.5/5.0) <span className="text-red">*</span>
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
              type="number"
              {...register("advancedYearAdmitted")}
              placeholder="Enter the year you were admitted"
            />
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
              type="number"
              {...register("advancedYearGraduated")}
              placeholder="Enter the year you graduated"
            />
            {errors.advancedYearGraduated && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.advancedYearGraduated)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDegree;
