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
import { toggleApplicationStatus } from "@/lib/actions/candidate.actions";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const defaultValues = {
    ...formData,
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

  const onSubmit = async (data: FormData) => {
    const currentFormData = { ...formData, ...data };
    setFormData(currentFormData);
    setIsLoading(true);
    // Handling API submission based on the current step
    try {
      if (currentStep === steps.length - 1) {
        setIsSubmitted(true);
        await toggleApplicationStatus();
        localStorage.setItem("currentPage", "0");
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
