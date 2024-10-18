// components/Step3.tsx

import CountrySelect from "@/components/CountrySelect";
import { careerOptions } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { Step3FormData } from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import promptImage from "@/assets/prompt.svg";
import promptWhiteImage from "@/assets/prompt-white.svg";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCareerData,
  fetchJobExperienceData,
} from "@/lib/actions/candidate.actions";
import Cookies from "js-cookie";

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
  } = useFormContext<Step3FormData>();

  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  const jobExperienceId = Cookies.get("work_experience_id");
  const careerId = Cookies.get("career_id");

  const { isLoading: isWorkExpLoading, data: careerData } = useQuery({
    queryKey: ["careerData", careerId],
    queryFn: fetchCareerData,
    enabled: !!careerId,
    staleTime: 5 * 1000,
  });

  const { isLoading: isJobExpLoading, data: jobExperienceData } = useQuery({
    queryKey: ["jobExperienceData", jobExperienceId],
    queryFn: fetchJobExperienceData,
    enabled: !!jobExperienceId,
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    if (careerData) {
      setValue("workPlaceName", careerData.business_name || "");
      setValue("profession", careerData.profession || "");
      setValue("sectorOfProfession", careerData.sector || "");
      setValue("technicalSkill", careerData.technical_skill || "");

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
      setValue("jobsToShowcase", String(careerData.jobs_to_show || 0));
    }
  }, [careerData, setValue]);

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

  const isLoading = isWorkExpLoading || isJobExpLoading;

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

          <div className={outerDivClass}>
            <div className={divClass}>
              <label htmlFor="technicalSkill" className="form-label">
                Name one SPECIFIC Technical Skill you apply to this Profession{" "}
                <span className="text-red">*</span>
              </label>
              <input
                id="technicalSkill"
                type="text"
                {...register("technicalSkill")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              <p className="text-xs text-gray-text">
                E.g Banker, Teacher, Software Engineer
              </p>
              {errors.technicalSkill && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.technicalSkill)}
                </p>
              )}
            </div>
            <div className={divClass}>
              <label htmlFor="careerInterest" className="form-label">
                Select Career Interests <span className="text-red">*</span>
              </label>
              <Controller
                name="careerInterest"
                control={control}
                rules={{
                  required: "Please select at least one career interest.",
                }}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    isMulti
                    options={careerOptions}
                    classNamePrefix="select"
                    placeholder="Select Career Interests"
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "1px solid #ccc",
                        borderRadius: "0.35rem",
                        padding: "1px 0px",
                      }),
                    }}
                    // Convert selected values to the format ReactSelect expects
                    value={
                      field.value
                        ? careerOptions.filter((option) =>
                            field.value
                              .map((item: any) => item.name)
                              .includes(option.value)
                          )
                        : []
                    }
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions
                          ? selectedOptions.map((option) => ({
                              name: option.value,
                            }))
                          : []
                      );
                    }}
                  />
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
              <p className="text-xs text-gray-text">select number of years</p>
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
              <p className="text-xs text-gray-text">
                select number of work experience
              </p>
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
              <input
                id="jobsToShowcase"
                type="number"
                {...register("jobsToShowcase")}
                className="border border-gray-border rounded-md py-2 px-4 w-full"
              />
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
        </div>
      </div>

      {/* CURRENT JOB */}
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <h3 className="text-2xl font-medium mb-5">Current Job</h3>
        <div className="flex flex-col gap-8">
          <div className={outerDivClass}>
            <div className={divClass}>
              <label htmlFor="workPlaceName" className="form-label">
                Name of Work or Business Place{" "}
                <span className="text-red">*</span>
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
          </div>

          <div className={outerDivClass}>
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
          </div>

          <div className={outerDivClass}>
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
            <CountrySelect
              label="Country Location of Current Job"
              name="countryLocation"
            />
          </div>

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

            <div className="w-full md:w-1/2 gap-8 flex flex-col">
              <div className={divClass}>
                <label htmlFor="startedDate" className="form-label">
                  Year and Month Ended <span className="text-red">*</span>
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
            </div>
          </div>

          <div className={outerDivClass}>
            <div className="w-full md:w-1/2 gap-8 flex flex-col">
              <div className={divClass}>
                <label htmlFor="startedDate" className="form-label">
                  Year and Month Started <span className="text-red">*</span>
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
              onClick={(e) => e.preventDefault()}
              className="w-full text-xs md:w-1/2 bg-red flex gap-2 md:text-base"
            >
              <img src={promptWhiteImage} alt="prompt" />
              Refine Job Summary and Key Achievements with eLDa AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
