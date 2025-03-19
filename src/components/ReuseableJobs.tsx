import { Button } from "./ui/button";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { CustomAxiosError, JobExperience, Step3FormData } from "@/types";
import { refinePrompt } from "@/lib/actions/user.actions";
import Cookies from "js-cookie";
import CountrySelect from "./CountrySelect";
import promptImage from "@/assets/prompt.svg";
import deleteBtn from "@/assets/delete-trash.svg";
import promptWhiteImage from "@/assets/prompt-white.svg";
import { submitJobExperience } from "@/lib/actions/candidate.actions";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { formatDate } from "@/lib/utils";

interface ReuseableJobsProps {
  index: number; // New prop for the job experience index
  job: JobExperience; // Adjust this to match the structure of your job object
  onDelete: () => void;
  isDeleting: boolean;
}

const ReuseableJobs = ({
  index,
  job,
  onDelete,
  isDeleting,
}: ReuseableJobsProps) => {
  const { register, getValues, setValue, control } =
    useFormContext<Step3FormData>();
  const { toast } = useToast();

  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  const [refineLoading, setRefineLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const id = Cookies.get("candidate_id") || Cookies.get("studentId");
  const jobExperienceId = Cookies.get(`work_experience_id${index + 1}`);

  const currentJobStatus = getValues(`jobExperiences.${index}.jobStatus`) || "";

  const watchedJobStatus = useWatch({
    name: `jobExperiences.${index}.jobStatus`,
    control,
  });

  const handleJobStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    // Ensure the first job is always "Current"
    if (index === 0 && value !== "current") {
      return;
    }

    // Ensure other jobs are always "Former"
    if (index > 0 && value !== "former") {
      return;
    }
    setValue(`jobExperiences.${index}.jobStatus`, value);
  };

  // Handler for current professional status
  const handleProfessionalStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setValue(`jobExperiences.${index}.currentProfessionalStatus`, value);
  };

  const watchedValues = useWatch({
    name: `jobExperiences.${index}`,
    control,
  });

  // Update the endedDate based on the watched job status
  useEffect(() => {
    if (watchedJobStatus === "current") {
      setValue(`jobExperiences.${index}.endedDate`, "1960-01-01");
    } else {
      setValue(`jobExperiences.${index}.endedDate`, job?.year_ended || "");
    }
  }, [watchedJobStatus, setValue, index]);

  useEffect(() => {
    if (job) {
      setValue(
        `jobExperiences.${index}.workPlaceName`,
        job.business_name || ""
      );
      setValue(
        `jobExperiences.${index}.currentProfessionalStatus`,
        job.professional_status || ""
      );
      setValue(`jobExperiences.${index}.currentJobTitle`, job.job_title || "");
      setValue(
        `jobExperiences.${index}.employmentType`,
        job.employment_type || ""
      );
      setValue(`jobExperiences.${index}.stateLocation`, job.state || "");
      setValue(`jobExperiences.${index}.countryLocation`, job.country || "");
      setValue(`jobExperiences.${index}.startedDate`, job.year_started || "");
      setValue(`jobExperiences.${index}.endedDate`, job.year_ended || "");
      setValue(`jobExperiences.${index}.jobStatus`, job.job_status || "");
      setValue(
        `jobExperiences.${index}.companyDescription`,
        job.company_description || ""
      );
      setValue(`jobExperiences.${index}.jobSummary`, job.job_summary || "");
    }
  }, [job, setValue, index]);

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

  const handleSaveChanges = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setLoadingIndex(index);
    try {
      const data = {
        business_name: getValues(`jobExperiences.${index}.workPlaceName`),
        professional_status: getValues(
          `jobExperiences.${index}.currentProfessionalStatus`
        ),
        job_title: getValues(`jobExperiences.${index}.currentJobTitle`),
        employment_type: getValues(`jobExperiences.${index}.employmentType`),
        state: getValues(`jobExperiences.${index}.stateLocation`),
        country: getValues(`jobExperiences.${index}.countryLocation`),
        year_started: getValues(`jobExperiences.${index}.startedDate`),
        year_ended: getValues(`jobExperiences.${index}.endedDate`),
        job_status: getValues(`jobExperiences.${index}.jobStatus`),
        company_description: getValues(
          `jobExperiences.${index}.companyDescription`
        ),
        job_summary: getValues(`jobExperiences.${index}.jobSummary`),
        candidate: id,
      } as JobExperience;

      const response = await submitJobExperience(data, jobExperienceId!);
      Cookies.set(`work_experience_id${index + 1}`, `${response?.data?.id}`);

      toast({
        variant: "success",
        title: "Success",
        description: "Job experience updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes.",
      });
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="border border-pale-bg mb-5 py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
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
                value={watchedJobStatus}
              >
                <option value="">Select job status</option>
                <option value="current" disabled={index > 0}>
                  Current
                </option>
                <option value="former" disabled={index === 0}>
                  Former
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
             City, State/Province Location of Job <span className="text-red">*</span>
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
              <p className="text-blue-500 text-sm mt-1">
                {watchedValues?.startedDate
                  ? formatDate(watchedValues.startedDate)
                  : "Select a date"}
              </p>
            </div>
          </div>
        </div>

        <div className={outerDivClass}>
          <div className="w-full md:w-1/2 gap-8 flex flex-col">
            {watchedJobStatus === "former" && (
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
                <p className="text-blue-500 text-sm mt-1">
                  {watchedValues.endedDate
                    ? formatDate(watchedValues.endedDate)
                    : "Select a date"}
                </p>
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

        <div className="flex items-end w-full flex-col-reverse md:flex-row justify-between gap-4 md:gap-8">
          <div className="w-full md:w-1/2 flex items-center justify-between">
            <Button
              className="bg-red"
              onClick={(e) => handleSaveChanges(e, index)}
              disabled={loadingIndex === index}
            >
              {loadingIndex === index ? (
                <div className="flex items-center justify-center gap-2">
                  <p>Saving</p>
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <p className="text-xs xl:text-sm">Save Job Experience</p>
              )}
            </Button>
            <Button
              variant={"outline"}
              className="w-fit p-2"
              onClick={onDelete}
              type="button"
              // onClick={(e) => handleDelete(e, index)}
            >
              {isDeleting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <img src={deleteBtn} alt="" className="w-8" />
              )}
            </Button>
          </div>
          <Button
            onClick={handleRefine}
            disabled={refineLoading}
            className="w-full text-[8px] sm:text-xs md:text-[8px] md:w-1/2 bg-red flex gap-2 lg:text-xs xl:text-sm"
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
