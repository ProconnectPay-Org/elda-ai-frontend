
const dummyUser: DummyUser = {
  id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
};

export const getUserInfo = async () => {};

export const signIn = async ({ email, password }: signInProps) => {
  email;
  password;
};

export const signUp = async ({ email, password }: SignUpParams) => {
  email;
  password;
};

export async function getLoggedInUser() {
  return dummyUser;
}

export const logoutAccount = async () => {
  console.log("logged out");
};
