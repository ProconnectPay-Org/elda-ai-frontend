import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Country } from "country-state-city";
import { ICountry } from "country-state-city";
import { getErrorMessage } from "@/lib/utils";

interface CountrySelectProps {
  label: string;
  name: string;
  smallText?: string;
  maxSelections?: number;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  name,
  smallText,
  maxSelections = 2,
}) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const selectedCountries = watch(name) || [];

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleCountryChange = (countryIsoCode: string) => {
    const country = countries.find((c) => c.isoCode === countryIsoCode);
    if (!country) return;

    const newSelection = [...selectedCountries];
    const countryIndex = newSelection.findIndex((c) => c.isoCode === countryIsoCode);

    if (countryIndex > -1) {
      // Remove country if already selected
      newSelection.splice(countryIndex, 1);
    } else if (newSelection.length < maxSelections) {
      // Add country if under max limit
      newSelection.push(country);
    }

    setValue(name, newSelection);
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name}>
        {label} <span className="text-red">*</span>
      </label>
      <Controller
        name={name}
        control={control}
        render={() => (
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedCountries.map((country: ICountry) => (
                <div
                  key={country.isoCode}
                  className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1"
                >
                  <img
                    src={`https://flagcdn.com/24x18/${country.isoCode.toLowerCase()}.png`}
                    alt={`${country.name} flag`}
                    className="w-6 h-4 object-cover"
                  />
                  <span>{country.name}</span>
                  <button
                    type="button"
                    onClick={() => handleCountryChange(country.isoCode)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <select
              id={name}
              onChange={(e) => handleCountryChange(e.target.value)}
              value=""
              className={`border border-gray-border w-full h-[42px] shadow-none bg-white rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 ${
                errors[name] ? "border-red-500" : ""
              }`}
              disabled={selectedCountries.length >= maxSelections}
            >
              <option value="">
                {selectedCountries.length >= maxSelections
                  ? "Max countries selected"
                  : "Select a country"}
              </option>
              {countries.map((country) => (
                <option
                  key={country.isoCode}
                  value={country.isoCode}
                  disabled={selectedCountries.some((c: ICountry) => c.isoCode === country.isoCode)}
                >
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

      <p className="text-xs text-gray-text mt-1">
        {smallText || `Select up to ${maxSelections} countries`}
      </p>
      {errors[name] && (
        <span className="text-red text-sm">{getErrorMessage(errors[name])}</span>
      )}
    </div>
  );
};

export default CountrySelect;
