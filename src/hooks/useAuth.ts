// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutAccount } from "@/lib/actions/user.actions";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const useAuth = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(() => {
    // Attempt to initialize from cookies first
    const userName = Cookies.get("user_name");
    const userEmail = Cookies.get("user_email");

    return userName && userEmail
      ? ({ full_name: userName, email: userEmail } as User)
      : null;
  });

  const navigate = useNavigate();

  const userRole = Cookies.get("user_role");

  const handleLogout = async () => {
    if (userRole) {
      await logoutAccount(
        userRole as "staff" | "admin" | "candidate" | "analyst"
      );
      Cookies.remove("user_role");
      Cookies.remove("user_name");
      Cookies.remove("user_email");
      setLoggedInUser(null);
      navigate("/sign-in");
    } else {
      console.error("No user role found for logout");
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["loggedInUser", userRole],
    queryFn: () =>
      getLoggedInUser(userRole as "staff" | "admin" | "candidate" | "analyst"),
    enabled: !!userRole,
    staleTime: 10 * 1000 * 60,
  });

  useEffect(() => {
    if (data) {
      Cookies.set("user_name", data.full_name);
      Cookies.set("user_email", data.email);

      setLoggedInUser(data);
    }
  }, [userRole, data]);

  return {
    loggedInUser,
    handleLogout,
    isLoading,
  };
};

export default useAuth;
