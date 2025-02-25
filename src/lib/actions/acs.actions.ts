import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const updateCandidateData = async (
  email: string,
  submissionData: any
) => {
  try {
    const response = await axios.put(
      `${API_URL}onboarding-candidate/s/${email}/`,
      { ...submissionData, degree: [], countries: [], interest: {} },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
