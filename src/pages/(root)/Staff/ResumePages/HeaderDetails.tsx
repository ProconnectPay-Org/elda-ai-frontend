import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep1FormData } from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import helpIcon from "@/assets/help-icon.svg";
import mailIcon from "@/assets/mail.svg";
import { useParams } from "react-router-dom";
import { useCandidates } from "@/hooks/useCandidiates";
import Cookies from "js-cookie";

const HeaderDetails = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<ResumeStep1FormData>();

  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  useEffect(() => {
    if (singleCandidate) {
      console.log(singleCandidate);
            
      Cookies.set("studentId", singleCandidate.id)
      Cookies.set("studentCareerId", singleCandidate.career[0].id)
      Cookies.set("studentEducationId", singleCandidate.education[0].id)
      const foundCandidate = singleCandidate;
      setValue("fullName", foundCandidate.user?.full_name || "");
      setValue("phoneNumber", foundCandidate.phone_number || "");
      setValue("email", foundCandidate.user?.email || "");
      setValue("city", foundCandidate.city_of_birth || "");
      setValue("state", foundCandidate.state_of_birth || "");
      setValue("country", foundCandidate.country_of_birth || "");
      setValue("profession", foundCandidate.career[0]?.profession || "");
    }
  }, [singleCandidate, id, setValue]);

  if (singleCandidateLoading) {
    return <div>Loading...</div>;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <label htmlFor="">
          Email <span className="text-red">*</span>
        </label>
        <div className="w-full flex items-center gap-0 border border-[#667085] px-3 rounded-md overflow-hidden">
          <img src={mailIcon} alt="mail icon" />
          <Input
            type="email"
            className="bg-transparent focus:ring-0 focus-visible:ring-0 outline-none border-0 focus-within:ring-0 max-h-fit"
            {...register("email")}
            placeholder="Enter your email"
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
                className="border border-gray-border rounded-md py-2 px-4"
                id="fullName"
                {...register("fullName")}
                placeholder="Enter your full name"
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
                    inputClass="border border-gray-border py-2 px-4"
                    inputStyle={{ width: "100%", height: "42px" }}
                    buttonStyle={{
                      backgroundColor: "white",
                      // borderRadius: "100% 0 0 100%",
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
              <label htmlFor="city" className="text-[#344054]">
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
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="stateOfResidence" className="text-[#344054]">
                State <span className="text-red">*</span>
              </label>
              <input
                type="text"
                {...register("state")}
                className="border bg-white border-gray-border h-[42px] rounded-md py-2 px-4"
                disabled
              />
              {errors.state && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.state)}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="profession" className="text-[#344054]">
                Profession <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="profession"
                {...register("profession")}
                placeholder="Enter your profession"
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
