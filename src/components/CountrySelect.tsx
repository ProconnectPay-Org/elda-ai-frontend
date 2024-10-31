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
    setValue,
    formState: { errors },
  } = useFormContext();
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
          <div className="relative w-full">
            <select
              id={name}
              value={value}
              onChange={(e) => {
                const selectedIsoCode = e.target.value;
                const selectedCountry = countries.find(
                  (country) => country.isoCode === selectedIsoCode
                );
                setValue(name, selectedCountry?.name || "");
                onChange(selectedIsoCode);
              }}
              className={`border border-gray-border w-full h-[42px] shadow-none bg-white rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 ${
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
