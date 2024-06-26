/* eslint-disable no-unused-vars */

import { step1Schema, step2Schema, step3Schema, step4Schema, step5Schema } from "@/lib/utils";

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

declare type SignUpParams = {
  firstName: string;
  email: string;
  password: string;
};

declare type signInProps = {
  email: string;
  password: string;
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

interface UserContextValue {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    token?: string; // Add token property
  };
  isLoggedIn?: boolean;
  setUser?: React.Dispatch<React.SetStateAction<UserContextValue["user"]>>; // Function to update user state
}

declare type DummyUser = {
  id: string;
  name: string;
  email: string;
  token?: string; // Optional token property for future use
};

declare type DottedBoxProps = {
  docType: string;
  icon: string;
  href: string; // Optional onClick function
};

declare type SmallBoxProps = {
  name: string;
  icon: string;
  number: number; // Optional onClick function
};

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
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

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

declare interface SiderbarProps {
  user: User;
}

// validationSchemas.ts
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
// Define types for other steps similarly
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;
