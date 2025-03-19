import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import SaveBtn from "../SaveBtn";
import { Button } from "../ui/button";
import { countriesOfInterestOptions } from "@/constants";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import Cookies from "js-cookie";
import axios from "axios";

const CountrySelector = () => {
  const { control, formState, getValues } = useFormContext();
  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const { toast } = useToast();
  const API_URL = "https://elda-ai-drf.onrender.com/api/onboarding-candidate/s";

  const handleSaveCountries = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const email = getValues("emailAddress");

    if (!email) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Email is required to save country details!",
      });
      return;
    }

    // Retrieve selected countries from the form
    const selectedCountries: string[] = getValues("countriesOfInterest") || [];

    if (selectedCountries.length === 0) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please select at least one country!",
      });
      return;
    }

    // Get stored country IDs from cookies
    const first_country_id = Cookies.get("first_country_id");
    const second_country_id = Cookies.get("second_country_id");

    try {
      setIsCountryLoading(true);
      if (
        first_country_id &&
        second_country_id &&
        selectedCountries.length === 2
      ) {
        // Case 1: Both IDs exist and two countries are selected -> Send each to respective ID
        await axios.post(`${API_URL}/${email}/countries/${first_country_id}`, {
          name: selectedCountries[0],
        });

        await axios.post(`${API_URL}/${email}/countries/${second_country_id}`, {
          name: selectedCountries[1],
        });
      } else if (first_country_id && selectedCountries.length === 1) {
        // Case 2: Only one ID exists -> Send first country to first_country_id
        await axios.post(`${API_URL}/${email}/countries/${first_country_id}`, {
          name: selectedCountries[0],
        });
      } else {
        // Case 3: No IDs exist -> Send all selected countries to default IDs (1 and 2)
        for (let i = 0; i < selectedCountries.length; i++) {
          const id = i + 1; // Use default IDs (1, 2)
          const response = await axios.post(
            `${API_URL}/${email}/countries/${id}`,
            {
              name: selectedCountries[i],
            }
          );
          // Save the response IDs to cookies
          if (i === 0) {
            Cookies.set("first_country_id", String(response.data.id));
          } else if (i === 1) {
            Cookies.set("second_country_id", String(response.data.id));
          }
        }
      }

      toast({
        title: "Success",
        variant: "success",
        description: "Country selection saved successfully!",
      });
    } catch (error) {
      console.error("Error saving countries:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to save selected countries.",
      });
    } finally {
      setIsCountryLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        Countries of Interest (Select up to 2){" "}
        <span className="text-red">*</span>
      </Label>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {countriesOfInterestOptions.map((country) => (
          <div key={country.value} className="flex items-center space-x-2">
            <Controller
              name="countriesOfInterest"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={country.value}
                    checked={(field.value || []).includes(country.value)}
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || [];
                      if (checked) {
                        if (currentValue.length < 2) {
                          field.onChange([...currentValue, country.value]);
                        }
                      } else {
                        field.onChange(
                          currentValue.filter(
                            (value: any) => value !== country.value
                          )
                        );
                      }
                    }}
                    disabled={
                      (field.value || []).length >= 2 &&
                      !(field.value || []).includes(country.value)
                    }
                  />
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://flagcdn.com/24x18/${
                        {
                          "United States": "us",
                          "United Kingdom": "gb",
                          Canada: "ca",
                          Australia: "au",
                          Germany: "de",
                          Switzerland: "ch",
                          Netherlands: "nl",
                          France: "fr",
                          Singapore: "sg",
                          "South Africa": "za",
                          Portugal: "pt",
                          China: "cn",
                          Spain: "es",
                          Italy: "it",
                          Japan: "jp",
                          Belgium: "be",
                          Denmark: "dk",
                          "Hong Kong": "hk",
                        }[country.value] || country.value.toLowerCase()
                      }.png`}
                      alt={`${country.label} flag`}
                      className="w-6 h-4 object-cover rounded-sm"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <label
                      htmlFor={country.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {country.label}
                    </label>
                  </div>
                </div>
              )}
            />
          </div>
        ))}
      </div>
      {formState.errors.countriesOfInterest &&
        typeof formState.errors.countriesOfInterest.message === "string" && (
          <p className="text-sm text-red">
            {formState.errors.countriesOfInterest.message}
          </p>
        )}
      <Button
        onClick={handleSaveCountries}
        className="bg-red"
        disabled={isCountryLoading}
      >
        {isCountryLoading ? <SaveBtn text="Saving" /> : "Save Countries"}
      </Button>
    </div>
  );
};

export default CountrySelector;
