import { ACSCandidateProps } from "@/types";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/elda-new-logo.png";
import CandidateLists from "./CandidateLists";

interface SidebarProps {
  candidates: ACSCandidateProps[];
  selectedCandidate: ACSCandidateProps | null;
  setSelectedCandidate: (candidate: ACSCandidateProps) => void;
}

const AcsSidebar: React.FC<SidebarProps> = ({
  candidates,
  selectedCandidate,
  setSelectedCandidate,
}) => {
  // Check if candidate has all recommendation fields filled
  const [recommendedCandidates, setRecommendedCandidates] = useState<
    ACSCandidateProps[]
  >([]);
  const [notRecommendedCandidates, setNotRecommendedCandidates] = useState<
    ACSCandidateProps[]
  >([]);

  // Function to check if a candidate has all required fields filled
  const isRecommended = (candidate: ACSCandidateProps) => {
    return (
      candidate.first_country &&
      candidate.assigned_course1 &&
      candidate.assigned_university1 &&
      candidate.program_type1 &&
      candidate.second_country &&
      candidate.assigned_course2 &&
      candidate.assigned_university2 &&
      candidate.program_type2
    );
  };

  const paidCandidates = candidates.filter((candidate) => candidate.has_paid);

  // Update candidate lists when candidates change
  useEffect(() => {
    const recommended = paidCandidates.filter(isRecommended);
    const notRecommended = paidCandidates.filter(
      (candidate) => !isRecommended(candidate)
    );

    setRecommendedCandidates(recommended);
    setNotRecommendedCandidates(notRecommended);
  }, [candidates]);

  return (
    <aside className="w-80 bg-gray h-screen p-4 fixed left-0 top-0 overflow-y-auto">
      <div className="flex items-center justify-center h-36">
        <img src={Logo} alt="logo" className="object-contain" />
      </div>

      <CandidateLists
        title="Candidates Without Recommendation"
        candidates={notRecommendedCandidates}
        selectedCandidate={selectedCandidate}
        onSelect={setSelectedCandidate}
        type="acs"
      />

      <div className="my-5">
        <CandidateLists
          title="Candidates With Recommendation"
          candidates={recommendedCandidates}
          selectedCandidate={selectedCandidate}
          onSelect={setSelectedCandidate}
          type="acs"
          showCheckmark={true}
        />
      </div>
    </aside>
  );
};

export default AcsSidebar;
