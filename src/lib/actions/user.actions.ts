// const dummyUser: DummyUser = {
//   id: "1",
//   name: "John Doe",
//   email: "johndoe@example.com",
// };

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
