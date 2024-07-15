import SetingsSideBar from "@/components/SetingsSideBar";
import TwoFactorDialog from "@/components/TwoFactorDialog";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import Lock from "../../../assets/lock-light.svg";
import Pen from "../../../assets/pen.svg";

const AdminSecurity = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <AdminLayout>
      <div className="flex items-start gap-12">
        <SetingsSideBar />

        <div className="flex flex-col gap-6 w-full">
          <p className="text-[#273240] font-bold">Personal Information</p>

          {/* Inout fields */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="password">Current Password</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Lock} alt="lock" />
                <input
                  className="border-none w-full focus:outline-none"
                  id="password"
                />
                <img src={Pen} alt="pen" />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="newpassword">New Password</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Lock} alt="lock" />
                <input
                  className="border-none w-full focus:outline-none"
                  id="newpassword"
                />
                <img src={Pen} alt="pen" />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="repeatpassword">Repeat Password</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Lock} alt="lock" />
                <input
                  className="border-none w-full focus:outline-none"
                  id="repeatpassword"
                />
                <img src={Pen} alt="pen" />
              </div>
            </div>
          </div>

          <Button
            className="bg-red w-[280px] h-[44px]"
            onClick={() => setIsDialogOpen(true)}
          >
            Two Factor Authentication
          </Button>

          {isDialogOpen && (
            <TwoFactorDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSecurity;
