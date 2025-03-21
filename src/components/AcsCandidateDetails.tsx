import { acsform1Schema, acsform2Schema } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACSCandidateProps, Form1Type, Form2Type } from "@/types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import {
  deleteACSCandidate,
  updateCandidateData,
} from "@/lib/actions/acs.actions";
import AcsRecommendationForm from "./AcsRecommendationForm";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { resendOTP } from "@/lib/actions/candidate.actions";
import useDeleteCandidate from "@/hooks/useDeleteCandidate";
import DashboardHeader from "./acs-components/DashboardHeader";
import PersonalData from "./acs-components/PersonalData";
import EducationData from "./acs-components/EducationData";
import ResumeComponent from "./acs-components/ResumeComponent";
import AcsLoading from "./acs-components/AcsLoading";

interface CandidateDetailsProps {
  candidate: ACSCandidateProps | null;
  handleSearch: (query: string) => void;
  openMenu: boolean;
  setOpenMenu: (open: boolean) => void;
}

const AcsCandidateDetails = ({
  candidate,
  handleSearch,
  openMenu = false,
  setOpenMenu,
}: CandidateDetailsProps) => {
  if (!candidate) {
    return <AcsLoading />;
  }

  const queryClient = useQueryClient();

  const { handleLogout, loggedInUser } = useAuth();

  const [isLoading, setIsLoading] = useState({
    first: false,
    second: false,
  });
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const form1 = useForm<Form1Type>({
    resolver: zodResolver(acsform1Schema),
    defaultValues: {
      programType1: candidate?.program_type1 || "",
      assignedSchool1: candidate?.assigned_university1 || "",
      assignedCourse1: candidate?.assigned_course1 || "",
      country1: candidate?.first_country || "",
    },
  });

  const form2 = useForm<Form2Type>({
    resolver: zodResolver(acsform2Schema),
    defaultValues: {
      programType2: candidate?.program_type2 || "",
      assignedSchool2: candidate?.assigned_university2 || "",
      assignedCourse2: candidate?.assigned_course2 || "",
      country2: candidate?.second_country || "",
    },
  });

  const candidateEmail = candidate.email;

  // Use useEffect to reset form values when the candidate changes
  useEffect(() => {
    form1.reset({
      programType1: candidate?.program_type1 || "",
      assignedSchool1: candidate?.assigned_university1 || "",
      assignedCourse1: candidate?.assigned_course1 || "",
      country1: candidate?.first_country || "",
    });

    form2.reset({
      programType2: candidate?.program_type2 || "",
      assignedSchool2: candidate?.assigned_university2 || "",
      assignedCourse2: candidate?.assigned_course2 || "",
      country2: candidate?.second_country || "",
    });
  }, [candidate, form1.reset, form2.reset]);

  const onSubmitForm = async (
    data: Form1Type | Form2Type,
    type: "first" | "second"
  ) => {
    setIsLoading((prev) => ({ ...prev, [type]: true }));
    try {
      let submissionData;

      if (type === "first") {
        const formData = data as Form1Type;
        submissionData = {
          interest: {},
          first_country: formData.country1,
          assigned_course1: formData.assignedCourse1,
          assigned_university1: formData.assignedSchool1,
          program_type1: formData.programType1,
        };
      } else {
        const formData = data as Form2Type;
        submissionData = {
          interest: {},
          second_country: formData.country2,
          assigned_course2: formData.assignedCourse2,
          assigned_university2: formData.assignedSchool2,
          program_type2: formData.programType2,
        };
      }

      const response = await updateCandidateData(
        candidate?.email || "",
        submissionData
      );

      if (response) {
        toast({
          title: "Success",
          variant: "success",
          description: "Submitted successfully!",
        });

        const isForm1Filled = Object.values(form1.getValues()).every(Boolean);
        const isForm2Filled = Object.values(form2.getValues()).every(Boolean);

        if (isForm1Filled && isForm2Filled) {
          await handleRecommendations();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: axios.isAxiosError(error)
          ? `Failed to submit form: ${
              error.response?.data?.message || error.message
            }`
          : "Failed to submit form. Please try again.",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Delete Candidates
  const { handleDeleteCandidate } = useDeleteCandidate(
    deleteACSCandidate,
    "onboardedCandidates"
  );

  const resendOTPButton = async () => {
    if (!candidateEmail) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Missing email",
      });
      return;
    }

    try {
      setIsSendingOtp(true);
      const response = await resendOTP({ email: candidateEmail });
      toast({
        title: "Success",
        description: response?.message || "Check your email",
        variant: "success",
      });
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const errorMessage =
        err.response?.data?.message || "Something went wrong";

      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
      });
      console.error(error);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleRecommendations = async () => {
    try {
      // Optimistically update the UI
      queryClient.setQueryData(
        ["onboardedCandidates"],
        (oldData: ACSCandidateProps[] | undefined) => {
          if (!oldData) return [];

          return oldData.map((c) =>
            c.email === candidate?.email
              ? { ...c, recommended: true, interest: null }
              : c
          );
        }
      );

      await updateCandidateData(candidate?.email || "", {
        recommended: true,
        interest: null,
      });
      queryClient.invalidateQueries({ queryKey: ["onboardedCandidates"] });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div>
      <DashboardHeader
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        getLoggedInUser={loggedInUser}
        handleSearch={handleSearch}
        handleLogout={handleLogout}
      />

      <PersonalData
        candidate={candidate}
        resendOTPButton={resendOTPButton}
        handleDeleteCandidate={handleDeleteCandidate}
        isSendingOtp={isSendingOtp}
      />

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      <EducationData candidate={candidate} />

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      <ResumeComponent candidate={candidate} />

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      {/* RECOMMENDATIONS */}
      <div className="p-6 w-full">
        <p className="text-xl font-semibold mb-5">
          Recommend courses, schools and country
        </p>
        <div className="flex flex-col md:flex-row w-full gap-10">
          <AcsRecommendationForm
            formInstance={form1}
            onSubmit={(data) => onSubmitForm(data, "first")}
            formType="first"
            isLoading={isLoading.first}
          />
          <AcsRecommendationForm
            formInstance={form2}
            onSubmit={(data) => onSubmitForm(data, "second")}
            formType="second"
            isLoading={isLoading.second}
          />
        </div>
      </div>
    </div>
  );
};

export default AcsCandidateDetails;
