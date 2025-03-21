import SmallComponent from "./SmallComponent";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ACSCandidateProps } from "@/types";
import AcsLoading from "./AcsLoading";

interface CandidateDetailsProps {
  candidate: ACSCandidateProps | null;
  resendOTPButton: () => Promise<void>;
  handleDeleteCandidate: (userId: string, fullName: string) => void;
  isSendingOtp: boolean;
}

const PersonalData = ({
  candidate,
  resendOTPButton,
  handleDeleteCandidate,
  isSendingOtp,
}: CandidateDetailsProps) => {
  if (!candidate) {
    return <AcsLoading />;
  }
  return (
    <div className="flex flex-col-reverse md:flex-row items-start md:justify-between">
      {/* PERSONAL DATA */}
      <div className="p-6 w-full md:max-w-[760px]">
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

      <div className="p-6 flex gap-3 flex-wrap">
        <Button onClick={resendOTPButton} className="bg-red">
          {isSendingOtp ? <Loader2 className="animate-spin" /> : "Send Otp"}
        </Button>
        <Button
          onClick={() =>
            handleDeleteCandidate(candidate?.id, candidate?.full_name)
          }
          className=""
        >
          Delete Candidate
        </Button>
      </div>
    </div>
  );
};

export default PersonalData;
