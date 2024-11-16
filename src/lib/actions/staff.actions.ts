import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

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
  const staffToken = Cookies.get("staff_access_token");
  const response = await axios.get(`${API_URL}all-candidates/${id}`, {
    headers: {
      Authorization: `Bearer ${staffToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const fetchCareerData = async (careerId: string) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.get(`${API_URL}register/career/${careerId}/`, {
    headers: {
      Authorization: `Bearer ${staffToken}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const fetchJobExperienceData = async (work_experience_id: string) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.get(
    `${API_URL}register/job-experience/${work_experience_id}/`,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const getAdvancedDegree = async (advancedId: string) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.get(
    `${API_URL}register/advanced-education/${advancedId}/`,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const craftCandidateResume = async (id: string | undefined) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.get(
    `${API_URL}staff-dashboard/craft-candidate-resume/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const careerStrategyPurpose = async (id: string) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.get(
    `${API_URL}staff-dashboard/generate-career-strategy-purpose/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const generateSop = async (id: string) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.get(
    `${API_URL}staff-dashboard/generate-sop/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const updateSop = async (
  id: string,
  candidateId: string,
  text?: string,
  file?: File,
) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.patch(
    `${API_URL}staff-dashboard/update-sop/${id}/`,
    {
      text,
      file,
      candidateId,
    },
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const postEditedCandidate = async (id: string, data: any) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data: response } = await axios.patch(
    `${API_URL}staff-dashboard/edit-candidate/${id}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getEditedCandidate = async (id: string) => {
  const staffToken = Cookies.get("staff_access_token");
  const { data } = await axios.get(
    `${API_URL}staff-dashboard/edit-candidate/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
