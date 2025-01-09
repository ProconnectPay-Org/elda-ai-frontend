import { z } from "zod";

export const ResumeStep1Schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().nonempty("Middle name is required"),
  lastName: z.string().nonempty("Last name is required"),
  preferredName: z.string().nonempty("Preferred name is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  // country: z.string().nonempty("Country is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string(),
  nationality: z.string().nonempty("Nationality is required"),
});

export const ResumeStep2Schema = z.object({});

export const ResumeStep3Schema = z.object({
  kindOfDegree: z.string().nonempty("Kind of degree is required"),
  tertiaryInstitutionAttended: z
    .string()
    .nonempty("Tertiary institution attended is required"),
  // city: z.string().nonempty("City is required"),
  // state: z.string().nonempty("State is required"),
  course: z.string().nonempty("Course is required"),
  country: z.string().nonempty("Country is required"),
  classOfDegree: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const ResumeStep4Schema = z.object({
  profession: z.string().nonempty("Profession is required"),
  jobsToShowcase: z
    .string()
    .min(1, "Must be at least 1")
    .max(1, "Must be no more than 3"),
  interest: z.array(
    z.string().min(2, "Each career interest must be at least 2 characters long")
  ),
  jobExperiences: z.array(
    z.object({
      workPlaceName: z.string().optional(),
      currentProfessionalStatus: z.string().optional(),
      currentJobTitle: z.string().optional(),
      employmentType: z.string().optional(),
      stateLocation: z.string().optional(),
      countryLocation: z.string().optional(),
      startedDate: z.string().optional(),
      endedDate: z.string().optional(),
      jobStatus: z.string().optional(),
      companyDescription: z.string().optional(),
      jobSummary: z.string().optional(),
    })
  ),
});

export const ResumeStep5Schema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
});
