import { CandidateLayoutProps } from "@/types";
import PcpLogo from "../assets/pcplogo.svg";
import EldaLogo from "../assets/elda-ai-logo-no-bg.png";

const CandidateLayout = ({ children }: CandidateLayoutProps) => {
  return (
    <div className="relative min-h-screen w-full form-bg">
      <div className="flex items-center justify-center flex-col pt-8">
        <div className="flex items-center justify-center gap-4 max-w-full h-[200px]">
          <img src={PcpLogo} alt="pcp-logo" />
          <img src={EldaLogo} alt="elda-logo" className="w-[30%] md:w-[15%]" />
        </div>
        <h1 className="font-semibold mt-8 sm:font-bold text-4xl leading-tight">
          Registration Form
        </h1>
      </div>
      <div className="p-8 md:px-16 md:py-12 xl:px-20">
        {/* <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white"> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CandidateLayout;
