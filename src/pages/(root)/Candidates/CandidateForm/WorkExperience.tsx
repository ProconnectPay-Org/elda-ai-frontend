// components/Step3.tsx
import { getErrorMessage } from "@/lib/utils";
import { CandidateCareer, CareerInterest, Step3FormData } from "@/types";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCareerData,
  submitWorkExperience,
} from "@/lib/actions/candidate.actions";
import Cookies from "js-cookie";
import ReuseableJobs from "@/components/ReuseableJobs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type CareerInterestOption = {
  name: string;
  value: number;
  id?: number;
};

const WorkExperience = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext<Step3FormData>();
  const [jobsCount, setJobsCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  const careerId = Cookies.get("career_id");

  const { isLoading: isWorkExpLoading, data: careerData } = useQuery({
    queryKey: ["careerData", careerId],
    queryFn: fetchCareerData,
    enabled: !!careerId,
    staleTime: 5 * 1000 * 60,
  });


  // Watch form values
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (careerData) {
      setValue("profession", careerData.profession || "");
      setValue("sectorOfProfession", careerData.sector || "");
      setValue(
        "careerInterest",
        careerData.career_interests.map((interest: CareerInterestOption) => ({
          value: interest.id,
          name: interest.name,
        })) || []
      );

      setValue(
        "yearsOfProfessionalExperiencePostFirstDegree",
        String(careerData.years_of_experience_post_degree || 0)
      );
      setValue(
        "yearsOfProfessionalExperiencePriorToGraduation",
        String(careerData.years_of_experience_pre_graduation || 0)
      );
      setValue("jobsToShowcase", String(careerData.jobs_to_show || 1));
      setJobsCount(careerData.jobs_to_show || 1);
    }
  }, [careerData, setValue]);

  useEffect(() => {
    if (careerData) {
      // Define the type for initialValues explicitly
      const initialValues: Record<keyof typeof watchedValues, string> = {
        profession: careerData.profession || "",
        sectorOfProfession: careerData.sector || "",
        careerInterest: careerData.career_interests || [],
        yearsOfProfessionalExperiencePostFirstDegree:
          careerData.years_of_experience_post_degree || 0,
        yearsOfProfessionalExperiencePriorToGraduation:
          careerData.years_of_experience_pre_graduation || 0,
        jobsToShowcase: careerData.jobs_to_show || 1,
      };

      // Ensure keys match the watchedValues keys
      const hasChanges = (
        Object.keys(initialValues) as Array<keyof typeof initialValues>
      ).some((key) => watchedValues[key] !== initialValues[key]);

      setIsModified(hasChanges);
    }
  }, [watchedValues, careerData]);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const workData = {
      profession: getValues("profession"),
      sector: getValues("sectorOfProfession"),
      career_interests: getValues("careerInterest"),
      years_of_experience_post_degree: getValues(
        "yearsOfProfessionalExperiencePostFirstDegree"
      ),
      years_of_experience_pre_graduation: getValues(
        "yearsOfProfessionalExperiencePriorToGraduation"
      ),
      jobs_to_show: getValues("jobsToShowcase"),
    } as CandidateCareer;

    try {
      await submitWorkExperience(workData);
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

  const handleJobsCountChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const count = parseInt(event.target.value, 10);
    setJobsCount(count > 0 ? count : 1);
    setValue("jobsToShowcase", event.target.value);
  };

  const isLoading = isWorkExpLoading;

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
              <label htmlFor="profession" className="form-label">
                What is your Profession, not JOB TITLE?{" "}
                <span className="text-red">*</span>
              </label>
              <input
                id="profession"
                type="text"
                {...register("profession")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              <p className="text-xs text-gray-text">
                E.g Banker, Teacher, Software Engineer
              </p>
              {errors.profession && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.profession)}
                </p>
              )}
            </div>
            <div className={divClass}>
              <label htmlFor="sectorOfProfession" className="form-label">
                What is the specific Sector of your Profession, not your Job
                Title? <span className="text-red">*</span>
              </label>
              <input
                id="sectorOfProfession"
                type="text"
                {...register("sectorOfProfession")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              <p className="text-xs text-gray-text">
                E.g Financial Services, Construction, Oil and Gas, Information
                Technology
              </p>
              {errors.sectorOfProfession && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.sectorOfProfession)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="careerInterest" className="form-label">
                Career Interests <span className="text-red">*</span>
              </label>
              <p className="text-xs text-blue-600">
                Type and press comma, full stop or click outside to add*
              </p>
              <Controller
                name="careerInterest"
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
                    {field.value?.map(
                      (interest: CareerInterest, index: number) => (
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
                          {interest.name}
                          <button
                            onClick={() => {
                              const updatedInterests = field.value.filter(
                                (_: any, i: number) => i !== index
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
                      )
                    )}
                    <input
                      type="text"
                      placeholder="Type and press comma, full stop or click outside to add"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        const isDelimiter = e.key === "," || e.key === ".";
                        if (isDelimiter && inputValue.trim()) {
                          if ((field.value || []).length >= 3) {
                            e.preventDefault();
                            alert("You can only add up to 3 career interests.");
                            return;
                          }
                          const newInterest = { name: inputValue.trim() };
                          field.onChange([...(field.value || []), newInterest]);
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
                          const newInterest = { name: inputValue.trim() };
                          field.onChange([...(field.value || []), newInterest]);
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
              <p className="text-xs text-gray-text">
                what do you want to EXPLORE Learning ABROAD in RELATION to your
                Career so FAR
              </p>
              {errors.careerInterest && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.careerInterest)}
                </p>
              )}
            </div>
          </div>

          <div className={outerDivClass}>
            <div className={divClass}>
              <label
                htmlFor="yearsOfProfessionalExperiencePostFirstDegree"
                className="form-label"
              >
                Years of Professional Experience Post First Degree{" "}
                <span className="text-red">*</span>
              </label>
              <input
                id="yearsOfProfessionalExperiencePostFirstDegree"
                type="number"
                {...register("yearsOfProfessionalExperiencePostFirstDegree")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              <p className="text-xs text-gray-text">input number of years</p>
              {errors.yearsOfProfessionalExperiencePostFirstDegree && (
                <p className="text-red text-sm">
                  {getErrorMessage(
                    errors.yearsOfProfessionalExperiencePostFirstDegree
                  )}
                </p>
              )}
            </div>
            <div className={divClass}>
              <label
                htmlFor="yearsOfProfessionalExperiencePriorToGraduation"
                className="form-label"
              >
                Years of Professional Experience If working Prior to Graduation
              </label>
              <input
                id="yearsOfProfessionalExperiencePriorToGraduation"
                type="number"
                {...register("yearsOfProfessionalExperiencePriorToGraduation")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              <p className="text-xs text-gray-text">input number of years</p>
              {errors.yearsOfProfessionalExperiencePriorToGraduation && (
                <p className="text-red text-sm">
                  {getErrorMessage(
                    errors.yearsOfProfessionalExperiencePriorToGraduation
                  )}
                </p>
              )}
            </div>
          </div>

          <div className={outerDivClass}>
            <div className={`${divClass} md:w-full`}>
              <label htmlFor="jobsToShowcase" className="form-label">
                How many JOBS do you want to showcase that show consistency?{" "}
                <span className="text-red">*</span>
              </label>

              <div className="relative">
                <select
                  id="jobsToShowcase"
                  {...register("jobsToShowcase")}
                  onChange={handleJobsCountChange}
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
              <p className="text-xs text-gray-text">
                Kindly note that if you have less than 10 years of work
                experience, you can only showcase a maximum of 2 jobs but if you
                have more than 10 years of experience, you can showcase a
                maximum of 3 jobs
              </p>
              {errors.jobsToShowcase && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.jobsToShowcase)}
                </p>
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

      {/* Reuseable Job Container */}
      <div>
        {jobsCount >= 1 && <ReuseableJobs index={0} />}
        {jobsCount >= 2 && <ReuseableJobs index={1} />}
        {jobsCount === 3 && <ReuseableJobs index={2} />}
      </div>
    </div>
  );
};

export default WorkExperience;
