import { getErrorMessage } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInputField = ({ name, label }: { name: string; label?: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col md:w-1/2">
      <label htmlFor={name}>
        {label || 'Phone Number'} <span className="text-red">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <ReactPhoneInput
            country={"ng"}
            inputProps={{
              name: { name },
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
      {errors[name] && (
        <span className="text-red text-sm">{getErrorMessage(errors.name)}</span>
      )}
    </div>
  );
};

export default PhoneInputField;
