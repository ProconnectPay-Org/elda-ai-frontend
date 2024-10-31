import ResumePdf from "@/components/ResumePdf";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const DownloadResume = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

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
      pdf.save("Resume.pdf");
    }
  };
  return (
    <section className="m-10">
      <div ref={resumeRef}>
        <ResumePdf />
      </div>

      <div className="mt-5 md:mt-8 w-full flex items-center justify-end">
        <Button className="bg-red" onClick={downloadPDF}>
          Download PDF
        </Button>
      </div>
    </section>
  );
};

export default DownloadResume;
