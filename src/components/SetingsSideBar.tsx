// SetingsSideBar.tsx

import { NavLink } from "react-router-dom";
import Profile from '../assets/account-icon.svg';
import ProfileActive from '../assets/profile-active.svg'; // Active state icon
import Lock from '../assets/lock-light.svg';
import LockActive from '../assets/lock-dark.svg'; // Active state icon

const SetingsSideBar = () => {
  return (
    <div className="hidden md:block min-w-[280px] border border-[#969696] h-[70vh] rounded-lg overflow-hidden">
      <NavLink
        to="/settings/account"
        className={({ isActive }) =>
          `py-2 px-3 flex items-center gap-3 text-black ${
            isActive ? "bg-red text-white" : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div>
              <img src={isActive ? ProfileActive : Profile} alt="account-icon" />
            </div>
            <div>
              <p className="font-bold text-lg">Account</p>
              <p className="text-sm">Personal Information, Profile photo</p>
            </div>
          </>
        )}
      </NavLink>
      <NavLink
        to="/settings/security"
        className={({ isActive }) =>
          `py-2 px-3 flex items-center gap-3 text-black ${
            isActive ? "bg-red text-white" : ""
          }`
        }
      >
        {({ isActive }) => (
          <>
            <div>
              <img src={isActive ? LockActive : Lock} alt="lock" />
            </div>
            <div>
              <p className="font-bold text-lg">Security</p>
              <p className="text-sm">Password</p>
            </div>
          </>
        )}
      </NavLink>
    </div>
  );
};

export default SetingsSideBar;
