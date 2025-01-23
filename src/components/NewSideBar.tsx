import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
// import { sidebarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import Logo from "../assets/elda-new-logo.png";
import { Files, Group, Printer, Settings } from "lucide-react";

const sidebarLinks = [
  {
    imgURL: Group,
    route: "/assigned-candidates",
    label: "Assigned Candidates",
    isActive: Group,
  },
  {
    imgURL: Printer,
    route: "/refine-resume",
    label: "Refine Resume",
    isActive: Printer,
  },
  {
    imgURL: Files,
    route: "/craft-sop",
    label: "Craft SOPs",
    isActive: Files,
  },
  {
    imgURL: Settings,
    route: "/profile",
    label: "Profile",
    isActive: Settings,
  },
];

const NewSideBar = () => {
  const navLocation = useLocation();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="h-fit">
            <div className="flex items-center justify-center scale-150 w-[160px] sm:w-[240px] sm:h-[160px]">
              <img
                src={Logo}
                alt="logo"
                className="w-full h-full sm:object-cover"
              />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-8">
              {sidebarLinks.map((item) => {
                const isActive =
                  navLocation.pathname === item.route ||
                  navLocation.pathname.startsWith(`${item.route}/`);

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link
                        className={cn("sidebar-link", {
                          "bg-pale-bg": isActive,
                        })}
                        to={item.route}
                      >
                        <item.imgURL stroke={isActive ? "red" : "black"} />
                        <span
                          className={cn("sidebar-label", {
                            "!text-red": isActive,
                          })}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="overflow-hidden">
                <Footer />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default NewSideBar;
