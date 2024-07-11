import SetingsSideBar from "@/components/SetingsSideBar";
import TwoFactorDialog from "@/components/TwoFactorDialog";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";

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
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="password"
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="newpassword">New Password</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="newpassword"
              />
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="repeatpassword">Repeat Password</label>
              <input
                className="border border-gray-border rounded-md py-2 px-4"
                id="repeatpassword"
              />
            </div>
          </div>

          <Button
            className="bg-red w-[280px] h-[44px]"
            onClick={() => setIsDialogOpen(true)}
          >
            Two Factor Authentication
          </Button>

          {isDialogOpen && <TwoFactorDialog />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSecurity;
