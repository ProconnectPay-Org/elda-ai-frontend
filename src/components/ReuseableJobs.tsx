import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { CustomAxiosError, Step3FormData } from "@/types";
import { refinePrompt } from "@/lib/actions/user.actions";
import Cookies from "js-cookie";
import CountrySelect from "./CountrySelect";
import promptImage from "@/assets/prompt.svg";
import promptWhiteImage from "@/assets/prompt-white.svg";
import { fetchJobExperienceData } from "@/lib/actions/candidate.actions";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ReuseableJobsProps {
  index: number; // New prop for the job experience index
}

const ReuseableJobs = ({ index }: ReuseableJobsProps) => {
  const { register, getValues, setValue } = useFormContext<Step3FormData>();
  const { toast } = useToast();

  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  const [refineLoading, setRefineLoading] = useState(false);
  const [jobStatus, setJobStatus] = useState("former");

  const jobExperienceIds = [
    Cookies.get("work_experience_id1"),
    Cookies.get("work_experience_id2"),
    Cookies.get("work_experience_id3"),
  ].filter((id) => id !== undefined);

  const currentJobStatus =
    getValues(`jobExperiences.${index}.jobStatus`) || "former";

  const handleJobStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setJobStatus(value);
    setValue(`jobExperiences.${index}.jobStatus`, value);

    // Set the endedDate based on job status
    if (value === "current") {
      setValue(`jobExperiences.${index}.endedDate`, "1960-01-01");
    } else {
      setValue(`jobExperiences.${index}.endedDate`, "");
    }
  };

  // Handler for current professional status
  const handleProfessionalStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setValue(`jobExperiences.${index}.currentProfessionalStatus`, value);
  };

  const jobExperienceQueries = jobExperienceIds.map((id) => {
    return useQuery({
      queryKey: ["jobExperienceData", id],
      queryFn: () => fetchJobExperienceData(id),
      enabled: !!id,
      staleTime: 5 * 1000 * 60,
    });
  });

  const isJobExpLoading = jobExperienceQueries.some((query) => query.isLoading);
  const jobExperienceData = jobExperienceQueries.map((query) => query.data);

  useEffect(() => {
    if (
      jobExperienceData &&
      !getValues(`jobExperiences.${index}.initialized`)
    ) {
      const filteredJobExperienceData = jobExperienceData.filter(
        (experience) => experience?.business_name
      );

      if (filteredJobExperienceData[index]) {
        setValue(
          `jobExperiences.${index}.workPlaceName`,
          filteredJobExperienceData[index].business_name || ""
        );
        setValue(
          `jobExperiences.${index}.currentProfessionalStatus`,
          filteredJobExperienceData[index].professional_status || ""
        );
        setValue(
          `jobExperiences.${index}.currentJobTitle`,
          filteredJobExperienceData[index].job_title || ""
        );
        setValue(
          `jobExperiences.${index}.employmentType`,
          filteredJobExperienceData[index].employment_type || ""
        );
        setValue(
          `jobExperiences.${index}.stateLocation`,
          filteredJobExperienceData[index].state || ""
        );
        setValue(
          `jobExperiences.${index}.countryLocation`,
          filteredJobExperienceData[index].country || ""
        );

        const jobStatusFromData =
          filteredJobExperienceData[index].job_status || "former"; // Fallback to "former"
        setValue(`jobExperiences.${index}.jobStatus`, jobStatusFromData);
        setJobStatus(jobStatusFromData);

        if (jobStatusFromData === "current") {
          setValue(`jobExperiences.${index}.endedDate`, "1960-01-01");
        } else {
          setValue(
            `jobExperiences.${index}.endedDate`,
            filteredJobExperienceData[index].year_ended || ""
          );
        }

        setValue(
          `jobExperiences.${index}.startedDate`,
          filteredJobExperienceData[index].year_started || ""
        );
        setValue(
          `jobExperiences.${index}.jobSummary`,
          filteredJobExperienceData[index].job_summary || ""
        );

        // Mark only the current job experience as initialized
        setValue(`jobExperiences.${index}.initialized`, true);
      }
    }
  }, [jobExperienceData, setValue, index]);

  const handleRefine = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRefineLoading(true);
    try {
      const jobSummary = getValues(`jobExperiences.${index}.jobSummary`);
      if (jobSummary) {
        const refinedPrompt = `Draft a JOB SUMMARY AND KEY ACHIEVEMENTS for my ${currentJobStatus} workplace. 
            Share how I leveraged innovation and took new initiatives to perform my job, including data and statistics. 
            Write in first person and ${
              currentJobStatus === "current" ? "present" : "past"
            } tense. Highlight ${currentJobStatus} roles held within the same company. 
            Here's the existing summary: ${jobSummary}`;

        const refinedContent = await refinePrompt({ prompt: refinedPrompt });
        setValue(
          `jobExperiences.${index}.jobSummary`,
          refinedContent.refined_content
        );
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please provide a job summary.",
        });
      }
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      toast({
        variant: "destructive",
        title: "Error refining prompt:",
        description: axiosError.response?.data || "Unknown error",
      });
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
      <h3 className="text-2xl font-medium mb-5">Job History</h3>

      <div className="flex flex-col gap-8">
        <div className={outerDivClass}>
          <div className={divClass}>
            <label
              htmlFor={`jobExperiences.${index}.jobStatus`}
              className="form-label"
            >
              Job Status
              <span className="text-red">*</span>
            </label>
            <div className="relative inline-block">
              <select
                className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                id="jobStatus"
                {...register(`jobExperiences.${index}.jobStatus`)}
                onChange={handleJobStatusChange}
                value={currentJobStatus}
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
          </div>
          <div className={divClass}>
            <label
              htmlFor={`jobExperiences.${index}.workPlaceName`}
              className="form-label"
            >
              Name of Work or Business Place <span className="text-red">*</span>
            </label>
            <input
              id={`jobExperiences.${index}.workPlaceName`}
              type="text"
              {...register(`jobExperiences.${index}.workPlaceName`)}
              className="border border-gray-border rounded-md py-2 px-4"
            />
          </div>
        </div>

        <div className={outerDivClass}>
          <div className={divClass}>
            <label
              htmlFor={`jobExperiences.${index}.currentProfessionalStatus`}
              className="form-label"
            >
              Professional Status <span className="text-red">*</span>
            </label>
            <div className="relative inline-block">
              <select
                className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                id={`jobExperiences.${index}.currentProfessionalStatus`}
                {...register(
                  `jobExperiences.${index}.currentProfessionalStatus`
                )}
                onChange={handleProfessionalStatusChange}
              >
                <option value="">Select Professional status</option>
                <option value="Employer/Start-Up Founder">
                  Employer/Start-Up Founder
                </option>
                <option value="Employee">Employee</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Small Business Owner">
                  Small Business Owner
                </option>
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
          </div>
          <div className={divClass}>
            <label
              htmlFor={`jobExperiences.${index}.currentJobTitle`}
              className="form-label"
            >
              Job Title <span className="text-red">*</span>
            </label>
            <input
              id={`jobExperiences.${index}.currentJobTitle`}
              type="text"
              {...register(`jobExperiences.${index}.currentJobTitle`)}
              className="border border-gray-border rounded-md py-2 px-4"
            />
          </div>
        </div>

        <div className={outerDivClass}>
          <div className={divClass}>
            <label
              htmlFor={`jobExperiences.${index}.employmentType`}
              className="form-label"
            >
              Employment Type <span className="text-red">*</span>
            </label>
            <div className="relative">
              <select
                id={`jobExperiences.${index}.employmentType`}
                {...register(`jobExperiences.${index}.employmentType`)}
                className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
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
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className={divClass}>
            <label
              htmlFor={`jobExperiences.${index}.stateLocation`}
              className="form-label"
            >
              State/Province Location of Job <span className="text-red">*</span>
            </label>
            <input
              id={`jobExperiences.${index}.stateLocation`}
              type="text"
              {...register(`jobExperiences.${index}.stateLocation`)}
              className="border border-gray-border rounded-md py-2 px-4"
            />
          </div>
        </div>

        <div className={outerDivClass}>
          <CountrySelect
            label="Country Location of Current Job"
            name={`jobExperiences.${index}.countryLocation`}
          />

          <div className="w-full md:w-1/2 gap-8 flex flex-col">
            <div className="flex flex-col w-full">
              <label
                htmlFor={`jobExperiences.${index}.startedDate`}
                className="form-label"
              >
                Date Started <span className="text-red">*</span>
              </label>
              <input
                id={`jobExperiences.${index}.startedDate`}
                type="date"
                {...register(`jobExperiences.${index}.startedDate`)}
                className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none bg-white focus:outline-none focus:ring-2 pr-8"
              />
            </div>
          </div>
        </div>

        <div className={outerDivClass}>
          <div className="w-full md:w-1/2 gap-8 flex flex-col">
            {jobStatus === "former" && (
              <div className="flex flex-col w-full">
                <label
                  htmlFor={`jobExperiences.${index}.endedDate`}
                  className="form-label"
                >
                  Date Ended <span className="text-red">*</span>
                </label>
                <input
                  id={`jobExperiences.${index}.endedDate`}
                  type="date"
                  {...register(`jobExperiences.${index}.endedDate`)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none bg-white focus:outline-none focus:ring-2 pr-8"
                />
              </div>
            )}
          </div>

          <div className={divClass}>
            <label
              htmlFor={`jobExperiences.${index}.jobSummary`}
              className="form-label"
            >
              Provide Job Summary and Key Achievements on this JOB{" "}
              <span className="text-red">*</span>
            </label>
            <div className="flex items-start gap-4 border border-gray-border rounded-md py-2 px-4 h-full">
              <img src={promptImage} alt="prompt image" />
              <textarea
                id={`jobExperiences.${index}.jobSummary`}
                {...register(`jobExperiences.${index}.jobSummary`)}
                className="w-full outline-none h-full"
              />
            </div>
            <i className="text-xs">
              Give us more than 3 sentences stating your Job Role and your Key
              Achievements
            </i>
          </div>
        </div>

        <div className="flex items-end w-full flex-col md:flex-row justify-between gap-4 md:gap-8">
          <div className="w-full md:w-1/2 hidden md:flex"></div>
          <Button
            onClick={handleRefine}
            disabled={refineLoading}
            className="w-full text-[8px] md:w-1/2 bg-red flex gap-2 md:text-xs xl:text-sm"
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
