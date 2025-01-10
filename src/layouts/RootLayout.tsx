// components/RootLayout.tsx
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import TopNavBar from "@/components/TopNavBar";
import { AuthLayoutProps } from "@/types";
import Logo from "../assets/elda-new-logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const RootLayout = ({ children, title }: AuthLayoutProps) => {
  const staff_access_token = Cookies.get("staff_access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!staff_access_token) {
      navigate("/sign-in");
    }
  }, [staff_access_token, navigate]);

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <SideBar />
      <div className="flex size-full flex-col overflow-hidden">
        <TopNavBar title={title} />
        <div className="root-layout border-b border-gray shadow-md h-[100px] sm:h-[120px] overflow-y-hidden">
          <div className="flex items-center justify-center w-[160px] sm:w-[240px]">
            <img src={Logo} alt="logo" className="w-full h-full scale-150" />
          </div>
          <div>
            <MobileNav title={title} />
          </div>
        </div>
        <div className="px-6 md:px-12 py-8 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
