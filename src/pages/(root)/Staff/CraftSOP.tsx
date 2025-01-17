import { useState } from "react";
import RootLayout from "@/layouts/RootLayout";
import { SopStep1, SopStep2, SopStep4 } from ".";
import { useParams } from "react-router-dom";

const steps = [
  {
    component: SopStep1,
    title: "Draft Statement Of Purpose",
  },
  {
    component: SopStep2,
    title: "Draft Statement Of Purpose",
  },
  {
    component: SopStep4,
    title: "Draft Statement Of Purpose",
  },
];

const totalSteps = steps.length;

const CraftSOP = () => {
  const { id = "" } = useParams<{ id: string }>();

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("sopCurrentPage");
    return savedStep ? Number(savedStep) : 0;
  });

  const StepComponent = steps[currentStep].component;

  const saveCurrentStep = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem("sopCurrentPage", step.toString());
  };

  const nextStep = async () => {
    if (currentStep < totalSteps - 1) {
      saveCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      saveCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await nextStep();
    localStorage.setItem("sopCurrentPage", "0");
  };

  const progressBarWidth = ((currentStep + 1) / totalSteps) * 100;

  return (
    <RootLayout title="Draft Statement Of Purpose">
      <form onSubmit={onSubmit}>
        <div className="step-indicator">
          <span className="text-red">Step {currentStep + 1}</span> of{" "}
          {totalSteps}
        </div>
        <div className="progress-container mb-4">
          <div
            className="progress-bar"
            style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>

        <StepComponent prevStep={prevStep} candidateId={id} />

        {currentStep < totalSteps - 1 && (
          <div className="flex mt-10 items-center justify-between gap-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={prevStep}
                className="form-btn border border-red text-red hover:bg-red hover:bg-opacity-40 hover:text-white w-28 px-10 py-2 rounded-md flex items-center justify-center"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="form-btn bg-red hover:bg-opacity-40 text-white w-28 px-10 py-2 rounded-md flex items-center justify-center"
            >
              Next
            </button>
          </div>
        )}
      </form>
    </RootLayout>
  );
};

export default CraftSOP;
