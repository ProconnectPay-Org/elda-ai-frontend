import React, { useState } from 'react';
import { LucideIcon, Menu, X, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Logo from "../assets/elda-new-logo.png";
import RedEnvelope from "../assets/red-envelop.png";
import status from "../assets/status.png";
import student from "../assets/student.png";
import zoom from "../assets/zoom.png";
import product from "../assets/Produk.png";
import linkedIn from "../assets/linkedin.png";
import monitor from "../assets/monitor.png";
import admission from "../assets/admission-status.png";

interface CandidateNewLayoutProps {
  children: React.ReactNode;
  title?: string;
}

interface SidebarItemProps {
  icon: LucideIcon | string;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, text, active = false, onClick }: SidebarItemProps) => (
  <button 
    type="button"
    className={`w-full rounded-lg flex items-center gap-3 px-4 py-3 cursor-pointer ${active ? 'bg-red text-white' : 'text-[#424242] hover:bg-gray-100'}`}
    onClick={(e) => {
      e.preventDefault();
      onClick?.();
    }}
  >
    {typeof Icon === 'string' ? (
      <img src={Icon} alt={text} className={`w-5 h-5 ${active ? 'brightness-0 invert' : ''}`} />
    ) : (
      <Icon size={20} className={active ? 'text-white' : 'text-[#424242]'} />
    )}
    <span className="text-base font-medium">{text}</span>
  </button>
);

export default function CandidateNewLayout({ children, title }: CandidateNewLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNavigation = (path: string) => {
    navigate(path, { replace: true });
    setIsSidebarOpen(false);
  };

  return (
    <div className='min-h-screen relative text-black'>
      {/* Support banner - hidden on mobile */}
      <div className="absolute top-0 left-0 right-0 bg-[#F8D3D1] py-2 px-4 w-full hidden lg:flex items-center justify-center gap-2 z-50">
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium">For Support</span>
          <img src={RedEnvelope} alt="Support Icon" className="h-4 w-4 object-contain" />
          <span className='text-red-600 font-bold'>info@proconnectpay.com</span>
        </div>
        <div><span className='text-[#323232]'>|</span></div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium">Recommendation Issues</span>
          <img src={RedEnvelope} alt="Support Icon" className="h-4 w-4 object-contain" />
          <span className='text-red-600 font-bold'>acs@proconnectpay.com</span>
        </div>
        <div><span className='text-[#323232]'>|</span></div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-black font-medium">Loan Issues</span>
          <img src={RedEnvelope} alt="Support Icon" className="h-4 w-4 object-contain" />
          <span className='text-red-600 font-bold'>loan@proconnectpay.com</span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white py-2 px-4 flex justify-between items-center z-40 border-b">
        <img src={Logo} alt="logo" className="h-20 w-20 object-contain" />
        <button 
          className="p-2 rounded-md hover:bg-red text-red"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-72 bg-[#F5F7F9] border-r z-30 flex flex-col
          transform transition-transform duration-300 ease-in-out pt-10 lg:pt-0
          lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-1 pb-0 hidden lg:block">
          <img src={Logo} alt="logo" className="w-full h-full scale-150" />
        </div>
        <nav className="mt-0 text-black p-2 flex flex-col gap-2">
          <SidebarItem 
            icon={status} 
            text="Status" 
            active={isActive('/candidate-status')} 
            onClick={() => handleNavigation('/candidate-status')}
          />
          <SidebarItem 
            icon={linkedIn} 
            text="LinkedIn Masterclass" 
            active={isActive('/linkedin-masterclass')} 
            onClick={() => handleNavigation('/linkedin-masterclass')}
          />
          <SidebarItem 
            icon={monitor} 
            text="Using the Portal" 
            active={isActive('/portal-usage')} 
            onClick={() => handleNavigation('/portal-usage')}
          />
          <SidebarItem 
            icon={zoom} 
            text="Weekly Downhall" 
            active={isActive('/weekly-downhall')} 
            onClick={() => handleNavigation('/weekly-downhall')}
          />
          <SidebarItem 
            icon={product} 
            text="Other Information" 
            active={isActive('/other-info')} 
            onClick={() => handleNavigation('/other-info')}
          />
          <SidebarItem 
            icon={admission} 
            text="Admission Status Prompt" 
            active={isActive('/admission-status-prompt')} 
            onClick={() => handleNavigation('/admission-status-prompt')}
          />
          <SidebarItem 
            icon={student} 
            text="Candidate Information" 
            active={isActive('/candidate-info')} 
            onClick={() => handleNavigation('/candidate-info')}
          />
        </nav>
        {/* Logout button with increased spacing from nav items */}
        <div className="mt-auto border-t border-gray-200">
          <div className="px-4 py-6">
            <SidebarItem
              icon={LogOut}
              text="Log Out"
              onClick={handleLogout}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-72 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-20">
          {title && (
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
