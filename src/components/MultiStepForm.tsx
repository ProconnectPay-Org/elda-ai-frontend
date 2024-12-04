import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "@/lib/utils";
import { Step1, Step2, Step3, Step4, Step5 } from "@/pages/(root)/Candidates";
import {
  AdvancedEducation,
  EducationHistory,
  FormData,
  LoanReferee,
  updateCandidateProfile,
} from "@/types";
import RegisterSuccessModal from "./RegisterSuccessModal";
import {
  postJobExperience,
  submitEducationDetails,
  submitRefereeDetails,
  submitWorkExperience,
  toggleApplicationStatus,
  updateAdvancedDegree,
  updatePersonalDetails,
} from "@/lib/actions/candidate.actions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

const steps = [
  { component: Step1, schema: step1Schema, title: "PERSONAL DETAILS" },
  { component: Step2, schema: step2Schema, title: "EDUCATION DETAILS" },
  { component: Step3, schema: step3Schema, title: "WORK EXPERIENCE" },
  { component: Step4, schema: step4Schema, title: "REFEREE DETAILS" },
  { component: Step5, schema: step5Schema, title: "UPLOAD DOCUMENTS" },
];

const totalSteps = steps.length;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("currentPage");
    return savedStep ? Number(savedStep) : 0;
  });
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobsCount, setJobsCount] = useState(1); // Initialize with a default count if needed

  const { toast } = useToast();

  const navigate = useNavigate();

  const initialJobExperiences = Array.from({ length: jobsCount }).map(() => ({
    workPlaceName: "",
    currentProfessionalStatus: "",
    currentJobTitle: "",
    employmentType: "",
    stateLocation: "",
    countryLocation: "",
    startedDate: "",
    endedDate: "1960-01-01",
    jobStatus: "",
    companyDescription: "",
    jobSummary: "",
  }));

  const defaultValues = {
    ...formData,
    jobExperiences:
      currentStep === 2 ? initialJobExperiences : formData.jobExperiences,
  };

  const methods = useForm({
    resolver: zodResolver(steps[currentStep].schema),
    defaultValues,
    mode: "onBlur",
  });

  const StepComponent = steps[currentStep].component;

  const saveCurrentStep = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem("currentPage", step.toString());
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      saveCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      saveCurrentStep(currentStep - 1);
    }
  };

  const id = Cookies.get("candidate_id");

  const onSubmit = async (data: FormData) => {
    const currentFormData = { ...formData, ...data };
    setFormData(currentFormData);
    setIsLoading(true);
    // Handling API submission based on the current step
    try {
      if (currentStep === 0) {
        // Step 1: PERSONAL DETAILS
        const personalData: updateCandidateProfile = {
          first_name: currentFormData.firstName,
          middle_name: currentFormData.middleName,
          last_name: currentFormData.surname,
          preferred_call_name: currentFormData.preferredName,
          gender: currentFormData.gender,
          birth_date: currentFormData.dateOfBirth,
          country_of_birth: currentFormData.countryOfBirth,
          city_of_birth: currentFormData.cityOfBirth,
          state_of_birth: currentFormData.stateOfBirth,
          phone_number: currentFormData.phoneNumber,
          email_address: currentFormData.emailAddress,
          country_current_reside: currentFormData.countryOfResidence,
          state_current_reside: currentFormData.stateOfResidence,
          city_current_reside: currentFormData.cityOfResidence,
          current_house_address: currentFormData.houseAddress,
          postal_code: currentFormData.postalAddress,
        };
        await updatePersonalDetails(personalData);
      } else if (currentStep === 1) {
        // Step 2: EDUCATION DETAILS
        const educationData: EducationHistory = {
          current_status: currentFormData.currentStatus,
          degree_type: currentFormData.degreeType,
          country: currentFormData.countryOfEducation,
          school_name: currentFormData.institutionName,
          specific_course_of_study: currentFormData.courseOfStudy,
          class_of_degree: currentFormData.degreeClass,
          specific_cgpa: currentFormData.currentCGPA,
          graduation_date: currentFormData.yearGraduated,
          admission_date: currentFormData.yearAdmitted,
          has_advanced_degree: currentFormData.advancedDegree,
          candidate: id,
        };
        await submitEducationDetails(educationData);

        if (currentFormData.advancedDegree) {
          const advancedDegreeData: AdvancedEducation = {
            advanced_degree_type: currentFormData.advancedDegreeType,
            graduate_type: currentFormData.graduateType,
            country: currentFormData.advancedCountry,
            school_name: currentFormData.advancedInstitutionName,
            class_of_degree: currentFormData.advancedDegreeClass,
            specific_cgpa: currentFormData.advancedCurrentCGPA,
            graduation_date: currentFormData.advancedYearGraduated,
            admission_date: currentFormData.advancedYearAdmitted,
            candidate: id,
          };

          await updateAdvancedDegree(advancedDegreeData);
        }
      } else if (currentStep === 2) {
        // Step 3: WORK EXPERIENCE
        const workData = {
          profession: currentFormData.profession,
          sector: currentFormData.sectorOfProfession,
          technical_skill: currentFormData.technicalSkill,
          career_interests: currentFormData.careerInterest,
          years_of_experience_post_degree:
            currentFormData.yearsOfProfessionalExperiencePostFirstDegree,
          years_of_experience_pre_graduation:
            currentFormData.yearsOfProfessionalExperiencePriorToGraduation,
          jobs_to_show: currentFormData.jobsToShowcase,
        };

        await submitWorkExperience(workData);

        const jobCountFromData = parseInt(currentFormData.jobsToShowcase, 10);
        setJobsCount(jobCountFromData);

        if (jobsCount > 0) {
          const jobExperiences = [];
          for (let i = 0; i < jobsCount; i++) {
            const experienceData = {
              business_name: currentFormData.jobExperiences[i].workPlaceName,
              professional_status:
                currentFormData.jobExperiences[i].currentProfessionalStatus,
              job_title: currentFormData.jobExperiences[i].currentJobTitle,
              employment_type: currentFormData.jobExperiences[i].employmentType,
              state: currentFormData.jobExperiences[i].stateLocation,
              country: currentFormData.jobExperiences[i].countryLocation,
              year_started: currentFormData.jobExperiences[i].startedDate,
              company_description:
                currentFormData.jobExperiences[i].companyDescription,
              job_summary: currentFormData.jobExperiences[i].jobSummary,
              year_ended: currentFormData.jobExperiences[i].endedDate,
              job_status: currentFormData.jobExperiences[i].jobStatus,
              candidate: id,
            };
            const jobExperienceId = Cookies.get(`work_experience_id${i + 1}`);

            if (jobExperienceId) {
              jobExperiences.push(
                postJobExperience(experienceData, jobExperienceId)
              );
            } else {
              toast({
                title: "Error",
                description: `No ID found for job experience ${i + 1}`,
                variant: "destructive",
              });
            }
          }

          await Promise.all(jobExperiences);
        }
      } else if (currentStep === 3) {
        // Step 4: REFEREE DETAILS
        const referee1Data: LoanReferee = {
          name: currentFormData.referee1fullname,
          email: currentFormData.referee1email,
          phone_number: currentFormData.referee1phoneNumber,
          relationship: currentFormData.referee1relationship,
          candidate: id,
        };

        const referee2Data: LoanReferee = {
          name: currentFormData.referee2fullname,
          email: currentFormData.referee2email,
          phone_number: currentFormData.referee2phoneNumber,
          relationship: currentFormData.referee2relationship,
          candidate: id,
        };

        await submitRefereeDetails(referee1Data, referee2Data);
      } else if (currentStep === steps.length - 1) {
        setIsSubmitted(true);
        await toggleApplicationStatus();
        setTimeout(() => {
          navigate("/candidate/status");
        }, 3000);
      }
      if (currentStep < steps.length - 1) {
        nextStep();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const progressBarWidth = ((currentStep + 1) / totalSteps) * 100;

  const closeModal = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className="font-semibold text-xl">{steps[currentStep].title}</h2>
          <div className="step-indicator">
            <span className="text-red">Step {currentStep + 1}</span>
            of {totalSteps}
          </div>
          <div className="progress-container mb-4">
            <div
              className="progress-bar"
              style={{ width: `${progressBarWidth}%` }}
            ></div>
          </div>
          <StepComponent />
          <div className="flex mt-10 items-center justify-center gap-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="form-btn border border-red text-red w-28 px-10 py-2 rounded-md flex items-center justify-center"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="form-btn bg-red text-white min-w-28 px-10 py-2 rounded-md flex items-center justify-center"
            >
              {isLoading
                ? "Saving progress..."
                : currentStep === steps.length - 1
                ? "Submit"
                : "Continue"}
            </button>
          </div>
        </form>
      </FormProvider>

      {/* Success Modal */}
      <RegisterSuccessModal isVisible={isSubmitted} onClose={closeModal} />
    </>
  );
};

export default MultiStepForm;
