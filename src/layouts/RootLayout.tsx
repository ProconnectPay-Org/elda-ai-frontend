import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import TopNavBar from "@/components/TopNavBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const RootLayout = ({ children, title }: AuthLayoutProps) => {
  const [loggedInUser, setLoggedInUser] = useState<DummyUser | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await getLoggedInUser();
      setLoggedInUser(user);
    };

    fetchLoggedInUser();
  }, []);

  if (!loggedInUser) redirect("/sign-in");

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
        <div className="px-12 py-8">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
