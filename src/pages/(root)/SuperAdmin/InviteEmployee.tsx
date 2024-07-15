import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Mail from "@/assets/mail.png";

const InviteEmployee = () => {
  return (
    <AdminLayout>
      <div className="flex items-start gap-24 px-32">
        <Link to="/admin-dashboard">
          <div className="w-16 cursor-pointer relative">
            <ChevronLeftIcon color="red" />
            <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
          </div>
        </Link>
        <div className="flex flex-col items-start justify-center w-[76%]">
          <h2 className="text-red text-3xl font-bold text-center w-full mb-10">
            Invite Employee
          </h2>

          {/* INPUT FIELDS */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="email">
                Email <span className="text-red">*</span>
              </label>
              <div className="flex border border-gray-border w-full justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Mail} alt="mail icon" />
                <input
                  className="border-none w-full focus:outline-none"
                  id="email"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="fullName">Full Name</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="fullName"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
          </div>

          <Link to="/admin/assign-candidate" className="w-full mt-10">
            <Button className="bg-red w-full h-12 text-lg">
              Send Invite
            </Button>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InviteEmployee;
