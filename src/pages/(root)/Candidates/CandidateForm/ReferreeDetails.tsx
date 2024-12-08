import PhoneInputField from "@/components/PhoneInputField";
import { fetchReferee1, fetchReferee2 } from "@/lib/actions/candidate.actions";
import { getErrorMessage } from "@/lib/utils";
import { Step4FormData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Recommendation from "./Recommendation";

const relationshipOptions = [
  "father",
  "mother",
  "uncle",
  "aunt",
  "sister",
  "brother",
  "cousin",
];

const ReferreeDetails = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<Step4FormData>();

  const referee1Id = Cookies.get("referee1_id");
  const referee2Id = Cookies.get("referee2_id");

  const { isLoading: isReferee1Loading, data: referee1Data } = useQuery({
    queryKey: ["referee1Data"],
    queryFn: fetchReferee1,
    enabled: !!referee1Id,
    staleTime: 5 * 1000 * 60,
  });

  const { isLoading: isReferee2Loading, data: referee2Data } = useQuery({
    queryKey: ["referee2Data"],
    queryFn: fetchReferee2,
    enabled: !!referee2Id,
    staleTime: 5 * 1000 * 60,
  });

  useEffect(() => {
    if (referee1Data) {
      setValue("referee1fullname", referee1Data.name || "");
      setValue("referee1email", referee1Data.email || "");
      setValue("referee1phoneNumber", referee1Data.phone_number || "");
      setValue("referee1relationship", referee1Data.relationship || "");
    }
  }, [referee1Data, setValue]);

  useEffect(() => {
    if (referee2Data) {
      setValue("referee2fullname", referee2Data.name || "");
      setValue("referee2email", referee2Data.email || "");
      setValue("referee2phoneNumber", referee2Data.phone_number || "");
      setValue("referee2relationship", referee2Data.relationship || "");
    }
  }, [referee2Data, setValue]);

  const isLoading = isReferee1Loading || isReferee2Loading;

  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8">
        <Recommendation />

        <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl">Loan Referee Details 1</h2>
            <div className={outerDivClass}>
              <div className={divClass}>
                <label htmlFor="referee1fullname">
                  Full Name <span className="text-red">*</span>
                </label>
                <input
                  className="border border-gray-border rounded-md py-2 px-4"
                  id="referee1fullname"
                  {...register("referee1fullname")}
                  placeholder="Enter your full name"
                />
                {errors.referee1fullname && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.referee1fullname)}
                  </span>
                )}
              </div>
              <div className={divClass}>
                <label htmlFor="referee1email">
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  className="border border-gray-border rounded-md py-2 px-4"
                  id="referee1email"
                  {...register("referee1email")}
                  placeholder="Enter your email address"
                />
                {errors.referee1email && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.referee1email)}
                  </span>
                )}
              </div>
            </div>

            <div className={outerDivClass}>
              <PhoneInputField name="referee1phoneNumber" />
              <div className={divClass}>
                <label htmlFor="referee1relationship">
                  Relationship <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <select
                    className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    id="referee1relationship"
                    {...register("referee1relationship")}
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
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
                {errors.referee1relationship && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.referee1relationship)}
                  </span>
                )}
              </div>
            </div>

            <h2 className="text-2xl">Loan Referee Details 2</h2>

            <div className={outerDivClass}>
              <div className={divClass}>
                <label htmlFor="referee2fullname">
                  Full Name <span className="text-red">*</span>
                </label>
                <input
                  className="border border-gray-border rounded-md py-2 px-4"
                  id="referee2fullname"
                  {...register("referee2fullname")}
                  placeholder="Enter referee's full name"
                />
                {errors.referee2fullname && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.referee2fullname)}
                  </span>
                )}
              </div>
              <div className={divClass}>
                <label htmlFor="referee2email">
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  className="border border-gray-border rounded-md py-2 px-4"
                  id="referee2email"
                  {...register("referee2email")}
                  placeholder="Enter referee's email address"
                />
                {errors.referee2email && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.referee2email)}
                  </span>
                )}
              </div>
            </div>

            <div className={outerDivClass}>
              <PhoneInputField name="referee2phoneNumber" />
              <div className={divClass}>
                <label htmlFor="referee2relationship">
                  Relationship <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <select
                    className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    id="referee2relationship"
                    {...register("referee2relationship")}
                  >
                    <option value="">Select relationship</option>
                    {relationshipOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
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
                {errors.referee2relationship && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.referee2relationship)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReferreeDetails;
