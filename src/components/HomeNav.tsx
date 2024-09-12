import { Link } from "react-router-dom";
import Logo from "../assets/elda-ai-logo-no-bg.png";
import { Button } from "./ui/button";

const HomeNavBar = () => {
  return (
    <div className="min-w-full py-8 px-8 sm:px-12 lg:px-16 flex justify-between items-center overflow-x-hidden h-40">
      <div className="flex items-center justify-center w-[40%] md:w-[30%] lg:w-[15%]">
        <img src={Logo} alt="logo" className="w-full h-full" />
      </div>
      <Button className="bg-red rounded-lg p-3 w-28 h-12 text-lg flex items-center justify-center">
        <Link to="/admin/sign-in">Sign In</Link>
      </Button>
    </div>
  );
};

export default HomeNavBar;
