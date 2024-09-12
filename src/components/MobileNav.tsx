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
import Hamburger from "@/assets/mobile_hamburger.svg";

const MobileNav = ({ title }: { title?: string }) => {
  const navLocation = useLocation();
  return (
    <div>
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
                      {!isActive ? (
                        <img src={item.imgURL} alt={item.label} />
                      ) : (
                        <img src={item.isActive} alt={item.label} />
                      )}
                    </div>
                    <li className={cn("flex", { "!text-red": isActive })}>
                      {item.label}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <Footer />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
