import { getInitials } from "@/lib/utils";
import { ACSCandidateProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/elda-new-logo.png";

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
  const [recommendedCandidates, setRecommendedCandidates] = useState<ACSCandidateProps[]>([]);
  const [notRecommendedCandidates, setNotRecommendedCandidates] = useState<ACSCandidateProps[]>([]);

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
      <h3 className="text-base font-semibold text-[#323232] mb-2">
        Candidates without recommendation
      </h3>
      <ul className="flex flex-col gap-2 mb-10">
        {notRecommendedCandidates.length > 0 ? (
          notRecommendedCandidates.map((candidate) => (
            <li
              key={candidate.id}
              className={`cursor-pointer p-3 rounded-md ${
                selectedCandidate?.id === candidate.id
                  ? "bg-pale-bg text-red border-b border-red"
                  : "hover:bg-gray"
              }`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <Link
                className="flex items-center gap-2"
                to={`/acs-dashboard/${candidate.id}`}
              >
                <span
                  className={`rounded-full border border-gray-border ${
                    selectedCandidate?.id === candidate.id ? "border-red" : ""
                  }  w-8 h-8 flex items-center justify-center`}
                >
                  {getInitials(candidate.full_name)}
                </span>
                {candidate.full_name}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No candidates without recommendations</p>
        )}
      </ul>

      <h3 className="text-md font-semibold text-[#323232] mb-2">
        Candidates with recommendations
      </h3>
      <ul className="flex flex-col gap-2">
        {recommendedCandidates.length > 0 ? (
          recommendedCandidates.map((candidate) => (
            <li
              key={candidate.id}
              className={`cursor-pointer p-3 rounded-md ${
                selectedCandidate?.id === candidate.id
                  ? "bg-pale-bg text-red border-b border-red"
                  : "hover:bg-gray"
              }`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              <Link
                className="flex items-center gap-2"
                to={`/acs-dashboard/${candidate.id}`}
              >
                <span
                  className={`rounded-full border border-gray-border ${
                    selectedCandidate?.id === candidate.id ? "border-red" : ""
                  }  w-8 h-8 flex items-center justify-center`}
                >
                  {getInitials(candidate.full_name)}
                </span>
                {candidate.full_name}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No candidates with recommendations</p>
        )}
      </ul>
    </aside>
  );
};

export default AcsSidebar;
