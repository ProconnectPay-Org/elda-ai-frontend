import { useFormContext } from "react-hook-form";
import FormInput from "@/components/FormInput";
import PhoneInputField from "@/components/PhoneInputField";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { genderOptions, membershipOptions } from "@/constants";
import { calculateAge } from "@/lib/utils";

const PersonalInformationForm = () => {
  const { control, setValue, formState } = useFormContext();

  return (
    <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
      <h4 className="text-[25px] font-bold mb-6">Personal Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="md:col-span-2">
          <FormInput
            control={control}
            name="membershipStatus"
            label="Membership Status"
            type="select"
            placeholder="Select membership status"
            options={membershipOptions}
            asterisks="*"
          />
        </div>
        <div>
          <FormInput
            control={control}
            name="firstName"
            label="First Name"
            type="input"
            placeholder="Enter your first name"
            asterisks="*"
          />
          <span className="text-[12px] text-[#667085]">
            as on international passport
          </span>
        </div>

        <FormInput
          control={control}
          name="middleName"
          label="Middle Name"
          type="input"
          placeholder="Enter your middle name"
        />

        <FormInput
          control={control}
          name="surname"
          label="Surname"
          type="input"
          placeholder="Enter your surname"
          asterisks="*"
        />

        <div>
          <FormInput
            control={control}
            name="emailAddress"
            label="Email"
            type="input"
            placeholder="Enter your personal email address"
            disabled
            asterisks="*"
          />
          <span className="text-[12px] text-[#667085]">
            This will be used for the entire application process so give us the
            right personal email
          </span>
        </div>

        <PhoneInputField
          className="md:w-full"
          name="phoneNumber"
          label="Phone Number"
          labelName="font-medium text-sm"
        />
        <PhoneInputField
          name="whatsappNumber"
          label="WhatsApp Number"
          className="md:w-full"
          labelName="font-medium text-sm"
        />

        <FormInput
          control={control}
          name="gender"
          label="Gender"
          type="select"
          options={genderOptions}
          placeholder="Select your gender"
          asterisks="*"
        />
        <div className="mb-4">
          <label className="form-label text-sm font-medium mb-2">
            Date of Birth
          </label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <ReactDatePicker
                selected={field.value}
                onChange={(date: Date | null) => {
                  if (date) {
                    field.onChange(date);
                    // Calculate and set age when date changes
                    const age = calculateAge(date);
                    setValue("age", age);
                  }
                }}
                placeholderText="Select your date of birth"
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                maxDate={new Date()}
                wrapperClassName="w-full"
                className="w-full px-3 py-[7px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            )}
          />
          {formState.errors.dateOfBirth &&
            typeof formState.errors.dateOfBirth.message === "string" && (
              <p className="text-red-500 text-sm mt-1">
                {formState?.errors?.dateOfBirth?.message}
              </p>
            )}
        </div>
        <FormInput
          control={control}
          name="age"
          label="How old are you"
          type="number"
          placeholder="Enter your age as at today"
          className="cursor-not-allowed"
          asterisks="*"
        />
      </div>
    </div>
  );
};

export default PersonalInformationForm;
