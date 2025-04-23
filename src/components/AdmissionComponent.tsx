import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAdmissionStatus,
  submitAdmissionStatus,
  updateAdmissionStatus,
} from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { sortedSchools } from "@/constants";

const admissionStatusSchema = z.object({
  university1: z.string().min(1, "Please select a university"),
  course1: z.string().min(1, "Please select a course"),
  status1: z.enum(["Admitted", "Declined"]),
  university2: z.string().min(1, "Please select a university"),
  course2: z.string().min(1, "Please select a course"),
  status2: z.enum(["Admitted", "Declined"]),
});

type AdmissionStatusForm = z.infer<typeof admissionStatusSchema>;

const AdmissionComponent = ({ id }: { id: string }) => {
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

  const [university1Id, setUniversity1Id] = useState<string | null>(null);
  const [university2Id, setUniversity2Id] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState<null | string>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admissionStatus", id],
    queryFn: () => getAdmissionStatus(id!),
  });

  useEffect(() => {
    if (!data) return;

    const uni1 = data.find((item: any) => item.university_number === "1");
    const uni2 = data.find((item: any) => item.university_number === "2");

    if (uni1) {
      form.setValue("university1", uni1.university);
      form.setValue("course1", uni1.course);
      form.setValue("status1", uni1.status);
      setUniversity1Id(uni1.id);
    }

    if (uni2) {
      form.setValue("university2", uni2.university);
      form.setValue("course2", uni2.course);
      form.setValue("status2", uni2.status);
      setUniversity2Id(uni2.id);
    }
  }, [data, form]);

  const handleUniversitySubmit = async (
    number: "1" | "2",
    universityId: string | null,
    buttonId: string
  ) => {
    setLoadingButton(buttonId);

    const fieldPrefix = number === "1" ? "university1" : "university2";
    const isValid = await form.trigger([
      `${fieldPrefix}` as keyof AdmissionStatusForm,
      `course${number}` as keyof AdmissionStatusForm,
      `status${number}` as keyof AdmissionStatusForm,
    ]);

    if (!isValid) {
      setLoadingButton(null);
      return;
    }

    const values = form.getValues();
    const payload = {
      university: values[`university${number}`],
      course: values[`course${number}`],
      status: values[`status${number}`],
      university_number: number,
    };

    try {
      if (universityId) {
        await updateAdmissionStatus(id!, universityId, payload);
        toast({
          title: "Success",
          description: "Admission Status Updated Successfully",
          variant: "success",
        });
      } else {
        const res = await submitAdmissionStatus(id!, payload);
        if (number === "1") setUniversity1Id(res.id);
        else setUniversity2Id(res.id);
        toast({
          title: "Success",
          description: "Admission Status Updated Successfully",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoadingButton(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load admission status.</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admission Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">University 1</Label>
                  {/* <Select
                    onValueChange={(value) =>
                      form.setValue("university1", value)
                    }
                    value={form.getValues("university1")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select University" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortedSchools.map((school) => (
                        <SelectItem value={school.name} key={school.name}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
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
                      disabled={loadingButton === "decline-1"}
                      onClick={async () => {
                        form.setValue("status1", "Declined");
                        await handleUniversitySubmit(
                          "1",
                          university1Id,
                          "decline-1"
                        );
                      }}
                    >
                      {loadingButton === "decline-1"
                        ? "Submitting..."
                        : "Declined"}
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      disabled={loadingButton === "admit-1"}
                      onClick={async () => {
                        form.setValue("status1", "Admitted");
                        await handleUniversitySubmit(
                          "1",
                          university1Id,
                          "admit-1"
                        );
                      }}
                    >
                      {loadingButton === "admit-1"
                        ? "Submitting..."
                        : "Admitted"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">University 2</Label>
                  {/* <Select
                    onValueChange={(value) =>
                      form.setValue("university1", value)
                    }
                    value={form.getValues("university1")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select University" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortedSchools.map((school) => (
                        <SelectItem value={school.name} key={school.name}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
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
                      disabled={loadingButton === "decline-2"}
                      onClick={async () => {
                        form.setValue("status2", "Declined");
                        await handleUniversitySubmit(
                          "2",
                          university2Id,
                          "decline-2"
                        );
                      }}
                    >
                      {loadingButton === "decline-2"
                        ? "Submitting..."
                        : "Declined"}
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      disabled={loadingButton === "admit-2"}
                      onClick={async () => {
                        form.setValue("status2", "Admitted");
                        await handleUniversitySubmit(
                          "2",
                          university2Id,
                          "admit-2"
                        );
                      }}
                    >
                      {loadingButton === "admit-2"
                        ? "Submitting..."
                        : "Admitted"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionComponent;
