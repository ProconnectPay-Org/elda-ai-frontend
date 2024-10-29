import { Link } from "react-router-dom";
import Logo from "../assets/proconnect-logo-new.jpg";
import Buisness from "../assets/company.png";
import Location from "../assets/location.png";
import { businessLinks, locationLinks, socialIcons } from "@/constants";
import { useEffect, useState } from "react";

const HomeFooter = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear());
    };

    const intervalId = setInterval(updateYear, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col py-12 px-8 sm:p-12 lg:p-16 gap-16">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="md:w-1/3 flex flex-col gap-5 items-start">
          <a
            href="https://proconnectpay.com"
            target="_blank"
            className="relative -left-16 w-80 h-24"
          >
            <img
              src={Logo}
              alt="pcp-logo"
              className="w-full h-full object-cover"
            />
          </a>
          <p className="font-semibold text-justify">
            Proconnect is a global financial services provider specializing in
            education and mobility solutions. We help students gain access to
            over 5,000 universities in 17 countries, offering tailored financing
            that makes studying abroad more accessible. Additionally, we
            streamline the relocation process by covering essential expenses
            such as flights, living costs, and rent, ensuring a smooth
            transition for individuals pursuing global opportunities. With our
            comprehensive approach and global partnerships, Proconnect empowers
            students and professionals to focus on their ambitions while we
            manage the financial logistics.
          </p>
          <p className="text-justify font-semibold">
            ProconnectPAY is legally registered in Nigeria and the United
            States. RC Number in Nigeria is{" "}
            <span className="text-[#1E4580]">
              1884617 (Proconnect Tech Solutions Limited) ,
            </span>{" "}
            Assigned Filling No in the United States is{" "}
            <span className="text-[#DB251A]">
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
                  <li className="font-medium lg:font-semibold text-lg hover:font-normal">
                    {footerLink.name}
                  </li>
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
                  <li className="font-medium lg:font-semibold text-lg hover:font-normal">
                    {locationLink.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
        <p className="text-gray-500 text-lg text-center md:text-left">
          @ {currentYear} Proconnectpay. All rights reserved.
        </p>
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
