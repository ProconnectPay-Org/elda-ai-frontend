import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const token = Cookies.get("candidate_access_token");
const candidateId = Cookies.get("candidate_id");
const careerId = Cookies.get("career_id");
const educationId = Cookies.get("education_id");
const work_experience_id = Cookies.get("work_experience_id");
const verificationDocumentsId = Cookies.get("verification_document_id");
const referee1Id = Cookies.get("referee1_id");
const referee2Id = Cookies.get("referee2_id");
// const advancedId = Cookies.get("advanced_education1_id");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

export const updatePersonalDetails = async (personalDetails: any) => {
  return await axios.patch(
    `${API_URL}register/candidate/${candidateId}/`,
    personalDetails,
    config
  );
};
export const getPersonalDetails = async () => {
  return await axios.get(
    `${API_URL}register/candidate/${candidateId}/`,
    config
  );
};

export const submitEducationDetails = async (educationDetails: any) => {
  return await axios.patch(
    `${API_URL}register/education/${educationId}/`,
    educationDetails,
    config
  );
};

export const fetchEducationData = async () => {
  const { data } = await axios.get(
    `${API_URL}register/education/${educationId}/`,
    config
  );
  return data;
};

export const hasAdvancedDegree = async (degreeDetails: any) => {
  return await axios.post(
    `${API_URL}register/advanced-education/`,
    degreeDetails,
    config
  );
};

export const updateAdvancedDegree = async (degreeDetails: any) => {
  return await axios.patch(
    `${API_URL}register/advanced-education/5/`,
    degreeDetails,
    config
  );
};

export const getAdvancedDegree = async () => {
  const { data } = await axios.get(
    `${API_URL}register/advanced-education/6/`,
    config
  );
  return data;
};

export const submitWorkExperience = async (
  workData: any,
  experienceData: any
) => {
  return await Promise.all([
    axios.patch(
      `${API_URL}register/career/${careerId}/`,
      workData,
      config
    ),
    axios.patch(
      `${API_URL}register/job-experience/${work_experience_id}/`,
      experienceData,
      config
    ),
  ]);
};

export const fetchCareerData = async () => {
  const { data } = await axios.get(
    `${API_URL}register/career/${careerId}/`,
    config
  );
  return data;
};

export const fetchJobExperienceData = async () => {
  const { data } = await axios.get(
    `${API_URL}register/job-experience/${work_experience_id}/`,
    config
  );
  return data;
};

export const submitRefereeDetails = async (referee1Data: any, referee2Data: any) => {
  try {
    await Promise.all([
      axios.patch(`${API_URL}register/loan-referee/${referee1Id}/`, referee1Data, config),
      axios.patch(`${API_URL}register/loan-referee/${referee2Id}/`, referee2Data, config),
    ]);
  } catch (error) {
    console.error("Error during referee details submission:", error);
    throw error;
  }
};

export const fetchReferee1 = async () => {
  const { data } = await axios.get(
    `${API_URL}register/loan-referee/${referee1Id}/`,
    config
  );
  return data;
};

export const fetchReferee2 = async () => {
  const { data } = await axios.get(
    `${API_URL}register/loan-referee/${referee2Id}/`,
    config
  );
  return data;
};

export const submitDocuments = async (documentsData: any) => {
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
  const { data } = await axios.get(
    `${API_URL}register/verification-documents/${verificationDocumentsId}/`,
    config
  );
  return data;
};
