import { ACSCandidateProps } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllOnboardedCandidateData } from "@/lib/actions/acs.actions";
import CandidateLists from "./CandidateLists";
import SaveBtn from "./SaveBtn";
import { useQuery } from "@tanstack/react-query";

const AdminSideBar = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCandidate, setSelectedCandidate] =
    useState<ACSCandidateProps | null>(null);
  const [recommendedCandidates, setRecommendedCandidates] = useState<
    ACSCandidateProps[]
  >([]);
  const [profileCreatedCandidates, setProfileCreatedCandidates] = useState<
    ACSCandidateProps[]
  >([]);

  const {
    data: allCandidates = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["onboardedCandidates"],
    queryFn: async () => {
      let page = 1;
      let allResults: ACSCandidateProps[] = [];
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await getAllOnboardedCandidateData(page);
        if (response.results) {
          allResults = [...allResults, ...response.results];
          page++;
          hasNextPage = !!response.next;
        } else {
          hasNextPage = false;
        }
      }

      return allResults;
    },
    staleTime: 5 * 60 * 10,
  });

  useEffect(() => {
    if (!allCandidates) return;

    const candidate = id
      ? allCandidates.find((c) => c.id == id)
      : allCandidates[0];

    setSelectedCandidate(candidate || null);
  }, [allCandidates, id]);

  // Function to check if a candidate has all required fields filled
  const isRecommended = (candidate: ACSCandidateProps) => {
    return candidate.recommended;
  };

  useEffect(() => {
    if (!allCandidates) return;

    const candidatesWithProfile = allCandidates.filter(
      (candidate) => candidate.has_profile
    );
    setProfileCreatedCandidates(candidatesWithProfile);

    // Recommended candidates who haven't created profiles
    const filteredRecommendedCandidates = allCandidates
      .filter(isRecommended)
      .filter((candidate) => {
        return !candidate.has_profile;
      });
    setRecommendedCandidates(filteredRecommendedCandidates);
  }, [allCandidates]);

  if (isLoading) return <SaveBtn text="Loading Candidates" />;

  if (isError) return <p>Error loading candidates</p>;

  return (
    <aside className="w-72 bg-gray h-screen p-4 fixed left-0 top-28 overflow-y-auto">
      {/* Recommended Candidates */}
      <CandidateLists
        title="Recommended Candidates"
        candidates={recommendedCandidates}
        selectedCandidate={selectedCandidate}
        onSelect={setSelectedCandidate}
        type="admin"
      />

      {/* Profile Created */}
      <div className="my-5">
        <CandidateLists
          title="Profile Created"
          candidates={profileCreatedCandidates}
          selectedCandidate={selectedCandidate}
          onSelect={setSelectedCandidate}
          showCheckmark={true}
          type="admin"
          created={true}
        />
      </div>
    </aside>
  );
};

export default AdminSideBar;
