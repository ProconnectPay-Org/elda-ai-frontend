// components/Step2.tsx

import CountrySelect from "@/components/CountrySelect";
import { careerOptions } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { Step3FormData } from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import promptImage from "@/assets/prompt.svg";
import promptWhiteImage from "@/assets/prompt-white.svg";
import { Button } from "@/components/ui/button";

const WorkExperience = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Step3FormData>();
  return (
    <div className="flex flex-col gap-10">
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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
            <div className="flex flex-col w-1/2">
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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
            <div className="flex flex-col w-1/2">
              <label htmlFor="careerInterest" className="form-label">
                Name 2 Career Interest <span className="text-red">*</span>
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
                            field.value.includes(option.value)
                          )
                        : []
                    }
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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
            <div className="flex flex-col w-1/2">
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-full">
              <label htmlFor="jobsToShowcase" className="form-label">
                How many JOBS do you want to showcase that show consistency?{" "}
                <span className="text-red">*</span>
              </label>
              <input
                id="jobsToShowcase"
                type="number"
                {...register("jobsToShowcase")}
                className="border border-gray-border rounded-md py-2 px-4"
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
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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

            <div className="flex flex-col w-1/2">
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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
            <div className="flex flex-col w-1/2">
              <label htmlFor="employmentType" className="form-label">
                Employment Type <span className="text-red">*</span>
              </label>
              <input
                id="employmentType"
                type="text"
                {...register("employmentType")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.employmentType && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.employmentType)}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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

          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
            <div className="w-full md:w-1/2 gap-8 flex flex-col">
              <div className="flex flex-col w-full">
                <label htmlFor="startedDate" className="form-label">
                  Year and Month Started <span className="text-red">*</span>
                </label>
                <input
                  id="startedDate"
                  type="month"
                  {...register("startedDate")}
                  className="border border-gray-border rounded-md py-2 px-4"
                />
                {errors.startedDate && (
                  <p className="text-red text-sm">
                    {getErrorMessage(errors.startedDate)}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="jobSummary" className="form-label">
                  Provide Company Description with Vision and Mission Statement{" "}
                  <span className="text-red">*</span>
                </label>
                <textarea
                  id="jobSummary"
                  {...register("jobSummary")}
                  className="border border-gray-border rounded-md py-2 px-4"
                />
                <p className="text-xs text-gray-text">
                  Please describe in third person with the name of the company
                  prominently stated.
                </p>
                {errors.jobSummary && (
                  <p className="text-red text-sm">
                    {getErrorMessage(errors.jobSummary)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full md:w-1/2">
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
              className="w-full md:w-1/2 bg-red flex gap-2 text-sm md:text-base"
            >
              <img src={promptWhiteImage} alt="prompt" />
              Refine Job Summary and Key Achievements with eLDa AI
            </Button>
          </div>
        </div>
      </div>

      {/* FORMER JOB */}
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <h3 className="text-2xl font-medium mb-5">Former Job</h3>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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

            <div className="flex flex-col w-1/2">
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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
            <div className="flex flex-col w-1/2">
              <label htmlFor="employmentType" className="form-label">
                Employment Type <span className="text-red">*</span>
              </label>
              <input
                id="employmentType"
                type="text"
                {...register("employmentType")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.employmentType && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.employmentType)}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
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
            <div className="flex flex-col w-1/2">
              <label htmlFor="countryLocation" className="form-label">
                Country Location of Current Job{" "}
                <span className="text-red">*</span>
              </label>
              <select
                id="countryLocation"
                {...register("countryLocation")}
                className="border border-gray-border rounded-md py-2 px-4"
              >
                <option value="">Select a country</option>
                {/* Add options as needed */}
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                {/* Add other options here */}
              </select>
              {errors.countryLocation && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.countryLocation)}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="startedDate" className="form-label">
                Year and Month Started <span className="text-red">*</span>
              </label>
              <input
                id="startedDate"
                type="month"
                {...register("startedDate")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.startedDate && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.startedDate)}
                </p>
              )}
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="startedDate" className="form-label">
                Year and Month Ended <span className="text-red">*</span>
              </label>
              <input
                id="startedDate"
                type="month"
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="jobSummary" className="form-label">
                Provide Company Description with Vision and Mission Statement{" "}
                <span className="text-red">*</span>
              </label>
              <textarea
                id="jobSummary"
                {...register("jobSummary")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              <p className="text-xs text-gray-text">
                Please describe in third person with the name of the company
                prominently stated.
              </p>
              {errors.jobSummary && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.jobSummary)}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
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
              <p className="text-xs text-gray-text">
                Give us more than 3 sentences stating your Job Role and your Key
                Achievements
              </p>
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
              className="w-full md:w-1/2 bg-red flex gap-2 text-sm md:text-base"
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
