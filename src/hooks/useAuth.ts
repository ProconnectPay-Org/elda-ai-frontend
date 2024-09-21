// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutAccount } from "@/lib/actions/user.actions";
import { UserType } from "@/types";

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggedInUser) {
      await logoutAccount(loggedInUser.role);
      setLoggedInUser(null);
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await getLoggedInUser();
      setLoggedInUser(user);
      console.log(loggedInUser);
      
      setLoading(false);
    };

    fetchLoggedInUser();
  }, []); // Runs only once after the initial render

  return {
    loggedInUser,
    handleLogout,
    loading,
  };
};

export default useAuth;
