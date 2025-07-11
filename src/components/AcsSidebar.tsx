import { ACSCandidateProps } from "@/types";
import React, { useMemo } from "react";
import Logo from "@/assets/elda-new-logo.png";
import CandidateLists from "./CandidateLists";

interface SidebarProps {
  candidates: ACSCandidateProps[];
  selectedCandidate: ACSCandidateProps | null;
  setSelectedCandidate: (candidate: ACSCandidateProps) => void;
  openMenu: boolean;
  isLoadingMore?: boolean;
  totalCandidates?: number;
}

const AcsSidebar: React.FC<SidebarProps> = ({
  candidates,
  selectedCandidate,
  setSelectedCandidate,
  openMenu,
  isLoadingMore = false,
  totalCandidates = 0,
}) => {
  // Memoized candidate categorization
  const { recommendedCandidates, notRecommendedCandidates, allCandidates } =
    useMemo(() => {
      const paidCandidates = candidates.filter(
        (candidate) => candidate.has_paid
      );

      const recommended = paidCandidates.filter(
        (candidate) => candidate.recommended
      );
      const notRecommended = paidCandidates.filter(
        (candidate) => !candidate.recommended
      );

      // Create sets for efficient lookup
      const recommendedIds = new Set(recommended.map((c) => c.id));
      const notRecommendedIds = new Set(notRecommended.map((c) => c.id));

      const remaining = candidates
        .filter(
          (candidate) =>
            !recommendedIds.has(candidate.id) &&
            !notRecommendedIds.has(candidate.id)
        )
        .sort((a, b) => a.full_name.localeCompare(b.full_name));

      return {
        recommendedCandidates: recommended,
        notRecommendedCandidates: notRecommended,
        allCandidates: remaining,
      };
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

      {/* Loading indicator */}
      {isLoadingMore && (
        <div className="text-center py-2 text-sm text-gray-600">
          Loading more candidates... ({totalCandidates} loaded)
        </div>
      )}

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
