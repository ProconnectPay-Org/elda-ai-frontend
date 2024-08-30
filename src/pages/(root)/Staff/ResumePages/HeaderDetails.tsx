import { Input } from "@/components/ui/input";
import { countryOptions, stateOptions } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep1FormData } from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import helpIcon from "@/assets/help-icon.svg";
import mailIcon from "@/assets/mail.svg";

const HeaderDetails = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ResumeStep1FormData>();

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <label htmlFor="">
          Email <span className="text-red">*</span>
        </label>
        <div className="w-full flex items-center gap-4 border border-[#667085] px-3 rounded-full overflow-hidden">
          <img src={mailIcon} alt="mail icon" />
          <Input
            type="email"
            className="bg-transparent focus:ring-0 focus-visible:ring-0 outline-none border-0 focus-within:ring-0 max-h-fit"
          />
          <img src={helpIcon} alt="help icon" />
        </div>
      </div>

      <div className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="firstName" className="text-[#344054]">
                Full Name <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
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
              <label htmlFor="phoneNumber" className="text-[#344054]">
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
                    inputClass="border border-gray-border rounded-full py-2 px-4"
                    inputStyle={{ width: "100%", height: "42px" }}
                    buttonStyle={{
                      backgroundColor: "white",
                      borderRadius: "100% 0 0 100%",
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
              <label htmlFor="surname" className="text-[#344054]">
                Email Address <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
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
              <label htmlFor="city" className="text-[#344054]">
                City <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
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
              <label htmlFor="stateOfResidence" className="text-[#344054]">
                State
                <span className="text-red">*</span>
              </label>
              <select
                id="state"
                {...register("state")}
                className="border border-gray-border h-[42px] rounded-full py-2 px-4"
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
              <label htmlFor="country" className="text-[#344054]">
                Country
                <span className="text-red">*</span>
              </label>
              <select
                id="country"
                {...register("country")}
                className="border border-gray-border rounded-full h-[42px] py-2 px-4"
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
              <label htmlFor="coreSkills" className="text-[#344054]">
                Core Skills <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
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
              <label htmlFor="profession" className="text-[#344054]">
                Profession <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
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
