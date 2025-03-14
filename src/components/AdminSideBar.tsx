import { ACSCandidateProps } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllOnboardedCandidateData } from "@/lib/actions/acs.actions";
import { getAllTableCandidates } from "@/lib/actions/user.actions";
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
  const [allCandidates, setAllCandidates] = useState<ACSCandidateProps[]>([]);

  const fetchAllCandidates = async () => {
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

    setAllCandidates(allResults);
  };

  useEffect(() => {
    fetchAllCandidates();
  }, []);

  // Fetch all table candidates
  const {
    data: tableCandidates,
    isLoading: loadingTable,
    isError: errorTable,
  } = useQuery<{ results: ACSCandidateProps[] }>({
    queryKey: ["tableCandidates"],
    queryFn: () => getAllTableCandidates(),
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
    return (
      candidate.first_country &&
      candidate.assigned_course1 &&
      candidate.assigned_university1 &&
      candidate.program_type1 &&
      candidate.second_country &&
      candidate.assigned_course2 &&
      candidate.assigned_university2 &&
      candidate.program_type2
    );
  };

  useEffect(() => {
    if (!allCandidates || !tableCandidates) return;

    // Extract onboarded emails into a Set
    const onboardedEmails = new Set(allCandidates.map((c) => c.email));

    // Candidates who have created profiles
    const filteredProfileCandidates = tableCandidates.results.filter((c) =>
      onboardedEmails.has(c.email_address)
    );
    setProfileCreatedCandidates(filteredProfileCandidates);

    // Recommended candidates who haven't created profiles
    const filteredRecommendedCandidates = allCandidates
      .filter(isRecommended)
      .filter(
        (c) => !tableCandidates.results.some((t) => t.email_address === c.email)
      );

    setRecommendedCandidates(filteredRecommendedCandidates);
  }, [allCandidates, tableCandidates]);

  if (loadingTable)
    return (
      <div className="flex items-center gap-2 justify-center">
        Loading candidates <Loader2 className="animate-spin" />
      </div>
    );

  if (errorTable) return <p>Error loading candidates</p>;

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
