import { Button } from "@/components/ui/button";
import { useCandidates } from "@/hooks/useCandidiates";
import { getErrorMessage } from "@/lib/utils";
import { CandidateCareer, JobExperience, ResumeStep4FormData } from "@/types";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";
import ReuseableJobs from "@/components/ReuseableJobs";
import { submitCareer } from "@/lib/actions/staffresume.actions";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { fetchJobExperienceData } from "@/lib/actions/candidate.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const WorkExperience = () => {
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
    control,
  } = useFormContext<ResumeStep4FormData>();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);
  const [inputValue, setInputValue] = useState("");
  const [jobsCount, setJobsCount] = useState(0);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [jobs, setJobs] = useState<JobExperience[]>([]);

  // Fetch job experience IDs from cookies
  const jobExperienceIds = [1, 2, 3]
    .map((i) => Cookies.get(`work_experience_id${i}`))
    .filter(Boolean);

  // Fetch job experiences using React Query
  const { data: fetchedJobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["jobExperiences", jobExperienceIds],
    queryFn: async () => {
      const promises = jobExperienceIds.map((id) => fetchJobExperienceData(id));
      return Promise.all(promises);
    },
    enabled: jobExperienceIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  // Update jobs state when data is fetched
  useEffect(() => {
    if (fetchedJobs) {
      const updatedJobs = [...fetchedJobs];

      // Fill with empty jobs if less than 3
      while (updatedJobs.length < 3) {
        updatedJobs.push({
          id: 0,
          business_name: "",
          professional_status: "",
          job_title: "",
          employment_type: "",
          state: "",
          country: "",
          year_started: "",
          year_ended: "",
          company_description: "",
          job_summary: "",
          job_status: "",
          candidate: id,
        });
      }

      setJobs(updatedJobs.slice(0, 3));
    }
  }, [fetchedJobs]);

  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (singleCandidate) {
      setValue("profession", singleCandidate?.career[0]?.profession || "");
      setValue(
        "jobsToShowcase",
        String(singleCandidate?.career[0]?.jobs_to_show || 1)
      );
      const jobsToShowCount = singleCandidate?.career[0]?.jobs_to_show || 0;
      setJobsCount(jobsToShowCount);

      const rawCareerInterests = singleCandidate.career?.[0]?.career_interests;
      let careerInterests: string[] = [];

      if (Array.isArray(rawCareerInterests)) {
        careerInterests = rawCareerInterests.map(
          (interest: any) =>
            typeof interest === "string" ? interest : interest.name || "" // Handle both string and object cases
        );
      }
      setValue("interest", careerInterests);
    }
  }, [singleCandidate, id, setValue]);

  useEffect(() => {
    const initialValues = {
      profession: singleCandidate?.career[0]?.profession || "",
      jobsToShowcase: String(singleCandidate?.career[0]?.jobs_to_show || 1),
      interest:
        singleCandidate?.career[0]?.career_interests?.map((interest: any) =>
          typeof interest === "string" ? interest : interest.name || ""
        ) || [],
    };

    const isArrayEqual = (a: any[], b: any[]) => {
      if (a.length !== b.length) return false;
      return a.every((value, index) => value === b[index]);
    };

    setIsModified(
      initialValues.profession !== getValues("profession") ||
        initialValues.jobsToShowcase !== getValues("jobsToShowcase") ||
        !isArrayEqual(initialValues.interest, getValues("interest"))
    );
  }, [watchedValues, getValues, singleCandidate]);

  const handleJobsCountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const count = parseInt(event.target.value, 10);
    setJobsCount(count > 0 ? count : 1);
    setValue("jobsToShowcase", event.target.value);
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const workData = {
      jobs_to_show: jobsCount,
      profession: getValues("profession"),
      career_interests: getValues("interest"),
    } as CandidateCareer;
    try {
      await submitCareer(workData);
      toast({
        variant: "success",
        title: "Success",
        description: "Updated successfully!",
      });
      setIsModified(false);
      queryClient.invalidateQueries({ queryKey: ["singleCandidate", id] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="space-y-5">
      {singleCandidateLoading ||
        (jobsLoading && (
          <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="text-white text-xl flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Loading...
            </div>
          </div>
        ))}
      <div className="space-y-2">
        <label htmlFor="" className="text-[#344054]">
          How many jobs are you showcasing?
        </label>
        <div className="relative">
          <select
            id="jobsToShowcase"
            {...register("jobsToShowcase")}
            onChange={handleJobsCountChange}
            value={jobsCount}
            className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
          >
            <option disabled value="0">
              0
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
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
        <p className="text-xs text-red">
          *This determines the number of jobs displayed on a candidate resume in order*
        </p>
      </div>

      <div className="flex w-full gap-3">
        <div className="flex flex-col w-full sm:w-1/2">
          <label htmlFor="profession" className="text-[#344054]">
            Profession <span className="text-red">*</span>
          </label>
          <input
            className="border border-gray-border rounded-md py-2 px-4"
            id="profession"
            {...register("profession")}
            placeholder="Enter your profession"
          />
          {errors.profession && (
            <span className="text-red text-sm">
              {getErrorMessage(errors.profession)}
            </span>
          )}
        </div>
        <div className="flex flex-col sm:w-1/2">
          <label htmlFor="interest" className="text-[#344054]">
            Career Interest(s)
          </label>
          <Controller
            name="interest"
            control={control}
            rules={{
              required: "Please select at least one career interest.",
              validate: (value) =>
                value.length <= 3 ||
                "You can only select up to 3 career interests.",
            }}
            render={({ field }) => (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "0.35rem",
                  padding: "8px",
                }}
              >
                {field.value?.map((interest: string, index: number) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#e0e7ff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginRight: "5px",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        const updatedInterests = field.value.filter(
                          (_: string, i: number) => i !== index
                        );
                        field.onChange(updatedInterests);
                      }}
                      style={{
                        marginLeft: "5px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#ff4d4f",
                        fontSize: "12px",
                      }}
                    >
                      &times;
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type and press comma, full stop or click outside to add"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                    const isDelimiter = e.key === "," || e.key === ".";
                    if (isDelimiter && inputValue.trim()) {
                      if ((field.value || []).length >= 3) {
                        e.preventDefault();
                        alert("You can only add up to 3 career interests.");
                        return;
                      }
                      field.onChange([
                        ...(field.value || []),
                        inputValue.trim(),
                      ]);
                      setInputValue("");
                      e.preventDefault();
                    }
                  }}
                  onBlur={() => {
                    if (inputValue.trim()) {
                      if ((field.value || []).length >= 3) {
                        alert("You can only add up to 3 career interests.");
                        return;
                      }
                      field.onChange([
                        ...(field.value || []),
                        inputValue.trim(),
                      ]);
                      setInputValue("");
                    }
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    minWidth: "100px",
                    flexGrow: 1,
                  }}
                />
              </div>
            )}
          />

          {errors.interest && (
            <span className="text-red text-sm">{errors.interest}</span>
          )}
        </div>
      </div>

      <Button
        className={`bg-red ${
          !isModified || isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSave}
        disabled={!isModified || isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>

      {/* Reuseable Job Container */}
      <div>
        {jobs.map((job, index) => (
          <ReuseableJobs key={job.id} job={job} index={index} />
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
