/* eslint-disable no-unused-vars */

import {
  ResumeStep1Schema,
  ResumeStep2Schema,
  ResumeStep3Schema,
  ResumeStep4Schema,
  ResumeStep5Schema,
} from "@/lib/resumeSchema";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "@/lib/utils";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

declare type CandidateLayoutProps = {
  children: React.ReactNode;
};

declare type signInProps = {
  email: string;
  password: string;
};

declare type CreateCandidateProfileProps = {
  email: string;
  password?: string;
  full_name?: string;
  role: "candidate" | "admin" | "staff";
};

interface Profile {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  preferred_call_name: string;
  previous_first_name: string | null;
  previous_last_name: string | null;
  gender: string;
  birth_date: string | null;
  city_of_birth: string;
  state_of_birth: string;
  country_of_birth: string;
  phone_number: string;
  country_current_reside: string;
  state_current_reside: string;
  city_current_reside: string;
  current_house_address: string;
  postal_code: string;
  bio: string;
  user: number;
}

export interface OptionType {
  value: string;
  label: string;
}

export interface CandidateData {
  serialNumber: number;
  full_name: string;
  country: string;
  assigned_university: string;
  assigned_course: string;
  school_application_status: string;
  resume_status: string;
  sop_status: string;
  duplicate: string;
  assigned: boolean;
}

declare type UserType = {
  id: number;
  email: string;
  role: "candidate" | "staff" | "admin";
  profile: Profile;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type OptionType = {
  value: string;
  label: string;
};

interface User {
  id: number | string;
  token?: string;
  email?: string;
  full_name?: string;
  country?: string;
  role: "candidate" | "staff" | "admin";
  isLoggedIn?: boolean;
  groups: string[] | any[];
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  last_login: Date | null;
  password?: string;
  user_permissions: string[] | any[]; 
}

declare type DottedBoxProps = {
  docType: string;
  icon: string;
  href: string; // Optional onClick function
  className: string;
};

declare type SmallBoxProps = {
  name: string;
  icon: string;
  number: number; // Optional onClick function
};

declare type NotificationProps = {
  title: string;
  icon: string;
  text: string;
  date: string;
};

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

declare interface SiderbarProps {
  user: User;
}

declare interface ResumeFormData {
  city: string;
  companyDescription: string;
  coreSkills: string;
  country: string;
  course: string;
  dateOfBirth: string;
  email: string;
  endDate: string;
  fullName: string;
  gender: string;
  interest: string;
  jobTitle: string;
  kindOfDegree: string;
  location: string;
  mode: string;
  nameOfCompany: string;
  nationality: string;
  phoneNumber: string;
  profession: string;
  prompt: string;
  startDate: string;
  state: string;
  tertiaryInstitutionAttended: string;
  typeOfCompany: string;
}

// validationSchemas.ts
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
// Define types for other steps similarly
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;

export type FormData = Step1FormData &
  Step2FormData &
  Step3FormData &
  Step4FormData &
  Step5FormData;

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  email: string;
  serialNumber: number;
  name: string;
  recommendedSchool: string;
  recommendedCourse: string;
  resume: string;
  sop: string;
  schoolApplicationStarted: string;
  schoolApplicationCompleted: string;
  status: string;
  phone: string;
};

declare interface AllCandidates {
  assigned_university: string;
  assigned_course: string;
  sop_status?: string;
  resume_status?: string;
  school_application_status?: string;
  assigned: boolean;
  duplicate?: string;
  // Add missing fields
  serialNumber?: number;
  user?: User;
}

declare interface AllCandidatesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AllCandidates[];
}

declare interface AllStaff {
  full_name: string;
  status?: string;
  assigned_candidates?: number | string;
  permission?: string;
  serialNumber?: number;
  user?: User;
}

declare interface AllStaffResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AllStaff[];
}

export type AllColumn = {
  id: string;
  serialNumber: number;
  candidateName: string;
  country: string;
  assignedCourse: string;
  assignedUniversity: string;
  schoolApplicationStatus: string;
  resumeStatus: string;
  sopStatus: string;
  duplicate: string;
};

export type TeamMemberColumn = {
  id: string;
  fullName: string;
  staffStatus: string;
  assignedCandidates: string;
  permission: string;
  deleteAccount: string;
};

// ResumevalidationSchemas.ts
export type ResumeStep1FormData = z.infer<typeof ResumeStep1Schema>;
export type ResumeStep2FormData = z.infer<typeof ResumeStep2Schema>;
export type ResumeStep3FormData = z.infer<typeof ResumeStep3Schema>;
export type ResumeStep4FormData = z.infer<typeof ResumeStep4Schema>;
export type ResumeStep5FormData = z.infer<typeof ResumeStep5Schema>;
