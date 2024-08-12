import RootLayout from "@/layouts/RootLayout";
import Mail from "@/assets/mail.png";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

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
            <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-[24px]">
              <img src={Mail} alt="mail icon" />
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="email"
                placeholder="Enter your email address"
              />

              {/* <img src={Pen} alt="pen" /> */}
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
