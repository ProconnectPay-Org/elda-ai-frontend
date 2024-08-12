import { Button } from "./ui/button";
import CopyIcon from "../assets/copy.svg";
import { ChevronLeftIcon } from "lucide-react";
import Success from "../assets/success.svg";
import { Link } from "react-router-dom";

const CandidateProfileSuccess = () => {
  return (
    <div className="absolute w-[100vw] min-h-[100vh] flex items-start pt-12 px-5 lg:px-32 bg-white z-10 top-28 left-0">
      <Link to="/admin-dashboard">
        <div className="w-16 cursor-pointer relative">
          <ChevronLeftIcon color="red" />
          <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-red text-3xl font-bold text-center w-full mb-10">
          Registration Successfully
        </h2>

        {/* IMAGE */}
        <img src={Success} alt="success image" />

        <Button
          variant={"outline"}
          className="border border-red mt-10 text-red hover:text-red flex justify-center items-center gap-2 h-12 text-lg"
        >
          #Joy2024???? <img src={CopyIcon} alt="copy-icon" />
        </Button>
      </div>
    </div>
  );
};

export default CandidateProfileSuccess;
