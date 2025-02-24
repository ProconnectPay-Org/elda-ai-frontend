import ACSLayout from "@/layouts/ACSLayout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AcsDashboard = () => {
  const access_token = Cookies.get("acs_access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!access_token) {
      navigate("/sign-in");
    }
  }, [access_token, navigate]);

  return (
    <div>
      <ACSLayout />
    </div>
  );
};

export default AcsDashboard;
