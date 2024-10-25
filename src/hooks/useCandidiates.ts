// hooks/useCandidates.ts
import { useQuery } from "@tanstack/react-query";
import {
  getAllCandidates,
  getSingleCandidate,
} from "@/lib/actions/user.actions";
import Cookies from "js-cookie";

const getToken = () =>
  Cookies.get("staff_access_token") || Cookies.get("access_token");

export const useCandidates = (candidateId?: string) => {
  const {
    data: allCandidates,
    error: allCandidatesError,
    isLoading: allCandidatesLoading,
    refetch: refetchAllCandidates,
  } = useQuery({
    queryKey: ["allCandidates"],
    queryFn: async () => {
      const token = getToken();
      if (!token)
        throw new Error("Access token is missing. Please sign in again.");
      return getAllCandidates();
    },
    enabled: !!getToken(),
  });

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
    allCandidates,
    allCandidatesError,
    allCandidatesLoading,
    refetchAllCandidates,
    singleCandidate,
    singleCandidateError,
    singleCandidateLoading,
    refetchSingleCandidate,
  };
};
