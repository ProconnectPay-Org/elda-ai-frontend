import Logo from "@/assets/elda-new-logo.png";
import status from "@/assets/status.png";
import student from "@/assets/student.png";
import zoom from "@/assets/zoom.png";
import product from "@/assets/Produk.png";
import linkedIn from "@/assets/linkedin.png";
import monitor from "@/assets/monitor.png";
import admission from "@/assets/admission-status.png";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const CandidateSideBar = () => {
  const location = useLocation();

  const { handleLogout } = useAuth();

  const sidebarItems = [
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
      href: "/weekly-townhall",
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
    {
      title: "Settings",
      icon: student,
      href: "/candidate-settings",
    },
  ];
  return (
    <div>
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden fixed lg:static lg:flex max-w-xs bg-[#F5F7F9] border-r transition-all duration-300 flex-col h-full",
          "z-40 top-[60px] left-0"
        )}
      >
        {/* Logo section */}
        <div className="flex items-center justify-center h-32 px-4">
          <img
            src={Logo}
            alt="Elda Logo"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Navigation items */}
        <ScrollArea className="flex-1 my-2">
          <nav className="space-y-2 px-4 flex flex-col justify-center">
            {sidebarItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 transition-all",
                  location.pathname === item.href
                    ? "bg-red text-white hover:bg-red"
                    : "hover:text-gray hover:bg-gray-border"
                )}
                title={item.title}
              >
                <img
                  src={item.icon}
                  alt="icon"
                  className={cn(
                    location.pathname === item.href && "brightness-0 invert"
                  )}
                />
                {<span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>

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
      </aside>
    </div>
  );
};

export default CandidateSideBar;
