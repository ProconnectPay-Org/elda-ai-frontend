import PhoneInputField from "@/components/PhoneInputField";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  getRecommenderDetails,
  submitRecommenderDetails,
} from "@/lib/actions/candidate.actions";
import { getErrorMessage } from "@/lib/utils";
import { Recommender, Step4FormData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const professionalRelationshipOptions = [
  "Current Employer",
  "Former Employer",
  "Current Colleague ",
  "Former Colleague",
  "Former Manager",
  "Current Manager",
  "Former HR Manager",
  "Current HR Manager",
];
const academicsRelationshipOptions = [
  "Direct Lecturer (Taught You)",
  "Indirect Lecturer (Didn't Teach You)",
  "Academic Advisor ",
  "Head of Department ",
  "Dean of Faculty or School",
  "University Management Staff",
];
const otherRelationshipOptions = [
  "Current Employer",
  "Former Employer",
  "Current Colleague ",
  "Former Colleague",
  "Former Manager",
  "Current Manager",
  "Former HR Manager",
  "Current HR Manager",
  "Direct Lecturer (Taught You)",
  "Indirect Lecturer (Didn't Teach You)",
  "Academic Advisor ",
  "Head of Department ",
  "Dean of Faculty or School",
  "University Management Staff",
];

const Recommendation = () => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
    getValues,
  } = useFormContext<Step4FormData>();

  const recommenderIds = {
    professional: "ProfessionalRecommender",
    academic: "AcademicRecommender",
    other: "otherRecommender",
  };

  const id = Cookies.get("candidate_id");

  const { isLoading: isReferee1Loading, data: recommender1Data } = useQuery({
    queryKey: ["recommender1Data"],
    queryFn: () => getRecommenderDetails(recommenderIds.professional),
    enabled:
      recommenderIds.professional !== undefined &&
      !!Cookies.get(recommenderIds.professional),
    staleTime: 5 * 1000 * 60,
  });

  const { isLoading: isReferee2Loading, data: recommender2Data } = useQuery({
    queryKey: ["recommender2Data"],
    queryFn: () => getRecommenderDetails(recommenderIds.academic),
    enabled:
      recommenderIds.academic !== undefined &&
      !!Cookies.get(recommenderIds.academic),
    staleTime: 5 * 1000 * 60,
  });

  const { isLoading: isReferee3Loading, data: recommender3Data } = useQuery({
    queryKey: ["recommender3Data"],
    queryFn: () => getRecommenderDetails(recommenderIds.other),
    enabled:
      recommenderIds.other !== undefined && !!Cookies.get(recommenderIds.other),
    staleTime: 5 * 1000 * 60,
  });

  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Watch form values
  const watchedValues = useWatch({ control });

  useEffect(() => {
    const setRecommenderValues = (data: Recommender, prefix: string) => {
      if (data) {
        setValue(`${prefix}fullname`, data.full_name || "");
        setValue(`${prefix}email`, data.email || "");
        setValue(`${prefix}phoneNumber`, data.phone_number || "");
        setValue(`${prefix}relationship`, data.relationship || "");
        setValue(`${prefix}job`, data.job_title || "");
        setValue(`${prefix}organization`, data.organization || "");
      }
    };

    setRecommenderValues(recommender1Data, "recommendation1");
    setRecommenderValues(recommender2Data, "recommendation2");
    setRecommenderValues(recommender3Data, "recommendation3");
  }, [recommender1Data, recommender2Data, recommender3Data, setValue]);

  useEffect(() => {
    const initialValues: Record<keyof typeof watchedValues, string> = {
      recommendation1fullname: recommender1Data?.full_name || "",
      recommendation1email: recommender1Data?.email || "",
      recommendation1phoneNumber: recommender1Data?.phone_number || "",
      recommendation1relationship: recommender1Data?.relationship || "",
      recommendation1job: recommender1Data?.job_title || "",
      recommendation1organization: recommender1Data?.organization || "",
      recommendation2fullname: recommender2Data?.full_name || "",
      recommendation2email: recommender2Data?.email || "",
      recommendation2phoneNumber: recommender2Data?.phone_number || "",
      recommendation2relationship: recommender2Data?.relationship || "",
      recommendation2job: recommender2Data?.job_title || "",
      recommendation2organization: recommender2Data?.organization || "",
      recommendation3fullname: recommender3Data?.full_name || "",
      recommendation3email: recommender3Data?.email || "",
      recommendation3phoneNumber: recommender3Data?.phone_number || "",
      recommendation3relationship: recommender3Data?.relationship || "",
      recommendation3job: recommender3Data?.job_title || "",
      recommendation3organization: recommender3Data?.organization || "",
    };

    // Ensure keys match the watchedValues keys
    const hasChanges = (
      Object.keys(initialValues) as Array<keyof typeof initialValues>
    ).some((key) => watchedValues[key] !== initialValues[key]);

    setIsModified(hasChanges);
  }, [recommender1Data, recommender2Data, recommender3Data, watchedValues]);

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    const recommenderDataList = [
      {
        recommender_type: "Professional",
        full_name: getValues("recommendation1fullname"),
        email: getValues("recommendation1email"),
        phone_number: getValues("recommendation1phoneNumber"),
        relationship: getValues("recommendation1relationship"),
        organization: getValues("recommendation1organization"),
        job_title: getValues("recommendation1job"),
        candidate: id,
      },
      {
        recommender_type: "Academic",
        full_name: getValues("recommendation2fullname"),
        email: getValues("recommendation2email"),
        phone_number: getValues("recommendation2phoneNumber"),
        relationship: getValues("recommendation2relationship"),
        organization: getValues("recommendation2organization"),
        job_title: getValues("recommendation2job"),
        candidate: id,
      },
      {
        recommender_type: "other",
        full_name: getValues("recommendation3fullname"),
        email: getValues("recommendation3email"),
        phone_number: getValues("recommendation3phoneNumber"),
        relationship: getValues("recommendation3relationship"),
        organization: getValues("recommendation3organization"),
        job_title: getValues("recommendation3job"),
        candidate: id,
      },
    ];

    try {
      await submitRecommenderDetails(recommenderDataList);
      toast({
        variant: "success",
        title: "Saved",
        description: "Recommender details saved successfully!",
      });
      setIsModified(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save recommender details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isLoading = isReferee1Loading || isReferee2Loading || isReferee3Loading;

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

      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl">Recommender Information</h2>

          {/* PROFESSIONALS */}
          <div className="space-y-8">
            <div>
              <p className="font-semibold mb-3 text-lg text-red">
                Professional
              </p>

              <div className={outerDivClass}>
                <div className={divClass}>
                  <label htmlFor="recommendation1fullname">
                    Full Name <span className="text-red">*</span>
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id="recommendation1fullname"
                    {...register("recommendation1fullname")}
                    placeholder="Enter recommender's full name"
                  />
                  {errors.recommendation1fullname && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.recommendation1fullname)}
                    </span>
                  )}
                </div>
                <div className={divClass}>
                  <label htmlFor="recommendation1email">
                    Official Email Address <span className="text-red">*</span>
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id="recommendation1email"
                    {...register("recommendation1email")}
                    placeholder="Enter recommender's email address"
                  />
                  {errors.recommendation1email && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.recommendation1email)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={outerDivClass}>
              <PhoneInputField name="recommendation1phoneNumber" />
              <div className={divClass}>
                <label htmlFor="recommendation1relationship">
                  Relationship with recommender{" "}
                  <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <select
                    className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    id="recommendation1relationship"
                    {...register("recommendation1relationship")}
                  >
                    <option value="">Select relationship</option>
                    {professionalRelationshipOptions.map((option) => (
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
                {errors.recommendation1relationship && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation1relationship)}
                  </span>
                )}
              </div>
            </div>

            <div className={outerDivClass}>
              <div className={divClass}>
                <label htmlFor="recommendation1organization">
                  Organization or Company of recommender{" "}
                  <span className="text-red">*</span>
                </label>
                <input
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  id="recommendation1organization"
                  {...register("recommendation1organization")}
                />

                {errors.recommendation1organization && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation1organization)}
                  </span>
                )}
              </div>

              <div className={divClass}>
                <label htmlFor="recommendation1job">
                  Job Title of recommender <span className="text-red">*</span>
                </label>
                <input
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  id="recommendation1job"
                  {...register("recommendation1job")}
                />

                {errors.recommendation1job && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation1job)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ACADEMICS */}
          <div className="space-y-8">
            <div>
              <p className="font-semibold mb-3 text-lg text-red">Academic</p>

              <div className={outerDivClass}>
                <div className={divClass}>
                  <label htmlFor="recommendation2fullname">
                    Full Name <span className="text-red">*</span>
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id="recommendation2fullname"
                    {...register("recommendation2fullname")}
                    placeholder="Enter recommender's full name"
                  />
                  {errors.recommendation2fullname && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.recommendation2fullname)}
                    </span>
                  )}
                </div>
                <div className={divClass}>
                  <label htmlFor="recommendation2email">
                    Official Email Address <span className="text-red">*</span>
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id="recommendation2email"
                    {...register("recommendation2email")}
                    placeholder="Enter recommender's email address"
                  />
                  {errors.recommendation2email && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.recommendation2email)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={outerDivClass}>
              <PhoneInputField name="recommendation2phoneNumber" />
              <div className={divClass}>
                <label htmlFor="recommendation2relationship">
                  Relationship <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <select
                    className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    id="recommendation2relationship"
                    {...register("recommendation2relationship")}
                  >
                    <option value="">Select relationship</option>
                    {academicsRelationshipOptions.map((option) => (
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
                {errors.recommendation2relationship && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation2relationship)}
                  </span>
                )}
              </div>
            </div>

            <div className={outerDivClass}>
              <div className={divClass}>
                <label htmlFor="recommendation1organization">
                  Organization or Company of academic recommender{" "}
                  <span className="text-red">*</span>
                </label>
                <input
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  id="recommendation2organization"
                  {...register("recommendation2organization")}
                />

                {errors.recommendation2organization && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation2organization)}
                  </span>
                )}
              </div>

              <div className={divClass}>
                <label htmlFor="recommendation2job">
                  Job Title of academic recommender{" "}
                  <span className="text-red">*</span>
                </label>
                <input
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  id="recommendation2job"
                  {...register("recommendation2job")}
                />

                {errors.recommendation2job && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation2job)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* OTHERS */}
          <div className="space-y-8">
            <div>
              <p className="font-semibold mb-3 text-lg text-red">Others</p>
              <div className={outerDivClass}>
                <div className={divClass}>
                  <label htmlFor="recommendation3fullname">
                    Full Name <span className="text-red">*</span>
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id="recommendation3fullname"
                    {...register("recommendation3fullname")}
                    placeholder="Enter recommender's full name"
                  />
                  {errors.recommendation3fullname && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.recommendation3fullname)}
                    </span>
                  )}
                </div>
                <div className={divClass}>
                  <label htmlFor="recommendation3email">
                    Official Email Address <span className="text-red">*</span>
                  </label>
                  <input
                    className="border border-gray-border rounded-md py-2 px-4"
                    id="recommendation3email"
                    {...register("recommendation3email")}
                    placeholder="Enter recommender's email address"
                  />
                  {errors.recommendation3email && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.recommendation3email)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={outerDivClass}>
              <PhoneInputField name="recommendation3phoneNumber" />
              <div className={divClass}>
                <label htmlFor="recommendation3relationship">
                  Relationship <span className="text-red">*</span>
                </label>
                <div className="relative">
                  <select
                    className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    id="recommendation3relationship"
                    {...register("recommendation3relationship")}
                  >
                    <option value="">Select relationship</option>
                    {otherRelationshipOptions.map((option) => (
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
                {errors.recommendation3relationship && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation3relationship)}
                  </span>
                )}
              </div>
            </div>

            <div className={outerDivClass}>
              <div className={divClass}>
                <label htmlFor="recommendation3organization">
                  Organization or Company of recommender{" "}
                  <span className="text-red">*</span>
                </label>
                <input
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  id="recommendation3organization"
                  {...register("recommendation3organization")}
                />

                {errors.recommendation3organization && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation3organization)}
                  </span>
                )}
              </div>

              <div className={divClass}>
                <label htmlFor="recommendation3job">
                  Job Title of recommender <span className="text-red">*</span>
                </label>
                <input
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  id="recommendation3job"
                  {...register("recommendation3job")}
                />

                {errors.recommendation3job && (
                  <span className="text-red text-sm">
                    {getErrorMessage(errors.recommendation3job)}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
              <Button
                className={`bg-red w-full ${
                  !isModified || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSave}
                disabled={!isModified || loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
