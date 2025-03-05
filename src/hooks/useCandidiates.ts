// hooks/useCandidates.ts
import { useQuery } from "@tanstack/react-query";
import { getSingleCandidate } from "@/lib/actions/user.actions";

export const useCandidates = (candidateId?: string) => {
  const {
    data: singleCandidate,
    error: singleCandidateError,
    isLoading: singleCandidateLoading,
    refetch: refetchSingleCandidate,
  } = useQuery({
    queryKey: ["singleCandidate", candidateId],
    queryFn: () => getSingleCandidate(candidateId as string),
    enabled: !!candidateId, // Only enable when fetching a specific candidate
  });

  return {
    singleCandidate,
    singleCandidateError,
    singleCandidateLoading,
    refetchSingleCandidate,
  };
};
