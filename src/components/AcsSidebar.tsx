import { ACSCandidateProps } from "@/types";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/elda-new-logo.png";
import CandidateLists from "./CandidateLists";

interface SidebarProps {
  candidates: ACSCandidateProps[];
  selectedCandidate: ACSCandidateProps | null;
  setSelectedCandidate: (candidate: ACSCandidateProps) => void;
  openMenu: boolean;
  hasNextPage: boolean;
  isLoadingMore: boolean;
  loadMoreCandidates: () => void;
  loadedPages: number;
  totalPages: number;
}

const AcsSidebar: React.FC<SidebarProps> = ({
  candidates,
  selectedCandidate,
  setSelectedCandidate,
  openMenu,
  hasNextPage,
  isLoadingMore,
  loadMoreCandidates,
  loadedPages,
  totalPages,
}) => {
  // Check if candidate has all recommendation fields filled
  const [recommendedCandidates, setRecommendedCandidates] = useState<
    ACSCandidateProps[]
  >([]);
  const [notRecommendedCandidates, setNotRecommendedCandidates] = useState<
    ACSCandidateProps[]
  >([]);
  const [allCandidates, setAllCandidates] = useState<ACSCandidateProps[]>([]);

  // Function to check if a candidate has all required fields filled
  const isRecommended = (candidate: ACSCandidateProps) => candidate.recommended;

  // Update candidate lists when candidates change
  useEffect(() => {
    const paidCandidates = candidates.filter((candidate) => candidate.has_paid);

    const recommended = paidCandidates.filter(isRecommended);
    const notRecommended = paidCandidates.filter(
      (candidate) => !isRecommended(candidate)
    );

    setRecommendedCandidates(recommended);
    setNotRecommendedCandidates(notRecommended);

    // Exclude candidates already in recommended or not recommended lists
    const recommendedIds = new Set(recommended.map((c) => c.id));
    const notRecommendedIds = new Set(notRecommended.map((c) => c.id));

    const uniqueAllCandidates = candidates
      .filter(
        (candidate) =>
          !recommendedIds.has(candidate.id) &&
          !notRecommendedIds.has(candidate.id)
      )
      .sort((a, b) => a.full_name.localeCompare(b.full_name));

    setAllCandidates(uniqueAllCandidates);
  }, [candidates]);

  return (
    <aside
      className={`transition-all duration-300 ${
        openMenu ? "w-80 p-4" : "w-0 p-0"
      } z-20 md:w-80 bg-gray h-screen md:p-4 fixed left-0 top-0 overflow-y-auto`}
    >
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

      {hasNextPage && (
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={loadMoreCandidates}
            disabled={isLoadingMore}
            className="px-4 py-2 bg-red text-white text-sm rounded disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load More Candidates"}
          </button>
          <p className="text-xs text-gray-600 mt-1">
            Page {loadedPages} of {totalPages}
          </p>
        </div>
      )}

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

      <div className="my-5">
        <CandidateLists
          title="All Candidates"
          candidates={allCandidates}
          selectedCandidate={selectedCandidate}
          onSelect={setSelectedCandidate}
          type="acs"
          showCheckmark={false}
        />
      </div>
    </aside>
  );
};

export default AcsSidebar;
