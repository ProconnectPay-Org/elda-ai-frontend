import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RootLayout from "@/layouts/RootLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const admissionStatusSchema = z.object({
  university1: z.string().min(1, "Please select a university"),
  course1: z.string().min(1, "Please select a course"),
  status1: z.enum(["Admitted", "Declined"]),
  university2: z.string().min(1, "Please select a university"),
  course2: z.string().min(1, "Please select a course"),
  status2: z.enum(["Admitted", "Declined"]),
});

type AdmissionStatusForm = z.infer<typeof admissionStatusSchema>;

export default function AdmissionStatus() {
  const form = useForm<AdmissionStatusForm>({
    resolver: zodResolver(admissionStatusSchema),
    defaultValues: {
      university1: "",
      course1: "",
      status1: "Declined",
      university2: "",
      course2: "",
      status2: "Declined",
    },
  });

  const submitUniversity1 = async () => {
    const isValid = await form.trigger(["university1", "course1", "status1"]);
    if (isValid) {
      const values = form.getValues();
      console.log("University 1 Submission:", {
        university: values.university1,
        course: values.course1,
        status: values.status1,
      });
    }
  };

  const submitUniversity2 = async () => {
    const isValid = await form.trigger(["university2", "course2", "status2"]);
    if (isValid) {
      const values = form.getValues();
      console.log("University 2 Submission:", {
        university: values.university2,
        course: values.course2,
        status: values.status2,
      });
    }
  };

  function onSubmit(data: AdmissionStatusForm) {
    console.log(data);
  }

  return (
    <RootLayout title="Dashboard">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">University 1</Label>
                    <Input type="text" {...form.register("university1")} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Course 1</Label>
                    <Input type="text" {...form.register("course1")} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-4 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={async () => {
                          form.setValue("status1", "Declined");
                          await submitUniversity1();
                        }}
                      >
                        Declined
                      </Button>

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={async () => {
                          form.setValue("status1", "Admitted");
                          await submitUniversity1();
                        }}
                      >
                        Admitted
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">University 2</Label>
                    <Input type="text" {...form.register("university2")} />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Course 2</Label>
                    <Input type="text" {...form.register("course2")} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-4 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={async () => {
                          form.setValue("status2", "Declined");
                          await submitUniversity2();
                        }}
                      >
                        Declined
                      </Button>

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={async () => {
                          form.setValue("status2", "Admitted");
                          await submitUniversity2();
                        }}
                      >
                        Admitted
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  );
}
