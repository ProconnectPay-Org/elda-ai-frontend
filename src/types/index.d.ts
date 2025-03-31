/* eslint-disable no-unused-vars */

import {
  ResumeStep1Schema,
  ResumeStep2Schema,
  ResumeStep3Schema,
  ResumeStep4Schema,
  ResumeStep5Schema,
} from "@/lib/resumeSchema";
import {
  acsform1Schema,
  acsform2Schema,
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
  assigned_course1?: string;
  assigned_university1?: string;
  first_country?: string;
  second_country?: string;
  assigned_course2?: string;
  assigned_university2?: string;
  program_type1?: string;
  program_type2?: string;
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
  id: number | string;
  token?: string;
  email: string;
  full_name: string;
  country?: string;
  role: "candidate" | "staff" | "admin" | "analyst";
  isLoggedIn?: boolean;
  groups?: string[];
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  last_login?: Date | null;
  password?: string;
  user_permissions?: string[];
}

interface Staff {
  jobs_completed: number;
  jobs_pending: number;
  number_of_assigned_candidates: number;
  results: CandidateData[];
  count: number;
  previous: string | null;
  next: string | null;
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

// School Form Types
declare interface SchoolFormData {
  username: string;
  password: string;
  applicationFee: "Yes" | "No";
  applicationFeeAmount?: string;
  schoolApplicationUrl: string;
  dateApplicationSubmittal: string;
  sessionTimeline: string;
}
export type Step5FormData = z.infer<typeof step5Schema>;

export type FormData = Step1FormData &
  Step2FormData &
  Step3FormData &
  Step4FormData &
  Step5FormData;

export type OnboardFormData = z.infer<typeof onboardSchema>;

declare type Resume = {
  id: number;
  resume: string;
  candidate: number;
};

export type EducationHistory = {
  id?: number;
  current_status: string;
  degree_type: string;
  country: string;
  school_name: string;
  specific_course_of_study: string;
  class_of_degree: string;
  specific_cgpa: string | null;
  graduation_date: number | null;
  admission_date: number | null;
  has_advanced_degree: boolean;
  candidate: string | undefined;
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

export type SopType = {
  id: string;
  text: string;
};

export type CareerInterest = {
  id: number;
  name: string;
};

export type CandidateCareer = {
  id?: number;
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
  candidate: string | undefined;
};

export type Recommender = {
  id?: number;
  recommender_type: string;
  full_name: string;
  email: string;
  phone_number: string;
  relationship: string;
  organization: string;
  job_title: string;
  candidate: string | undefined;
};

export type LoanReferee = {
  id?: number;
  name: string;
  email: string;
  phone_number: string;
  relationship: string;
  candidate: string | undefined;
};

export type VerificationDocument = {
  id?: number;
  bsc_hnd_certificate: string;
  bank_statement: string;
  first_degree_transcript: string | null;
  current_cv: string | null;
  intl_passport: string | null;
  nin_slip: string | null;
  utility_bill: string | null;
  admission_letter: string | null;
  gre_document: string | null;
  post_graduate_certificate: string | null;
  post_graduate_transcript: string | null;
  passport_photograph: string | null;
  change_of_name_document: string | null;
  candidate: string | undefined;
};

export type AdvancedEducation = {
  id: number;
  advanced_degree_type: string;
  graduate_type: string;
  country: string;
  school_name: string;
  class_of_degree: string;
  specific_cgpa: string | null;
  graduation_date: number | null;
  admission_date: number | null;
  candidate: string | undefined;
};

export type updateCandidateProfile = {
  first_name: string;
  middle_name: string;
  last_name: string;
  preferred_call_name: string;
  gender: string;
  birth_date: string;
  country_of_birth: string;
  city_of_birth: string;
  state_of_birth: string;
  phone_number: string;
  email_address: string;
  country_current_reside: string;
  state_current_reside: string;
  city_current_reside: string;
  current_house_address: string;
  postal_code: string;
};

export type CandidateData = {
  id?: string;
  user?: User;
  user_id?: string;
  assigned: boolean;
  assigned_course: string;
  assigned_course1: string;
  assigned_course2: string;
  assigned_manager: AllStaff[];
  assigned_university: string;
  assigned_university1: string;
  assigned_university2: string;
  birth_date?: string;
  career_strategic_purpose: string;
  city_current_reside: string;
  city_of_birth: string;
  country_current_reside: string;
  country_of_birth: string;
  course_description: string;
  course_description1: string;
  course_description2: string;
  current_house_address?: string;
  date_of_birth: string;
  duplicate?: string;
  email_address: string;
  first_name?: string;
  first_sop?: SopType;
  first_country: string;
  full_name?: string;
  last_name?: string;
  middle_name?: string;
  name: string;
  preferred_call_name: string;
  program_type1: string;
  program_type2: string;
  recommended_school: string;
  recommended_course: string;
  resume: string;
  resume_status?: string;
  gender?: string;
  postal_code?: string;
  second_country: string;
  serial_number: number;
  sop_status?: string;
  sop_status1?: string;
  sop_status2?: string;
  second_sop?: SopType;
  school_application_status: "Pending" | "Complete" | "Started" | "True";
  school_application_status1: "Pending" | "Complete" | "Started" | "True";
  school_application_status2: "Pending" | "Complete" | "Started" | "True";
  state_of_birth: string;
  state_current_reside?: string;
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
  verification_documents: VerificationDocument[];
  advanced_education: AdvancedEducation[];
  recommenders: Recommender[];
};

declare interface AllCandidatesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CandidateData[];
}

declare interface AllStaff {
  assigned_candidates: CandidateData[];
  id: number;
  status?: string;
  user: User;
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

declare interface ReAssignCandidateProps {
  candidate_id: number | string;
  staff_id: number | string;
  new_staff_id?: number | string;
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

export type ComplaintType = {
  complaint: string;
  complaint_status: string;
  complaint_date: string;
  complaint_body?: string;
};

// ResumevalidationSchemas.ts
export type ResumeStep1FormData = z.infer<typeof ResumeStep1Schema>;
export type ResumeStep2FormData = z.infer<typeof ResumeStep2Schema>;
export type ResumeStep3FormData = z.infer<typeof ResumeStep3Schema>;
export type ResumeStep4FormData = z.infer<typeof ResumeStep4Schema>;
export type ResumeStep5FormData = z.infer<typeof ResumeStep5Schema>;

// Infer types from schema
export type Form1Type = z.infer<typeof acsform1Schema>;
export type Form2Type = z.infer<typeof acsform2Schema>;

type Interest = {
  academic_type?: string;
  specific_program?: string;
  open_to_gmat?: string;
  specific_university?: string;
} | null;

type Degree = {
  institution?: string;
  course?: string;
  degree?: string;
  cgpa?: string;
  cgpa_class?: string;
};

type Country = {
  name: string;
};

declare interface ACSCandidateProps {
  id: string;
  bank?: string;
  full_name: string;
  email: string;
  email_address: string;
  phone_number: string;
  date_of_birth: string;
  age: string;
  gender: string;
  graduate_of: string;
  has_paid: boolean;
  membership: string;
  whatsapp: string;
  has_masters_degree: boolean;
  has_profile: boolean;
  recommended: boolean;
  resume: string;
  first_country: string;
  second_country: string;
  assigned_course1: string;
  assigned_course2: string;
  assigned_university1: string;
  assigned_university2: string;
  program_type1: string;
  program_type2: string;
  class_of_degree: string;
  created_at: string;
  updated_at: string;
  countries: Country[];
  degree: Degree[];
  interest: Interest;
}

declare interface InterestedCandidatesProps {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  residence_country: string;
  country_interested_in: string;
  enquiries: string;
  product: string;
  gender: string;
}
