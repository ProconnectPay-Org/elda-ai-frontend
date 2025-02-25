import { acsform1Schema, acsform2Schema, getInitials } from "@/lib/utils";
import { Button } from "./ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACSCandidateProps, Form1Type, Form2Type } from "@/types";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { updateCandidateData } from "@/lib/actions/acs.actions";
import AcsRecommendationForm from "./AcsRecommendationForm";
import useAuth from "@/hooks/useAuth";

interface CandidateDetailsProps {
  candidate: ACSCandidateProps | null;
}

const SmallComponent = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between w-full items-center">
      <p className="w-[350px] font-medium text-sm">{label}</p>
      <div className="border border-x-gray-text rounded-md p-2 w-[320px]">
        <p className="text-[#323232] text-sm">{value}</p>
      </div>
    </div>
  );
};

const AcsCandidateDetails: React.FC<CandidateDetailsProps> = ({
  candidate,
}) => {
  if (!candidate) {
    return (
      <div className="p-6">
        <p className="text-gray-500 font-semibold text-xl">
          Welcome to your ACS Dashboard
        </p>
        <p className="text-gray-500">Select a candidate to view details</p>
      </div>
    );
  }

  const { handleLogout, loggedInUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const form1 = useForm<Form1Type>({
    resolver: zodResolver(acsform1Schema),
    defaultValues: {
      programType1: "",
      assignedSchool1: "",
      assignedCourse1: "",
      country1: "",
    },
  });

  const form2 = useForm<Form2Type>({
    resolver: zodResolver(acsform2Schema),
    defaultValues: {
      programType2: "",
      assignedSchool2: "",
      assignedCourse2: "",
      country2: "",
    },
  });

  const onSubmitForm = async (
    data: Form1Type | Form2Type,
    type: "first" | "second"
  ) => {
    setIsLoading(true);
    try {
      let submissionData;

      if (type === "first") {
        const formData = data as Form1Type;
        submissionData = {
          first_country: formData.country1,
          assigned_course1: formData.assignedCourse1,
          assigned_university1: formData.assignedSchool1,
          program_type1: formData.programType1,
        };
      } else {
        const formData = data as Form2Type;
        submissionData = {
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
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="border-b border-x-gray-text p-6 flex justify-between items-center">
        <p className="text-[#1F384C] font-semibold text-xl">
          Candidate Profile
        </p>
        <div className="flex items-center gap-2">
          <div className="text-red bg-pale-bg rounded-full font-bold w-10 h-10 flex items-center justify-center">
            {getInitials("Academic counsellor")}
          </div>
          <div>
            <p className="font-semibold">Academic Counsellor</p>
            <p>{loggedInUser?.full_name}</p>
          </div>
          <Button
            className="h-10 w-10 bg-red hover:bg-rose-900 rounded-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="white"
              viewBox="0 0 256 256"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M124,216a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V40A12,12,0,0,1,48,28h64a12,12,0,0,1,0,24H60V204h52A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"></path>
            </svg>
          </Button>
        </div>
      </div>

      {/* PERSONAL DATA */}
      <div className="p-6 md:max-w-[760px]">
        <p className="text-xl font-semibold">Personal Data</p>
        <div className="space-y-4">
          <SmallComponent
            label="Full Name"
            value={candidate.full_name || "No name"}
          />
          <SmallComponent
            label="Personal Email Address"
            value={candidate.email || "No mail"}
          />
          <SmallComponent
            label="Personal Phone Number"
            value={candidate.phone_number || "No number"}
          />
          <SmallComponent
            label="Personal Whatsapp Number"
            value={candidate.whatsapp || "No number"}
          />
          <SmallComponent
            label="Gender"
            value={candidate.gender || "No gender"}
          />
          <SmallComponent
            label="Age"
            value={`${candidate.age} years old` || "No age"}
          />
          <SmallComponent
            label="Date Of Birth"
            value={`${candidate.date_of_birth}` || "No DOB"}
          />
        </div>
      </div>

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      {/* EDUCATIONAL DATA */}
      <div className="p-6 md:max-w-[760px]">
        <p className="text-xl font-semibold">Educational Data</p>
        <div className="space-y-4">
          <SmallComponent
            label="Graduate Of"
            value={candidate.graduate_of || "No name"}
          />
          <SmallComponent
            label="Name of University"
            value={candidate.degree?.[0]?.institution || "N/A"}
          />
          <SmallComponent
            label="Kind of Degree"
            value={candidate.degree?.[0]?.degree || "N/A"}
          />
          <SmallComponent
            label="Course of Study Graduated from"
            value={candidate.degree?.[0]?.course || "N/A"}
          />
          <SmallComponent
            label="Class of Degree"
            value={candidate.class_of_degree || "No degree"}
          />
          <SmallComponent
            label="Specific CGPA"
            value={candidate.degree?.[0]?.cgpa || "N/A"}
          />
          <SmallComponent
            label="Do you have a masters degree?"
            value={`${candidate.has_masters_degree ? "Yes" : "No"}` || "N/A"}
          />
          <SmallComponent
            label="School of masters degree?"
            value={candidate.degree?.[1]?.institution || "N/A"}
          />
          <SmallComponent
            label="Kind of degree?"
            value={candidate.degree?.[1]?.degree || "N/A"}
          />
          <SmallComponent
            label="Course of Study Graduated from with master"
            value={candidate.degree?.[1]?.course || "N/A"}
          />
          {/* <SmallComponent
            label="Class of Degree (Masters)"
            value={`${candidate.age}` || "N/A"}
          /> */}
          <SmallComponent
            label="Specific CGPA for Masters"
            value={candidate.degree?.[1]?.cgpa || "N/A"}
          />
          <SmallComponent
            label="Country(ies) you are INTERESTED In"
            value={
              `${candidate.countries?.map((country) => country.name)}` ||
              "No selected country"
            }
          />
          <SmallComponent
            label="Type of Academic Degree Interested in Abroad"
            value={`${candidate.interest?.academic_type}` || "N/A"}
          />
          <SmallComponent
            label="Academic program or course in mind that aligns with your professional experience"
            value={`${candidate.interest?.specific_program}` || "N/A"}
          />
          <SmallComponent
            label="Are you opened to taking the GMAT or GRE if it is required"
            value={`${candidate.interest?.open_to_gmat}` || "N/A"}
          />
          <SmallComponent
            label="Preferred Universities"
            value={`${candidate.interest?.specific_university}` || "N/A"}
          />
        </div>
      </div>

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      <div className="p-6 md:max-w-[760px]">
        <p className="text-xl font-semibold">Uploaded resume</p>
        <div className="p-4 rounded-lg border border-[#CFD3D4] flex justify-between items-center">
          <div>
            <img src="" alt="" />
            {`${decodeURIComponent(
              candidate.resume.split("/").pop()?.split("?")[0] ?? ""
            )}` || "No document uploaded yet"}
          </div>
          <Button className="bg-red w-18">
            <Link to={candidate?.resume}>View</Link>
          </Button>
        </div>
      </div>

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      {/* RECOMMENDATIONS */}
      <div className="p-6 w-full">
        <p className="text-xl font-semibold mb-5">
          Recommend courses, schools and country
        </p>
        <div className="flex w-full gap-10">
          <AcsRecommendationForm
            formInstance={form1}
            onSubmit={(data) => onSubmitForm(data, "first")}
            formType="first"
            isLoading={isLoading}
          />
          <AcsRecommendationForm
            formInstance={form2}
            onSubmit={(data) => onSubmitForm(data, "second")}
            formType="second"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AcsCandidateDetails;
