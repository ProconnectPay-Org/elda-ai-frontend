import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState<DummyUser | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await getLoggedInUser();
      setLoggedInUser(user);
    };

    fetchLoggedInUser();
  }, []);

  return <div>{loggedInUser && <p>Welcome, {loggedInUser.name}!</p>}</div>;
};

export default Home;
