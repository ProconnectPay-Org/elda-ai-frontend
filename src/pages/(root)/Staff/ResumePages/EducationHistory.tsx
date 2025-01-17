import CountrySelect from "@/components/CountrySelect";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { degreeOptions } from "@/constants";
import { useCandidates } from "@/hooks/useCandidiates";
import { submitEducationDetails } from "@/lib/actions/staffresume.actions";
import { formatDate, getErrorMessage } from "@/lib/utils";
import { EducationHistory as Edu, ResumeStep3FormData } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";

const EducationHistory = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<ResumeStep3FormData>();

  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (singleCandidate) {
      const foundCandidate = singleCandidate;
      // setValue("city", foundCandidate.city_current_reside || "");
      // setValue("state", foundCandidate.state_of_birth || "");
      setValue("country", foundCandidate.education[0].country || "");
      setValue("degree", foundCandidate.education[0].degree_type || "");
      setValue(
        "classOfDegree",
        foundCandidate.education[0].class_of_degree || ""
      );
      setValue("kindOfDegree", foundCandidate.education[0].degree_type || "");
      setValue(
        "tertiaryInstitutionAttended",
        foundCandidate.education[0].school_name || ""
      );
      setValue(
        "course",
        foundCandidate.education[0].specific_course_of_study || ""
      );
      setValue("startDate", foundCandidate.education[0].admission_date || "");
      setValue("endDate", foundCandidate.education[0].graduation_date || "");
    }
  }, [singleCandidate, id, setValue]);

  useEffect(() => {
    const initialValues = {
      country: singleCandidate?.education[0]?.country || "",
      degree: singleCandidate?.education[0]?.degree_type || "",
      kindOfDegree: singleCandidate?.education[0]?.degree_type || "",
      tertiaryInstitutionAttended:
        singleCandidate?.education[0]?.school_name || "",
      course: singleCandidate?.education[0]?.specific_course_of_study || "",
      startDate: singleCandidate?.education[0]?.admission_date || "",
      endDate: singleCandidate?.education[0]?.graduation_date || "",
    };

    setIsModified(
      Object.entries(initialValues).some(
        ([key, value]) => value !== getValues(key as keyof typeof initialValues)
      )
    );
  }, [watchedValues, getValues, singleCandidate]);

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  // const degreeTypes = ["bachelor", "master", "phd"];
  const inputClass =
    "border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 bg-white pr-8";

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

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const educationData = {
      degree_type: getValues("kindOfDegree"),
      school_name: getValues("tertiaryInstitutionAttended"),
      country: getValues("country"),
      specific_course_of_study: getValues("course"),
      admission_date: getValues("startDate"),
      graduation_date: getValues("endDate"),
    } as Edu;

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

  return (
    <div className="space-y-5">
      {singleCandidateLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}
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
        ></input>
        <p className="text-xs text-[#667085]">Choose the correct degree type</p>
      </div>
      <div className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <h3 className="font-bold mb-4 text-lg">Eductaion Information</h3>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="kindOfDegree">Kind of Degree</label>
              <div className="relative">
                <select
                  className={inputClass}
                  id="kindOfDegree"
                  {...register("kindOfDegree")}
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

          {/* <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
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
          </div> */}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <CountrySelect label="Country" name="country" />

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
                type="date"
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="startDate"
                {...register("startDate")}
              />
              <p className="text-blue-500 text-sm mt-1">
                {watchedValues.startDate
                  ? formatDate(watchedValues.startDate)
                  : "Select a date"}
              </p>
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
                type="date"
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="endDate"
                {...register("endDate")}
              />
              <p className="text-blue-500 text-sm mt-1">
                {watchedValues.endDate
                  ? formatDate(watchedValues.endDate)
                  : "Select a date"}
              </p>
              {errors.endDate && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.endDate)}
                </span>
              )}
            </div>
          </div>

          <Button
            className={`bg-red ${
              !isModified || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSave}
            disabled={!isModified || loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationHistory;
