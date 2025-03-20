import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ACSCandidateProps } from "@/types";
import AcsLoading from "./AcsLoading";

interface CandidateDetailsProps {
  candidate: ACSCandidateProps | null;
}

const ResumeComponent = ({ candidate }: CandidateDetailsProps) => {
  if (!candidate) {
    return <AcsLoading />;
  }
  return (
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
          <Link to={candidate.resume} target="_blank">
            View
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ResumeComponent;
