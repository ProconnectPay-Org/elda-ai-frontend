import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  formatMonthDay,
  getDemonymFromISO,
  getErrorMessage,
} from "@/lib/utils";
import {
  AdvancedEducation,
  JobExperience,
  ResumeStep1FormData,
  updateCandidateProfile,
} from "@/types";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import helpIcon from "@/assets/help-icon.svg";
import mailIcon from "@/assets/mail.svg";
import { useParams } from "react-router-dom";
import { useCandidates } from "@/hooks/useCandidiates";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { updatePersonalDetails } from "@/lib/actions/staffresume.actions";
import { genderOptions } from "@/constants";
import CountrySelect from "@/components/CountrySelect";
import { Loader2 } from "lucide-react";

const HeaderDetails = () => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<ResumeStep1FormData>();

  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Watch form values
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (singleCandidate) {      
      const sortedAdvancedEducation = singleCandidate.advanced_education.sort(
        (a: AdvancedEducation, b: AdvancedEducation) => a.id - b.id
      );

      // Store only the lowest ID in cookies
      if (sortedAdvancedEducation.length > 0) {
        Cookies.set(
          "advanced_education1_id",
          String(sortedAdvancedEducation[0].id),
          {
            expires: 7,
          }
        );
      }
      Cookies.set("studentId", singleCandidate.id);
      Cookies.set("studentCareerId", singleCandidate.career[0].id);
      Cookies.set("studentEducationId", singleCandidate.education[0].id);
      const sortedJobExperiences = singleCandidate.job_experience.sort(
        (a: JobExperience, b: JobExperience) => a.id - b.id
      );

      // Slice the sorted array to get only the first 3 IDs
      const topThreeJobExperiences = sortedJobExperiences.slice(0, 3);

      // Save the top three job experience IDs to cookies
      topThreeJobExperiences.forEach((job: JobExperience, index: number) => {
        Cookies.set(`work_experience_id${index + 1}`, String(job.id), {
          expires: 7,
        });
      });

      // Optional: Clear any extra job experience cookies
      for (let i = topThreeJobExperiences.length + 1; i <= 3; i++) {
        Cookies.remove(`work_experience_id${i}`);
      }
      const foundCandidate = singleCandidate;

      setValue("email", foundCandidate.email_address || foundCandidate.user?.email || "");
      setValue("firstName", foundCandidate.first_name || "");
      setValue("middleName", foundCandidate.middle_name || "");
      setValue("lastName", foundCandidate.last_name || "");
      setValue("phoneNumber", foundCandidate.phone_number || "");
      setValue("city", foundCandidate.city_of_birth || "");
      setValue("state", foundCandidate.state_of_birth || "");
      setValue("gender", foundCandidate.gender || "");
      setValue("dateOfBirth", foundCandidate.birth_date || "");
      setValue("nationality", foundCandidate.country_of_birth || "");
      setValue("preferredName", foundCandidate.preferred_call_name || "");
      setValue("country", foundCandidate.country_of_birth || "");
    }
  }, [singleCandidate, id, setValue]);

  useEffect(() => {
    if (singleCandidate) {
      // Define the type for initialValues explicitly
      const initialValues: Record<keyof typeof watchedValues, string> = {
        email: singleCandidate.email_address || singleCandidate.user?.email || "",
        firstName: singleCandidate.first_name || "",
        middleName: singleCandidate.middle_name || "",
        lastName: singleCandidate.last_name || "",
        phoneNumber: singleCandidate.phone_number || "",
        city: singleCandidate.city_of_birth || "",
        state: singleCandidate.state_of_birth || "",
        gender: singleCandidate.gender || "",
        dateOfBirth: singleCandidate.birth_date || "",
        nationality: singleCandidate.country_of_birth || "",
        preferredName: singleCandidate.preferred_call_name || "",
        country: singleCandidate.country_of_birth || "",
      };

      // Ensure keys match the watchedValues keys
      const hasChanges = (
        Object.keys(initialValues) as Array<keyof typeof initialValues>
      ).some((key) => watchedValues[key] !== initialValues[key]);

      setIsModified(hasChanges);
    }
  }, [watchedValues, singleCandidate]);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const personalData = {
      first_name: getValues("firstName"),
      middle_name: getValues("middleName"),
      last_name: getValues("lastName"),
      preferred_call_name: getValues("preferredName"),
      gender: getValues("gender"),
      birth_date: getValues("dateOfBirth"),
      country_of_birth: getValues("nationality"),
      city_of_birth: getValues("city"),
      state_of_birth: getValues("state"),
      phone_number: getValues("phoneNumber"),
      email_address: getValues("email"),
    } as updateCandidateProfile;

    try {
      await updatePersonalDetails(personalData);
      toast({
        variant: "success",
        title: "Success",
        description: "Updated successfully!",
      });
      setIsModified(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="space-y-10">
      {singleCandidateLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}
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
          <div className="flex items-center gap-2">
            <p className="font-semibold">Full Name: </p>
            <p>
              {getValues("firstName")} {getValues("middleName")}{" "}
              {getValues("lastName")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="firstName" className="text-[#344054]">
                First Name <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="firstName"
                {...register("firstName")}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.firstName)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="middleName" className="text-[#344054]">
                Middle Name <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="middleName"
                {...register("middleName")}
                placeholder="Enter your middle name"
              />
              {errors.middleName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.middleName)}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="lastName" className="text-[#344054]">
                Last Name <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="lastName"
                {...register("lastName")}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.lastName)}
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
              />
              {errors.state && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.state)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="gender">
                Gender <span className="text-red">*</span>
              </label>
              <div className="relative">
                <select
                  id="gender"
                  {...register("gender")}
                  className="border w-full border-gray-border bg-white h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 pr-8"
                >
                  <option value="">Select your gender</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
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
              {errors.gender && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.gender)}
                </span>
              )}
            </div>

            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="dateOfBirth">
                Date of Birth <span className="text-red">*</span>
              </label>
              <input
                type="date"
                className="border border-gray-border bg-white min-w-[240px] w-full h-[42px] rounded-md py-2 px-4"
                id="dateOfBirth"
                {...register("dateOfBirth")}
                placeholder="Enter your date of birth"
              />
              <p className="text-blue-500 text-sm mt-1">
                {watchedValues.dateOfBirth
                  ? formatMonthDay(watchedValues.dateOfBirth)
                  : "Select a date"}
              </p>
              {errors.dateOfBirth && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.dateOfBirth)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="w-full sm:w-1/2">
              <CountrySelect label="Nationality" name="nationality" />
              <p className="text-blue-500 text-sm mt-1">
                {watchedValues.nationality
                  ? getDemonymFromISO(watchedValues.nationality)
                  : "Select a country"}
              </p>
            </div>
            {/* <div className="flex flex-col sm:w-1/2">
              <label htmlFor="nationality" className="text-[#344054]">
                Nationality
              </label>
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
            </div> */}
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="preferredName">
                Preferred Call Name <span className="text-red">*</span>
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="preferredName"
                {...register("preferredName")}
                placeholder="Enter your preferred name"
              />
              {errors.preferredName && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.preferredName)}
                </span>
              )}
            </div>
          </div>

          <div>
            <Button
              className={`bg-red ${
                !isModified || isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSave}
              disabled={!isModified || isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDetails;
