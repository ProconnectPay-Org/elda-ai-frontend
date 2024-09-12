import { AuthLayoutProps } from "@/types";
import Logo from "../assets/elda-ai-logo-no-bg.png";
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
import PcpLogo from "../assets/pcplogo.svg";


const sidebarLinks = [
  {
    route: "/candidate-status",
    label: "Status",
  },
  {
    route: "/candidate-view",
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

  return (
    <div>
      <nav className="flex items-center justify-between md:justify-normal bg-[#F5F7F9] h-28 p-4 lg:p-12 gap-20 lg:gap-36">
        <div className="w-[40%] sm:w-[30%] md:w-[15%] flex gap-4">
          <img src={PcpLogo} alt="pcp-logo" className="w-1/2" />
          <img src={Logo} alt="logo" className="w-2/3 h-full" />
        </div>
        <div className="hidden md:flex gap-1 lg:gap-4 items-center">
          {sidebarLinks.map((link) => (
            <NavLink
              to={link.route}
              key={link.label}
              className={({ isActive }) =>
                `px-4 py-2 rounded md:text-sm xl:text-base whitespace-nowrap ${isActive ? "bg-red text-white" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
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

export default CandidateLayout;
