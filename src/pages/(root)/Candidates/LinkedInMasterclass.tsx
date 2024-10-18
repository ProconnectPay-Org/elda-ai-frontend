import CandidateLayout from "@/layouts/CandidateLayout";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LinkedInMasterclass = () => {
  return (
    <CandidateLayout>
      <section className="w-full space-y-5 md:max-w-[880px] mx-auto">
        <div className="flex items-center">
          <Link to="/admin-dashboard">
            <ArrowLeftIcon color="red" className="cursor-pointer" />
          </Link>
          <h2 className="text-red text-xl md:text-3xl font-bold text-center w-full">
            Watch LinkedIn Masterclass
          </h2>
        </div>

        <div className="space-y-4 h-[300px] md:h-[315px] flex mx-auto flex-col md:w-[560px] items-center">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/CRLHIYt-N5o?si=XU90oXNl7x08-WJ3"
            title="YouTube video player"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {/* <video className="w-full md:h-80 rounded-2xl bg-black" controls></video> */}
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
