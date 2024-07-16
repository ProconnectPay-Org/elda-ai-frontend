import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "../assets/elda-logo.svg";
import { AuthLayoutProps } from "@/types";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="sign-in-layout">
      <nav className="flex justify-between items-center w-full p-8 bg-white [h-10vh]">
        <Link to="/" className="cursor-pointer flex items-center gap-1">
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            <img src={Logo} alt="logo" />
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/sign-in">
            <Button className="bg-red">Sign In</Button>
          </Link>
        </div>
      </nav>
      <main className="flex items-center justify-center py-10 min-h-[90vh] bg-ai">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
