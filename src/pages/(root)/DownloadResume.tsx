import { useRef } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { useCandidates } from "@/hooks/useCandidiates";
import Cookies from "js-cookie";
import { ArrowLeft } from "lucide-react";
import NewResumePdf from "@/components/NewReumePdf";
const DownloadResume = () => {
  const { id } = useParams<{ id: string }>();
  const resumeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

      const topMargin = 10;
      const bottomMargin = 12;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      // Calculate the height of content to fit per page (excluding margins)
      const contentHeightPerPage = pdfHeight - bottomMargin;

      const totalPDFPages = Math.ceil(
        (canvasHeight * (pdfWidth / canvasWidth)) / contentHeightPerPage
      );

      for (let page = 0; page < totalPDFPages; page++) {
        if (page > 0) pdf.addPage();
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

          // Apply top margin only for subsequent pages
          const yPosition = page > 0 ? topMargin : 0;
          
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

  const userRole = Cookies.get("user_role");

  return (
    <section className="m-10">
      <div>
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <div className="max-w-4xl m-auto">
        <div ref={resumeRef}>
          <NewResumePdf />
        </div>
      </div>

      {userRole !== "candidate" && (
        <div className="mt-5 md:mt-8 w-full flex items-center justify-end">
          <Button className="bg-red" onClick={downloadPDF}>
            Download Resume
          </Button>
        </div>
      )}
    </section>
  );
};

export default DownloadResume;
