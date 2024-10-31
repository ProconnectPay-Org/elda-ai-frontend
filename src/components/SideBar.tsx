import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Logo from "../assets/elda-new-logo.png";

const SideBar = () => {
  const navLocation = useLocation();
  return (
    <section className="sidebar w-[250px]">
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className="flex cursor-pointer items-center justify-center w-[240px] h-20 mb-8"
        >
          <div className="flex items-center justify-center w-[160px] sm:w-[240px] sm:h-[160px] overflow-hidden">
            <img src={Logo} alt="logo" className="w-full h-full scale-150 sm:object-cover" />
          </div>
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
                {!isActive ? (
                  <img src={item.imgURL} alt={item.label} />
                ) : (
                  <img src={item.isActive} alt={item.label} />
                )}
              </div>
              <p className={cn("sidebar-label", { "!text-red": isActive })}>
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
