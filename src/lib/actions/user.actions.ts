import {
  AssignCandidateProps,
  CreateCandidateProfileProps,
  PasswordProps,
  ReAssignCandidateProps,
  SchoolFormData,
  signInProps,
} from "@/types";
import { AdmissionStatusPayload } from "@/types/forms";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const adminSignIn = async ({ email, password }: signInProps) => {
  try {
    const response = await axios.post(`${API_URL}auth/login/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const requestPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/request-password-reset/`,
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Reset password:", error);
    throw error;
  }
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/verify-reset-password-otp`,
      {
        email,
        otp,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Reset password:", error);
    throw error;
  }
};

export const resetPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}auth/reset-password`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Reset password:", error);
    throw error;
  }
};

export const logoutAccount = async (
  role: "candidate" | "staff" | "admin" | "analyst" | "acs"
) => {
  switch (role) {
    case "admin":
      Cookies.remove("access_token");
      Cookies.remove("work_experience_id1");
      Cookies.remove("work_experience_id2");
      Cookies.remove("work_experience_id3");
      Cookies.remove("advanced_education1_id");
      break;
    case "acs":
      Cookies.remove("acs_access_token");
      break;
    case "analyst":
      Cookies.remove("access_token");
      break;
    case "staff":
      Cookies.remove("staff_access_token");
      Cookies.remove("studentEducationId");
      Cookies.remove("studentCareerId");
      Cookies.remove("candidate_id");
      Cookies.remove("studentId");
      Cookies.remove("work_experience_id1");
      Cookies.remove("work_experience_id2");
      Cookies.remove("work_experience_id3");
      Cookies.remove("advanced_education1_id");
      localStorage.removeItem("resumeCurrentPage");
      localStorage.removeItem("sopCurrentPage");
      break;
    case "candidate":
      Cookies.remove("candidate_access_token");
      Cookies.remove("user_role");
      Cookies.remove("candidate_id");
      Cookies.remove("candidate_email");
      Cookies.remove("education_id");
      Cookies.remove("career_id");
      Cookies.remove("verification_document_id");
      Cookies.remove("work_experience_id1");
      Cookies.remove("work_experience_id2");
      Cookies.remove("work_experience_id3");
      Cookies.remove("work_experience_id4");
      Cookies.remove("work_experience_id5");
      Cookies.remove("advanced_education1_id");
      Cookies.remove("referee1_id");
      Cookies.remove("referee2_id");
      Cookies.remove("ProfessionalRecommender");
      Cookies.remove("AcademicRecommender");
      Cookies.remove("otherRecommender");
      break;
    default:
      console.log("Invalid role");
      return;
  }
  console.log(`${role} logged out`);
};

export const getAdminInfo = async () => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}admin-dashboard/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const getStats = async () => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-candidates/statistics`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const createCandidateProfile = async ({
  email,
  password,
  full_name,
  role,
  assigned_course1,
  assigned_course2,
  first_country,
  second_country,
  assigned_university1,
  assigned_university2,
  program_type1,
  program_type2,
}: CreateCandidateProfileProps) => {
  try {
    const token = Cookies.get("access_token"); // Fetch token from cookies

    if (!token) {
      throw new Error("No access token found. Login again!");
    }

    const response = await axios.post(
      `${API_URL}auth/create-user/`,
      {
        email,
        password,
        full_name,
        role,
        assigned_course1,
        assigned_course2,
        first_country,
        second_country,
        assigned_university1,
        assigned_university2,
        program_type1,
        program_type2,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Profile creation error:", error);
    throw error;
  }
};

export const deleteStaff = async (id: number | string) => {
  try {
    const token = Cookies.get("access_token");
    if (!token)
      throw new Error("Access token is missing. Please sign in again.");

    const response = await axios.delete(
      `${API_URL}admin-dashboard/delete-staff/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw error;
  }
};

export const getAllTableCandidates = async (
  page?: number,
  query?: string,
  course?: string,
  assigned?: boolean
) => {
  const token = Cookies.get("access_token");

  if (!token) throw new Error("Access token is missing. Please sign in again.");
  let url = `${API_URL}all-candidates-medium/?format=json`;

  if (query) {
    url += `&query=${encodeURIComponent(query)}`;
  }

  if (course) {
    url += `&course=${encodeURIComponent(course)}`;
  }

  if (assigned) {
    url += `&assigned=${assigned}`;
  }

  if (page && (!query || page > 1)) {
    url += `&page=${page}`;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching all candidates info:", error);
    throw error;
  }
};

