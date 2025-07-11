import AcsCandidateDetails from "@/components/AcsCandidateDetails";
import AcsSidebar from "@/components/AcsSidebar";
import SaveBtn from "@/components/SaveBtn";
import { getAllOnboardedCandidateData } from "@/lib/actions/acs.actions";
import { ACSCandidateProps } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const ACSLayout = () => {
  const [selectedCandidate, setSelectedCandidate] =
    useState<ACSCandidateProps | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  // First, fetch the initial page
  const { data: initialData, isLoading: isInitialLoading } = useQuery({
    queryKey: ["onboardedCandidates", "initial"],
    queryFn: async () => {
      const response = await getAllOnboardedCandidateData(1);
      return {
        results: response?.results || [],
        hasMore: !!response?.next,
        totalPages: response?.count
          ? Math.ceil(response.count / (response.results?.length || 20))
          : 1,
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  // Then, fetch all remaining pages in the background
  const { data: allPagesData } = useQuery({
    queryKey: ["onboardedCandidates", "all"],
    queryFn: async () => {
      if (!initialData?.hasMore) return initialData?.results || [];

      let allResults: ACSCandidateProps[] = [...(initialData?.results || [])];
      let page = 2;
      let hasNextPage = true;

      while (hasNextPage) {
        try {
          const response = await getAllOnboardedCandidateData(page);
          if (response?.results && response.results.length > 0) {
            allResults = [...allResults, ...response.results];

            // Update cache progressively
            queryClient.setQueryData(
              ["onboardedCandidates", "all"],
              allResults
            );

            page++;
            hasNextPage = !!response.next;
          } else {
            hasNextPage = false;
          }
        } catch (error) {
          console.error(`Error fetching page ${page}:`, error);
          hasNextPage = false;
        }
      }

      return allResults;
    },
    enabled: !!initialData && initialData.hasMore,
    staleTime: 5 * 60 * 1000,
  });

  // Use initial data immediately, then switch to complete data when available
  const allCandidates = useMemo(() => {
    return allPagesData || initialData?.results || [];
  }, [allPagesData, initialData?.results]);

  // Memoized search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return allCandidates.filter((candidate: any) =>
      candidate.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allCandidates, searchQuery]);

  // Memoized candidates to display
  const candidatesToShow = useMemo(() => {
    return searchResults.length > 0 ? searchResults : allCandidates;
  }, [searchResults, allCandidates]);

  // Optimized search handler
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Optimized candidate selection
  const selectCandidate = useCallback((candidate: ACSCandidateProps) => {
    setSelectedCandidate(candidate);
  }, []);

  // Set initial selected candidate
  useEffect(() => {
    if (candidatesToShow.length > 0 && !selectedCandidate) {
      const targetCandidate = id
        ? candidatesToShow.find((c: any) => c.id.toString() === id)
        : candidatesToShow.find((c: any) => c.has_paid) || candidatesToShow[0];

      if (targetCandidate) {
        setSelectedCandidate(targetCandidate);
      }
    }
  }, [candidatesToShow, id, selectedCandidate]);

  // Update selected candidate when search changes
  useEffect(() => {
    if (searchQuery && searchResults.length > 0) {
      const currentlySelected = searchResults.find(
        (c: any) => c.id === selectedCandidate?.id
      );
      if (!currentlySelected) {
        const paidCandidate = searchResults.find((c: any) => c.has_paid);
        setSelectedCandidate(paidCandidate || searchResults[0]);
      }
    }
  }, [searchResults, selectedCandidate?.id, searchQuery]);

  const isLoading = isInitialLoading;
  const hasData = candidatesToShow.length > 0;

  return (
    <div className="flex">
      {!hasData && isLoading ? (
        <div className="flex items-center gap-2 p-4 justify-center w-80 bg-gray">
          <SaveBtn text="Loading Candidates" />
        </div>
      ) : (
        <AcsSidebar
          candidates={candidatesToShow}
          selectedCandidate={selectedCandidate}
          setSelectedCandidate={selectCandidate}
          openMenu={openMenu}
          isLoadingMore={!allPagesData && !!initialData?.hasMore}
          totalCandidates={allCandidates.length}
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-80 pb-20 min-h-screen">
        <AcsCandidateDetails
          handleSearch={handleSearch}
          candidate={selectedCandidate}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        />
      </main>
    </div>
  );
};

export default ACSLayout;
