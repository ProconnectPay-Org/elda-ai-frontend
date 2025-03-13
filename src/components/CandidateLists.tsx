import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getInitials } from "@/lib/utils";
import { ACSCandidateProps } from "@/types";

interface CandidateListProps {
  type: string;
  title: string;
  candidates: ACSCandidateProps[];
  selectedCandidate: ACSCandidateProps | null;
  onSelect: (candidate: ACSCandidateProps) => void;
  showCheckmark?: boolean;
  created?: boolean;
}

const CandidateLists: React.FC<CandidateListProps> = ({
  type,
  title,
  candidates,
  selectedCandidate,
  onSelect,
  showCheckmark = false,
  created = false,
}) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#323232] mb-2">{title}</h3>
      <ul className="flex flex-col gap-2">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <li
              key={candidate.id}
              className={`cursor-pointer p-3 rounded-md flex items-center justify-between ${
                selectedCandidate?.id === candidate.id
                  ? "bg-pale-bg text-red border-b border-red"
                  : "hover:bg-gray"
              }`}
              onClick={() => onSelect(candidate)}
            >
              {!created ? (
                <Link
                  className="flex items-center gap-2 text-sm flex-1"
                  to={`${
                    type === "admin"
                      ? `/admin/create-candidate-profile/${candidate.id}`
                      : `/acs-dashboard/${candidate.id}`
                  } `}
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
              ) : (
                <Link target="_blank" to={`/candidates/${candidate.id}`} className="flex items-center gap-2 text-sm flex-1">
                  <span
                    className={`rounded-full border border-gray-border ${
                      selectedCandidate?.id === candidate.id ? "border-red" : ""
                    }  w-8 h-8 flex items-center justify-center`}
                  >
                    {getInitials(candidate.full_name)}
                  </span>
                  {candidate.full_name}
                </Link>
              )}
              {showCheckmark && (
                <CheckCircle className="text-green-500 w-5 h-5" />
              )}
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No candidates available</p>
        )}
      </ul>
    </div>
  );
};

export default CandidateLists;
