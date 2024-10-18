import { Input } from "@/components/ui/input";
import {
  fetchJobExperienceData,
  getStaffDetails,
} from "@/lib/actions/staff.actions";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep4FormData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";

const WorkExperience = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeStep4FormData>();
  const { id } = useParams<{ id: string }>();
  const [foundCandidate, setFoundCandidate] =
    useState<ResumeStep4FormData | null>(null);

  const { isLoading, data, error } = useQuery({
    queryKey: ["staffCandidateDetails", id],
    queryFn: getStaffDetails,
    staleTime: 5 * 1000,
  });

  const { isLoading: workExpLoading, data: workExpData } = useQuery({
    queryKey: ["fetchWorkExperienceData", foundCandidate?.career[0]],
    queryFn: () => fetchJobExperienceData(id),
    enabled: !!foundCandidate?.career[0],
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      const candidate = data.staff_candidates.find(
        (candidate: ResumeStep4FormData) => String(candidate.id) === String(id)
      );
      setFoundCandidate(candidate || null);
      if (foundCandidate) {
        setValue("city", foundCandidate.city_current_reside || "");
        setValue("state", foundCandidate.state_of_birth || "");
      }
    }
  }, [data, id, setValue]);

  useEffect(() => {
    if (workExpData) {
      setValue("nameOfCompany", workExpData.business_name || "");
      setValue("typeOfCompany", workExpData.professional_status || "");
      setValue("jobTitle", workExpData.job_title || "");
      setValue("companyDescription", workExpData.company_description || "");
      setValue("mode", workExpData.employment_type || "");
      setValue("location", workExpData.state || "");
      setValue("startDate", String(workExpData.year_started) || "");
      setValue("endDate", String(workExpData.year_ended) || "");
    }
  }, [workExpData, setValue]);

  if (isLoading || workExpLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-[#344054]">
          How many jobs are you showcasing?
        </label>
        <Input type="text" defaultValue={1} className="rounded-full" />
      </div>
      <div className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl">
        <h3 className="font-bold mb-4 text-lg">Present Job</h3>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="nameOfCompany" className="text-[#344054]">
                Name of Company
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="nameOfCompany"
                {...register("nameOfCompany")}
                placeholder="Enter your first name"
              />
              {errors.nameOfCompany && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.nameOfCompany)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="typeOfCompany" className="text-[#344054]">
                Type of Company
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="typeOfCompany"
                {...register("typeOfCompany")}
              />
              {errors.typeOfCompany && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.typeOfCompany)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="jobTitle" className="text-[#344054]">
                Job Title
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="jobTitle"
                {...register("jobTitle")}
                placeholder="Enter your city"
              />
              {errors.jobTitle && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.jobTitle)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="companyDescription" className="text-[#344054]">
                Company Description
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="companyDescription"
                {...register("companyDescription")}
                placeholder="Enter a description of the company"
              />
              {errors.companyDescription && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.companyDescription)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="mode" className="text-[#344054]">
                Mode
              </label>
              <input
                className="border capitalize border-gray-border rounded-full py-2 px-4"
                id="mode"
                {...register("mode")}
                placeholder="Hybrid"
              />
              {errors.mode && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.mode)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="location" className="text-[#344054]">
                Location
              </label>
              <input
                className="border border-gray-border rounded-full py-2 px-4"
                id="location"
                {...register("location")}
              />
              {errors.location && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.location)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="startDate" className="text-[#344054]">
                Start Date
              </label>
              <input
                type="date"
                className="border border-gray-border h-[42px] rounded-full py-2 px-4"
                id="startDate"
                {...register("startDate")}
              />
              {errors.startDate && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.startDate)}
                </span>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="endDate" className="text-[#344054]">
                End Date
              </label>
              <input
                type="date"
                className="border border-gray-border h-[42px] rounded-full py-2 px-4"
                id="endDate"
                {...register("endDate")}
              />
              {errors.endDate && (
                <span className="text-red text-sm">
                  {getErrorMessage(errors.endDate)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
