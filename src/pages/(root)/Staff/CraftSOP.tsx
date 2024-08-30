import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import helpIcon from "@/assets/help-icon.svg";
import mailIcon from "@/assets/mail.svg";

const CraftSOP = () => {
  return (
    <RootLayout title="Draft Statement Of Purpose">
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 md:p-12">
        <Link to="/assigned-candidates">
          <div className="w-16 cursor-pointer relative mb-8 md:mb-16">
            <ChevronLeftIcon color="red" />
            <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
          </div>
        </Link>
        <div className="flex items-center flex-col gap-8 justify-center md:w-3/4 mx-auto">
          <h2 className="text-red font-bold text-3xl">
            Enter Candidate&apos;s Name or Email Address
          </h2>
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="email">
              Email <span className="text-red">*</span>
            </label>
            <div className="w-full flex items-center gap-4 border border-[#667085] p-3 rounded-full overflow-hidden">
              <img src={mailIcon} alt="mail icon" />
              <input
                type="email"
                className="bg-transparent w-full focus:ring-0 focus-visible:ring-0 focus:outline-none border-0 focus-within:ring-0 max-h-fit"
              />
              <img src={helpIcon} alt="help icon" />
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <Link to="/craft-sop/2">
              <Button className="bg-red text-white w-32 h-12">Next</Button>
            </Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default CraftSOP;
