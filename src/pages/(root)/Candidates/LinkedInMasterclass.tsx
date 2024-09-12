import CandidateLayout from "@/layouts/CandidateLayout";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LinkedInMasterclass = () => {
  return (
    <CandidateLayout>
      <section className="w-full space-y-5 md:max-w-[880px] mx-auto p-4">
        <div className="flex items-center">
          <Link to="/admin-dashboard">
            <ArrowLeftIcon color="red" className="cursor-pointer" />
          </Link>
          <h2 className="text-red text-xl md:text-3xl font-bold text-center w-full">
            Watch LinkedIn Masterclass
          </h2>
        </div>

        <div className="space-y-4">
          <video className="w-full md:h-80 rounded-2xl bg-black" controls></video>
          <p className="text-red underline text-center">
            Click the video above to discover and Learn expert tips on
            transforming your LinkedIn profile
          </p>
        </div>
      </section>
    </CandidateLayout>
  );
};

export default LinkedInMasterclass;
