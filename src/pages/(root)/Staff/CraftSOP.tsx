import { useState } from "react";
import RootLayout from "@/layouts/RootLayout";
import { SopStep1, SopStep2, SopStep4 } from ".";
import { useParams, useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generateSop, generateSop2 } from "@/lib/actions/staff.actions";
import { Loader2 } from "lucide-react";

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

  const [searchParams] = useSearchParams();
  const routeType = searchParams.get("type");

  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("sopCurrentPage");
    return savedStep ? Number(savedStep) : 0;
  });
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const prefix = routeType === "school2" ? "2" : "1"; // Default to `1` if it's not `craft-sop-2`

  const StepComponent = steps[currentStep].component;

  const saveCurrentStep = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem("sopCurrentPage", step.toString());
  };

  const nextStep = async () => {
    if (currentStep < totalSteps - 1) {
      if (currentStep === 1) {
        setIsGenerating(true);
        try {
          const selectedGenerateFn =
            prefix === "2" ? generateSop2 : generateSop;
          const sopData = await selectedGenerateFn(id);
          const generatedFile = await generateSopFile(sopData.SOP?.text, id);
          setFile(generatedFile);
        } catch (error) {
          console.error("Error generating SOP file:", error);
        } finally {
          setIsGenerating(false);
        }
      }
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

        {isGenerating ? (
          <div className="flex items-center animate-pulse">
            Generating SOP file... <Loader2 className="animate-spin" />
          </div>
        ) : (
          <StepComponent prevStep={prevStep} candidateId={id} file={file} />
        )}

        {currentStep < totalSteps - 1 && (
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

const generateSopFile = async (sopText: string, candidateId: string) => {
  const sopContainer = document.createElement("div");

  sopContainer.style.position = "absolute";
  sopContainer.style.visibility = "hidden";
  sopContainer.innerHTML = `
    <h1 class="text-red font-bold text-center mb-4 text-xl uppercase">Statement of Purpose</h1>
    <p>${sopText}</p>
  `;
  document.body.appendChild(sopContainer);

  const canvas = await html2canvas(sopContainer, { scale: 2, useCORS: true });
  document.body.removeChild(sopContainer);

  const imgData = canvas.toDataURL("image/jpeg");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

  const blob = pdf.output("blob");
  return new File([blob], `${candidateId}-sop.pdf`, {
    type: "application/pdf",
  });
};
