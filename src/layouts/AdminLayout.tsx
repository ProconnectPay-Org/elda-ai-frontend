// AdminLayout.tsx

import { AuthLayoutProps } from "@/types";
import Logo from "../assets/elda-ai-logo-no-bg.png";
import { NavLink, useLocation } from "react-router-dom";

const AdminLayout = ({ children }: AuthLayoutProps) => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith("/settings");
  const isDashboardActive = location.pathname.startsWith("/admin");

  return (
    <div>
      <nav className="flex items-center bg-[#F5F7F9] h-32 p-2 md:p-4 lg:p-12 gap-16">
        <div className="w-[15%]">
          <img src={Logo} alt="logo" className="w-full h-full" />
        </div>
        <div className="flex gap-4 items-center">
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
            to="/settings/account"
            className={() =>
              `px-4 py-2 rounded ${isSettingsActive ? "bg-red text-white" : ""}`
            }
          >
            Settings
          </NavLink>
        </div>
      </nav>
      <div className="p-12">{children}</div>
    </div>
  );
};

export default AdminLayout;
