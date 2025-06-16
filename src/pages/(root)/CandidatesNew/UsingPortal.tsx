import CandidateNewLayout from "@/layouts/CandidateNewLayout";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

export default function UsingPortal() {
  return (
    <CandidateNewLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-[#1F384C] text-xl md:text-3xl font-bold">
          Using the Portal
        </h1>

        <div>
          <p className="text-justify">
            <span className="text-blue-700 font-semibold">eLDa AI</span> is our
            proprietary school application platform, providing academic
            counseling, resume refinement, and personalized Statement of Purpose
            (SOP) creation. It serves as the central hub for submitting your
            applications to two universities.
          </p>
        </div>
        <div className="flex items-center flex-col space-y-6">
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://drive.google.com/file/d/1aLM3XQTrE9lzThSkMKNjtxjSuaifFW08/preview"
              title="Google Drive video player"
              allow="autoplay"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <h3 className="text-red font-medium">Watch the explainer video</h3>
          {/* <Button 
            onClick={handleProceed}
            disabled={!isVideoComplete}
            className="mt-4"
          >
            {isVideoComplete ? "Proceed to Status Page" : "Watch Video to Proceed"}
          </Button> */}
        </div>
      </div>
    </CandidateNewLayout>
  );
}
