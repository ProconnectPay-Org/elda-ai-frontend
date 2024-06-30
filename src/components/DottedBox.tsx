import { DottedBoxProps } from "@/types";
import { Link } from "react-router-dom";

const DottedBox = ({ docType, icon, href, className }: DottedBoxProps) => {
  return (
    <Link
      className={`${className} border cursor-pointer border-dashed flex flex-col items-center justify-center`}
      to={href}
    >
      <img src={icon} alt="" />
      <p className="text-[#DB251A]">{docType}</p>
    </Link>
  );
};

export default DottedBox;
