import AcsCandidateDetails from "@/components/AcsCandidateDetails";
import AcsSidebar from "@/components/AcsSidebar";
import { useACSCandidates } from "@/hooks/useACSCandidates";
import { Loader2 } from "lucide-react";
import { useState } from "react";

declare interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  age: string;
  gender: string;
  graduate_of: string;
  has_paid: boolean;
}

const ACSLayout = () => {
  const { data: candidates, isLoading, error } = useACSCandidates();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  // Set first candidate as default on first load
  useState(() => {
    if (candidates && candidates.results.length > 0) {
      setSelectedCandidate(candidates.results[0]);
    }
  });

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
      <main className="flex-1 ml-64 pb-20 overflow-y-auto h-screen">
        <AcsCandidateDetails candidate={selectedCandidate} />
      </main>
    </div>
  );
};

export default ACSLayout;
