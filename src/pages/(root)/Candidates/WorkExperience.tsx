// components/Step2.tsx

import { getErrorMessage } from "@/lib/utils";
import { Step3FormData } from "@/types";
import { useFormContext } from "react-hook-form";

const WorkExperience = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Step3FormData>();

  return (
    <div className="flex flex-col gap-10">
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="profession" className="form-label">
                Profession
              </label>
              <input
                id="profession"
                type="text"
                {...register("profession")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.profession && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.profession)}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="sectorOfProfession" className="form-label">
                Sector of Profession
              </label>
              <input
                id="sectorOfProfession"
                type="text"
                {...register("sectorOfProfession")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
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
                Technical Skill
              </label>
              <input
                id="technicalSkill"
                type="text"
                {...register("technicalSkill")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.technicalSkill && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.technicalSkill)}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="careerInterest" className="form-label">
                Career Interest
              </label>
              <input
                id="careerInterest"
                type="text"
                {...register("careerInterest")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
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
                Years of Professional Experience Post First Degree
              </label>
              <input
                id="yearsOfProfessionalExperiencePostFirstDegree"
                type="number"
                {...register("yearsOfProfessionalExperiencePostFirstDegree")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
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
                Years of Professional Experience Prior to Graduation
              </label>
              <input
                id="yearsOfProfessionalExperiencePriorToGraduation"
                type="number"
                {...register("yearsOfProfessionalExperiencePriorToGraduation")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
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
                How Many Jobs Do You Want to Showcase?
              </label>
              <input
                id="jobsToShowcase"
                type="number"
                {...register("jobsToShowcase")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.jobsToShowcase && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.jobsToShowcase)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="workPlaceName" className="form-label">
                Name of Work Place
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
                Current Professional Status
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
                Current Job Title
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
                Employment Type
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
                State/Province Location of Current Job
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
                Country Location of Current Job
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
                Year and Month Started
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
                Year and Month Started
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
                Job Summary
              </label>
              <textarea
                id="jobSummary"
                {...register("jobSummary")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.jobSummary && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.jobSummary)}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="jobSummary" className="form-label">
                Job Summary
              </label>
              <textarea
                id="jobSummary"
                {...register("jobSummary")}
                className="border border-gray-border rounded-md py-2 px-4"
              />
              {errors.jobSummary && (
                <p className="text-red text-sm">
                  {getErrorMessage(errors.jobSummary)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
