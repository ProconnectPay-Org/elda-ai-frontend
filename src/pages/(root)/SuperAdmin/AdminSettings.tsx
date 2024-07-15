import SetingsSideBar from "@/components/SetingsSideBar";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import DeleteIcon from "../../../assets/Delete.svg";
import Pen from "../../../assets/pen.svg";
import NameIcon from "../../../assets/name-icon.svg";
import Mail from "../../../assets/mail.png";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";

const AdminSettings = () => {
  const { loggedInUser } = useAuth();

  return (
    <AdminLayout>
      <div className="flex items-start gap-12">
        <SetingsSideBar />

        <div className="flex flex-col justify-between min-h-[70vh] w-full md:w-[60%]">
          <div className="flex flex-col gap-6">
            <p className="text-[#273240] font-bold">Personal Information</p>

            {/* IMAGE AND PROFILE */}
            <div className="flex items-end gap-4">
              <div className="relative rounded-full w-[150px] h-[150px] flex items-center justify-center bg-pale-bg">
                {loggedInUser && (
                  <Avatar className="rounded-none w-full overflow-visible h-full">
                    <AvatarImage className="rounded-full" src="https://github.com/shadcn.png" />
                    <AvatarFallback className="font-bold text-[72px] bg-transparent text-red">
                      {getInitials(loggedInUser?.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex items-center justify-center flex-col gap-2">
                <Button className="bg-red">Upload an Image</Button>
                <p className="hover:underline cursor-pointer text-red">
                  Remove photo
                </p>
              </div>
            </div>

            {/* Inout fields */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col w-full gap-1.5">
                <label htmlFor="fullName">Full Name</label>
                <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                  <img src={NameIcon} alt="profile icon" />
                  <input
                    className="border-none w-full focus:outline-none"
                    id="fullName"
                    placeholder="Enter your full name"
                  />
                  <img src={Pen} alt="pen" />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1.5">
                <label htmlFor="email">Email Address</label>
                <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                  <img src={Mail} alt="mail icon" />
                  <input
                    className="border-none w-full focus:outline-none"
                    id="email"
                    placeholder="Enter your email address"
                  />

                  <img src={Pen} alt="pen" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Button className="bg-red flex items-center gap-2">
              <img src={DeleteIcon} alt="delete icon" /> Delete your super admin
              account
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
