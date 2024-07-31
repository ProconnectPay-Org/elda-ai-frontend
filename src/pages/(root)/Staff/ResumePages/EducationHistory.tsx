import { Input } from "@/components/ui/input";
import { countryOptions, stateOptions } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep3FormData } from "@/types";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";

const EducationHistory = () => {
  const {
    register,
    // control,
    formState: { errors },
  } = useFormContext<ResumeStep3FormData>();

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="">What degrees do you have?</label>
        <Input type="email" className="rounded-full" />
      </div>
      <p>Choose the correct degree</p>
      <div className="border border-pale-bg bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <h3 className="font-bold mb-4 text-lg">Eductaion Information</h3>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="kindOfDegree">Kind of Degree</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="kindOfDegree"
                {...register("kindOfDegree")}
                placeholder="Enter your first name"
              />
              {errors.kindOfDegree && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.kindOfDegree)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="tertiaryInstitutionAttended">
                Tertiary Institution Attended
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="tertiaryInstitutionAttended"
                {...register("tertiaryInstitutionAttended")}
                placeholder="Enter your first name"
              />
              {errors.tertiaryInstitutionAttended && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.tertiaryInstitutionAttended)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="city">City</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="city"
                {...register("city")}
                placeholder="Enter your city"
              />
              {errors.city && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.city)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="stateOfResidence">State</label>
              <select
                id="state"
                {...register("state")}
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
              >
                <option value="">Select your state</option>
                {stateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.state && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.state)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                {...register("country")}
                className="border border-gray-border rounded-md h-[42px] py-2 px-4"
              >
                <option value="">Select your country</option>
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.country)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="course">Course Studied</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="course"
                {...register("course")}
                placeholder="Enter your city of birth"
              />
              {errors.course && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.course)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="startDate"
                {...register("startDate")}
                placeholder="Enter your start date"
              />
              {errors.startDate && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.startDate)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="endDate"
                {...register("endDate")}
                placeholder="Enter your end date"
              />
              {errors.endDate && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.endDate)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationHistory;
