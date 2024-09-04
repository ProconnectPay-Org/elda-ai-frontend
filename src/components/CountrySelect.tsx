// components/CountrySelect.tsx
import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Country } from "country-state-city";
import { ICountry } from "country-state-city";
import { getErrorMessage } from "@/lib/utils";

interface CountrySelectProps {
  label: string;
  name: string;
  smallText?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  name,
  smallText,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // Destructure errors from formState
  const [countries, setCountries] = useState<ICountry[]>([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  return (
    <div className="flex flex-col sm:w-1/2">
      <label htmlFor={name}>
        {label} <span className="text-red">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <select
            id={name}
            value={value}
            onChange={onChange}
            className={`border border-gray-border h-[42px] bg-white rounded-md py-2 px-4 ${
              errors[name] ? "border-red-500" : ""
            }`}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        )}
      />
      <p className="text-xs text-gray-text">{smallText && smallText}</p>
      {/* Error message */}
      {errors[name] && (
        <span className="text-red text-sm">{getErrorMessage(errors.name)}</span>
      )}
    </div>
  );
};

export default CountrySelect;
