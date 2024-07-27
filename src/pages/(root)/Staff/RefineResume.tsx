// RefineResume.tsx
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResumeStep1Schema,
  ResumeStep2Schema,
  ResumeStep3Schema,
  ResumeStep4Schema,
  ResumeStep5Schema,
} from "@/lib/resumeSchema";
import {
  ResumeStep1,
  ResumeStep2,
  ResumeStep3,
  ResumeStep4,
  ResumeStep5,
} from ".";
import RootLayout from "@/layouts/RootLayout";

const steps = [
  {
    component: ResumeStep1,
    schema: ResumeStep1Schema,
    title: "PERSONAL DETAILS",
  },
  {
    component: ResumeStep2,
    schema: ResumeStep2Schema,
    title: "EDUCATION DETAILS",
  },
  {
    component: ResumeStep3,
    schema: ResumeStep3Schema,
    title: "WORK EXPERIENCE",
  },
  {
    component: ResumeStep4,
    schema: ResumeStep4Schema,
    title: "REFEREE DETAILS",
  },
  {
    component: ResumeStep5,
    schema: ResumeStep5Schema,
    title: "UPLOAD DOCUMENTS",
  },
];

const totalSteps = steps.length;

const RefineResume = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  // const { toast } = useToast();

  const methods = useForm({
    resolver: zodResolver(steps[currentStep].schema),
    defaultValues: formData,
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

  const onSubmit = (data: any) => {
    // Merge current step data into formData
    const currentFormData = { ...formData, ...data };

    if (currentStep === steps.length - 1) {
      // Final submit logic
      console.log("Form Submitted:", currentFormData);
      alert("Form Submitted!");
    } else {
      setFormData(currentFormData); // Update formData with current step data
      nextStep();
    }
  };

  const progressBarWidth = ((currentStep + 1) / totalSteps) * 100;

  return (
    <RootLayout title="Refine Resume">
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
              // onClick={() => {
              //   toast({
              //     variant: "destructive",
              //     title: "Uh oh! Something went wrong.",
              //     description: "There was a problem with your request.",
              //     action: (
              //       <ToastAction altText="Try again">Try again</ToastAction>
              //     ),
              //   });
              // }}
              className="form-btn bg-red text-white w-28 px-10 py-2 rounded-md flex items-center justify-center"
            >
              {currentStep === steps.length - 1 ? "Submit" : "Continue"}
            </button>
          </div>
        </form>
      </FormProvider>
    </RootLayout>
  );
};

export default RefineResume;
