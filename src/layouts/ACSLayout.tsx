import AcsCandidateDetails from "@/components/AcsCandidateDetails";
import AcsSidebar from "@/components/AcsSidebar";
import SaveBtn from "@/components/SaveBtn";
import { getAllOnboardedCandidateData } from "@/lib/actions/acs.actions";
import { ACSCandidateProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ACSLayout = () => {
  const [selectedCandidate, setSelectedCandidate] =
    useState<ACSCandidateProps | null>(null);
  const { id } = useParams<{ id: string }>();

  // Function to fetch all pages of candidates  // Fetch all candidates using React Query
  const { data: allCandidates = [], isLoading } = useQuery({
    queryKey: ["onboardedCandidates"],
    queryFn: async () => {
      let page = 1;
      let allResults: ACSCandidateProps[] = [];
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await getAllOnboardedCandidateData(page);
        if (response?.results) {
          allResults = [...allResults, ...response.results];
          page++;
          hasNextPage = !!response.next;
        } else {
          hasNextPage = false;
        }
      }

      return allResults;
    },
    staleTime: 5 * 1 * 60,
  });

  useEffect(() => {
    if (allCandidates.length > 0) {
      const paidCandidate = allCandidates.find((c) => c.has_paid);
      const candidate = id
        ? allCandidates.find((c) => c.id == id)
        : paidCandidate || allCandidates[0];

      setSelectedCandidate(candidate || allCandidates[0]);
    }
  }, [allCandidates]);

  return (
    <div className="flex">
      {allCandidates.length === 0 || isLoading ? (
        <div className="flex items-center gap-2 p-4 justify-center w-80 bg-gray">
          <SaveBtn text="Loading Candidates" />
        </div>
      ) : (
        <>
          <AcsSidebar
            candidates={allCandidates}
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
          />
        </>
      )}
      {/* Main content */}
      <main className="flex-1 ml-80 pb-20 min-h-screen">
        <AcsCandidateDetails candidate={selectedCandidate} />
      </main>
    </div>
  );
};

export default ACSLayout;
