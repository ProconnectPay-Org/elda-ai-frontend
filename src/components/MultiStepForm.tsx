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
import { FormData } from "@/types";
import RegisterSuccessModal from "./RegisterSuccessModal";
import axios from "axios";
import {
  submitDocuments,
  submitEducationDetails,
  submitWorkExperience,
  updatePersonalDetails,
} from "@/lib/actions/user.actions";

const steps = [
  { component: Step1, schema: step1Schema, title: "PERSONAL DETAILS" },
  { component: Step2, schema: step2Schema, title: "EDUCATION DETAILS" },
  { component: Step3, schema: step3Schema, title: "WORK EXPERIENCE" },
  { component: Step4, schema: step4Schema, title: "REFEREE DETAILS" },
  { component: Step5, schema: step5Schema, title: "UPLOAD DOCUMENTS" },
];

const totalSteps = steps.length;

const API_URL = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("candidate_access_token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(steps[currentStep].schema),
    defaultValues: formData,
    mode: "onBlur",
  });

  const StepComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const id = localStorage.getItem("candidate_id");

  const onSubmit = async (data: FormData) => {
    const currentFormData = { ...formData, ...data };
    setFormData(currentFormData);
    setIsLoading(true);

    // Handle API submission based on the current step
    try {
      if (currentStep === 0) {
        // Step 1: PERSONAL DETAILS
        const personalData = {
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
        const educationData = {
          current_status: currentFormData.currentStatus,
          degree_type: currentFormData.degreeType,
          country: currentFormData.countryOfEducation,
          school_name: currentFormData.institutionName,
          specific_course_of_study: currentFormData.courseOfStudy,
          class_of_degree: currentFormData.degreeClass,
          specific_cgpa: currentFormData.currentCGPA,
          year_graduated: currentFormData.yearGraduated,
          year_admitted: currentFormData.yearAdmitted,
          has_advanced_degree: currentFormData.advancedDegree,
          candidate: id,
        };
        await submitEducationDetails(educationData);
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

        console.log(workData);
        

        const experienceData = {
          business_name: currentFormData.workPlaceName,
          professional_status: currentFormData.currentProfessionalStatus,
          job_title: currentFormData.currentJobTitle,
          employment_type: currentFormData.employmentType,
          state: currentFormData.stateLocation,
          country: currentFormData.countryLocation,
          year_started: currentFormData.startedDate,
          company_description: currentFormData.companyDescription,
          job_summary: currentFormData.jobSummary,
          year_ended: currentFormData.endedDate,
          job_status: currentFormData.jobStatus,
          candidate: id,
        };

        try {
          await submitWorkExperience(workData, experienceData);
        } catch (error) {
          console.error("Error during requests:", error);
        }
      } else if (currentStep === 3) {
        // Step 4: REFEREE DETAILS
        const referee1Data = {
          name: currentFormData.referee1fullname,
          email: currentFormData.referee1email,
          phone_number: currentFormData.referee1phoneNumber,
          relationship: currentFormData.referee1relationship,
          candidate: id,
        };

        const referee2Data = {
          name: currentFormData.referee2fullname,
          email: currentFormData.referee2email,
          phone_number: currentFormData.referee2phoneNumber,
          relationship: currentFormData.referee2relationship,
          candidate: id,
        };

        await Promise.all([
          axios.post(`${API_URL}register/loan-referee/`, referee1Data, config),
          axios.post(`${API_URL}register/loan-referee/`, referee2Data, config),
        ]);
      } else if (currentStep === steps.length - 1) {
        // UPLOAD DOCUMENTS
        const documentsData = {
          bsc_hnd_certificate: currentFormData.document1,
          bank_statement: currentFormData.document2,
          intl_passport: currentFormData.document3,
          first_degree_transcript: currentFormData.document4,
          current_cv: currentFormData.document5,
          nin_slip: currentFormData.document6,
          utility_bill: currentFormData.document7,
          post_graduate_transcript: currentFormData.document8,
          post_graduate_certificate: currentFormData.document9,
          candidate: id,
        };

        await submitDocuments(documentsData)
        setIsSubmitted(true);
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
    setIsSubmitted(false); // Close the modal
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
