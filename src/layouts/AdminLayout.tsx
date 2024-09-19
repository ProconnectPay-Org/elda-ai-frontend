// AdminLayout.tsx

import { AuthLayoutProps } from "@/types";
import Logo from "../assets/elda-ai-logo-no-bg.png";
import Hamburger from "@/assets/mobile_hamburger.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const sidebarLinks = [
  {
    route: "/admin-dashboard",
    label: "Dashboard",
  },
  {
    route: "/candidates",
    label: "Candidates",
  },
  {
    route: "/staff",
    label: "Staff",
  },
  {
    route: "/assign-candidate",
    label: "Assign Candidate",
  },
  {
    route: "/settings/account",
    label: "Settings",
  },
];

const AdminLayout = ({ children }: AuthLayoutProps) => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith("/settings");
  const isDashboardActive = location.pathname.startsWith("/admin");

  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!access_token) {
      navigate("/sign-in");
    }
  }, [access_token, navigate]);

  if (!access_token) {
    return null;
  }

  return (
    <div>
      <nav className="flex items-center justify-between md:justify-normal bg-pale-bg h-28 p-4 lg:p-12 gap-16">
        <div className="w-[40%] sm:w-[30%] md:w-[15%]">
          <img src={Logo} alt="logo" className="w-full h-full" />
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <NavLink
            to="/admin-dashboard"
            className={() =>
              `px-4 py-2 rounded ${
                isDashboardActive ? "bg-red text-white" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${isActive ? "bg-red text-white" : ""}`
            }
          >
            Candidates
          </NavLink>
          <NavLink
            to="/staff"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${isActive ? "bg-red text-white" : ""}`
            }
          >
            Staff
          </NavLink>
          <NavLink
            to="/assign-candidate"
            className={({ isActive }) =>
              `px-4 py-2 rounded ${isActive ? "bg-red text-white" : ""}`
            }
          >
            Assign Candidate
          </NavLink>
          <NavLink
            to="/settings/account"
            className={() =>
              `px-4 py-2 rounded ${isSettingsActive ? "bg-red text-white" : ""}`
            }
          >
            Settings
          </NavLink>
        </div>
        {/* mobile navbar */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <img src={Hamburger} alt="menu icon" />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="my-5">
                  <SheetTitle className="flex items-start justify-start">
                    Admin Dashboard
                  </SheetTitle>
                  <SheetDescription className="flex items-start justify-start">
                    MENU
                  </SheetDescription>
                </SheetHeader>
                <ul className="flex flex-col items-start justify-start gap-5">
                  {sidebarLinks.map((item) => {
                    const isActive =
                      location.pathname === item.route ||
                      location.pathname.startsWith(`${item.route}/`);

                    return (
                      <Link
                        className={cn("flex gap-2 p-2 rounded-lg w-full", {
                          "bg-pale-bg": isActive,
                        })}
                        to={item.route}
                        key={item.label}
                      >
                        <li className={cn("flex", { "!text-red": isActive })}>
                          {item.label}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="py-12 px-5 md:p-12">{children}</div>
    </div>
  );
};

export default AdminLayout;
