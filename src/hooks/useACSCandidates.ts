import { ACSCandidateProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

declare interface CandidatesResponse {
  results: ACSCandidateProps[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const useACSCandidates = () => {
  return useQuery<CandidatesResponse, Error>({
    queryKey: ["onboardedCandidates"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}onboarding-candidate/`);
      return data;
    },
  });
};
