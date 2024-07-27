import { Input } from "@/components/ui/input";
import { countryOptions, stateOptions } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep1FormData } from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const HeaderDetails = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeStep1FormData>();

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <label htmlFor="">Email*</label>
        <Input type="email" className="rounded-full" />
      </div>
      <div className="border border-pale-bg bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="firstName">
                Full Name <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="fullName"
                {...register("fullName")}
                placeholder="Enter your first name"
              />
              {errors.fullName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.fullName)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="phoneNumber">
                Phone Number <span className="text-red">*</span>
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <ReactPhoneInput
                    country={"ng"}
                    inputProps={{
                      name: "phoneNumber",
                      required: true,
                      ref,
                    }}
                    containerClass="react-tel-input"
                    inputClass="border border-gray-border rounded-md py-2 px-4"
                    inputStyle={{ width: "100%", height: "42px" }}
                    buttonStyle={{
                      backgroundColor: "white",
                      borderRadius: "8px 0 0 8px",
                      borderColor: "#66666",
                    }}
                    value={value}
                    onChange={(phone) => onChange(phone)}
                    placeholder="Enter your phone number"
                  />
                )}
              />
              {errors.phoneNumber && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.phoneNumber)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="surname">
                Email Address <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="email"
                {...register("email")}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.email)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="city">
                City <span className="text-red">*</span>
              </label>
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
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="stateOfResidence">
                State
                <span className="text-red">*</span>
              </label>
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
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="country">
                Country
                <span className="text-red">*</span>
              </label>
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
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="coreSkills">
                Core Skills <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="coreSkills"
                {...register("coreSkills")}
                placeholder="Enter your city of birth"
              />
              {errors.coreSkills && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.coreSkills)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="profession">
                Profession <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="profession"
                {...register("profession")}
                placeholder="Enter your state of birth"
              />
              {errors.profession && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.profession)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDetails;
