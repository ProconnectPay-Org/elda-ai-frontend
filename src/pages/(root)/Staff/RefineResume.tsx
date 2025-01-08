// RefineResume.tsx
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResumeStep1Schema,
  ResumeStep3Schema,
  ResumeStep4Schema,
  ResumeStep5Schema,
} from "@/lib/resumeSchema";
import { ResumeStep1, ResumeStep3, ResumeStep4, ResumeStep5 } from ".";
import RootLayout from "@/layouts/RootLayout";
import { useQuery } from "@tanstack/react-query";
import { craftCandidateResume } from "@/lib/actions/staff.actions";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const steps = [
  {
    component: ResumeStep1,
    schema: ResumeStep1Schema,
    title: "PERSONAL DETAILS",
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
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("resumeCurrentPage");
    return savedStep ? Number(savedStep) : 0;
  });
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.error("ID is missing from the URL.");
    return null;
  }
  const navigate = useNavigate();

  const staffToken = Cookies.get("staff_access_token");
  if (!staffToken) {
    console.error("Staff token is missing. Please log in again.");
    return null;
  }

  const { data: resumeData } = useQuery({
    queryKey: ["candidateResume"],
    queryFn: () => craftCandidateResume(id),
  });

  const methods = useForm({
    resolver: zodResolver(steps[currentStep].schema),
    defaultValues: formData,
  });

  const StepComponent = steps[currentStep].component;

  const saveCurrentStep = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem("resumeCurrentPage", step.toString());
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      saveCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      saveCurrentStep(currentStep - 1);
    } else {
      navigate("/refine-resume");
    }
  };

  const onSubmit = async (data: any) => {
    const currentFormData = { ...formData, ...data };
    setIsLoading(true);

    try {
      if (currentStep === steps.length - 1) {
        // Final Step: Navigate to Final Resume
        if (resumeData?.resume) {
          navigate(`/refine-resume/final-resume/${id}`);
          return; // Prevent further execution
        } else {
          console.error("Resume URL not found.");
        }
      } else {
        // Other Steps: Save data and proceed
        setFormData(currentFormData);
      }

      if (currentStep < steps.length - 1) {
        nextStep(); // Move to the next step
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const progressBarWidth = ((currentStep + 1) / totalSteps) * 100;

  return (
    <RootLayout title="Create New Resume">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          <div className="flex mt-10 items-center justify-between gap-8">
            {currentStep >= 0 && (
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
              className="form-btn bg-red text-white w-28 px-10 py-2 rounded-md flex items-center justify-center"
            >
              {isLoading
                ? "Saving..."
                : currentStep === steps.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </form>
      </FormProvider>
    </RootLayout>
  );
};

export default RefineResume;
