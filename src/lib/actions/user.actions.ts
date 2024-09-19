import {
  CandidateData,
  CreateCandidateProfileProps,
  TeamMemberColumn,
  signInProps,
} from "@/types";
import RedCircle from "../../assets/red-circle.svg";
import axios from "axios";

// export const getUserInfo = async () => {};

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

export const getLoggedInUser = async () => {
  try {
    const token = localStorage.getItem("staff_access_token");
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

export const candidateSignIn = async ({ email, password }: signInProps) => {
  try {
    const response = await axios.post(`${API_URL}auth/users/activation/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
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

export async function getTeamMembersData(): Promise<TeamMemberColumn[]> {
  return [
    {
      id: "a1b2c3d4",
      fullName: "Alice Johnson",
      staffStatus: "Active",
      assignedCandidates: "15",
      permission: "Admin",
      deleteAccount: "Yes",
    },
    {
      id: "e5f6g7h8",
      fullName: "Bob Smith",
      staffStatus: "Inactive",
      assignedCandidates: "8",
      permission: "Editor",
      deleteAccount: "No",
    },
    {
      id: "i9j0k1l2",
      fullName: "Charlie Brown",
      staffStatus: "Active",
      assignedCandidates: "20",
      permission: "Viewer",
      deleteAccount: "Yes",
    },
    {
      id: "m3n4o5p6",
      fullName: "Diana Prince",
      staffStatus: "Active",
      assignedCandidates: "25",
      permission: "Admin",
      deleteAccount: "No",
    },
    {
      id: "q7r8s9t0",
      fullName: "Ethan Hunt",
      staffStatus: "Inactive",
      assignedCandidates: "5",
      permission: "Editor",
      deleteAccount: "Yes",
    },
    {
      id: "u1v2w3x4",
      fullName: "Fiona Gallagher",
      staffStatus: "Active",
      assignedCandidates: "30",
      permission: "Viewer",
      deleteAccount: "No",
    },
    {
      id: "y5z6a7b8",
      fullName: "George Clooney",
      staffStatus: "Inactive",
      assignedCandidates: "12",
      permission: "Admin",
      deleteAccount: "Yes",
    },
    {
      id: "c9d0e1f2",
      fullName: "Hannah Montana",
      staffStatus: "Active",
      assignedCandidates: "22",
      permission: "Editor",
      deleteAccount: "No",
    },
    {
      id: "g3h4i5j6",
      fullName: "Ian Fleming",
      staffStatus: "Inactive",
      assignedCandidates: "7",
      permission: "Viewer",
      deleteAccount: "Yes",
    },
    {
      id: "k7l8m9n0",
      fullName: "Jill Valentine",
      staffStatus: "Active",
      assignedCandidates: "18",
      permission: "Admin",
      deleteAccount: "No",
    },
  ];
}
