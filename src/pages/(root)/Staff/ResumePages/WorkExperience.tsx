import { Button } from "@/components/ui/button";
import { useCandidates } from "@/hooks/useCandidiates";
import { formatDate, getErrorMessage } from "@/lib/utils";
import { CustomAxiosError, JobExperience, ResumeStep4FormData } from "@/types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import promptWhiteImage from "@/assets/prompt-white.svg";
import { useParams } from "react-router-dom";
import { refinePrompt } from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";
import { postJobExperience } from "@/lib/actions/staffresume.actions";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const WorkExperience = () => {
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext<ResumeStep4FormData>();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);
  const [jobsToShow, setJobsToShow] = useState("0");
  const [jobStatus, setJobStatus] = useState("current");
  const [refineLoading, setRefineLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (singleCandidate) {
      const filteredJobExperiences = singleCandidate.job_experience.filter(
        (experience: JobExperience) => experience.business_name
      );

      const jobsToShowCount = singleCandidate.career[0]?.jobs_to_show || 0;
      setJobsToShow(jobsToShowCount);

      filteredJobExperiences.forEach(
        (experience: JobExperience, index: number) => {
          setJobStatus(experience.job_status || "current");
          Cookies.set(`studentJobId${index + 1}`, String(experience.id));

          setValue(
            `jobExperiences.${index}.nameOfCompany`,
            experience.business_name || ""
          );
          setValue(
            `jobExperiences.${index}.jobTitle`,
            experience.job_title || ""
          );
          setValue(
            `jobExperiences.${index}.jobDescription`,
            experience.job_summary || ""
          );
          setValue(
            `jobExperiences.${index}.mode`,
            experience.employment_type || ""
          );
          setValue(`jobExperiences.${index}.location`, experience.state || "");
          setValue(
            `jobExperiences.${index}.startDate`,
            formatDate(experience.year_started) || ""
          );
          if (experience.year_ended !== "1960-01-01") {
            setValue(
              `jobExperiences.${index}.endDate`,
              formatDate(experience.year_ended) || ""
            );
          }
        }
      );
    }
  }, [singleCandidate, id, setValue]);

  const handleRefine = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setRefineLoading(true);
    try {
      const jobSummary = getValues(`jobExperiences.${index}.jobDescription`);
      if (jobSummary) {
        const refinedPrompt = `Draft a JOB SUMMARY AND KEY ACHIEVEMENTS for my workplace. 
            Share how I leveraged innovation and took new initiatives to perform my job, including data and statistics. 
            Write in first person and relative tense. Highlight roles held within the same company. 
            Here's the existing summary: ${jobSummary}`;

        const refinedContent = await refinePrompt({ prompt: refinedPrompt });
        setValue(
          `jobExperiences.${index}.jobDescription`,
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

  const handleDeleteChanges = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setLoadingIndex(index);

    try {
      // const experienceData = getValues(`jobExperiences.${index}`);
      const job_experience_id = Cookies.get(`studentJobId${index + 1}`);

      if (!job_experience_id) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Missing ID for job ${index + 1}.`,
        });
        return;
      }

      setValue(`jobExperiences.${index}.nameOfCompany`, "");

      // Optionally clear other related fields if needed
      setValue(`jobExperiences.${index}.jobTitle`, "");

      const jobExperienceData = {
        business_name: getValues(`jobExperiences.${index}.nameOfCompany`),
        job_title: getValues(`jobExperiences.${index}.jobTitle`),
        job_summary: getValues(`jobExperiences.${index}.jobDescription`),
        employment_type: getValues(`jobExperiences.${index}.mode`),
        state: getValues(`jobExperiences.${index}.location`),
      } as JobExperience;

      await postJobExperience(jobExperienceData, job_experience_id);
      toast({
        variant: "success",
        title: "Success",
        description: "Job experience deleted successfully!",
      });
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      toast({
        variant: "destructive",
        title: "Error saving changes:",
        description: axiosError.response?.data || "Unknown error",
      });
    } finally {
      setLoadingIndex(null); // Reset loading state
    }
  };

  const handleSaveChanges = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setLoadingIndex(index);

    try {
      // const experienceData = getValues(`jobExperiences.${index}`);
      const job_experience_id = Cookies.get(`studentJobId${index + 1}`);

      if (!job_experience_id) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Missing ID for job ${index + 1}.`,
        });
        return;
      }

      const jobExperienceData = {
        business_name: getValues(`jobExperiences.${index}.nameOfCompany`),
        job_title: getValues(`jobExperiences.${index}.jobTitle`),
        job_summary: getValues(`jobExperiences.${index}.jobDescription`),
        employment_type: getValues(`jobExperiences.${index}.mode`),
        state: getValues(`jobExperiences.${index}.location`),
      } as JobExperience;

      await postJobExperience(jobExperienceData, job_experience_id);
      toast({
        variant: "success",
        title: "Success",
        description: "Job experience updated successfully!",
      });
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      toast({
        variant: "destructive",
        title: "Error saving changes:",
        description: axiosError.response?.data || "Unknown error",
      });
    } finally {
      setLoadingIndex(null); // Reset loading state
    }
  };

  if (singleCandidateLoading) {
    return <div>Loading...</div>;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  const filteredJobExperiences =
    singleCandidate?.job_experience?.filter(
      (experience: JobExperience) => experience.business_name
    ) || [];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-[#344054]">
          How many jobs are you showcasing?
        </label>
        <div className="rounded-md w-full border py-2 pl-4 border-gray-border">
          {jobsToShow}
        </div>
      </div>

      {filteredJobExperiences.map(
        (experience: JobExperience, index: number) => (
          <div
            key={index}
            className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl"
          >
            <div className="flex justify-between">
              <h3 className="font-bold mb-4 text-lg">
                Job History: {experience.business_name}
              </h3>
              <p className="capitalize text-sm font-semibold">{jobStatus}</p>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col w-full">
                  <label htmlFor="nameOfCompany" className="text-[#344054]">
                    Name of Company
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    // id="nameOfCompany"
                    id={`nameOfCompany-${index}`}
                    {...register(`jobExperiences.${index}.nameOfCompany`)}
                    placeholder="Enter your first name"
                  />
                  {errors.nameOfCompany && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.nameOfCompany)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col sm:w-1/2">
                  <label
                    htmlFor={`jobTitle-${index}`}
                    className="text-[#344054]"
                  >
                    Job Title
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id={`jobTitle-${index}`}
                    {...register(`jobExperiences.${index}.jobTitle`)}
                    placeholder="Enter your job title"
                  />
                  {errors.jobTitle && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.jobTitle)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:w-1/2">
                  <label htmlFor={`mode-${index}`} className="text-[#344054]">
                    Mode
                  </label>
                  <input
                    className="border capitalize border-gray-border rounded-md py-2 px-4"
                    id={`mode-${index}`}
                    disabled
                    {...register(`jobExperiences.${index}.mode`)}
                    placeholder="Hybrid"
                  />
                  {errors.mode && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.mode)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor={`jobDescription-${index}`}
                    className="text-[#344054]"
                  >
                    Job Description
                  </label>
                  <textarea
                    className="border border-gray-border py-2 rounded-md px-4 min-h-20"
                    id={`jobDescription-${index}`}
                    {...register(`jobExperiences.${index}.jobDescription`)}
                    placeholder="Enter job description"
                  />
                  <div className="flex items-end w-full mt-4 flex-col md:flex-row justify-between gap-4 md:gap-8">
                    <div className="w-full md:w-fit hidden md:flex"></div>
                    <Button
                      onClick={(e) => handleRefine(e, index)}
                      disabled={refineLoading}
                      className="w-full text-[8px] md:w-fit bg-red flex gap-2 md:text-xs xl:text-sm"
                    >
                      <img src={promptWhiteImage} alt="prompt" />
                      {refineLoading
                        ? "Refining your prompt..."
                        : "Refine Job Summary"}
                    </Button>
                  </div>
                  {errors.jobDescription && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.jobDescription)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-evenly sm:justify-between gap-4 md:gap-8 w-full">
                <div className="flex flex-col sm:w-1/2">
                  <label
                    htmlFor={`location-${index}`}
                    className="text-[#344054]"
                  >
                    Location
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id={`location-${index}`}
                    {...register(`jobExperiences.${index}.location`)}
                    placeholder="Enter location"
                  />
                  {errors.location && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.location)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col w-1/3 sm:w-fit">
                  <label
                    htmlFor={`startDate-${index}`}
                    className="text-[#344054]"
                  >
                    Start Date
                  </label>
                  <input
                    disabled
                    type="text"
                    className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                    id={`startDate-${index}`}
                    {...register(`jobExperiences.${index}.startDate`)}
                  />
                  {errors.startDate && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.startDate)}
                    </span>
                  )}
                </div>
                {experience.year_ended !== "1960-01-01" && (
                  <div className="flex flex-col w-[10] sm:w-fit">
                    <label
                      htmlFor={`endDate-${index}`}
                      className="text-[#344054]"
                    >
                      End Date
                    </label>
                    <input
                      disabled
                      type="text"
                      className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                      id={`endDate-${index}`}
                      {...register(`jobExperiences.${index}.endDate`)}
                    />
                    {errors.endDate && (
                      <span className="text-red text-sm">
                        {getErrorMessage(errors.endDate)}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Button
                  className="bg-red"
                  onClick={(e) => handleDeleteChanges(e, index)}
                  disabled={loadingIndex === index}
                >
                  {loadingIndex === index ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
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
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WorkExperience;
