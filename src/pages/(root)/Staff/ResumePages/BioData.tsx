import { ResumeStep2FormData } from "@/types";
import {
  formatMonthDay,
  getDemonymFromISO,
  getErrorMessage,
} from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCandidates } from "@/hooks/useCandidiates";

const BioData = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ResumeStep2FormData>();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (singleCandidate) {
      const foundCandidate = singleCandidate;

      setValue("gender", foundCandidate.gender || "");
      setValue("dateOfBirth", formatMonthDay(foundCandidate.birth_date) || "");
      setValue(
        "nationality",
        getDemonymFromISO(foundCandidate.country_of_birth) || ""
      );

      const rawCareerInterests = foundCandidate.career?.[0]?.career_interests;
      let careerInterests: string[] = [];

      if (Array.isArray(rawCareerInterests)) {
        careerInterests = rawCareerInterests.map(
          (interest: any) =>
            typeof interest === "string" ? interest : interest.name || "" // Handle both string and object cases
        );
      }

      setValue("interest", careerInterests);
    }
  }, [singleCandidate, id, setValue]);

  if (singleCandidateLoading) {
    return <div>Loading...</div>;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p>
          <span className="font-semibold">PREFERRED CALL NAME: </span>
          <span className="capitalize">
            {singleCandidate?.preferred_call_name}
          </span>
        </p>
      </div>
      <div className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="gender" className="text-[#344054]">
                Gender <span className="text-red">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="gender"
                {...register("gender")}
                disabled
              />
              {errors.gender && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.gender)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="dateOfBirth" className="text-[#344054]">
                Date of Birth <span className="text-red">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-border h-[42px] rounded-md py-2 px-4"
                id="dateOfBirth"
                {...register("dateOfBirth")}
                placeholder="Enter your date of birth"
                disabled
              />
              {errors.dateOfBirth && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.dateOfBirth)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="nationality" className="text-[#344054]">
                Nationality
              </label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="nationality"
                {...register("nationality")}
                placeholder="Nigerian"
                disabled
              />
              {errors.nationality && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.nationality)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="interest" className="text-[#344054]">
                Career Interest(s)
              </label>
              <Controller
                name="interest"
                control={control}
                rules={{
                  required: "Please select at least one career interest.",
                  validate: (value) =>
                    value.length <= 3 ||
                    "You can only select up to 3 career interests.",
                }}
                render={({ field }) => (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "0.35rem",
                      padding: "8px",
                    }}
                  >
                    {field.value?.map((interest: string, index: number) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#e0e7ff",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          marginRight: "5px",
                          marginBottom: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {interest}
                        <button
                          onClick={() => {
                            const updatedInterests = field.value.filter(
                              (_: string, i: number) => i !== index
                            );
                            field.onChange(updatedInterests);
                          }}
                          style={{
                            marginLeft: "5px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#ff4d4f",
                            fontSize: "12px",
                          }}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Type and press comma, full stop or click outside to add"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        const isDelimiter = e.key === "," || e.key === ".";
                        if (isDelimiter && inputValue.trim()) {
                          if ((field.value || []).length >= 3) {
                            e.preventDefault();
                            alert("You can only add up to 3 career interests.");
                            return;
                          }
                          field.onChange([
                            ...(field.value || []),
                            inputValue.trim(),
                          ]);
                          setInputValue("");
                          e.preventDefault();
                        }
                      }}
                      onBlur={() => {
                        if (inputValue.trim()) {
                          if ((field.value || []).length >= 3) {
                            alert("You can only add up to 3 career interests.");
                            return;
                          }
                          field.onChange([
                            ...(field.value || []),
                            inputValue.trim(),
                          ]);
                          setInputValue("");
                        }
                      }}
                      style={{
                        border: "none",
                        outline: "none",
                        minWidth: "100px",
                        flexGrow: 1,
                      }}
                    />
                  </div>
                )}
              />

              {errors.interest && (
                <span className="text-red text-sm">{errors.interest}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioData;
