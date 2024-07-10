// const dummyUser: DummyUser = {
//   id: "1",
//   name: "John Doe",
//   email: "johndoe@example.com",
// };

import { Payment, signInProps } from "@/types";

// export const getUserInfo = async () => {};

// export const signIn = async ({ email, password }: signInProps) => {
//   email;
//   password;
// };

// export const signUp = async ({ email, password }: SignUpParams) => {
//   email;
//   password;
// };

// export const getLoggedInUser = async (): Promise<DummyUser | null> => {
//   // Simulate the user being logged out by returning null
//   return null;
// };

// export const logoutAccount = async () => {
//   console.log("logged out");
// };

// user.actions.ts
export type DummyUser = {
  id: string;
  name: string;
  email: string;
};

const dummyUser: DummyUser = {
  id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
};

export const getUserInfo = async () => {};

export const signIn = async ({
  email,
  password,
}: signInProps): Promise<DummyUser | null> => {
  // Mock authentication logic
  if (email === dummyUser.email && password === "password") {
    localStorage.setItem("isLoggedIn", "true");
    return dummyUser;
  }
  return null;
};

export const signUp = async ({
  email,
  firstName,
}: {
  email: string;
  firstName: string;
}): Promise<DummyUser> => {
  // Simulate user creation and return the created user
  return {
    id: "2",
    name: firstName,
    email,
  };
};

export async function getLoggedInUser(): Promise<DummyUser | null> {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    return dummyUser;
  }
  return null;
}

export const logoutAccount = async () => {
  localStorage.removeItem("isLoggedIn");
  console.log("logged out");
};

export async function getData(): Promise<Payment[]> {
  return [
    {
      id: "m5gr84i9",
      amount: 316,
      email: "ken99@yahoo.com",
      serialNumber: 1,
      name: "Ken Smith",
      recommendedSchool: "Harvard University",
      recommendedCourse: "Computer Science",
      resume: "resume_1",
      sop: "sop_1",
      schoolApplicationStarted: "true01",
      schoolApplicationCompleted: "true14",
      status: "not completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      email: "Abe45@gmail.com",
      serialNumber: 2,
      name: "Abe Johnson",
      recommendedSchool: "Stanford University",
      recommendedCourse: "Electrical Engineering",
      resume: "resume_2",
      sop: "sop_2",
      schoolApplicationStarted: "true03",
      schoolApplicationCompleted: "true15",
      status: "completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "derv1ws0",
      amount: 837,
      email: "Monserrat44@gmail.com",
      serialNumber: 3,
      name: "Monserrat Gomez",
      recommendedSchool: "MIT",
      recommendedCourse: "Mechanical Engineering",
      resume: "resume_3",
      sop: "sop_3",
      schoolApplicationStarted: "true05",
      schoolApplicationCompleted: "true16",
      status: "completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "5kma53ae",
      amount: 874,
      email: "Silas22@gmail.com",
      serialNumber: 4,
      name: "Silas Thompson",
      recommendedSchool: "UC Berkeley",
      recommendedCourse: "Data Science",
      resume: "resume_4",
      sop: "sop_4",
      schoolApplicationStarted: "true07",
      schoolApplicationCompleted: "true17",
      status: "not completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      email: "carmella@hotmail.com",
      serialNumber: 5,
      name: "Carmella Lee",
      recommendedSchool: "Princeton University",
      recommendedCourse: "Physics",
      resume: "resume_5",
      sop: "sop_5",
      schoolApplicationStarted: "true09",
      schoolApplicationCompleted: "true18",
      status: "completed",
      phone: "+234 709 823 4343",
    },
  ];
}
