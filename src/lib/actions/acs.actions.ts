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

export const getAllOnboardedCandidateData = async (
  page?: number,
  query?: string
) => {
  let url = `${API_URL}onboarding-candidate`;

  if (query) {
    url += `&query=${encodeURIComponent(query)}`;
  }

  if (page && (!query || page > 1)) {
    url += `&page=${page}`;
  }
  try {
    const response = await axios.get(`${url}`, {
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

export const deleteACSCandidate = async (id: number | string) => {
  try {
    const response = await axios.delete(
      `${API_URL}onboarding-candidate/${id}/`
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw error;
  }
};
