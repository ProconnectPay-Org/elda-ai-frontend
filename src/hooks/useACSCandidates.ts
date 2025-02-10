import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

declare interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  age: string;
  gender: string;
  graduate_of: string;
  has_paid: boolean;
}

declare interface CandidatesResponse {
  results: Candidate[];
}

export const useACSCandidates = () => {
  return useQuery<CandidatesResponse, Error>({
    queryKey: ["candidates"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}onboarding-candidate/`);
      return data;
    },
  });
};
