import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const updatePersonalDetails = async (personalDetails: any) => {
  const token = Cookies.get("candidate_access_token");
  const canId = Cookies.get("candidate_id");
  return await axios.patch(
    `${API_URL}register/candidate/${canId}/`,
    personalDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getPersonalDetails = async () => {
  const token = Cookies.get("candidate_access_token");
  const candidateId = Cookies.get("candidate_id");
  return await axios.get(`${API_URL}register/candidate/${candidateId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const submitEducationDetails = async (educationDetails: any) => {
  const educationId = Cookies.get("education_id");
  const token = Cookies.get("candidate_access_token");

  return await axios.patch(
    `${API_URL}register/education/${educationId}/`,
    educationDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const fetchEducationData = async () => {
  const educationId = Cookies.get("education_id");
  const token = Cookies.get("candidate_access_token");

  const { data } = await axios.get(
    `${API_URL}register/education/${educationId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const hasAdvancedDegree = async (degreeDetails: any) => {
  const token = Cookies.get("candidate_access_token");

  return await axios.post(
    `${API_URL}register/advanced-education/`,
    degreeDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateAdvancedDegree = async (degreeDetails: any) => {
  const token = Cookies.get("candidate_access_token");
  const advancedId = Cookies.get("advanced_education1_id");

  return await axios.patch(
    `${API_URL}register/advanced-education/${advancedId}/`,
    degreeDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAdvancedDegree = async () => {
  const token = Cookies.get("candidate_access_token");

  const advancedId = Cookies.get("advanced_education1_id");
  const { data } = await axios.get(
    `${API_URL}register/advanced-education/${advancedId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const submitWorkExperience = async (
  workData: any,
  experienceData: any
) => {
  const token = Cookies.get("candidate_access_token");

  const careerId = Cookies.get("career_id");
  const work_experience_id = Cookies.get("work_experience_id");
  return await Promise.all([
    axios.patch(`${API_URL}register/career/${careerId}/`, workData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
    axios.patch(
      `${API_URL}register/job-experience/${work_experience_id}/`,
      experienceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ),
  ]);
};

export const fetchCareerData = async () => {
  const token = Cookies.get("candidate_access_token");

  const careerId = Cookies.get("career_id");
  const { data } = await axios.get(`${API_URL}register/career/${careerId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const fetchJobExperienceData = async () => {
  const token = Cookies.get("candidate_access_token");

  const work_experience_id = Cookies.get("work_experience_id");
  const { data } = await axios.get(
    `${API_URL}register/job-experience/${work_experience_id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const submitRefereeDetails = async (
  referee1Data: any,
  referee2Data: any
) => {
  const token = Cookies.get("candidate_access_token");

  const referee1Id = Cookies.get("referee1_id");
  const referee2Id = Cookies.get("referee2_id");
  try {
    await Promise.all([
      axios.patch(
        `${API_URL}register/loan-referee/${referee1Id}/`,
        referee1Data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ),
      axios.patch(
        `${API_URL}register/loan-referee/${referee2Id}/`,
        referee2Data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ),
    ]);
  } catch (error) {
    console.error("Error during referee details submission:", error);
    throw error;
  }
};

export const fetchReferee1 = async () => {
  const token = Cookies.get("candidate_access_token");

  const referee1Id = Cookies.get("referee1_id");
  const { data } = await axios.get(
    `${API_URL}register/loan-referee/${referee1Id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const fetchReferee2 = async () => {
  const token = Cookies.get("candidate_access_token");

  const referee2Id = Cookies.get("referee2_id");
  const { data } = await axios.get(
    `${API_URL}register/loan-referee/${referee2Id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const submitDocuments = async (documentsData: any) => {
  const token = Cookies.get("candidate_access_token");

  const verificationDocumentsId = Cookies.get("verification_document_id");
  return await axios.patch(
    `${API_URL}register/verification-documents/${verificationDocumentsId}/`,
    documentsData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const fetchVerificationDocument = async () => {
  const token = Cookies.get("candidate_access_token");

  const verificationDocumentsId = Cookies.get("verification_document_id");
  const { data } = await axios.get(
    `${API_URL}register/verification-documents/${verificationDocumentsId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const toggleApplicationStatus = async () => {
  const token = Cookies.get("candidate_access_token");
  const canId = Cookies.get("candidate_id");

  const { data } = await axios.get(
    `${API_URL}register/toggle-application-status/${canId}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
