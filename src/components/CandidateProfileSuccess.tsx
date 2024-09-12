import { Button } from "./ui/button";
import CopyIcon from "../assets/copy.svg";
import { ArrowLeftIcon } from "lucide-react";
import Success from "../assets/success.svg";
import { Link } from "react-router-dom";

const CandidateProfileSuccess = () => {
  return (
    <div className="absolute w-[100vw] min-h-[100vh] flex flex-col pt-12 px-5 lg:px-32 bg-white z-10 top-28 left-0">
      <div className="flex items-center">
        <Link to="/admin-dashboard">
          <ArrowLeftIcon color="red" className="cursor-pointer" />
        </Link>

        <h2 className="text-red text-2xl md:text-3xl font-bold text-center w-full">
          Registration Successful
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
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
