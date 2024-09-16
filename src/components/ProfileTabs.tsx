import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import CustomInput from "./CustomInput";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import TwoFactorDialog from "./TwoFactorDialog";

const ProfileTabs = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formSchema = () => {
    return z.object({
      email: z.string().email(),
      gender: z.string().min(2),
      fullName: z.string(),
      dateOfBirth: z.string(),
      phoneNumber: z.string(),
      numberOfJobs: z.string(),
      currentPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    });
  };

  const schema = formSchema();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      gender: "",
      fullName: "",
      dateOfBirth: "",
      phoneNumber: "",
      numberOfJobs: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log(data);
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full flex flex-col gap-7">
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
          <Button className="h-12 w-full md:max-w-fit text-white bg-red">
            Save
          </Button>
        </div>
      </TabsList>
      <div>
        <TabsContent
          value="all"
          className="w-full bg-gray p-4 md:p-8 rounded-2xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                <CustomInput
                  control={form.control}
                  name="fullName"
                  label="Full Name"
                  placeholder="Peter"
                  className="w-full"
                />
                <CustomInput
                  control={form.control}
                  name="gender"
                  label="Gender"
                  placeholder="Female"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                <CustomInput
                  control={form.control}
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Enter your date of birth"
                  className="w-full"
                />

                <CustomInput
                  control={form.control}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="08122983232"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="joy@proconnectpay@gmail.com"
                  className="w-full"
                />

                <CustomInput
                  control={form.control}
                  name="numberOfJobs"
                  label="Number of Assigned jobs so far"
                  placeholder="20"
                  className="w-full"
                />
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="assigned" className="space-y-10">
          <div className="w-full bg-gray p-4 md:p-8 rounded-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                  <CustomInput
                    control={form.control}
                    name="currentPassword"
                    label="Current Password"
                    placeholder=""
                    className="w-full md:w-1/2"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
                  <CustomInput
                    control={form.control}
                    name="newPassword"
                    label="New Password"
                    placeholder=""
                    className="w-full"
                  />

                  <CustomInput
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder=""
                    className="w-full"
                  />
                </div>
              </form>
            </Form>
          </div>
          <Button className="bg-red h-11" onClick={() => setIsDialogOpen(true)}>
            Step Two-factor Authentication
          </Button>

          {isDialogOpen && (
            <TwoFactorDialog
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            />
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
