import { AuthLayoutProps } from "@/types";
import Logo from "../assets/elda-new-logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// import PcpLogo from "../assets/proconnect-logo-new-no-bg.png";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

const navbarLinks = [
  {
    route: "/candidate/status",
    label: "Status",
  },
  {
    route: "/candidate/view",
    label: "View",
  },
  {
    route: "/feedback",
    label: "Feedback",
  },
  {
    route: "/masterclass",
    label: "LinkedIn Masterclass",
  },
  {
    route: "/complaints",
    label: "General Complaints",
  },
];

const CandidateLayout = ({ children }: AuthLayoutProps) => {
  const location = useLocation();
  const { handleLogout } = useAuth();

  return (
    <div>
      <nav className="flex items-center justify-between bg-[#F5F7F9] h-28 p-4 lg:p-12">
        <div className="w-[200px] sm:w-[30%] md:w-[15%] flex gap-4">
          {/* <img src={PcpLogo} alt="pcp-logo" className="w-1/2 scale-125" /> */}
          <div className="flex items-center justify-center w-[160px] sm:w-[240px]">
            <img src={Logo} alt="logo" className="w-full h-full scale-150" />
          </div>
        </div>
        <div className="hidden md:flex gap-1 lg:gap-4 items-center">
          {navbarLinks.map((link) => (
            <NavLink
              to={link.route}
              key={link.label}
              className={({ isActive }) =>
                `px-4 py-2 rounded md:text-sm xl:text-base whitespace-nowrap ${
                  isActive ? "bg-red text-white" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <Button
          className="hidden h-fit w-fit bg-red hover:bg-rose-900 items-center justify-center md:flex"
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
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent
              side={"left"}
              className="flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="my-5">
                  <SheetTitle className="flex items-start justify-start">
                    Candidate Dashboard
                  </SheetTitle>
                  <SheetDescription className="flex items-start justify-start">
                    MENU
                  </SheetDescription>
                </SheetHeader>
                <ul className="flex flex-col items-start justify-start gap-5">
                  {navbarLinks.map((item) => {
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
              <Button
                className="h-fit w-fit bg-red hover:bg-rose-900 flex gap-2 items-center justify-center"
                onClick={handleLogout}
              >
                Logout
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
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="py-12 px-5 md:p-12">{children}</div>
    </div>
  );
};

export default CandidateLayout;
