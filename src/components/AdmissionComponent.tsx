import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdmissionStatus,
  submitAdmissionStatus,
  updateAdmissionStatus,
} from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { sortedSchools } from "@/constants";

// Schema
const admissionStatusSchema = z.object({
  university1: z.string().min(1, "Please select a university"),
  course1: z.string().min(1, "Please enter a course"),
  status1: z.enum(["approved", "declined", "pending"]),
  university2: z.string().min(1, "Please select a university"),
  course2: z.string().min(1, "Please enter a course"),
  status2: z.enum(["approved", "declined", "pending"]),
});

type AdmissionStatusForm = z.infer<typeof admissionStatusSchema>;

const mapBackendToFrontend = (data: any[]): AdmissionStatusForm => {
  const uni1 = data.find((item) => item.university_number === "1") || {};
  const uni2 = data.find((item) => item.university_number === "2") || {};

  return {
    university1: uni1.university || "",
    course1: uni1.course || "",
    status1: (uni1.status as "approved" | "declined" | "pending") || "pending",
    university2: uni2.university || "",
    course2: uni2.course || "",
    status2: (uni2.status as "approved" | "declined" | "pending") || "pending",
  };
};

const AdmissionComponent = ({ id }: { id: string }) => {
  const {
    register,
    control,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<AdmissionStatusForm>({
    resolver: zodResolver(admissionStatusSchema),
    defaultValues: {
      university1: "",
      course1: "",
      status1: "pending",
      university2: "",
      course2: "",
      status2: "pending",
    },
  });

  const [university1Id, setUniversity1Id] = useState<string | null>(null);
  const [university2Id, setUniversity2Id] = useState<string | null>(null);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admissionStatus", id],
    queryFn: () => getAdmissionStatus(id),
  });

  useEffect(() => {
    if (data) {
      reset(mapBackendToFrontend(data));

      const uni1 = data.find((item: any) => item.university_number === "1");
      const uni2 = data.find((item: any) => item.university_number === "2");

      if (uni1) setUniversity1Id(uni1.id);
      if (uni2) setUniversity2Id(uni2.id);
    }
  }, [data, reset]);

  const handleUniversitySubmit = async (
    number: "1" | "2",
    universityId: string | null,
    buttonId: string
  ) => {
    setLoadingButton(buttonId);

    const fieldPrefix = number === "1" ? "university1" : "university2";

    const isValid = await trigger([
      `${fieldPrefix}` as keyof AdmissionStatusForm,
      `course${number}` as keyof AdmissionStatusForm,
      `status${number}` as keyof AdmissionStatusForm,
    ]);

    if (!isValid) {
      setLoadingButton(null);
      return;
    }

    const values = getValues();

    const payload = {
      university: values[`university${number}`],
      course: values[`course${number}`],
      status: values[`status${number}`],
      university_number: number,
    };

    try {
      if (universityId) {
        await updateAdmissionStatus(id, universityId, payload);
      } else {
        const res = await submitAdmissionStatus(id, payload);
        if (number === "1") setUniversity1Id(res.id);
        else setUniversity2Id(res.id);
      }

      toast({
        title: "Success",
        description: "Admission Status Updated Successfully",
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["admissionStatus"] });
    } catch (error) {
      console.error(error);
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
          <>
            <form className="space-y-8">
              {([1, 2] as const).map((num) => (
                <div key={num} className="space-y-4">
                  <Label className="text-lg font-semibold">
                    University {num}
                  </Label>

                  <div className="space-y-2">
                    <Label>University</Label>
                    <Controller
                      name={`university${num}` as const}
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={
                              errors[`university${num}`] ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Select University" />
                          </SelectTrigger>
                          <SelectContent>
                            {sortedSchools.map((school) => (
                              <SelectItem key={school.name} value={school.name}>
                                {school.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors[`university${num}`] && (
                      <p className="text-sm font-medium text-destructive">
                        {errors[`university${num}`]?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Course</Label>
                    <Input
                      {...register(`course${num}`)}
                      className={errors[`course${num}`] ? "border-red-500" : ""}
                    />
                    {errors[`course${num}`] && (
                      <p className="text-sm font-medium text-destructive">
                        {errors[`course${num}`]?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4 justify-end mt-2">
                    {["pending", "declined", "approved"].map((status) => (
                      <Button
                        key={status}
                        type="button"
                        variant="outline"
                        disabled={loadingButton === `${status}-${num}`}
                        onClick={async () => {
                          // Set the status value manually
                          const fieldName =
                            `status${num}` as keyof AdmissionStatusForm;
                          reset((prev) => ({
                            ...prev,
                            [fieldName]: status as any,
                          }));

                          await handleUniversitySubmit(
                            String(num) as "1" | "2",
                            num === 1 ? university1Id : university2Id,
                            `${status}-${num}`
                          );
                        }}
                        className={`${
                          getValues(
                            `status${num}` as keyof AdmissionStatusForm
                          ) === status
                            ? status === "approved"
                              ? "bg-green-500 text-white"
                              : status === "declined"
                              ? "bg-red text-white"
                              : "bg-orange text-white"
                            : ""
                        }`}
                      >
                        {loadingButton === `${status}-${num}`
                          ? "Submitting..."
                          : status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </form>
          </>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionComponent;
