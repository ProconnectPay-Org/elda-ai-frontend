import { genderOptions } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { Step1FormData } from "@/types";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import StateSelect from "@/components/StateSelect";
import CountrySelect from "@/components/CountrySelect";
import PhoneInputField from "@/components/PhoneInputField";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPersonalDetails } from "@/lib/actions/candidate.actions";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

const PersonalDetails = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Step1FormData>();
  const candidateId = Cookies.get("candidate_id");

  const { isLoading, data: candidateData } = useQuery({
    queryKey: ["personalDetails", candidateId],
    queryFn: getPersonalDetails,
    staleTime: 5 * 1000,
    enabled: !!candidateId,
  });

  useEffect(() => {
    if (candidateData) {      
      setValue("firstName", candidateData.data.first_name || "");
      setValue("middleName", candidateData.data.middle_name || "");
      setValue("surname", candidateData.data.last_name || "");
      setValue("preferredName", candidateData.data.preferred_call_name || "");
      setValue("gender", candidateData.data.gender || "");
      setValue("dateOfBirth", candidateData.data.birth_date || "");
      setValue("cityOfBirth", candidateData.data.city_of_birth || "");
      setValue("stateOfBirth", candidateData.data.state_of_birth || "");
      setValue("countryOfBirth", candidateData.data.country_of_birth || "");
      setValue("emailAddress", candidateData.data.email_address || "");
      setValue("phoneNumber", candidateData.data.phone_number || "");
      setValue("countryOfResidence", candidateData.data.country_current_reside || "");
      setValue("stateOfResidence", candidateData.data.state_current_reside || "");
      setValue("cityOfResidence", candidateData.data.city_current_reside || "");
      setValue("houseAddress", candidateData.data.current_house_address || "");
      setValue("postalAddress", candidateData.data.postal_code || "");
    }
  }, [candidateData, setValue]);

  return (
    <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
      {isLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="firstName">
              First Name <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="firstName"
              {...register("firstName")}
              placeholder="Enter your first name"
            />
            <p className="text-xs text-gray-text">
              as on international passport
            </p>
            {errors.firstName && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.firstName)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="middleName">Middle Name</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="middleName"
              {...register("middleName")}
              placeholder="Enter your middle name"
            />
            <p className="text-xs text-gray-text">
              as on international passport
            </p>
            {errors.middleName && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.middleName)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="surname">
              Surname <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="surname"
              {...register("surname")}
              placeholder="Enter your surname"
            />
            <p className="text-xs text-gray-text">
              as on international passport
            </p>
            {errors.surname && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.surname)}
              </span>
            )}
          </div>
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

        <div className="flex flex-col-reverse sm:flex-row-reverse sm:justify-between gap-4 md:gap-8">
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
            {errors.dateOfBirth && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.dateOfBirth)}
              </span>
            )}
          </div>
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
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="cityOfBirth">
              City of Birth <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="cityOfBirth"
              {...register("cityOfBirth")}
              placeholder="Enter your city of birth"
            />
            {errors.cityOfBirth && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.cityOfBirth)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="stateOfBirth">
              State of Birth <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="stateOfBirth"
              {...register("stateOfBirth")}
              placeholder="Enter your state of birth"
            />
            {errors.stateOfBirth && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.stateOfBirth)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <CountrySelect label="Country of Birth" name="countryOfBirth" />
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="emailAddress">
              Email Address <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="emailAddress"
              {...register("emailAddress")}
              placeholder="Enter your email address"
            />
            <p className="text-xs text-gray-text">
              this will be used for admission and loan processing
            </p>
            {errors.emailAddress && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.emailAddress)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <PhoneInputField name="phoneNumber" />
          <CountrySelect
            label="Country where you currently reside"
            name="countryOfResidence"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <StateSelect />
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="cityOfResidence">
              City you currently reside <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="cityOfResidence"
              {...register("cityOfResidence")}
              placeholder="Enter your city of residence"
            />
            {errors.cityOfResidence && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.cityOfResidence)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="houseAddress">
              Current House Address <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="houseAddress"
              {...register("houseAddress")}
              placeholder="Enter your house address"
            />
            <p className="text-xs text-gray-text">
              consistent with utility slip
            </p>
            {errors.houseAddress && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.houseAddress)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="postalAddress">
              Postal Code <span className="text-red">*</span>
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="postalAddress"
              {...register("postalAddress")}
              placeholder="Enter your postal address"
            />
            {errors.postalAddress && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.postalAddress)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
