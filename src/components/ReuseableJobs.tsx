import { getErrorMessage } from "@/lib/utils";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Step3FormData } from "@/types";
import { refinePrompt } from "@/lib/actions/user.actions";
import Cookies from "js-cookie";
import CountrySelect from "./CountrySelect";
import promptImage from "@/assets/prompt.svg";
import promptWhiteImage from "@/assets/prompt-white.svg";
import { fetchJobExperienceData } from "@/lib/actions/candidate.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const ReuseableJobs = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<Step3FormData>();

  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  const jobExperienceId = Cookies.get("work_experience_id");

  const [refineLoading, setRefineLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState("");

  const handleJobChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setJobStatus(value);
    setValue("jobStatus", value); // Update form state
  };

  const { isLoading: isJobExpLoading, data: jobExperienceData } = useQuery({
    queryKey: ["jobExperienceData", jobExperienceId],
    queryFn: fetchJobExperienceData,
    enabled: !!jobExperienceId,
    staleTime: 5 * 1000 * 60,
  });

  useEffect(() => {
    if (jobExperienceData) {
      setValue("workPlaceName", jobExperienceData.business_name || "");
      setValue(
        "currentProfessionalStatus",
        jobExperienceData.professional_status || ""
      );
      setValue("currentJobTitle", jobExperienceData.job_title || "");
      setValue("employmentType", jobExperienceData.employment_type || "");
      setValue("stateLocation", jobExperienceData.state || "");
      setValue("countryLocation", jobExperienceData.country || "");
      setValue("jobStatus", jobExperienceData.job_status || "");
      setValue("endedDate", jobExperienceData.year_ended || "");
      setValue("startedDate", jobExperienceData.year_started || "");
      setValue(
        "companyDescription",
        jobExperienceData.company_description || ""
      );
      setValue("jobSummary", jobExperienceData.job_summary || "");
    }
  }, [jobExperienceData, setValue]);

  const handleRefine = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRefineLoading(true);
    try {
      const jobSummary = getValues("jobSummary");
      if (jobSummary) {
        const refinedContent = await refinePrompt({ prompt: jobSummary });
        setValue("jobSummary", refinedContent.refined_content);
      } else {
        console.log("Please provide a job summary.");
      }
    } catch (error) {
      console.error("Error refining prompt:", error);
    } finally {
      setRefineLoading(false);
    }
  };
  return (
    <div className="border border-pale-bg mb-5 py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
      {isJobExpLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}
      <h3 className="text-2xl font-medium mb-5">{jobStatus === "current" ? "Current Job" : "Former Job"}</h3>

      <div className="flex flex-col gap-8">
        <div className={outerDivClass}>
          <div className={divClass}>
            <label htmlFor="jobStatus" className="form-label">
              Job Status
              <span className="text-red">*</span>
            </label>
            <div className="relative inline-block">
              <select
                className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                id="jobStatus"
                {...register("jobStatus")}
                onChange={handleJobChange}
              >
                <option value="">Select job status</option>
                <option value="current">Current</option>
                <option value="former">Former</option>
              </select>
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
            </div>
            {errors.jobStatus && (
              <p className="text-red text-sm">
                {getErrorMessage(errors.jobStatus)}
              </p>
            )}
          </div>
          <div className={divClass}>
            <label htmlFor="workPlaceName" className="form-label">
              Name of Work or Business Place <span className="text-red">*</span>
            </label>
            <input
              id="workPlaceName"
              type="text"
              {...register("workPlaceName")}
              className="border border-gray-border rounded-md py-2 px-4"
            />
            {errors.workPlaceName && (
              <p className="text-red text-sm">
                {getErrorMessage(errors.workPlaceName)}
              </p>
            )}
          </div>
        </div>

        <div className={outerDivClass}>
          <div className={divClass}>
            <label htmlFor="currentProfessionalStatus" className="form-label">
              Current Professional Status <span className="text-red">*</span>
            </label>
            <input
              id="currentProfessionalStatus"
              type="text"
              {...register("currentProfessionalStatus")}
              className="border border-gray-border rounded-md py-2 px-4"
            />
            {errors.currentProfessionalStatus && (
              <p className="text-red text-sm">
                {getErrorMessage(errors.currentProfessionalStatus)}
              </p>
            )}
          </div>
          <div className={divClass}>
            <label htmlFor="currentJobTitle" className="form-label">
              Current Job Title <span className="text-red">*</span>
            </label>
            <input
              id="currentJobTitle"
              type="text"
              {...register("currentJobTitle")}
              className="border border-gray-border rounded-md py-2 px-4"
            />
            {errors.currentJobTitle && (
              <p className="text-red text-sm">
                {getErrorMessage(errors.currentJobTitle)}
              </p>
            )}
          </div>
        </div>

        <div className={outerDivClass}>
          <div className={divClass}>
            <label htmlFor="employmentType" className="form-label">
              Employment Type <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                id="employmentType"
                {...register("employmentType")}
              >
                <option value="">Select status</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part time</option>
              </select>
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
            </div>
            {errors.employmentType && (
              <p className="text-red text-sm">
                {getErrorMessage(errors.employmentType)}
              </p>
            )}
          </div>
          <div className={divClass}>
            <label htmlFor="stateLocation" className="form-label">
              State/Province Location of Current Job{" "}
              <span className="text-red">*</span>
            </label>
            <input
              id="stateLocation"
              type="text"
              {...register("stateLocation")}
              className="border border-gray-border rounded-md py-2 px-4"
            />
            {errors.stateLocation && (
              <p className="text-red text-sm">
                {getErrorMessage(errors.stateLocation)}
              </p>
            )}
          </div>
        </div>

        <div className={outerDivClass}>
          <CountrySelect
            label="Country Location of Current Job"
            name="countryLocation"
          />

          <div className="w-full md:w-1/2 gap-8 flex flex-col">
            <div className={divClass}>
              <label htmlFor="startedDate" className="form-label">
                Date Started <span className="text-red">*</span>
              </label>
              <input
                id="startedDate"
                type="date"
                {...register("startedDate")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.startedDate && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.startedDate)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={outerDivClass}>
          <div className="w-full md:w-1/2 gap-8 flex flex-col">
            {jobStatus === "former" && (
              <div className={divClass}>
                <label htmlFor="endedDate" className="form-label">
                  Date Ended <span className="text-red">*</span>
                </label>
                <input
                  id="endedDate"
                  type="date"
                  {...register("endedDate")}
                  className="border border-gray-border rounded-md py-2 px-4"
                />
                {errors.endedDate && (
                  <p className="text-red text-sm">
                    {getErrorMessage(errors.endedDate)}
                  </p>
                )}
              </div>
            )}
            <div className={divClass}>
              <label htmlFor="companyDescription" className="form-label">
                Provide Company Description with Vision and Mission Statement{" "}
                <span className="text-red">*</span>
              </label>
              <textarea
                id="companyDescription"
                {...register("companyDescription")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              <p className="text-xs text-gray-text">
                Please describe in third person with the name of the company
                prominently stated.
              </p>
              {errors.companyDescription && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.companyDescription)}
                </p>
              )}
            </div>
          </div>

          <div className={divClass}>
            <label htmlFor="jobSummary" className="form-label">
              Provide Job Summary and Key Achievements on this Current JOB{" "}
              <span className="text-red">*</span>
            </label>
            <div className="flex items-start gap-4 border border-gray-border rounded-md py-2 px-4 h-full">
              <img src={promptImage} alt="prompt image" />
              <textarea
                id="jobSummary"
                {...register("jobSummary")}
                className="w-full outline-none h-full"
              />
            </div>
            <i className="text-xs">
              Give us more than 3 sentences stating your Job Role and your Key
              Achievements
            </i>
            {errors.jobSummary && (
              <p className="text-red text-sm">
                {getErrorMessage(errors.jobSummary)}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-end w-full flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div className="w-full md:w-1/2 hidden md:flex"></div>
          <Button
            onClick={handleRefine}
            disabled={refineLoading}
            className="w-full text-xs md:w-1/2 bg-red flex gap-2 md:text-base"
          >
            <img src={promptWhiteImage} alt="prompt" />
            {refineLoading
              ? "Refining your prompt..."
              : "Refine Job Summary and Key Achievements with eLDa AI"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReuseableJobs;
