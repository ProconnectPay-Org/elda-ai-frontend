import PhoneInputField from "@/components/PhoneInputField";
import { getErrorMessage } from "@/lib/utils";
import { Step4FormData } from "@/types";
import { useFormContext } from "react-hook-form";

const professionalRelationshipOptions = [
  "Past employer",
  "Present employer",
  "Colleague",
  "HR",
  "Manager",
];
const academicsRelationshipOptions = [
  "Lecturer",
  "Academic advisor",
  "Administrative staff",
];
const otherRelationshipOptions = [
  "Past Employer",
  "Present Employer",
  "Colleague",
  "HR",
  "Manager",
  "Lecturer",
  "Academic advisor",
  "Administrative staff",
];

const Recommendation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Step4FormData>();

  const divClass = "flex flex-col w-full md:w-1/2";
  const outerDivClass =
    "flex flex-col md:flex-row justify-between gap-4 md:gap-8";

  return (
    <div>
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl">Recommender Information</h2>

          {/* PROFESSIONALS */}
          <div>
            <p className="font-semibold mb-3 text-lg">Professional</p>
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
                Relationship with professional recommender{" "}
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
                Organization or Company of professional recommender{" "}
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
                Job Title of professional recommender{" "}
                <span className="text-red">*</span>
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

          {/* ACADEMICS */}
          <div>
            <p className="font-semibold mb-3 text-lg">Academics</p>

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

          {/* OTHERS */}
          <div>
            <p className="font-semibold mb-3 text-lg">Others</p>
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
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
