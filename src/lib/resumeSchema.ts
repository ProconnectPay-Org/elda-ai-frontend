import { z } from "zod";

export const ResumeStep1Schema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  country: z.string().nonempty("Country is required"),
  coreSkills: z.string().nonempty("Core skills are required"),
  profession: z.string().nonempty("Profession is required"),
});

export const ResumeStep2Schema = z.object({
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z
    .string()
    .nonempty("Date of birth is required")
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Invalid date format",
      }
    ),
  nationality: z.string().nonempty("Nationality is required"),
  interest: z.string().nonempty("Interest is required"),
});

export const ResumeStep3Schema = z.object({
  kindOfDegree: z.string().nonempty("Kind of degree is required"),
  tertiaryInstitutionAttended: z
    .string()
    .nonempty("Tertiary institution attended is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  course: z.string().nonempty("Course is required"),
  country: z.string().nonempty("Country is required"),
  startDate: z
    .string()
    .nonempty("Start date is required")
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Invalid date format",
      }
    ),
  endDate: z
    .string()
    .nonempty("End date is required")
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Invalid date format",
      }
    ),
});

export const ResumeStep4Schema = z.object({
  nameOfCompany: z.string().nonempty("Name of company is required"),
  typeOfCompany: z.string().nonempty("Type of company is required"),
  jobTitle: z.string().nonempty("Job title is required"),
  companyDescription: z.string().nonempty("Company description is required"),
  mode: z.string().nonempty("Mode is required"),
  location: z.string().nonempty("Location is required"),
  startDate: z
    .string()
    .nonempty("Start date is required")
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Invalid date format",
      }
    ),
  endDate: z
    .string()
    .nonempty("End date is required")
    .refine(
      (date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
      },
      {
        message: "Invalid date format",
      }
    ),
});

export const ResumeStep5Schema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});
