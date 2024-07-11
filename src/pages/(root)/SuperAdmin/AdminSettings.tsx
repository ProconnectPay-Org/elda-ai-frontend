import SetingsSideBar from "@/components/SetingsSideBar";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="flex items-start gap-12">
       <SetingsSideBar />

        <div className="flex flex-col justify-between min-h-[70vh] w-full">
          <div className="flex flex-col gap-6">
            <p className="text-[#273240] font-bold">Personal Information</p>

            {/* IMAGE AND PROFILE */}
            <div className="flex items-end gap-4">
              <div className="relative rounded-full w-[150px] h-[150px] bg-pale-bg"></div>
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
                <input
                  className="border border-gray-border rounded-md py-2 px-4"
                  id="fullName"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="flex flex-col w-full gap-1.5">
                <label htmlFor="email">Email Address</label>
                <input
                  className="border border-gray-border rounded-md py-2 px-4"
                  id="email"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </div>

          <div>
            <Button className="bg-red">Delete your super admin account</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
