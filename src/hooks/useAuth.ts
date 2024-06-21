// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutAccount, DummyUser } from "@/lib/actions/user.actions";

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState<DummyUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        setLoggedInUser(user);
      } else {
        navigate("/sign-in");
      }
      setLoading(false); // Set loading to false after fetching user
    };

    fetchLoggedInUser();
  }, [navigate]);

  const handleLogout = async () => {
    await logoutAccount();
    navigate("/sign-in");
  };

  return {
    loggedInUser,
    handleLogout,
    loading,
  };
};

export default useAuth;
