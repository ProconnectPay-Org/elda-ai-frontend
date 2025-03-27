// import CandidateNewLayout from '@/layouts/CandidateNewLayout'
import TestingLayout from '@/layouts/TestingLayout'

export default function LinkedInMasterClass() {
  return (
    <TestingLayout>
      <section className="max-w-[1200px] mx-auto space-y-8">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <h2 className="text-[#1F384C] text-2xl md:text-3xl font-bold text-center">
            Watch LinkedIn Masterclass
          </h2>

          <div className="space-y-6">
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
            <p className="text-red font-medium text-center max-w-2xl mx-auto hover:text-red-700 transition-colors">
              Click the video above to discover and learn expert tips on
              transforming your LinkedIn profile
            </p>
          </div>
        </div>
      </section>
    </TestingLayout>
  )
}
