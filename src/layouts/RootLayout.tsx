// components/RootLayout.tsx
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import TopNavBar from "@/components/TopNavBar";
import { AuthLayoutProps } from "@/types";
import Logo from "../assets/elda-ai-logo-no-bg.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RootLayout = ({ children, title }: AuthLayoutProps) => {
  const staff_access_token = localStorage.getItem("staff_access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!staff_access_token) {
      navigate("/sign-in");
    }
  }, [staff_access_token, navigate]);

  if (!staff_access_token) {
    return null;
  }

  return (
    <main className="flex h-screen w-full">
      <SideBar />
      <div className="flex size-full flex-col">
        <TopNavBar title={title} />
        <div className="root-layout border-b border-gray shadow-md">
          <img src={Logo} className="w-[30%]" alt="logo" />
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
