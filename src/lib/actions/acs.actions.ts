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

export const getAllOnboardedCandidateData = async () => {
  try {
    const response = await axios.get(`${API_URL}onboarding-candidate/`, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getSingleOnboardedCandidateData = async (id: string) => {
  if (!id) return null;

  try {
    const response = await axios.get(`${API_URL}onboarding-candidate/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
