import { CandidateLayoutProps } from "@/types";
import PcpLogo from "../assets/proconnect-logo-new-no-bg.png";
import EldaLogo from "../assets/elda-new-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

const CandidateFormLayout = ({ children }: CandidateLayoutProps) => {
  const navigate = useNavigate();
  const loggedInCandidate = Cookies.get("candidate_access_token");

  useEffect(() => {
    if (!loggedInCandidate) {
      navigate("/candidate/login");
    }
  }, [loggedInCandidate, navigate]);

  if (!loggedInCandidate) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full form-bg">
      <div className="flex items-center justify-center flex-col pt-8">
        <div className="flex items-center justify-center md:gap-4 max-w-[500px] h-[200px]">
          <img src={PcpLogo} alt="pcp-logo" className="w-[50%] md:scale-150" />
          <img src={EldaLogo} alt="elda-logo" className="w-[50%] md:scale-150" />
        </div>
        <Button className="z-40 bg-red">
          <Link to="/candidate/status">My Portal</Link>
        </Button>
        <h1 className="font-semibold mt-8 sm:font-bold text-4xl leading-tight">
          Registration Form
        </h1>
      </div>
      <div className="p-8 md:px-16 md:py-12 xl:px-20">
        {/* <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white"> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CandidateFormLayout;
