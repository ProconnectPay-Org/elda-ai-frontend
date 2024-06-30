import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  });

export const step1Schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  surname: z.string().nonempty("Surname is required"),
  preferredName: z.string().optional(),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  gender: z.string().nonempty("Gender is required"),
  cityOfBirth: z.string().nonempty("City of birth is required"),
  stateOfBirth: z.string().nonempty("State of birth is required"),
  countryOfBirth: z.string().nonempty("Country of birth is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  countryOfResidence: z.string().nonempty("Country of residence is required"),
  stateOfResidence: z.string().nonempty("State of residence is required"),
  cityOfResidence: z.string().nonempty("City of residence is required"),
  postalAddress: z.string().nonempty("Postal address is required"),
  houseAddress: z.string().nonempty("House address is required"),
});

export const step2Schema = z.object({
  currentStatus: z.string().min(1, "Current status is required"),
  degreeType: z.string().min(1, "Degree type is required"),
  country: z.string().min(1, "Country is required"),
  courseOfStudy: z.string().min(1, "Course of study is required"),
  institutionName: z.string().min(1, "Name of institution is required"),
  degreeClass: z.string().min(1, "Class of degree is required"),
  currentCGPA: z.string().min(1, "Current CGPA is required"),
  yearAdmitted: z.string().min(4, "Year admitted must be a positive integer"),
  yearGraduated: z.string().min(4, "Year graduated must be a positive integer"),
  advancedDegree: z.enum(["yes", "no"]),
});

export const step3Schema = z.object({
  profession: z.string().nonempty("Profession is required"),
  sectorOfProfession: z.string().nonempty("Sector of profession is required"),
  technicalSkill: z.string().nonempty("Technical skill is required"),
  careerInterest: z.string().nonempty("Career interest is required"),
  yearsOfProfessionalExperiencePostFirstDegree: z
    .string()
    .min(1, "Must be a positive number"),
  yearsOfProfessionalExperiencePriorToGraduation: z
    .string()
    .min(1, "Must be a positive number"),
  jobsToShowcase: z.string().min(1, "Must be a positive number"),
  workPlaceName: z.string().nonempty("Name of work place is required"),
  currentProfessionalStatus: z
    .string()
    .nonempty("Current professional status is required"),
  currentJobTitle: z.string().nonempty("Current job title is required"),
  employmentType: z.string().nonempty("Employment type is required"),
  stateLocation: z.string().nonempty("State/Province location is required"),
  countryLocation: z.string().nonempty("Country location is required"),
  startedDate: z.string().nonempty("Start date is required"),
  jobSummary: z.string().nonempty("Job summary is required"),
});

export const step4Schema = z.object({
  referee1fullname: z.string().min(1, "Referee 1 full name is required"),
  referee1email: z.string().email("Invalid email address"),
  referee1phoneNumber: z.string().min(1, "Phone number is required"),
  referee1relationship: z.string().min(1, "Relationship is required"),
  referee2fullname: z.string().min(1, "Referee 2 full name is required"),
  referee2email: z.string().email("Invalid email address"),
  referee2phoneNumber: z.string().min(1, "Phone number is required"),
  referee2relationship: z.string().min(1, "Relationship is required"),
});

export const step5Schema = z.object({
  document1: z.instanceof(File).optional(),
  document2: z.instanceof(File).optional(),
  document3: z.instanceof(File).optional(),
  document4: z.instanceof(File).optional(),
  document5: z.instanceof(File).optional(),
  document6: z.instanceof(File).optional(),
  document7: z.instanceof(File).optional(),
  document8: z.instanceof(File).optional(),
  document9: z.instanceof(File).optional(),
  document10: z.instanceof(File).optional(),
});

export const getErrorMessage = (
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined
): any | undefined => {
  if (!error) return undefined;
  if (typeof error === "string") return error;
  return error.message;
};

// src/utils/clipboardUtils.ts
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

export const getInitials = (name: string) => {
  const nameParts = name.split(" ");
  const initials = nameParts.map((part) => part[0]).join("");
  return initials.toUpperCase();
};
