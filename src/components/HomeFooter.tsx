import { Link } from "react-router-dom";
import Logo from "../assets/pcp-logo-1.png";
import Buisness from "../assets/company.png";
import Location from "../assets/location.png";
import { businessLinks, locationLinks, socialIcons } from "@/constants";

const HomeFooter = () => {
  return (
    <div className="flex flex-col py-12 px-8 sm:p-12 lg:p-16 gap-16">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="md:w-1/3 flex flex-col gap-5 items-start">
          <a href="https://proconnectpay.com" target="_blank">
            <img src={Logo} alt="pcp-logo" />
          </a>
          <p className="text-lg leading-relaxed">
            ProconnectPAY is an African Edu-FinTech Company that works with
            other financial institutions to drive adoption of Education-oriented
            Loans.{" "}
          </p>
          <p className="text-lg leading-relaxed">
            ProconnectPAY is legally registered in Nigeria and the United
            States. RC Number in Nigeria is{" "}
            <span className="text-[#1E4580] font-semibold">
              1884617 (Proconnect Tech Solutions Limited),
            </span>{" "}
            Assigned Filling No in the United States is{" "}
            <span className="text-red font-semibold">
              7044965 (ProconnectPAY EduFinTech Inc.)
            </span>
          </p>
        </div>

        <div className="md:w-1/3 mt-8">
          <p className="flex gap-4 text-2xl font-semibold lg:font-bold items-center mb-6">
            <img src={Buisness} alt="buisness" /> BUISNESS
          </p>
          <ul className="flex flex-col items-start justify-start gap-6">
            {businessLinks.map((footerLink) => {
              return (
                <Link key={footerLink.name} to={footerLink.url}>
                  <li className="font-medium lg:font-semibold text-lg hover:font-normal">{footerLink.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>

        <div className=" mt-8">
          <p className="flex gap-4 text-2xl font-semibold lg:font-bold items-center mb-6">
            <img src={Location} alt="location" /> LOCATIONS
          </p>
          <ul className="flex flex-col items-start justify-start gap-6">
            {locationLinks.map((locationLink, index) => {
              return (
                <Link key={index} to={locationLink.url}>
                  <li className="font-medium lg:font-semibold text-lg hover:font-normal">{locationLink.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
        <p className="text-gray-500 text-lg text-center md:text-left">@ 2024 Proconnectpay. All rights reserved.</p>
        <div className="flex gap-8 items-center">
          {socialIcons.map((icon, index) => {
            return (
              <Link key={index} to={icon.url}>
                <img src={icon.name} alt="icon" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
