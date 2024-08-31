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
          <select
            {...field}
            className="border border-gray-border rounded-md h-[42px] py-2 px-4"
          >
            <option value="">Select your state</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
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
