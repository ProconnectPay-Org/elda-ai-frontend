import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import ResumePdf from "@/components/ResumePdf";

const FinalResume = () => {
  return (
    <RootLayout title="Final Resume Refined">
      <ResumePdf />
      <div className="mt-5 md:mt-8 w-full flex items-center justify-end">
        <Button className="bg-red">Complete</Button>
      </div>
    </RootLayout>
  );
};

export default FinalResume;
