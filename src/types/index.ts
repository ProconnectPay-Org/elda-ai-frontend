export interface ACSCandidateProps {
  bank?: string;
  isPaid?: boolean;
  has_paid?: boolean;
  assigned_course1?: string;
  assigned_course2?: string;
  assigned_university1?: string;
  assigned_university2?: string;
  program_type1?: string;
  program_type2?: string;
  full_name?: string;
  first_country?: string;
  second_country?: string;
  serialNumber?: number;
}

export interface CandidateData {
  serialNumber: number;
  full_name: string;
  first_country: string;
  second_country: string;
  assigned_university1: string;
  assigned_university2: string;
  assigned_course1: string;
  assigned_course2: string;
  school_application_status1: string;
  school_application_status2: string;
  resume_status: string;
  sop_status1: string;
  sop_status2: string;
  duplicate: string;
  assigned?: boolean;
}
