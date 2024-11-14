// AdminLayout.tsx

import { AuthLayoutProps } from "@/types";
import Logo from "../assets/elda-new-logo.png";
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
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

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
  {
    route: "/view/complaints",
    label: "View Complaints",
  },
];

const AdminLayout = ({ children }: AuthLayoutProps) => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith("/settings");
  const isDashboardActive = location.pathname.startsWith("/admin");

  const { handleLogout } = useAuth();

  const access_token = Cookies.get("access_token");
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
      <nav className="flex items-center justify-between bg-pale-bg h-28 p-4 lg:p-12 gap-16 overflow-y-hidden">
        <div className="flex items-center justify-center w-[200px] overflow-hidden">
          <img src={Logo} alt="logo" className="w-fit scale-150" />
        </div>
        <div className="hidden lg:flex gap-4 items-center">
          <NavLink
            to="/admin-dashboard"
            className={() =>
              `px-4 py-2 rounded font-semibold ${
                isDashboardActive ? "bg-red text-white" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              `px-4 py-2 rounded font-semibold ${isActive ? "bg-red text-white" : ""}`
            }
          >
            Candidates
          </NavLink>
          <NavLink
            to="/staff"
            className={({ isActive }) =>
              `px-4 py-2 rounded font-semibold ${isActive ? "bg-red text-white" : ""}`
            }
          >
            Staff
          </NavLink>
          <NavLink
            to="/assign-candidate"
            className={({ isActive }) =>
              `px-4 py-2 rounded font-semibold ${isActive ? "bg-red text-white" : ""}`
            }
          >
            Assign Candidate
          </NavLink>
          <NavLink
            to="/settings/account"
            className={() =>
              `px-4 py-2 rounded font-semibold ${isSettingsActive ? "bg-red text-white" : ""}`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="/view/complaints"
            className={({ isActive }) =>
              `px-4 py-2 rounded font-semibold ${isActive ? "bg-red text-white" : ""}`
            }
          >
            Complaints
          </NavLink>
        </div>
        <Button
          className="h-fit w-fit bg-red hover:bg-rose-900 items-center justify-center lg:flex hidden"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="white"
            viewBox="0 0 256 256"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M124,216a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V40A12,12,0,0,1,48,28h64a12,12,0,0,1,0,24H60V204h52A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"></path>
          </svg>
        </Button>
        {/* mobile navbar */}
        <div className="lg:hidden">
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
                <Button
                  className="h-fit mt-4 w-fit bg-red hover:bg-rose-900 flex items-center justify-center md:hidden"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="white"
                    viewBox="0 0 256 256"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M124,216a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V40A12,12,0,0,1,48,28h64a12,12,0,0,1,0,24H60V204h52A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"></path>
                  </svg>
                </Button>
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
