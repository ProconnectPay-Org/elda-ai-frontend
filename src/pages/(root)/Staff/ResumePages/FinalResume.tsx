import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NewResumePdf from "@/components/NewReumePdf";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCandidates } from "@/hooks/useCandidiates";

const FinalResume = () => {
  const { id } = useParams<{ id: string }>();
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const { singleCandidate } = useCandidates(id);

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const topMargin = 0;
      const bottomMargin = 8;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      // Calculate the height of content to fit per page (excluding margins)
      const contentHeightPerPage = pdfHeight - bottomMargin;

      const totalPDFPages = Math.ceil(
        (canvasHeight * (pdfWidth / canvasWidth)) / contentHeightPerPage
      );

      for (let page = 0; page < totalPDFPages; page++) {
        const sourceY = page * contentHeightPerPage * (canvasWidth / pdfWidth);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvasWidth;
        pageCanvas.height = contentHeightPerPage * (canvasWidth / pdfWidth);

        const context = pageCanvas.getContext("2d");
        if (context) {
          context.fillStyle = "#ffffff"; // White background
          context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

          context.drawImage(
            canvas,
            0,
            sourceY,
            canvasWidth,
            pageCanvas.height,
            0,
            0,
            canvasWidth,
            pageCanvas.height
          );

          const pageImgData = pageCanvas.toDataURL("image/jpeg", 1.0);
          if (page > 0) pdf.addPage(); // Add new page for each additional slice

          // Apply top margin only for subsequent pages
          const yPosition = page > 0 ? topMargin : 0; // No margin for the first page

          pdf.addImage(
            pageImgData,
            "JPEG",
            0,
            yPosition,
            pdfWidth,
            contentHeightPerPage
          );
        }
      }

      const fileName = singleCandidate?.user?.full_name
        ? `${singleCandidate.user.full_name} Resume.pdf`
        : "Resume.pdf";

      pdf.save(fileName);
    }
  };

  return (
    <RootLayout title="Final Resume Refined">
      <div>
        <Link to={`/refine-resume/${id}`}>
          <ArrowLeft className="cursor-pointer" />
        </Link>
      </div>

      <div ref={resumeRef}>
        <NewResumePdf />
      </div>

      <div className="mt-5 md:mt-8 w-full flex items-center justify-between">
        <Link to={`/download-resume/${id}`}>
          <Button className="bg-white text-red border border-red">
           Full Preview Resume
          </Button>
        </Link>

        <Button onClick={downloadPDF} className="bg-red">
          Download Resume
        </Button>
      </div>
    </RootLayout>
  );
};

export default FinalResume;
