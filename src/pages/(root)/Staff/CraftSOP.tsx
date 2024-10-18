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
  const [currentStep, setCurrentStep] = useState(0);

  const StepComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    nextStep();
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

        {currentStep === 0 && (
          <div className="flex mt-10 items-center justify-between gap-8">
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
              Next
            </button>
          </div>
        )}
      </form>
    </RootLayout>
  );
};

export default CraftSOP;
