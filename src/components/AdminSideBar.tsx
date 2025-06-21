import { ACSCandidateProps } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllOnboardedCandidateData } from "@/lib/actions/acs.actions";
import CandidateLists from "./CandidateLists";

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
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [allCandidates, setAllCandidates] = useState<ACSCandidateProps[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loadMoreCandidates = async () => {
    if (!hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await getAllOnboardedCandidateData(nextPage);

      if (response?.results) {
        setAllCandidates((prev) => [...prev, ...response.results]);
        setPage(nextPage);
        setHasNextPage(!!response.next);
      }
    } catch (error) {
      console.error("Error loading more candidates", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const totalPages = Math.ceil(count / 50);

  useEffect(() => {
    const fetchInitialCandidates = async () => {
      try {
        setIsInitialLoading(true);
        const response = await getAllOnboardedCandidateData(1);
        if (response?.results) {
          setAllCandidates(response.results);
          setHasNextPage(!!response.next);
          setCount(response.count);
        }
      } catch (error) {
        console.error("Failed to load initial candidates:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialCandidates();
  }, []);

  useEffect(() => {
    if (!allCandidates.length) return;

    const candidate = id
      ? allCandidates.find((c) => c.id == id)
      : allCandidates[0];

    setSelectedCandidate(candidate || null);

    const candidatesWithProfile = allCandidates.filter(
      (candidate) => candidate.has_profile
    );
    setProfileCreatedCandidates(candidatesWithProfile);

    const filteredRecommendedCandidates = allCandidates.filter(
      (c) => c.recommended && !c.has_profile
    );

    setRecommendedCandidates(filteredRecommendedCandidates);
  }, [allCandidates, id]);

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

  return (
    <aside className="w-72 bg-gray h-screen p-4 fixed left-0 top-28 overflow-y-auto">
      {isInitialLoading && (
        <div className="w-72 bg-gray h-screen p-4 fixed left-0 top-28 overflow-y-auto flex items-center justify-center">
          <p className="text-sm text-gray-700">Loading Candidates...</p>
        </div>
      )}
      {/* Recommended Candidates */}
      <CandidateLists
        title="Recommended Candidates"
        candidates={recommendedCandidates}
        selectedCandidate={selectedCandidate}
        onSelect={setSelectedCandidate}
        type="admin"
      />
      {hasNextPage && (
        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            onClick={loadMoreCandidates}
            disabled={isLoadingMore}
            className="px-4 py-2 bg-red text-white text-sm rounded disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load More Candidates"}
          </button>
          <p className="text-xs text-gray-600">
            Page {page} of {totalPages}
          </p>
        </div>
      )}
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
