import {
  AssignCandidateProps,
  CandidateData,
  CreateCandidateProfileProps,
  PasswordProps,
  signInProps,
  User,
} from "@/types";
import RedCircle from "../../assets/red-circle.svg";
import axios from "axios";

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

export const logoutAccount = async (role: "candidate" | "staff" | "admin") => {
  switch (role) {
    case "admin":
      localStorage.removeItem("admin_access_token");
      break;
    case "staff":
      localStorage.removeItem("staff_access_token");
      break;
    case "candidate":
      localStorage.removeItem("candidate_access_token");
      break;
    default:
      console.log("Invalid role");
      return;
  }
  console.log(`${role} logged out`);
};

export const getUserInfo = async () => {};

export const getAdminInfo = async () => {
  const access_token = localStorage.getItem("access_token"); // Fetch token from localStorage

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

export const emailPost = async () => {};

export const createCandidateProfile = async ({
  email,
  password,
  full_name,
  role,
}: CreateCandidateProfileProps) => {
  try {
    const token = localStorage.getItem("access_token");

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

export const getAllCandidates = async () => {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-candidates/`, {
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

export const getSingleCandidate = async (id: number | string) => {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-candidates/${id}/`, {
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

export const getAllStaff = async () => {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-staffs/`, {
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

export const getSingleStaff = async (id: number | string) => {
  const access_token = localStorage.getItem("access_token");

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
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const assignCandidateToStaff = async ({
  candidate_ids,
  staff_id,
}: AssignCandidateProps) => {
  const access_token = localStorage.getItem("access_token");

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

export const getLoggedInUser = async () => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const response = await axios.get(`${API_URL}auth/profile/`, {
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
    const token = localStorage.getItem("access_token");
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
    console.error("Failed to get logged-in user", error);
    return null;
  }
};

export const getAllActivities = async (url?: string) => {
  const access_token = localStorage.getItem("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const requestUrl = url ? url : `${API_URL}all-activities/`;

    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};


export const updateUsers = async ({ email, full_name }: User) => {
  try {
    const token = localStorage.getItem("access_token");
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
    console.error("Failed to get logged-in user", error);
    return null;
  }
};

export async function getData(): Promise<CandidateData[]> {
  return [
    {
      id: "m5gr84i9",
      amount: 316,
      email: "ken99@yahoo.com",
      serial_number: 1,
      name: "Ken Smith",
      recommended_school: "Harvard University",
      recommended_course: "Computer Science",
      resume: "resume_1",
      sop: "sop_1",
      school_application_started: RedCircle,
      school_application_completed: RedCircle,
      status: "completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      email: "Abe45@gmail.com",
      serial_number: 2,
      name: "Abe Johnson",
      recommended_school: "Stanford University",
      recommended_course: "Electrical Engineering",
      resume: "resume_2",
      sop: "sop_2",
      school_application_started: RedCircle,
      school_application_completed: RedCircle,
      status: "not completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "derv1ws0",
      amount: 837,
      email: "Monserrat44@gmail.com",
      serial_number: 3,
      name: "Monserrat Gomez",
      recommended_school: "MIT",
      recommended_course: "Mechanical Engineering",
      resume: "resume_3",
      sop: "sop_3",
      school_application_started: "true05",
      school_application_completed: "true16",
      status: "completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "5kma53ae",
      amount: 874,
      email: "Silas22@gmail.com",
      serial_number: 4,
      name: "Silas Thompson",
      recommended_school: "UC Berkeley",
      recommended_course: "Data Science",
      resume: "resume_4",
      sop: "sop_4",
      school_application_started: "true07",
      school_application_completed: "true17",
      status: "not completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      email: "carmella@hotmail.com",
      serial_number: 5,
      name: "Carmella Lee",
      recommended_school: "Princeton University",
      recommended_course: "Physics",
      resume: "resume_5",
      sop: "sop_5",
      school_application_started: "true09",
      school_application_completed: "true18",
      status: "completed",
      phone: "+234 709 823 4343",
    },
  ];
}
