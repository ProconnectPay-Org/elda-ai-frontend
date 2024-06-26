// components/Step2.tsx
import { getErrorMessage } from "@/lib/utils";
import { Step2FormData } from "@/types";
import { useFormContext } from "react-hook-form";

const EducationDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  return (
    <div className="flex flex-col gap-10">
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="currentStatus">Current Status</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="currentStatus"
                {...register("currentStatus")}
                placeholder="Enter your current status"
              />
              {errors.currentStatus && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.currentStatus)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="degreeType">Degree Type</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="degreeType"
                {...register("degreeType")}
                placeholder="Enter your degree type"
              />
              {errors.degreeType && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.degreeType)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="country">Country</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="country"
                {...register("country")}
                placeholder="Enter your country"
              />
              {errors.country && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.country)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="courseOfStudy">Course of Study</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="courseOfStudy"
                {...register("courseOfStudy")}
                placeholder="Enter your course of study"
              />
              {errors.courseOfStudy && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.courseOfStudy)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="institutionName">Name of Institution</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="institutionName"
                {...register("institutionName")}
                placeholder="Enter the name of institution"
              />
              {errors.institutionName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.institutionName)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="degreeClass">Class of Degree</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="degreeClass"
                {...register("degreeClass")}
                placeholder="Enter your class of degree"
              />
              {errors.degreeClass && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.degreeClass)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="currentCGPA">Current CGPA</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="currentCGPA"
                {...register("currentCGPA")}
                placeholder="Enter your current CGPA"
              />
              {errors.currentCGPA && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.currentCGPA)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="yearAdmitted">Year Admitted</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="yearAdmitted"
                type="number"
                {...register("yearAdmitted")}
                placeholder="Enter the year you were admitted"
              />
              {errors.yearAdmitted && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.yearAdmitted)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="yearGraduated">Year Graduated</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="yearGraduated"
                type="number"
                {...register("yearGraduated")}
                placeholder="Enter the year you graduated"
              />
              {errors.yearGraduated && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.yearGraduated)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="advancedDegree">
                Do you have an advanced degree?
              </label>
              <select
                className="border border-gray-border rounded-md py-2 px-4"
                id="advancedDegree"
                {...register("advancedDegree")}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.advancedDegree && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.advancedDegree)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="country">Advanced Degree Type</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="country"
                {...register("country")}
                placeholder="Enter your country"
              />
              {errors.country && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.country)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="courseOfStudy">Graduate Type</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="courseOfStudy"
                {...register("courseOfStudy")}
                placeholder="Enter your course of study"
              />
              {errors.courseOfStudy && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.courseOfStudy)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="advancedDegree">
                Do you have an advanced degree?
              </label>
              <select
                className="border border-gray-border rounded-md py-2 px-4"
                id="advancedDegree"
                {...register("advancedDegree")}
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.advancedDegree && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.advancedDegree)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="degreeClass">Class of Degree</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="degreeClass"
                {...register("degreeClass")}
                placeholder="Enter your class of degree"
              />
              {errors.degreeClass && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.degreeClass)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="institutionName">Name of Institution</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="institutionName"
                {...register("institutionName")}
                placeholder="Enter the name of institution"
              />
              {errors.institutionName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.institutionName)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="currentCGPA">Specific CGPA</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="currentCGPA"
                {...register("currentCGPA")}
                placeholder="Enter your current CGPA"
              />
              {errors.currentCGPA && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.currentCGPA)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="yearAdmitted">Year Admitted</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="yearAdmitted"
                type="number"
                {...register("yearAdmitted")}
                placeholder="Enter the year you were admitted"
              />
              {errors.yearAdmitted && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.yearAdmitted)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="yearGraduated">Year Graduated</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="yearGraduated"
                type="number"
                {...register("yearGraduated")}
                placeholder="Enter the year you graduated"
              />
              {errors.yearGraduated && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.yearGraduated)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EducationDetails;
