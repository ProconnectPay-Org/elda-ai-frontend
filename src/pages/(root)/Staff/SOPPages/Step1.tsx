import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import helpIcon from "@/assets/help-icon.svg";
import mailIcon from "@/assets/mail.svg";
import { useEffect, useState } from "react";
import { CandidateData } from "@/types";
import useStaffDetails from "@/hooks/useStaffDetails";

const Step1 = ({ candidateId }: { candidateId: string }) => {
  const { isStaffLoading, loggedInStaff } = useStaffDetails();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedInStaff) {
      const foundCandidate = (
        loggedInStaff.staff_candidates as CandidateData[]
      ).find(
        (candidate: CandidateData) =>
          String(candidate.id) === String(candidateId)
      );

      if (foundCandidate?.user?.email) {
        setEmail(foundCandidate.user.email || "");
      }
    }
  }, [loggedInStaff, candidateId]);

  if (isStaffLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 md:p-12">
      <Link to="/assigned-candidates">
        <div className="w-16 cursor-pointer relative mb-8 md:mb-16">
          <ChevronLeftIcon color="red" />
          <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
        </div>
      </Link>
      <div className="flex items-center flex-col gap-8 justify-center md:w-3/4 mx-auto">
        <h2 className="text-red font-bold text-lg text-center md:text-3xl">
          Enter Candidate&apos;s Name or Email Address
        </h2>
        <div className="flex flex-col w-full gap-1.5">
          <label htmlFor="email">
            Email <span className="text-red">*</span>
          </label>
          <div className="w-full flex items-center gap-4 border border-[#667085] p-3 rounded-full overflow-hidden">
            <img src={mailIcon} alt="mail icon" />
            <input
              type="email"
              defaultValue={email}
              className="bg-transparent w-full focus:ring-0 focus-visible:ring-0 focus:outline-none border-0 focus-within:ring-0 max-h-fit"
            />
            <img src={helpIcon} alt="help icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
