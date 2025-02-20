import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import ResumePdf from "@/components/ResumePdf";

const FinalResume = () => {
  const { id } = useParams<{ id: string }>();
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const downloadResume = () => {
    window.print();
  };

  return (
    <RootLayout title="Final Resume Refined">
      <div className="mb-10 flex justify-between items-center">
        <div className="w-fit">
          <Link to={`/refine-resume/${id}`}>
            <ArrowLeft className="cursor-pointer" />
          </Link>
        </div>
        <div className="space-x-5">
          <Link to={`/craft-sop/${id}?type=school1`} target="_blank">
            <Button className="bg-red">Start SOP 1</Button>
          </Link>
          <Link to={`/craft-sop/${id}?type=school2`} target="_blank">
            <Button className="bg-red">Start SOP 2</Button>
          </Link>
        </div>
      </div>

      <div ref={resumeRef} className="max-w-3xl m-auto">
        <div className="resume-print">
          <ResumePdf />
        </div>
      </div>

      <div className="mt-5 md:mt-8 w-full flex items-center justify-between">
        <Link to={`/download-resume/${id}`}>
          <Button className="bg-white text-red border border-red">
            Full Preview Resume
          </Button>
        </Link>

        <Button onClick={downloadResume} className="bg-red">
          Download Resume
        </Button>
      </div>
    </RootLayout>
  );
};

export default FinalResume;
