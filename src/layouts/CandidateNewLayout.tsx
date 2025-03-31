import Logo from "../assets/elda-new-logo.png";
import RedEnvelope from "../assets/red-envelop.png";
import CandidateSideBar from "@/components/candidate-components/CandidateSideBar";
import CandidateMobileNav from "@/components/candidate-components/CandidateMobileNav";

interface TestingLayoutProps {
  children: React.ReactNode;
}

const CandidateNewLayout = ({ children }: TestingLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Support banner - hidden on mobile */}
      <div className="absolute top-0 left-0 right-0 bg-[#F8D3D1] py-2 px-4 w-full hidden lg:flex items-center justify-center gap-2 z-50 mb-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium text-xs xl:text-base">For Support</span>
          <img
            src={RedEnvelope}
            alt="Support Icon"
            className="h-4 w-4 object-contain"
          />
          <a
            href="mailto:info@proconnectpay.com"
            className="text-red font-bold text-xs xl:text-base"
          >
            info@proconnectpay.com
          </a>
        </div>
        <div>
          <span className="text-[#323232]">|</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium text-xs xl:text-base">Recommendation Issues</span>
          <img
            src={RedEnvelope}
            alt="Support Icon"
            className="h-4 w-4 object-contain"
          />
          <a href="mailto:acs@proconnectpay.com" className="text-red text-xs xl:text-base font-bold">
            acs@proconnectpay.com
          </a>
        </div>
        <div>
          <span className="text-[#323232]">|</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium text-xs xl:text-base">Loan Issues</span>
          <img
            src={RedEnvelope}
            alt="Support Icon"
            className="h-4 w-4 object-contain"
          />
          <a
            href="mailto:loan@proconnectpay.com"
            className="text-red font-bold text-xs xl:text-base"
          >
            loan@proconnectpay.com
          </a>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden h-20 overflow-hidden fixed top-0 left-0 right-0 bg-white py-2 px-4 flex justify-between items-center z-40 border-b">
        <img src={Logo} alt="logo" className="w-32 scale-150" />
        <CandidateMobileNav />
      </div>

      {/* Add margin-top to main container to account for banner */}
      <div className="flex w-full mt-10">
        {/* Sidebar */}
        <CandidateSideBar />

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default CandidateNewLayout;
