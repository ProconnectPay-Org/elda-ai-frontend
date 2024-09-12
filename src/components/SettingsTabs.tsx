// SetingsTabs.tsx

import { NavLink } from "react-router-dom";

const SettingsTabs = () => {
  return (
    <div className="flex md:hidden w-full rounded-lg overflow-hidden">
      <NavLink
        to="/settings/account"
        className={({ isActive }) =>
          `py-2 flex items-center gap-3 w-1/2 justify-center ${
            isActive ? "border-b-2 border-red text-black" : "text-gray-text"
          }`
        }
      >
        <p className="font-semibold text-lg">Account</p>
      </NavLink>
      <NavLink
        to="/settings/security"
        className={({ isActive }) =>
          `py-2 flex items-center gap-3 w-1/2 justify-center ${
            isActive ? "border-b-2 border-red text-black" : "text-gray-text"
          }`
        }
      >
        <p className="font-bold text-lg">Security</p>
      </NavLink>
    </div>
  );
};

export default SettingsTabs;
