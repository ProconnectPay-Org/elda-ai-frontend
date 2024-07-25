import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import CustomInput from "./CustomInput";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodSchema } from "zod";
import { useState } from "react";
import TwoFactorDialog from "./TwoFactorDialog";

const ProfileTabs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formSchema = (): ZodSchema => {
    return z.object({
      email: z.string().email(),
      gender: z.string().min(2),
    });
  };

  const schema = formSchema();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      gender: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);

    try {
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full flex flex-col gap-7">
      <TabsList className="w-full bg-transparent justify-between items-center p-0">
        <div className="space-x-8">
          <TabsTrigger
            value="all"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-semibold text-2xl border-0 border-transparent"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="assigned"
            className="data-[state=active]:border-b-4 rounded-none shadow-none font-semibold text-2xl border-0 border-transparent"
          >
            Assigned
          </TabsTrigger>
        </div>
        <div className="space-x-4">
          <Button className="h-12 border-red text-red" variant="outline">
            Cancel
          </Button>
          <Button className="h-12 text-white bg-red">Save</Button>
        </div>
      </TabsList>
      <div>
        <TabsContent value="all" className="w-full bg-gray p-8 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-4 w-full justify-between">
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

              <div className="flex gap-4 w-full justify-between">
                <CustomInput
                  control={form.control}
                  name="dob"
                  label="Date of Birth"
                  placeholder="Enter your email"
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
              <div className="flex gap-4 w-full justify-between">
                <CustomInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="joy@proconnectpay@gmail.com"
                  className="w-full"
                />

                <CustomInput
                  control={form.control}
                  name="jobs"
                  label="Number of Assigned job so far"
                  placeholder="20"
                  className="w-full"
                />
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="assigned" className="space-y-10">
          <div className="w-full bg-gray p-8 rounded-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex gap-4 w-full justify-between">
                  <CustomInput
                    control={form.control}
                    name="fullName"
                    label="Current Password"
                    placeholder=""
                    className="w-1/2"
                  />
                </div>

                <div className="flex gap-4 w-full justify-between">
                  <CustomInput
                    control={form.control}
                    name="dob"
                    label="New Password"
                    placeholder=""
                    className="w-full"
                  />

                  <CustomInput
                    control={form.control}
                    name="phoneNumber"
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
