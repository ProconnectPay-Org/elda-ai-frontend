// hooks/useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAccount } from "@/lib/actions/user.actions";
import { UserType } from "@/types";

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggedInUser) {
      await logoutAccount(loggedInUser.role);
      setLoggedInUser(null);
      navigate("/sign-in");
    }
  };

  return {
    loggedInUser,
    handleLogout,
    // loading,
  };
};

export default useAuth;
