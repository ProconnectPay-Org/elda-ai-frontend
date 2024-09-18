// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutAccount } from "@/lib/actions/user.actions";
import { UserType } from "@/types";

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await getLoggedInUser();
      if (user) {
        setLoggedInUser(user);
      }
      setLoading(false);
    };

    fetchLoggedInUser();
  }, []);

  const handleLogout = async () => {
    await logoutAccount();
    navigate("/admin/sign-in");
  };

  return {
    loggedInUser,
    handleLogout,
    loading,
  };
};

export default useAuth;
