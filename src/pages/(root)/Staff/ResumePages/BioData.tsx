import { ResumeStep2FormData } from "@/types";
import { getErrorMessage } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { genderOptions } from "@/constants";
const BioData = () => {
  const {
    register,
    // control,
    formState: { errors },
  } = useFormContext<ResumeStep2FormData>();
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p>PREFERRED CALL NAME: VICTORY</p>
      </div>
      <div className="border border-pale-bg bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="gender">
                Gender <span className="text-red">*</span>
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
              >
                <option value="">Select your gender</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.gender)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="dateOfBirth">
                Date of Birth <span className="text-red">*</span>
              </label>
              <input
                type="date"
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="dateOfBirth"
                {...register("dateOfBirth")}
                placeholder="Enter your date of birth"
              />
              {errors.dateOfBirth && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.dateOfBirth)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="nationality">Nationality</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="nationality"
                {...register("nationality")}
                placeholder="Nigerian"
              />
              {errors.nationality && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.nationality)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="interest">Interest</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="interest"
                {...register("interest")}
              />
              {errors.interest && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.interest)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioData;
