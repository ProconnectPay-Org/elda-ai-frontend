import { useEffect, useState } from "react";
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
import SettingsTabs from "@/components/SettingsTabs";
import { updateUsers } from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { loggedInUser, isLoading } = useAuth();

  const [isChanging, setIsChanging] = useState(false);
  const [isEditing, setIsEditing] = useState({
    fullName: false,
    email: false,
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  useEffect(() => {
    if (loggedInUser) {
      setFullName(loggedInUser.full_name);
      setEmail(loggedInUser.email);
    }
  }, [loggedInUser]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarImage(imageUrl);
      // Optionally, you can handle the file upload to your server here
    }
  };

  const handleSave = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || fullName.split(" ").length < 2) {
      toast({
        title: "Error",
        description: "Please enter a valid full name (first and last name).",
        variant: "destructive",
      });
      return;
    }

    if (!email || !emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsChanging(true);
      const response = await updateUsers({
        email,
        full_name: fullName,
      });

      if (response) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "success",
        });
      } else {
        console.error("Error updating profile");
        toast({
          title: "Error",
          description: "Custom user with this email address already exists",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsChanging(false);
    }
  };

  const toggleEdit = (field: "fullName" | "email") => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <AdminLayout>
      <div className="flex items-start gap-12">
        <SetingsSideBar />
        <div className="flex flex-col justify-between min-h-[70vh] w-full md:w-[60%]">
          <SettingsTabs />
          {isLoading ? (
            "Loading user's personal information..."
          ) : (
            <>
              <div className="flex flex-col gap-6 mt-5 md:mt-0">
                <p className="text-[#273240] font-bold">Personal Information</p>

                {/* IMAGE AND PROFILE */}
                <div className="flex items-end gap-4">
                  <div className="relative rounded-full w-[150px] h-[150px] flex items-center justify-center bg-pale-bg">
                    <Avatar className="rounded-none w-full overflow-visible h-full">
                      {avatarImage ? (
                        <AvatarImage
                          className="rounded-full"
                          src={avatarImage}
                        />
                      ) : (
                        <AvatarFallback className="font-bold text-[72px] bg-transparent text-red">
                          {getInitials(email)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex items-center justify-center flex-col gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label htmlFor="imageUpload">
                      <Button className="bg-red">Upload an Image</Button>
                    </label>
                    <p className="hover:underline cursor-pointer text-red">
                      Remove photo
                    </p>
                  </div>
                </div>

                {/* Input fields */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col w-full gap-1.5">
                    <label htmlFor="fullName">Full Name</label>
                    <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                      <img src={NameIcon} alt="profile icon" />
                      <input
                        className="border-none w-full focus:outline-none"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={!isEditing.fullName}
                      />
                      <img
                        src={Pen}
                        alt="pen"
                        onClick={() => toggleEdit("fullName")}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-1.5">
                    <label htmlFor="email">Email Address</label>
                    <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                      <img src={Mail} alt="mail icon" />
                      <input
                        className="border-none w-full focus:outline-none"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing.email}
                      />
                      <img
                        src={Pen}
                        alt="pen"
                        onClick={() => toggleEdit("email")}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-5 justify-between">
                <Button
                  onClick={handleSave}
                  disabled={isChanging}
                  className="bg-red w-full md:w-fit"
                >
                  {isChanging ? "Updating Profile..." : "Save Changes"}
                </Button>
                <Button className="bg-red w-full md:w-fit flex items-center gap-2">
                  <img src={DeleteIcon} alt="delete icon" />
                  Delete your super admin account
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
