import {
  CandidateCareer,
  EducationHistory,
  JobExperience,
  updateCandidateProfile,
} from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const updatePersonalDetails = async (
  personalDetails: updateCandidateProfile
) => {
  const token = Cookies.get("staff_access_token");
  const canId = Cookies.get("studentId");
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

export const submitEducationDetails = async (
  educationDetails: EducationHistory
) => {
  const educationId = Cookies.get("studentEducationId");
  const token = Cookies.get("staff_access_token");

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

// export const updateAdvancedDegree = async (
//   degreeDetails: AdvancedEducation
// ) => {
//   const token = Cookies.get("staff_access_token");
//   const advancedId = Cookies.get("advanced_education1_id");

//   return await axios.patch(
//     `${API_URL}register/advanced-education/${advancedId}/`,
//     degreeDetails,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

export const submitCareer = async (workData: CandidateCareer) => {
  const token = Cookies.get("staff_access_token");

  const careerId = Cookies.get("studentCareerId");
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
  const token = Cookies.get("staff_access_token");
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
