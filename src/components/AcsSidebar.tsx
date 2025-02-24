import { getInitials } from "@/lib/utils";
import { ACSCandidateProps } from "@/types";
import React from "react";
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
  const paidCandidates = candidates.filter((candidate) => candidate.has_paid);
  const unPaidCandidates = candidates.filter(
    (candidate) => !candidate.has_paid
  );

  return (
    <aside className="w-80 bg-gray h-screen p-4 fixed left-0 top-0 overflow-y-auto">
      <div className="flex items-center justify-center h-36">
        <img src={Logo} alt="logo" className="object-contain" />
      </div>
      <h3 className="text-base font-semibold text-[#323232] mb-2">
        Candidates without recommendation
      </h3>
      <ul className="flex flex-col gap-2 mb-20">
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

      <h3 className="text-md font-semibold text-[#323232] mb-2">Candidates with recommendations</h3>
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
