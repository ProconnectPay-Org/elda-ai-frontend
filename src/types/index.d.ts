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

declare type PasswordProps = {
  old_password: string;
  new_password: string;
  re_new_password: string;
};

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

interface ErrorResponse {
  detail: string;
}

declare type CustomAxiosError = AxiosError<ErrorResponse>;

declare type CreateCandidateProfileProps = {
  email: string;
  password: string;
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

declare type UserType = {
  id: number;
  email: string;
  role: "candidate" | "staff" | "admin";
  profile: Profile;
};

declare type OptionType = {
  value: number | string;
  label: string;
};

interface User {
  id?: number | string;
  token?: string;
  email: string;
  full_name: string;
  country?: string;
  role: "candidate" | "staff" | "admin";
  isLoggedIn?: boolean;
  groups?: string[] | any[];
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  last_login?: Date | null;
  password?: string;
  user_permissions?: string[] | any[];
}

interface Staff {
  jobs_completed: number;
  jobs_pending: number;
  number_of_assigned_candidates: number;
  staff_candidates: CandidateData[];
}

declare type DottedBoxProps = {
  docType: string;
  icon: string;
  href: string;
  className: string;
};

declare type SmallBoxProps = {
  name: string;
  icon: string;
  number: number;
};

declare type NotificationProps = {
  id?: string | number;
  date: string;
  title: string;
  body: string;
  activity_type: string;
  profile?: string;
};

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
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;

export type FormData = Step1FormData &
  Step2FormData &
  Step3FormData &
  Step4FormData &
  Step5FormData;

declare type Resume = {
  id: number;
  resume: string;
  candidate: number;
};

export type EducationHistory = {
  id: number;
  current_status: string;
  degree_type: string;
  country: string;
  school_name: string;
  specific_course_of_study: string;
  class_of_degree: string;
  specific_cgpa: string | null;
  year_graduated: number | null;
  year_admitted: number | null;
  has_advanced_degree: boolean;
  candidate: number;
};

export type WorkHistory = {
  position: string;
  company: string;
  year: string;
};

export type Sop = {
  id: number;
  text: string;
  file: string;
  candidate: number;
};

export type CareerInterest = {
  id: number;
  name: string;
};

export type CandidateCareer = {
  id: number;
  profession: string;
  sector: string;
  technical_skill: string;
  career_interests: CareerInterest[];
  years_of_experience_post_degree: number;
  years_of_experience_pre_graduation: number;
  jobs_to_show: number;
};

export type JobExperience = {
  id: number;
  business_name: string;
  professional_status: string;
  job_title: string;
  employment_type: string;
  state: string;
  country: string;
  year_started: string;
  company_description: string;
  job_summary: string;
  year_ended: string;
  job_status: string;
  candidate: number;
};

export type LoanReferee = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  relationship: string;
  candidate: number;
};

export type VerificationDocument = {
  id: number;
  bsc_hnd_certificate: string;
  bank_statement: string;
  first_degree_transcript: string | null;
  current_cv: string | null;
  intl_passport: string | null;
  nin_slip: string | null;
  utility_bill: string | null;
  post_graduate_certificate: string | null;
  post_graduate_transcript: string | null;
  candidate: number;
};

export type AdvancedEducation = {
  id: number;
  advanced_degree_type: string;
  graduate_type: string;
  country: string;
  school_name: string;
  class_of_degree: string;
  specific_cgpa: string | null;
  year_graduated: number | null;
  year_admitted: number | null;
  candidate: number;
};

export type CandidateData = {
  id: string;
  user?: User;
  assigned: boolean;
  assigned_course: string;
  assigned_university: string;
  birth_date?: string;
  career_strategic_purpose: string;
  city_current_reside: string;
  city_of_birth: string;
  country_current_reside: string;
  country_of_birth: string;
  date_of_birth: string;
  duplicate?: string;
  email_address: string;
  name: string;
  preferred_call_name: string;
  recommended_school: string;
  recommended_course: string;
  resume: string;
  resume_status?: string;
  gender?: string;
  sop_status?: string;
  serial_number: number;
  school_application_status: "Pending" | "Complete" | "Started";
  state_of_birth: string;
  status: string;
  phone_number: string;
  profession?: string;
  advanced_education: AdvancedEducation[];
  sop: Sop[];
  resume: Resume[];
  education: EducationHistory[];
  career: CandidateCareer[];
  job_experience: JobExperience[];
  loan_referees: LoanReferee[];
  work_history: WorkHistory[];
  verification_documents: VerificationDocument;
  advanced_education: AdvancedEducation[];
};

declare interface AllCandidatesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CandidateData[];
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

declare interface AssignCandidateProps {
  candidate_ids: (number | string)[];
  staff_id: number | string;
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
