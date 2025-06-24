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
  const [searchResults, setSearchResults] = useState<ACSCandidateProps[]>([]);
  const [openMenu, setOpenMenu] = useState(false);
  const { id } = useParams<{ id: string }>();

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
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const candidatesToConsider =
      searchResults.length > 0 ? searchResults : allCandidates;

    if (candidatesToConsider.length > 0) {
      const paidCandidate = candidatesToConsider.find((c) => c.has_paid);
      const candidate = id
        ? candidatesToConsider.find((c) => c.id == id)
        : paidCandidate || candidatesToConsider[0];

      setSelectedCandidate(candidate || candidatesToConsider[0]);
    }
  }, [allCandidates, searchResults]);

  const handleSearch = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const filteredResults = allCandidates.filter((candidate) =>
      candidate.full_name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className="flex">
      {allCandidates.length === 0 || isLoading ? (
        <div className="flex items-center gap-2 p-4 justify-center w-80 bg-gray">
          <SaveBtn text="Loading Candidates" />
        </div>
      ) : (
        <>
          <AcsSidebar
            candidates={
              searchResults.length > 0 ? searchResults : allCandidates
            }
            selectedCandidate={selectedCandidate}
            setSelectedCandidate={setSelectedCandidate}
            openMenu={openMenu}
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
