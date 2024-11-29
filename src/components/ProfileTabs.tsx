import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TwoFactorDialog from "./TwoFactorDialog";
import useStaffDetails from "@/hooks/useStaffDetails";
import useAuth from "@/hooks/useAuth";
import { updatePassword } from "@/lib/actions/user.actions";
import { PasswordProps } from "@/types";
import { useToast } from "./ui/use-toast";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { loggedInUser } = useAuth();
  const { loggedInStaff } = useStaffDetails();
  const { toast } = useToast();

  // Form for "My Details"
  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    formState: { errors: errorsDetails },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      numberOfJobs: "",
    },
  });

  interface DetailsFormType {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    numberOfJobs: string;
  }

  useEffect(() => {
    if (loggedInStaff) {
      setValue(
        "numberOfJobs",
        String(loggedInStaff.number_of_assigned_candidates) || ""
      );
    }
    if (loggedInUser) {
      setValue("fullName", loggedInUser.full_name || "");
      setValue("email", loggedInUser.email || "");
    }
  });

  const onSubmitDetails = async (data: DetailsFormType) => {
    try {
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Form for "Password"
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
      re_new_password: "",
    },
  });

  const onSubmitPassword = async (data: PasswordProps) => {
    try {
      const response = await updatePassword(data);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error(
          "Failed to update password:",
          error.response.data.non_field_errors[0]
        );
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    }
  };

  const handleSave = () => {
    if (activeTab === "all") {
      handleSubmitDetails(onSubmitDetails)();
    } else if (activeTab === "assigned") {
      handleSubmitPassword(onSubmitPassword)();
    }
  };

  return (
    <Tabs
      defaultValue="all"
      className="w-full flex flex-col gap-7"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="w-full bg-transparent flex-col md:flex-row h-full space-y-4 md:space-y-0 md:justify-between items-center p-0">
        <div className="space-x-8 flex">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-semibold text-xl md:text-2xl border-0 border-transparent"
          >
            My Details
          </TabsTrigger>
          <TabsTrigger
            value="assigned"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-semibold text-xl md:text-2xl border-0 border-transparent"
          >
            Password
          </TabsTrigger>
        </div>
        <div className="space-x-4 flex w-full md:w-fit">
          <Button
            className="h-12 w-full md:max-w-fit border-red text-red"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="h-12 w-full md:max-w-fit text-white bg-red"
          >
            Save
          </Button>
        </div>
      </TabsList>
      <div>
        {/* My Details Form */}
        <TabsContent
          value="all"
          className="w-full bg-gray p-4 md:p-8 rounded-2xl"
        >
          <form className="space-y-4 md:space-y-8">
            <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
              <div className="w-full">
                <label>Full Name</label>
                <input
                  {...registerDetails("fullName", {
                    required: activeTab === "all" && "Full Name is required",
                  })}
                  placeholder="Peter"
                  className="w-full p-2 rounded-md"
                />
                {errorsDetails.fullName && (
                  <p className="text-red text-sm">
                    {errorsDetails.fullName.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label>Gender</label>
                <input
                  {...registerDetails("gender", {
                    required: activeTab === "all" && "Gender is required",
                  })}
                  placeholder="Female"
                  className="w-full p-2 rounded-md"
                />
                {errorsDetails.gender && (
                  <p className="text-red text-sm">
                    {errorsDetails.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
              <div className="w-full">
                <label>Date of Birth</label>
                <input
                  {...registerDetails("dateOfBirth", {
                    required:
                      activeTab === "all" && "Date of Birth is required",
                  })}
                  placeholder="Enter your date of birth"
                  className="w-full p-2 rounded-md"
                />
                {errorsDetails.dateOfBirth && (
                  <p className="text-red text-sm">
                    {errorsDetails.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label>Phone Number</label>
                <input
                  {...registerDetails("phoneNumber", {
                    required: activeTab === "all" && "Phone Number is required",
                  })}
                  placeholder="08122983232"
                  className="w-full p-2 rounded-md"
                />
                {errorsDetails.phoneNumber && (
                  <p className="text-red text-sm">
                    {errorsDetails.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
              <div className="w-full">
                <label>Email</label>
                <input
                  {...registerDetails("email", {
                    required: activeTab === "all" && "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="joy@proconnectpay@gmail.com"
                  className="w-full p-2 rounded-md"
                />
                {errorsDetails.email && (
                  <p className="text-red text-sm">
                    {errorsDetails.email.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <label>Number of Assigned Jobs so far</label>
                <input
                  {...registerDetails("numberOfJobs", {
                    required:
                      activeTab === "all" && "Number of jobs is required",
                  })}
                  placeholder="20"
                  className="w-full p-2 rounded-md"
                />
                {errorsDetails.numberOfJobs && (
                  <p className="text-red text-sm">
                    {errorsDetails.numberOfJobs.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </TabsContent>

        {/* Password Form */}
        <TabsContent value="assigned" className="space-y-10">
          <div className="w-full bg-gray p-4 md:p-8 rounded-2xl">
            <form className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                <div className="w-full md:w-1/2">
                  <label>Current Password</label>
                  <input
                    {...registerPassword("old_password", {
                      required:
                        activeTab === "assigned" &&
                        "Current Password is required",
                    })}
                    type="text"
                    className="w-full p-2 rounded-md"
                  />
                  {errorsPassword.old_password && (
                    <p className="text-red text-sm">
                      {errorsPassword.old_password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                <div className="w-full">
                  <label>New Password</label>
                  <input
                    {...registerPassword("new_password", {
                      required:
                        activeTab === "assigned" && "New Password is required",
                    })}
                    type="text"
                    className="w-full p-2 rounded-md"
                  />
                  {errorsPassword.new_password && (
                    <p className="text-red text-sm">
                      {errorsPassword.new_password.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label>Confirm Password</label>
                  <input
                    {...registerPassword("re_new_password", {
                      required:
                        activeTab === "assigned" &&
                        "Confirm Password is required",
                    })}
                    type="text"
                    className="w-full p-2 rounded-md"
                  />
                  {errorsPassword.re_new_password && (
                    <p className="text-red text-sm">
                      {errorsPassword.re_new_password.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </TabsContent>
      </div>
      <TwoFactorDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </Tabs>
  );
};

export default ProfileTabs;