export const getSingleCandidate = async (id: number | string) => {
  const token =
    Cookies.get("staff_access_token") ||
    Cookies.get("access_token") ||
    Cookies.get("candidate_access_token");
  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const response = await axios.get(`${API_URL}all-candidates/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getCandidatesToAssign = async (count?: number) => {
  const token = Cookies.get("access_token");

  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const url = `${API_URL}all-candidates-small/?count=${count}`; // Default count to a high number if not provided

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching all candidates info:", error);
    throw error;
  }
};

export const getAllStaff = async (page?: number) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }
  const url = page
    ? `${API_URL}all-staffs/?page=${page}`
    : `${API_URL}all-staffs/`;

  try {
    const response = await axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching all staff info:", error);
    throw error;
  }
};

export const getSingleStaff = async (id: number | string) => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-staffs/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching single staff info:", error);
    throw error;
  }
};

export const assignCandidateToStaff = async ({
  candidate_ids,
  staff_id,
}: AssignCandidateProps) => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.post(
      `${API_URL}assign-candidate/`,
      { candidate_ids, staff_id },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error assigning candidate:", error);
    throw error;
  }
};
export const reAssignCandidateToStaff = async ({
  candidate_ids,
  staff_id,
  new_staff_id,
}: ReAssignCandidateProps) => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.patch(
      `${API_URL}assign-candidate/`,
      { candidate_ids, staff_id, new_staff_id },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error assigning candidate:", error);
    throw error;
  }
};

export const unassignCandidateFromStaff = async ({
  candidate_ids,
  staff_id,
}: ReAssignCandidateProps) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.delete(`${API_URL}assign-candidate/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: { candidate_ids, staff_id },
    });

    return response.data;
  } catch (error) {
    console.error("Error assigning candidate:", error);
    throw error;
  }
};

