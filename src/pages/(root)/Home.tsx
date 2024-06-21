import useAuth from "@/hooks/useAuth";

const Home = () => {
  const { loggedInUser } = useAuth();

  return <div>{loggedInUser && <p>Welcome, {loggedInUser.name}!</p>}</div>;
};

export default Home;
