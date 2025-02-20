import { getInitials } from "@/lib/utils";
import { ACSCandidateProps } from "@/types";
import React from "react";
import { Link } from "react-router-dom";

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
  const paidCandidates = candidates.filter((candidate) => candidate.has_paid);
  const unPaidCandidates = candidates.filter(
    (candidate) => !candidate.has_paid
  );

  return (
    <aside className="w-64 bg-gray h-screen p-4 fixed left-0 top-0 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Candidates</h2>
      <h3 className="text-md font-semibold text-green-600 mb-2">
        Paid Candidates
      </h3>
      <ul className="flex flex-col gap-2 mb-4">
        {paidCandidates.length > 0 ? (
          paidCandidates.map((candidate) => (
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
          <p className="text-sm text-gray-500">No paid candidates</p>
        )}
      </ul>

      <h3 className="text-md font-semibold text-red mb-2">Unpaid Candidates</h3>
      <ul className="flex flex-col gap-2">
        {unPaidCandidates.length > 0 ? (
          unPaidCandidates.map((candidate) => (
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
          <p className="text-sm text-gray-500">No unpaid candidates</p>
        )}
      </ul>
    </aside>
  );
};

export default AcsSidebar;
