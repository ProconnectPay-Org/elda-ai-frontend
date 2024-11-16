import { useCandidates } from "@/hooks/useCandidiates";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import { Loader2Icon } from "lucide-react";

const SopTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  if (singleCandidateLoading) {
    return (
      <div className="flex items-center justify-center">
        Loading sop...
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  const sopText = singleCandidate?.sop
    .at(-1)
    ?.text.replace(/^\*\*?Statement of Purpose\*\*?/i, "");

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const fileName = singleCandidate?.first_name
        ? `${singleCandidate.first_name} sop.pdf`
        : "SOP.pdf";

      pdf.save(fileName);
    }
  };

  return (
    <div className="py-4 px-8">
      <div ref={resumeRef} className="px-8">
        <h1 className="text-red font-bold text-center mb-4 text-xl uppercase">
          STATEMENT OF PURPOSE FOR {singleCandidate?.last_name}{" "}
          {singleCandidate?.first_name} {singleCandidate?.middle_name}: PURSUING
          AN MSC IN {singleCandidate?.assigned_course1} AT{" "}
          {singleCandidate?.assigned_university1}
        </h1>
        <div>
          {sopText?.split("\n").map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <Button className="my-5 bg-red mx-8" onClick={downloadPDF}>
        Download SOP
      </Button>
    </div>
  );
};

export default SopTemplate;
