import AcsCandidateDetails from "@/components/AcsCandidateDetails";
import AcsSidebar from "@/components/AcsSidebar";
import SaveBtn from "@/components/SaveBtn";
import { getAllOnboardedCandidateData } from "@/lib/actions/acs.actions";
import { ACSCandidateProps } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ACSLayout = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCandidate, setSelectedCandidate] =
    useState<ACSCandidateProps | null>(null);
  const [searchResults, setSearchResults] = useState<ACSCandidateProps[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [candidates, setCandidates] = useState<ACSCandidateProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchInitialCandidates = async () => {
      setIsInitialLoading(true);
      try {
        const response = await getAllOnboardedCandidateData(1);
        if (response?.results) {
          setCandidates(response.results);
          setHasNextPage(!!response.next);
          setTotalCount(response.count);
          setPage(1);
        }
      } catch (error) {
        console.error("Error fetching candidates", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialCandidates();
  }, []);

  // Load more pages
  const loadMoreCandidates = async () => {
    if (!hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await getAllOnboardedCandidateData(nextPage);
      if (response?.results) {
        setCandidates((prev) => [...prev, ...response.results]);
        setHasNextPage(!!response.next);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more candidates", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Sync selected candidate when list or search changes
  useEffect(() => {
    const list = searchResults.length > 0 ? searchResults : candidates;

    if (list.length > 0) {
      const paid = list.find((c) => c.has_paid);
      const found = id ? list.find((c) => c.id == id) : paid || list[0];

      setSelectedCandidate(found || list[0]);
    }
  }, [candidates, searchResults, id]);

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const filtered = candidates.filter((c) =>
      c.full_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const totalPages = Math.ceil(totalCount / 50);
  const loadedPages = Math.ceil(candidates.length / 50);

  return (
    <div className="flex">
      {isInitialLoading ? (
        <div className="flex items-center gap-2 p-4 justify-center w-80 bg-gray">
          <SaveBtn text="Loading Candidates" />
        </div>
      ) : (
        <>
          <AcsSidebar
            candidates={searchResults.length > 0 ? searchResults : candidates}
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
            openMenu={openMenu}
            hasNextPage={hasNextPage}
            isLoadingMore={isLoadingMore}
            loadMoreCandidates={loadMoreCandidates}
            loadedPages={loadedPages}
            totalPages={totalPages}
          />
        </>
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
