import CandidateNewLayout from "@/layouts/CandidateNewLayout";

export default function UsingPortal() {
  return (
    <CandidateNewLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-[#1F384C] text-2xl md:text-3xl font-bold">Using the Portal</h1>

        <div>
          <p>
            eLDA AI is our proprietary school application platform, providing
            academic counseling, resume refinement, and personalized Statement
            of Purpose (SOP) creation. It serves as the central hub for
            submitting your applications to two universities.
          </p>
        </div>
        <div>
        <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden">
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
            </div>
        <h3 className="text-red ">Watch the explainer video</h3>
        </div>
      </div>
    </CandidateNewLayout>
  );
}
