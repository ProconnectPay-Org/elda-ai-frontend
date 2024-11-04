import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "../assets/elda-new-logo.png";
import { AuthLayoutProps } from "@/types";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="sign-in-layout">
      <nav className="flex justify-between items-center w-full px-8 py-2 h-[80px] sm:h-[120px] bg-white overflow-hidden">
        <Link to="/">
          <div className="flex items-center justify-center w-[160px] sm:w-[240px]">
            <img src={Logo} alt="logo" className="w-full h-full scale-150" />
          </div>
        </Link>
        <Link to="/sign-in">
          <Button className="bg-red p-5 md:h-12 md:w-32">Sign In</Button>
        </Link>
      </nav>
      <main className="flex items-center justify-center py-10 min-h-[90vh] bg-ai">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
