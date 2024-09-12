import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Mail from "@/assets/mail.png";

const InviteEmployee = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col mx-auto gap-12 lg:max-w-[800px]">
        <div className="flex items-center">
          <Link to="/admin-dashboard">
            <ArrowLeftIcon color="red" className="cursor-pointer" />
          </Link>
          <h2 className="text-red text-2xl md:text-3xl font-bold text-center w-full">
            Invite Employee
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
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
            <Button className="bg-red w-full h-12 text-lg">Send Invite</Button>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InviteEmployee;
