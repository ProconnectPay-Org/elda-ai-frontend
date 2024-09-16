import { useState, useEffect } from "react";
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

const steps = [
  { component: Step1, schema: step1Schema, title: "PERSONAL DETAILS" },
  { component: Step2, schema: step2Schema, title: "EDUCATION DETAILS" },
  { component: Step3, schema: step3Schema, title: "WORK EXPERIENCE" },
  { component: Step4, schema: step4Schema, title: "REFEREE DETAILS" },
  { component: Step5, schema: step5Schema, title: "UPLOAD DOCUMENTS" },
];

const totalSteps = steps.length;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Retrieve saved form data and step from localStorage when component loads
    const savedStep = localStorage.getItem("currentStep");
    const savedFormData = localStorage.getItem("formData");

    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    // Save current step and formData to localStorage whenever they change
    localStorage.setItem("currentStep", currentStep.toString());
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [currentStep, formData]);

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

  const onSubmit = (data: FormData) => {
    const currentFormData = { ...formData, ...data };

    if (currentStep === steps.length - 1) {
      console.log("Form Submitted:", currentFormData);
      localStorage.removeItem("currentStep"); // Clear saved step
      localStorage.removeItem("formData"); // Clear saved form data
      setIsSubmitted(true); // Show the modal upon successful form submission
    } else {
      setFormData(currentFormData);
      nextStep();
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
              className="form-btn bg-red text-white w-28 px-10 py-2 rounded-md flex items-center justify-center"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Continue"}
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
