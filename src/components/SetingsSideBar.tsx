import { NavLink } from "react-router-dom";

const SetingsSideBar = () => {
  return (
    <div className="min-w-[280px] border border-[#969696] h-[70vh] rounded-lg overflow-hidden">
      <NavLink
        to="/settings/account"
        className={({ isActive }) =>
          `py-2 px-3 flex items-center gap-3 text-black ${
            isActive ? "bg-red text-white" : ""
          }`
        }
      >
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p className="font-bold text-lg">Account</p>
          <p className="text-sm">Personal Information, Profile photo</p>
        </div>
      </NavLink>
      <NavLink
        to="/settings/security"
        className={({ isActive }) =>
          `py-2 px-3 flex items-center gap-3 text-black ${
            isActive ? "bg-red text-white" : ""
          }`
        }
      >
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p className="font-bold text-lg">Security</p>
          <p className="text-sm">Password</p>
        </div>
      </NavLink>
    </div>
  );
};

export default SetingsSideBar;
