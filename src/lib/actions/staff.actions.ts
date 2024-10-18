import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const staffToken = Cookies.get("staff_access_token");

const config = {
  headers: {
    Authorization: `Bearer ${staffToken}`,
    "Content-Type": "application/json",
  },
};

export const getStaffDetails = async () => {
  const staffToken = Cookies.get("staff_access_token");

  if (!staffToken) {
    throw new Error("No token available");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${staffToken}`,
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.get(`${API_URL}staff-dashboard/`, config);
  return data;
};

export const staffGetAllCandidates = async (id: string) => {
  const response = await axios.get(`${API_URL}all-candidates/${id}`, config);
  return response.data;
};

export const fetchEducationData = async (educationId: any) => {
  const { data } = await axios.get(
    `${API_URL}register/education/${educationId}/`,
    config
  );
  return data;
};

export const fetchCareerData = async (careerId: any) => {
  const { data } = await axios.get(
    `${API_URL}register/career/${careerId}/`,
    config
  );
  return data;
};

export const fetchJobExperienceData = async (work_experience_id: any) => {
  const { data } = await axios.get(
    `${API_URL}register/job-experience/${work_experience_id}/`,
    config
  );
  return data;
};

export const getAdvancedDegree = async (advancedId: any) => {
  const { data } = await axios.get(
    `${API_URL}register/advanced-education/${advancedId}/`,
    config
  );
  return data;
};

export const craftCandidateResume = async (id: any) => {
  const { data } = await axios.get(
    `${API_URL}staff-dashboard/craft-candidate-resume/${id}/`,
    config
  );
  return data;
};

// export const careerStrategyPurpose = async (id: any) => {
//   const { data } = await axios.get(
//     `${API_URL}staff-dashboard/generate-career-strategic-purpose/${id}/`,
//     config
//   );
//   return data;
// };

export const generateSop = async (id: any) => {
  const { data } = await axios.get(
    `${API_URL}staff-dashboard/generate-sop/${id}/`,
    config
  );
  return data;
};
