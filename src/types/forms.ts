import { z } from "zod";

export const schoolFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  applicationFee: z.enum(["Yes", "No"]),
  applicationFeeAmount: z.string().optional(),
  schoolApplicationUrl: z.string().url("Please enter a valid URL"),
  dateApplicationSubmittal: z.string(),
  sessionTimeline: z.string().min(1, "Session timeline is required"),
});

export type SchoolFormData = z.infer<typeof schoolFormSchema>;

export type AdmissionStatusPayload = {
  university: string;
  course: string;
  status: "Admitted" | "Declined";
  university_number: "1" | "2";
};