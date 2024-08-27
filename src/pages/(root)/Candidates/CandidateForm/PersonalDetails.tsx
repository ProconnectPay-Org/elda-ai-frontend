import { countryOptions, genderOptions, stateOptions } from "@/constants";
import { getErrorMessage } from "@/lib/utils";
import { Step1FormData } from "@/types";
import { Controller, useFormContext } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PersonalDetails = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<Step1FormData>();

  return (
    <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
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
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="countryOfBirth">
              Country of Birth <span className="text-red">*</span>
            </label>
            <select
              id="countryOfBirth"
              {...register("countryOfBirth")}
              className="border border-gray-border h-[42px] rounded-md py-2 px-4"
            >
              <option value="">Select your country</option>
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.countryOfBirth && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.countryOfBirth)}
              </span>
            )}
          </div>
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
                  inputStyle={{ width: "100%", height:"42px" }}
                  buttonStyle={{backgroundColor:"white", borderRadius:"8px 0 0 8px", borderColor: "#66666"}}
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
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="countryOfResidence">
              Country where you currently reside{" "}
              <span className="text-red">*</span>
            </label>
            <select
              id="countryOfResidence"
              {...register("countryOfResidence")}
              className="border border-gray-border rounded-md h-[42px] py-2 px-4"
            >
              <option value="">Select your country</option>
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.countryOfResidence && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.countryOfResidence)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="stateOfResidence">
              State/Province where you currently reside{" "}
              <span className="text-red">*</span>
            </label>
            <select
              id="stateOfResidence"
              {...register("stateOfResidence")}
              className="border border-gray-border h-[42px] rounded-md py-2 px-4"
            >
              <option value="">Select your state</option>
              {stateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.stateOfResidence && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.stateOfResidence)}
              </span>
            )}
          </div>
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
