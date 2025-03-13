import { getInitials } from "@/lib/utils";
import { ACSCandidateProps } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllOnboardedCandidateData } from "@/lib/actions/acs.actions";
import { getAllTableCandidates } from "@/lib/actions/user.actions";

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
    data: candidates,
    isLoading,
    isError: error,
  } = useQuery<{ results: ACSCandidateProps[] }>({
    queryKey: ["onboardedCandidates"],
    queryFn: () => getAllOnboardedCandidateData(),
    staleTime: 5 * 60 * 10,
  });

  // Fetch all table candidates
  const {
    data: tableCandidates,
    isLoading: loadingTable,
    isError: errorTable,
  } = useQuery<{ results: ACSCandidateProps[] }>({
    queryKey: ["tableCandidates"],
    queryFn: () => getAllTableCandidates(), // Adjust pagination if needed
    staleTime: 5 * 60 * 10,
  });

  useEffect(() => {
    if (!candidates || !tableCandidates) return;

    // Extract onboarded emails
    const onboardedEmails = new Set(candidates.results.map((c) => c.email));

    // Filter candidates whose email exists in both lists
    const filteredCandidates = tableCandidates.results.filter((c) =>
      onboardedEmails.has(c.email)
    );

    setProfileCreatedCandidates(filteredCandidates);
  }, [candidates, tableCandidates]);

  useEffect(() => {
    if (!candidates || !candidates.results) return;

    const candidate = id
      ? candidates.results.find((c) => c.id == id)
      : candidates.results[0];

    setSelectedCandidate(candidate || null);
  }, [candidates, id]);

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

  // Update candidate lists when candidates change
  useEffect(() => {
    if (!candidates || !candidates.results) {
      setRecommendedCandidates([]); // Ensure it's always set
      return;
    }

    const recommended = candidates.results.filter(isRecommended);
    setRecommendedCandidates(recommended);
  }, [candidates]);

  if (isLoading || loadingTable)
    return (
      <div className="flex items-center gap-2 justify-center">
        Loading candidates <Loader2 className="animate-spin" />
      </div>
    );

  if (error || errorTable) return <p>Error loading candidates</p>;

  return (
    <aside className="w-72 bg-gray h-screen p-4 fixed left-0 top-28 overflow-y-auto">
      <div>
        <h3 className="text-sm font-semibold text-[#323232] mb-2">
          Recommended Candidates
        </h3>
        <ul className="flex flex-col gap-2">
          {recommendedCandidates.length > 0 ? (
            recommendedCandidates.map((candidate) => (
              <li
                key={candidate.id}
                className={`cursor-pointer p-3 rounded-md ${
                  selectedCandidate?.id === candidate.id
                    ? "bg-pale-bg text-red border-b border-red"
                    : "hover:bg-gray"
                }`}
                onClick={() => setSelectedCandidate(candidate)}
              >
                <Link
                  className="flex items-center gap-2 text-sm"
                  to={`/admin/create-candidate-profile/${candidate.id}`}
                >
                  <span
                    className={`rounded-full border border-gray-border ${
                      selectedCandidate?.id === candidate.id ? "border-red" : ""
                    }  w-8 h-8 flex items-center justify-center`}
                  >
                    {getInitials(candidate.full_name)}
                  </span>
                  {candidate.full_name}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No candidates with recommendations
            </p>
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#323232] mb-2">
          Profile Created
        </h3>
        <ul className="flex flex-col gap-2">
          {profileCreatedCandidates.length > 0 ? (
            profileCreatedCandidates.map((candidate) => (
              <li
                key={candidate.id}
                className={`cursor-pointer p-3 rounded-md ${
                  selectedCandidate?.id === candidate.id
                    ? "bg-pale-bg text-red border-b border-red"
                    : "hover:bg-gray"
                }`}
                onClick={() => setSelectedCandidate(candidate)}
              >
                <Link
                  className="flex items-center gap-2 text-sm"
                  to={`/admin/create-candidate-profile/${candidate.id}`}
                >
                  <span
                    className={`rounded-full border border-gray-border ${
                      selectedCandidate?.id === candidate.id ? "border-red" : ""
                    }  w-8 h-8 flex items-center justify-center`}
                  >
                    {getInitials(candidate.full_name)}
                  </span>
                  {candidate.full_name}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No candidates with created profiles
            </p>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSideBar;
