import {
  AdvancedEducation,
  CandidateCareer,
  ComplaintType,
  EducationHistory,
  JobExperience,
  LoanReferee,
  Recommender,
  updateCandidateProfile,
} from "@/types";
import axios, { AxiosProgressEvent } from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const updatePersonalDetails = async (
  personalDetails: updateCandidateProfile
) => {
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

export const submitEducationDetails = async (
  educationDetails: EducationHistory
) => {
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

export const postAdvancedDegree = async (degreeDetails: AdvancedEducation) => {
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

export const updateAdvancedDegree = async (
  degreeDetails: AdvancedEducation
) => {
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

export const submitWorkExperience = async (workData: CandidateCareer) => {
  const token = Cookies.get("candidate_access_token");

  const careerId = Cookies.get("career_id");
  return await Promise.all([
    axios.patch(`${API_URL}register/career/${careerId}/`, workData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
  ]);
};

export const postJobExperience = async (
  experienceData: JobExperience,
  job_experience_id: string
) => {
  const token = Cookies.get("candidate_access_token");
  return await axios.patch(
    `${API_URL}register/job-experience/${job_experience_id}/`,
    experienceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
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

export const fetchJobExperienceData = async (
  work_experience_id: string | undefined
) => {
  const token = Cookies.get("candidate_access_token");

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
  referee1Data: LoanReferee,
  referee2Data: LoanReferee
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

export const submitPostRecommendationDetails = async (recommenderData: any) => {
  const token = Cookies.get("candidate_access_token");
  try {
    // Ensure you're awaiting the axios post call
    const response = await axios.post(
      `${API_URL}recommenders/`,
      recommenderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during recommendation details submission:", error);
    throw error;
  }
};

export const submitPatchRecommendationDetails = async (
  recommenderId: string,
  recommenderData: any
) => {
  if (!recommenderId) {
    throw new Error("Invalid recommender ID");
  }

  const token = Cookies.get("candidate_access_token");
  try {
    const response = await axios.patch(
      `${API_URL}recommenders/${recommenderId}/`,
      recommenderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during recommendation details update:", error);
    throw error;
  }
};

export const submitRecommenderDetails = async (
  recommenderDataList: Recommender[]
) => {
  const professionalRecommenderId = Cookies.get("ProfessionalRecommender");
  const academicRecommenderId = Cookies.get("PcademicRecommender");
  const otherRecommenderId = Cookies.get("otherRecommender");

  const recommenderIds = [
    professionalRecommenderId,
    academicRecommenderId,
    otherRecommenderId,
  ];

  try {
    const responses = await Promise.all(
      recommenderDataList.map(async (recommenderData, index) => {
        const recommenderId = recommenderIds[index];

        if (
          typeof recommenderId === "string" &&
          recommenderId !== "undefined"
        ) {
          // PATCH if recommender ID exists
          return await submitPatchRecommendationDetails(
            recommenderId,
            recommenderData
          );
        } else {
          // POST if recommender ID doesn't exist
          const response = await submitPostRecommendationDetails(
            recommenderData
          );
          Cookies.set(
            recommenderData.recommender_type + "Recommender",
            response.id
          );
          return response;
        }
      })
    );

    return responses;
  } catch (error) {
    console.error("Error submitting recommender details:", error);
    throw error;
  }
};

export const getRecommenderDetails = async (idKey: string) => {
  const token = Cookies.get("candidate_access_token");
  const recommenderId = Cookies.get(idKey);

  if (!recommenderId) {
    throw new Error("Recommender ID not found");
  }

  const { data } = await axios.get(`${API_URL}recommenders/${recommenderId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const submitDocuments = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void // Use the correct type here
): Promise<void> => {
  const token = Cookies.get("candidate_access_token");
  const verificationDocumentsId = Cookies.get("verification_document_id");

  return await axios.patch(
    `${API_URL}register/verification-documents/${verificationDocumentsId}/`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress, // Pass the progress event callback here
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

export const postComplaints = async ({
  complaint,
  complaint_status,
  complaint_date,
}: ComplaintType) => {
  const token = Cookies.get("candidate_access_token");

  const { data } = await axios.post(
    `${API_URL}complaints/`,
    { complaint, complaint_status, complaint_date },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
