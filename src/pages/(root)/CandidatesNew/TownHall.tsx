import CandidateNewLayout from "@/layouts/CandidateNewLayout";

export default function TownHall() {
  return (
    <CandidateNewLayout>
      <div>
        <h1 className="text-[#1F384C] mb-5 text-xl md:text-3xl font-bold">
          Weekly Town Hall
        </h1>
        <div className="flex flex-col space-y-6">
          <p>
          The Customer Success Operations Team invites all Proconnect Global Education Community members to join our Weekly Townhall:
          </p>
          <div className="flex flex-col">
            <span>
            <span className="font-bold">Day:</span> Every Friday
            </span>
            <span><span className="font-bold">Time:</span> 10:00 AM – 12:00 Noon (Nigerian Time)</span>
            <span><span className="font-bold">Venue:</span> Zoom</span>
          </div>

          <p>
          This free forum addresses member concerns, issues, and petitions. You can take advantage of this opportunity to connect and get support.
          </p>

          <p>Thank you!</p>

          <p>
          You can register once to access all future sessions. You can register below.
          </p>

          <a
          target="_blank"
          href="https://us06web.zoom.us/meeting/register/tZArcOCgqzkiHdC4O4YXEy1RQItmjHAPPQPr#/registration"
          className="underline text-red"
        >
          Join the Town Hall Meet through this link
        </a>
        </div>
        
      </div>
    </CandidateNewLayout>
  );
}
