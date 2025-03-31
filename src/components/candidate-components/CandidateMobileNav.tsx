import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Hamburger from "@/assets/mobile_hamburger.svg";
import status from "@/assets/status.png";
import student from "@/assets/student.png";
import zoom from "@/assets/zoom.png";
import product from "@/assets/Produk.png";
import linkedIn from "@/assets/linkedin.png";
import monitor from "@/assets/monitor.png";
import admission from "@/assets/admission-status.png";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { ScrollArea } from "../ui/scroll-area";

const sidebarLinks = [
  {
    title: "Status",
    icon: status,
    href: "/candidate-status",
  },
  {
    title: "LinkedIn Masterclass",
    icon: linkedIn,
    href: "/linkedin-masterclass",
  },
  {
    title: "Using this portal",
    icon: monitor,
    href: "/portal-usage",
  },
  {
    title: "Weekly Town Hall",
    icon: zoom,
    href: "/weekly-downhall",
  },
  {
    title: "Other Information",
    icon: product,
    href: "/other-info",
  },
  {
    title: "Admission Status Prompt",
    icon: admission,
    href: "/admission-status-prompt",
  },
  {
    title: "Registration Form",
    icon: monitor,
    href: "/register",
  },
  {
    title: "Candidate Information",
    icon: student,
    href: "/candidate-info",
  },
];

const CandidateMobileNav = ({ title }: { title?: string }) => {
  const navLocation = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("staff_access_token");
    navigate("/sign-in");
  };

  return (
    <ScrollArea>
      <Sheet>
        <SheetTrigger>
          <img src={Hamburger} alt="menu icon" />
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col justify-between">
          <div>
            <SheetHeader className="my-5">
              <SheetTitle className="flex items-start justify-start">
                {title}
              </SheetTitle>
              <SheetDescription className="flex items-start justify-start">
                MENU
              </SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col items-start justify-start gap-5">
              {sidebarLinks.map((item) => {
                const isActive =
                  navLocation.pathname === item.href ||
                  navLocation.pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    className={cn("flex gap-2 p-2 rounded-lg w-full", {
                      "bg-pale-bg": isActive,
                    })}
                    to={item.href}
                    key={item.title}
                  >
                    <div className="relative top-0.5 size-6">
                      {!isActive ? (
                        <img src={item.icon} alt={item.title} />
                      ) : (
                        <img src={item.icon} alt={item.title} />
                      )}
                    </div>
                    <li
                      className={cn("flex text-sm", { "!text-red": isActive })}
                    >
                      {item.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          {/* Logout button */}
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 transition-all"
              )}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </ScrollArea>
  );
};

export default CandidateMobileNav;
