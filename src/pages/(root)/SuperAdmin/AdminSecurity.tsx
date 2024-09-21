import SetingsSideBar from "@/components/SetingsSideBar";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
import Lock from "../../../assets/lock-light.svg";
import SettingsTabs from "@/components/SettingsTabs";
import { updatePassword } from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";

const AdminSecurity = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSave = async () => {
    if (!oldPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "New password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== repeatPassword) {
      toast({
        title: "Error",
        description: "New password and repeat password do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await updatePassword({
        old_password: oldPassword,
        new_password: newPassword,
        re_new_password: repeatPassword,
      });

      if (response) {
        toast({
          title: "Success",
          description: "Password updated successfully.",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-start gap-12">
        <SetingsSideBar />

        <div className="flex flex-col gap-6 w-full">
          <SettingsTabs />
          <p className="text-[#1d406e] font-bold">Security Information</p>

          {/* Input fields */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Lock} alt="lock" />
                <input
                  type="password"
                  className="border-none w-full focus:outline-none"
                  id="currentPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="newPassword">New Password</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Lock} alt="lock" />
                <input
                  type="password"
                  className="border-none w-full focus:outline-none"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Lock} alt="lock" />
                <input
                  type="password"
                  className="border-none w-full focus:outline-none"
                  id="repeatPassword"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex justify-end">
              <Button className="bg-red" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSecurity;
