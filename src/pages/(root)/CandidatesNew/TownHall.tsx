import CandidateNewLayout from "@/layouts/CandidateNewLayout";

export default function TownHall() {
  return (
    <CandidateNewLayout>
      <div>
        <h1 className="text-[#1F384C] mb-5 text-xl md:text-3xl font-bold">
          Weekly Town Hall
        </h1>
        <a
          target="_blank"
          href="https://bit.ly/study-and-work-in-17-countries"
          className="underline"
        >
          Join the Town Hall Meet through this link
        </a>
      </div>
    </CandidateNewLayout>
  );
}