export const getLoggedInUser = async (
  role: "staff" | "admin" | "candidate" | "analyst" | "acs"
) => {
  try {
    let token;
    if (role === "staff") {
      token = Cookies.get("staff_access_token"); // Fetch from cookies
    } else if (role === "admin") {
      token = Cookies.get("access_token"); // Fetch from cookies
    } else if (role === "analyst") {
      token = Cookies.get("access_token"); // Fetch from cookies
    } else if (role === "candidate") {
      token = Cookies.get("candidate_access_token"); // Fetch from cookies
    } else if (role === "acs") {
      token = Cookies.get("acs_access_token"); // Fetch from cookies
    }

    if (!token) return null;

    const response = await axios.get(`${API_URL}auth/detail/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to get logged-in user", error);
    return null;
  }
};

export const updatePassword = async ({
  old_password,
  new_password,
  re_new_password,
}: PasswordProps) => {
  try {
    const token =
      Cookies.get("staff_access_token") ||
      Cookies.get("candidate_access_token");
    if (!token) return null;

    const response = await axios.patch(
      `${API_URL}auth/update-password/`,
      {
        old_password,
        new_password,
        re_new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update password", error);
    return error;
  }
};

export const getAllActivities = async (page: number = 1) => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const requestUrl = `${API_URL}all-activities/?page=${page}`;

    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data; // Ensure your API response includes 'results', 'next', 'previous', and 'count'
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

export const updateUsers = async ({
  email,
  full_name,
}: {
  email: string;
  full_name: string;
}) => {
  try {
    const token = Cookies.get("access_token"); // Fetch from cookies
    if (!token) return null;

    const response = await axios.patch(
      `${API_URL}auth/update-user/`,
      {
        email,
        full_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const refinePrompt = async ({ prompt }: { prompt: string }) => {
  try {
    const token =
      Cookies.get("access_token") ||
      Cookies.get("staff_access_token") ||
      Cookies.get("candidate_access_token");
    if (!token) return null;

    const response = await axios.post(
      `${API_URL}refine-content/`,
      {
        prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getComplaints = async () => {
  try {
    const token =
      Cookies.get("access_token") ||
      Cookies.get("staff_access_token") ||
      Cookies.get("candidate_access_token");
    if (!token) return null;

    const response = await axios.get(`${API_URL}complaints/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleSchoolApplicationStatus = async (id?: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.get(
      `${API_URL}staff-dashboard/toggle-school-application-status/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleSchoolApplicationStatus2 = async (id?: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.get(
      `${API_URL}staff-dashboard/toggle-school-application-status-2/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const toggleSchoolApplicationStatusBack = async (id?: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.delete(
      `${API_URL}staff-dashboard/toggle-school-application-status/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const toggleSchoolApplicationStatus2Back = async (id?: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.delete(
      `${API_URL}staff-dashboard/toggle-school-application-status-2/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendReminder = async () => {
  try {
    const token = Cookies.get("access_token");
    if (!token) return null;

    const response = await axios.get(`${API_URL}remind-candidates/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const singleCandidateReminder = async (id: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.get(
      `${API_URL}remind-single-candidate?candidate=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const applicationCompletedEmail = async (id: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.post(
      `${API_URL}send-application-complete/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const IntroEmail = async (id: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.post(`${API_URL}send-introemail/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const LoanEmail = async (id: string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token) return null;

    const response = await axios.post(`${API_URL}send-loan-email/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllInterestedCandidates = async (
  page?: number,
  query?: string
) => {
  let url = `${API_URL}interested-candidates/`;
  const params = new URLSearchParams();
  if (query) params.append("query", query);
  if (page) params.append("page", page.toString());

  if (params.toString()) {
    url += `?${params.toString()}`;
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

export const deleteInterestedCandidate = async (email: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}interested-candidates/s/${email}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
};

export const getCandidateSchoolDetails = async (id: number | string) => {
  const token =
    Cookies.get("staff_access_token") ||
    Cookies.get("access_token") ||
    Cookies.get("candidate_access_token");
  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const response = await axios.get(`${API_URL}all-candidates/${id}/schools`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createCandidateSchoolDetails = async (
  id: number | string,
  schoolData: SchoolFormData
) => {
  const token =
    Cookies.get("staff_access_token") ||
    Cookies.get("access_token") ||
    Cookies.get("candidate_access_token");
  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const response = await axios.post(
    `${API_URL}all-candidates/${id}/schools`,
    schoolData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateCandidateSchoolDetails = async (
  id: number | string,
  schoolId: number | string,
  schoolData: SchoolFormData
) => {
  const token =
    Cookies.get("staff_access_token") ||
    Cookies.get("access_token") ||
    Cookies.get("candidate_access_token");
  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const response = await axios.patch(
    `${API_URL}all-candidates/${id}/schools/${schoolId}`,
    schoolData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const submitAdmissionStatus = async (
  id: number | string,
  schoolData: AdmissionStatusPayload
) => {
  const token =
    Cookies.get("staff_access_token") ||
    Cookies.get("access_token") ||
    Cookies.get("candidate_access_token");
  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const response = await axios.post(
    `${API_URL}all-candidates/${id}/university`,
    schoolData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateAdmissionStatus = async (
  id: number | string,
  universityId: number | string,
  schoolData: AdmissionStatusPayload
) => {
  const token =
    Cookies.get("staff_access_token") ||
    Cookies.get("access_token") ||
    Cookies.get("candidate_access_token");
  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const response = await axios.patch(
    `${API_URL}all-candidates/${id}/university/${universityId}`,
    schoolData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const getAdmissionStatus = async (id: number | string) => {
  const token =
    Cookies.get("staff_access_token") ||
    Cookies.get("access_token") ||
    Cookies.get("candidate_access_token");
  if (!token) throw new Error("Access token is missing. Please sign in again.");

  const response = await axios.get(
    `${API_URL}all-candidates/${id}/university`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const serviceWithAgent = async (id: number | string) => {
  try {
    const token =
      Cookies.get("access_token") || Cookies.get("staff_access_token");
    if (!token)
      throw new Error("Access token is missing. Please sign in again.");

    const response = await axios.get(
      `https://elda-ai-automation.onrender.com/api/agent/single/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error automating candidate:", error);
    throw error;
  }
};
