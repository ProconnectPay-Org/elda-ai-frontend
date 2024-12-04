import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import ResumePdf from "@/components/ResumePdf";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FinalResume = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return;
  }

  return (
    <RootLayout title="Final Resume Refined">
      <div>
        <Link to={`/refine-resume/${id}`}>
          <ArrowLeft className="cursor-pointer" />
        </Link>
      </div>

      <ResumePdf />

      <div className="mt-5 md:mt-8 w-full flex items-center justify-end">
        <Link to={`/download-resume/${id}`}>
          <Button className="bg-red">View Resume</Button>
        </Link>
      </div>
    </RootLayout>
  );
};

export default FinalResume;
