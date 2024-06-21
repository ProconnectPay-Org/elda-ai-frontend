import { Link } from "react-router-dom";

const DottedBox = ({ docType, icon, href }: DottedBox) => {
  return (
    <Link
      className="border cursor-pointer border-dashed flex flex-col items-center justify-center w-1/2 h-60 p-12 border-red-500 rounded-2xl"
      to={href}
    >
      <img src={icon} alt="" />
      <p className="text-[#DB251A] text-lg font-bold">{docType}</p>
    </Link>
  );
};

export default DottedBox;
