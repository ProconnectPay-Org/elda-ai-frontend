import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Logo from "../assets/sharp-logo.png";

const SideBar = () => {
  const navLocation = useLocation();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className=" flex cursor-pointer items-center justify-center gap-2 w-[250px] h-20 overflow-hidden"
        >
          <img src={Logo} alt="logo" className="w-full" />
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            navLocation.pathname === item.route ||
            navLocation.pathname.startsWith(`${item.route}/`);

          return (
            <Link
              className={cn("sidebar-link", { "bg-pale-bg": isActive })}
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
              <p
                className={cn("sidebar-label", { "!text-red": isActive })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      <Footer />
    </section>
  );
};

export default SideBar;
