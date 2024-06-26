import { getErrorMessage } from "@/lib/utils";
import { Step4FormData } from "@/types";
import { useFormContext } from "react-hook-form";

const ReferreeDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Step4FormData>();

  return (
    <div>
      <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl">Loan Referee Details 1</h2>
          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee1fullname">Full Name</label>
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
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee1email">Email Address</label>
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee1phoneNumber">Phone Number</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="referee1phoneNumber"
                {...register("referee1phoneNumber")}
                placeholder="Enter your Phone Number"
              />
              {errors.referee1phoneNumber && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.referee1phoneNumber)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee1relationship">Relationship</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="referee1relationship"
                {...register("referee1relationship")}
                placeholder="Enter your course of study"
              />
              {errors.referee1relationship && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.referee1relationship)}
                </span>
              )}
            </div>
          </div>

          <h2 className="text-2xl">Loan Referee Details 2</h2>

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee2fullname">Full Name</label>
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
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee2email">Email Address</label>
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

          <div className="flex justify-between gap-4 md:gap-8">
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee2phoneNumber">Phone Number</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="referee2phoneNumber"
                {...register("referee2phoneNumber")}
                placeholder="Enter your Phone Number"
              />
              {errors.referee2phoneNumber && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.referee2phoneNumber)}
                </span>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="referee2relationship">Relationship</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="referee2relationship"
                {...register("referee2relationship")}
                placeholder="Enter your course of study"
              />
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
  );
};

export default ReferreeDetails;
