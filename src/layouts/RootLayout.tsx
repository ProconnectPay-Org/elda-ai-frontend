// components/RootLayout.tsx
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import TopNavBar from "@/components/TopNavBar";
import useAuth from "@/hooks/useAuth";
import { AuthLayoutProps } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/elda-logo.svg";

const RootLayout = ({ children, title }: AuthLayoutProps) => {
  const { loggedInUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !loggedInUser) {
      navigate("/sign-in");
    }
  }, [loading, loggedInUser, navigate]);

  if (loading) {
    return <p>Loading...</p>; // Or some kind of loading spinner
  }

  return (
    <main className="flex h-screen w-full">
      <SideBar />
      <div className="flex size-full flex-col">
        <TopNavBar title={title} />
        <div className="root-layout border-b border-gray shadow-md">
          <img src={Logo} width={100} height={100} alt="logo" />
          <div>
            <MobileNav title={title} />
          </div>
        </div>
        <div className="px-12 py-8 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
