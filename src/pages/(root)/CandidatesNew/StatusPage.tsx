
import { Globe, Clock, Info, FileText, ClipboardList, User } from 'lucide-react';

const SidebarItem = ({ icon: Icon, text, active = false }: { icon: any; text: string; active?: boolean }) => (
  <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${active ? 'bg-red-600 text-white' : 'hover:bg-gray-100'}`}>
    <Icon size={20} />
    <span>{text}</span>
  </div>
);

export default function StatusPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <img src="/logo.png" alt="eLDa Logo" className="h-12" />
        </div>
        <nav className="mt-4">
          <SidebarItem icon={Clock} text="Status" active />
          <SidebarItem icon={FileText} text="LinkedIn Masterclass" />
          <SidebarItem icon={Globe} text="Using the Portal" />
          <SidebarItem icon={Info} text="Weekly Downhall" />
          <SidebarItem icon={ClipboardList} text="Other Information" />
          <SidebarItem icon={Clock} text="Admission Status Prompt" />
          <SidebarItem icon={User} text="Candidate Information" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            eLDa AI Recommendation
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl mb-2">
              Welcome, Mary Ann Ayotunde 👋
            </h2>
            <p className="text-gray-600">
              to the <span className="text-blue-600">Proconnect</span> Global Education Community!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* AI Counselor Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Globe className="text-red-600" size={24} />
                </div>
                <h3 className="font-semibold">Our AI-powered counselor</h3>
              </div>
              <p className="text-sm text-gray-600">
                eLDa AI provides personalized, real-time academic and career guidance. With 99% accuracy, it ensures you pursue courses that align perfectly with your long-term career goals.
              </p>
            </div>

            {/* Career Insights Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FileText className="text-red-600" size={24} />
                </div>
                <h3 className="font-semibold">Tailored Career Insights</h3>
              </div>
              <p className="text-sm text-gray-600">
                After analyzing your profile, eLDa AI has generated career insights and course recommendations designed to offer commercially viable and highly promising post-graduation opportunities.
              </p>
            </div>

            {/* Course Selection Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Globe className="text-red-600" size={24} />
                </div>
                <h3 className="font-semibold">Customized Course Selection</h3>
              </div>
              <p className="text-sm text-gray-600">
                We carefully select courses that align with the best opportunities in your recommended countries. If you have alternative commercially viable courses or schools that better suit your background.
              </p>
            </div>
          </div>

          {/* Status Section */}
          <div className="bg-red-600 text-white p-6 rounded-lg flex items-center gap-4">
            <Clock size={24} />
            <span className="font-semibold">Not Completed</span>
          </div>

          {/* Schools Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">RECOMMENDED SCHOOLS</h3>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                University of Liverpool
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                University of Calgary
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
