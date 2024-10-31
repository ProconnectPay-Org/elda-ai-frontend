import { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { State } from "country-state-city";
import { IState } from "country-state-city";
import { getErrorMessage } from "@/lib/utils";

const StateSelect = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const [states, setStates] = useState<IState[]>([]);
  const selectedCountry = watch("countryOfResidence");

  useEffect(() => {
    if (selectedCountry) {
      const statesOfCountry = State.getStatesOfCountry(selectedCountry);
      setStates(statesOfCountry);
    }
  }, [selectedCountry]);

  return (
    <div className="flex flex-col sm:w-1/2">
      <label htmlFor="stateOfResidence">
        State of Residence <span className="text-red">*</span>
      </label>
      <Controller
        name="stateOfResidence"
        control={control}
        render={({ field }) => (
          <div className="relative">
            <select
              {...field}
              className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.name}>
                  {state.name}
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
      {errors.stateOfResidence && (
        <span className="text-red text-sm">
          {getErrorMessage(errors.cityOfResidence)}
        </span>
      )}
    </div>
  );
};

export default StateSelect;
