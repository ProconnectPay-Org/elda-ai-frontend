import AcsCandidateDetails from "@/components/AcsCandidateDetails";
import AcsSidebar from "@/components/AcsSidebar";
import { useACSCandidates } from "@/hooks/useACSCandidates";
import { ACSCandidateProps } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ACSLayout = () => {
  const { data: candidates, isLoading, error } = useACSCandidates();
  const { id } = useParams<{ id: string }>();
  const [selectedCandidate, setSelectedCandidate] =
    useState<ACSCandidateProps | null>(null);

  // Set first candidate as default on first load
  useEffect(() => {
    if (candidates?.results && candidates?.results?.length > 0) {
      // Find the candidate with the matching ID
      const candidate = id
        ? candidates.results.find((c) => c.id == id)
        : candidates.results[0];

      setSelectedCandidate(candidate || candidates.results[0]);
    }
  }, [candidates]);

  if (isLoading)
    return (
      <div className="flex items-center gap-2 justify-center">
        Loading candidates <Loader2 className="animate-spin" />
      </div>
    );
  if (error) return <p>Error loading candidates</p>;

  return (
    <div className="flex">
      <AcsSidebar
        candidates={candidates?.results || []}
        selectedCandidate={selectedCandidate}
        setSelectedCandidate={setSelectedCandidate}
      />
      {/* Main content */}
      <main className="flex-1 ml-80 pb-20 min-h-screen">
        <AcsCandidateDetails candidate={selectedCandidate} />
      </main>
    </div>
  );
};

export default ACSLayout;
