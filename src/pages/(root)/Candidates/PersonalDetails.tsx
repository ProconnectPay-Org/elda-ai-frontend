// components/Step1.tsx

import { getErrorMessage } from "@/lib/utils";
import { Step1FormData } from "@/types";
import { useFormContext } from "react-hook-form";

const PersonalDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Step1FormData>();

  return (
    <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="firstName">First Name</label>
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
            <label htmlFor="middleName">Middle Name</label>
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
            <label htmlFor="surname">Surname</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="surname"
              {...register("surname")}
              placeholder="Enter your surname"
            />
            {errors.surname && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.surname)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="preferredName">Preferred Call Name</label>
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
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
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
            <label htmlFor="gender">Gender</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="gender"
              {...register("gender")}
              placeholder="Enter your gender"
            />
            {errors.gender && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.gender)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="cityOfBirth">City of Birth</label>
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
            <label htmlFor="stateOfBirth">State of Birth</label>
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
            <label htmlFor="countryOfBirth">Country of Birth</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="countryOfBirth"
              {...register("countryOfBirth")}
              placeholder="Enter your country of birth"
            />
            {errors.countryOfBirth && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.countryOfBirth)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="emailAddress"
              {...register("emailAddress")}
              placeholder="Enter your email address"
            />
            {errors.emailAddress && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.emailAddress)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.phoneNumber)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="countryOfResidence">
              Country where you currently reside
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="countryOfResidence"
              {...register("countryOfResidence")}
              placeholder="Enter your country of residence"
            />
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
              State/Province where you currently reside
            </label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="stateOfResidence"
              {...register("stateOfResidence")}
              placeholder="Enter your state of residence"
            />
            {errors.stateOfResidence && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.stateOfResidence)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="cityOfResidence">City you currently reside</label>
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
            <label htmlFor="houseAddress">Current House Address</label>
            <input
              className="border border-gray-border rounded-md py-2 px-4"
              id="houseAddress"
              {...register("houseAddress")}
              placeholder="Enter your house adderess"
            />
            {errors.houseAddress && (
              <span className="text-red text-sm">
                {getErrorMessage(errors.houseAddress)}
              </span>
            )}
          </div>
          <div className="flex flex-col sm:w-1/2">
            <label htmlFor="postalAddress">Postal Address</label>
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
