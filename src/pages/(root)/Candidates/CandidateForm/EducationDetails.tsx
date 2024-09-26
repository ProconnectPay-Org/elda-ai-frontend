import { getErrorMessage } from "@/lib/utils";
import { Step2FormData } from "@/types";
import { useFormContext } from "react-hook-form";
import CountrySelect from "@/components/CountrySelect";

const EducationDetails = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Step2FormData>();

  const hasAdvancedDegree = watch("advancedDegree") === "yes";

  const inputClass = "border border-gray-border rounded-md py-2 px-4 h-10";

  return (
    <div className="flex flex-col gap-10">
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="currentStatus">
                Current Status <span className="text-red">*</span>
              </label>
              <select
                className={inputClass}
                id="currentStatus"
                {...register("currentStatus")}
              >
                <option value="">Select status</option>
                <option value="student">Student</option>
                <option value="graduate">Graduate</option>
              </select>
              {errors.currentStatus && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.currentStatus)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="degreeType">
                Degree Type <span className="text-red">*</span>
              </label>
              <select
                className={inputClass}
                id="degreeType"
                {...register("degreeType")}
              >
                <option value="">Select degree type</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PHD</option>
              </select>
              {errors.degreeType && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.degreeType)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <CountrySelect
              label="Country"
              name="countryOfEducation"
              smallText="location of the school you attended"
            />
            <div className="flex flex-col w-1/2">
              <label htmlFor="courseOfStudy">
                Specific Course of study (Computer science, Electrical
                engineering) <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
                id="courseOfStudy"
                {...register("courseOfStudy")}
                placeholder="Enter your course of study"
              />
              <p className="text-xs text-gray-text">write in full</p>
              {errors.courseOfStudy && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.courseOfStudy)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="institutionName">
                Name of Tertiary Institution attended{" "}
                <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
                id="institutionName"
                {...register("institutionName")}
                placeholder="Enter the name of institution"
              />
              <p className="text-xs text-gray-text">write in full</p>
              {errors.institutionName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.institutionName)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="degreeClass">
                Class of Degree <span className="text-red">*</span>
              </label>
              <select
                className={inputClass}
                id="degreeClass"
                {...register("degreeClass")}
              >
                <option value="">Select class of degree</option>
                <option value="first_class">First Class</option>
                <option value="second_class">Second Class</option>
                <option value="third_class">Third Class</option>
                <option value="no_class">No Class</option>
                <option value="other">Other</option>
              </select>
              <p className="text-xs text-gray-text">
                select your class of degree you graduated with
              </p>
              {errors.degreeClass && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.degreeClass)}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="currentCGPA">
                Specific CGPA (e.g 3.5/5.0) <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
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
              <label htmlFor="yearAdmitted">
                Year Admitted <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
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
              <label htmlFor="yearGraduated">
                Year Graduated <span className="text-red">*</span>
              </label>
              <input
                className={inputClass}
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
                Do you have an advanced degree?{" "}
                <span className="text-red">*</span>
              </label>
              <select
                className={inputClass}
                id="advancedDegree"
                {...register("advancedDegree")}
                // onChange={handleAdvancedDegreeChange}
              >
                <option value="">Select one</option>
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

      {hasAdvancedDegree && (
        <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between gap-4 md:gap-8">
              <div className="flex flex-col w-1/2">
                <label htmlFor="advancedDegreeType">
                  Advanced Degree Type <span className="text-red">*</span>
                </label>
                <select
                  className={inputClass}
                  id="advancedDegreeType"
                  {...register("advancedDegreeType")}
                >
                  <option value="">Select advanced degree type</option>
                  <option value="master">Master</option>
                  <option value="doctorate">Doctorate</option>
                  <option value="postdoc">Postdoc</option>
                </select>
                {errors.advancedDegreeType && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.advancedDegreeType)}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="graduateType">
                  Graduate Type <span className="text-red">*</span>
                </label>
                <input
                  className={inputClass}
                  id="graduateType"
                  {...register("graduateType")}
                  placeholder="Enter your course of study"
                />
                {errors.graduateType && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.graduateType)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-4 md:gap-8">
              <CountrySelect
                label="Country"
                name="advancedCountry"
                smallText="location of the school you attended"
              />
              <div className="flex flex-col w-1/2">
                <label htmlFor="advancedDegreeClass">
                  Class of Degree <span className="text-red">*</span>
                </label>
                <select
                  className={inputClass}
                  id="advancedDegreeClass"
                  {...register("advancedDegreeClass")}
                >
                  <option value="">Select class of degree</option>
                  <option value="first">First Class</option>
                  <option value="secondUpper">Second Class Upper</option>
                  <option value="secondLower">Second Class Lower</option>
                  <option value="third">Third Class</option>
                </select>
                {errors.advancedDegreeClass && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.advancedDegreeClass)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-4 md:gap-8">
              <div className="flex flex-col w-1/2">
                <label htmlFor="advancedInstitutionName">
                  Name of tertiary institution attended{" "}
                  <span className="text-red">*</span>
                </label>
                <input
                  className={inputClass}
                  id="advancedInstitutionName"
                  {...register("advancedInstitutionName")}
                  placeholder="Enter the name of institution"
                />
                {errors.advancedInstitutionName && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.advancedInstitutionName)}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="advancedCurrentCGPA">
                  Specific CGPA (e.g 3.5/5.0){" "}
                  <span className="text-red">*</span>
                </label>
                <input
                  className={inputClass}
                  id="advancedCurrentCGPA"
                  {...register("advancedCurrentCGPA")}
                  placeholder="Enter your current CGPA"
                />
                {errors.advancedCurrentCGPA && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.advancedCurrentCGPA)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-4 md:gap-8">
              <div className="flex flex-col w-1/2">
                <label htmlFor="advancedYearAdmitted">
                  Year Admitted <span className="text-red">*</span>
                </label>
                <input
                  className={inputClass}
                  id="advancedYearAdmitted"
                  type="number"
                  {...register("advancedYearAdmitted")}
                  placeholder="Enter the year you were admitted"
                />
                {errors.advancedYearAdmitted && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.advancedYearAdmitted)}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="advancedYearGraduated">
                  Year Graduated <span className="text-red">*</span>
                </label>
                <input
                  className={inputClass}
                  id="advancedYearGraduated"
                  type="number"
                  {...register("advancedYearGraduated")}
                  placeholder="Enter the year you graduated"
                />
                {errors.advancedYearGraduated && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.advancedYearGraduated)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationDetails;
