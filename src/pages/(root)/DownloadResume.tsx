import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ResumePdf from "@/components/ResumePdf";
const DownloadResume = () => {
  const navigate = useNavigate();

  const downloadResume = () => {
    window.print();
  };

  return (
    <section className="m-10">
      <div className="mb-2">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <div className="max-w-3xl m-auto">
        <div className="resume-print">
          <ResumePdf />
        </div>
      </div>

      <div className="mt-5 md:mt-8 w-full flex items-center justify-end">
        <Button className="bg-red" onClick={downloadResume}>
          Download Resume
        </Button>
      </div>
    </section>
  );
};

export default DownloadResume;
