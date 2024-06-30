import { sidebarLinks } from "@/constants";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import { MenuIcon } from "lucide-react";

const MobileNav = ({ title }: { title?: string }) => {
  const navLocation = useLocation();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side={"left"}>
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
                navLocation.pathname === item.route ||
                navLocation.pathname.startsWith(`${item.route}/`);

              return (
                <Link
                  className={cn("flex gap-2 p-2 rounded-lg w-full", {
                    "bg-pale-bg": isActive,
                  })}
                  to={item.route}
                  key={item.label}
                >
                  <div className="relative top-0.5 size-6">
                    <img
                      src={item.imgURL}
                      alt={item.label}
                      className={cn({
                        "brightness-[3] invert-0 fill-red-600": isActive,
                      })}
                    />
                  </div>
                  <li className={cn("flex", { "!text-red": isActive })}>
                    {item.label}
                  </li>
                </Link>
              );
            })}
          </ul>
          <Footer />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
