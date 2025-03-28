import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
// import EldaLogo from "../assets/elda-new-logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../assets/elda-new-logo.png";
import RedEnvelope from "../assets/red-envelop.png";
import status from "../assets/status.png";
import student from "../assets/student.png";
import zoom from "../assets/zoom.png";
import product from "../assets/Produk.png";
import linkedIn from "../assets/linkedin.png";
import monitor from "../assets/monitor.png";
import admission from "../assets/admission-status.png";

interface TestingLayoutProps {
  children: React.ReactNode;
}

const CandidateNewLayout = ({ children }: TestingLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("staff_access_token");
    navigate("/sign-in");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
      title: "Candidate Information",
      icon: student,
      href: "/candidate-info",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Support banner - hidden on mobile */}
      <div className="absolute top-0 left-0 right-0 bg-[#F8D3D1] py-2 px-4 w-full hidden lg:flex items-center justify-center gap-2 z-50 mb-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium">For Support</span>
          <img
            src={RedEnvelope}
            alt="Support Icon"
            className="h-4 w-4 object-contain"
          />
          <span className="text-red-600 font-bold">info@proconnectpay.com</span>
        </div>
        <div>
          <span className="text-[#323232]">|</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium">Recommendation Issues</span>
          <img
            src={RedEnvelope}
            alt="Support Icon"
            className="h-4 w-4 object-contain"
          />
          <span className="text-red-600 font-bold">acs@proconnectpay.com</span>
        </div>
        <div>
          <span className="text-[#323232]">|</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium">Loan Issues</span>
          <img
            src={RedEnvelope}
            alt="Support Icon"
            className="h-4 w-4 object-contain"
          />
          <span className="text-red-600 font-bold">loan@proconnectpay.com</span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white py-2 px-4 flex justify-between items-center z-40 border-b">
        <img src={Logo} alt="logo" className="h-20 w-20 object-contain" />
        <button
          className="p-2 rounded-md hover:bg-red text-red"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Add margin-top to main container to account for banner */}
      <div className="flex w-full mt-10">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static lg:flex bg-[#F5F7F9] border-r transition-all duration-300 flex-col h-full",
            "z-40 top-[60px]", // Position below mobile header
            isSidebarOpen ? "left-0" : "-left-72", // Slide in/out on mobile
            sidebarOpen ? "w-72" : "w-16"
          )}
        >
          {/* Logo section */}
          <div className="flex items-center justify-between px-4">
            <div
              className={cn(
                " transition-all duration-300 overflow-hidden mt-3",
                sidebarOpen ? "w-36" : "w-8"
              )}
            >
              <img
                src={Logo}
                alt="Elda Logo"
                className="w-full h-full scale-150"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={cn("", !sidebarOpen && "absolute right-0")}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation items */}
          <ScrollArea className="flex-1 mt-8">
            <nav className="space-y-2 px-4 flex flex-col justify-center">
              {sidebarItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 transition-all",
                    location.pathname === item.href
                      ? "bg-red font-bold text-white hover:bg-red"
                      : "hover:text-gray hover:bg-gray-border",
                    !sidebarOpen && "justify-center"
                  )}
                  title={!sidebarOpen ? item.title : undefined}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className={cn(
                      location.pathname === item.href && "brightness-0 invert"
                    )}
                  />
                  {sidebarOpen && <span>{item.title}</span>}
                </a>
              ))}
            </nav>
          </ScrollArea>

          {/* Logout button */}
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 transition-all",
                !sidebarOpen && "justify-center"
              )}
            >
              <LogOut className="h-5 w-5" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={toggleSidebar}
          />
        )}

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default CandidateNewLayout;
