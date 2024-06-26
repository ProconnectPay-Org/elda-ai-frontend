// components/RootLayout.tsx
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import TopNavBar from "@/components/TopNavBar";
import useAuth from "@/hooks/useAuth";
import { AuthLayoutProps } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="root-layout">
          <img src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav />
          </div>
        </div>
        <div className="px-12 py-8 overflow-y-auto">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
