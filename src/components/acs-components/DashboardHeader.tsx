import { getInitials } from "@/lib/utils";
import { Button } from "../ui/button";
import { User } from "@/types";

interface CandidateDetailsProps {
  getLoggedInUser: User | null;
  handleSearch: (query: string) => void;
  handleLogout: () => void;
}

const DashboardHeader = ({
  getLoggedInUser,
  handleSearch,
  handleLogout,
}: CandidateDetailsProps) => {
  return (
    <div className="border-b sticky top-0 bg-white border-x-gray-text p-6 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="text-[#1F384C] font-semibold text-xl">
          Candidate Profile
        </p>
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          className="border w-80 rounded-md p-2 text-sm"
          placeholder="Search for candidates by name"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="text-red bg-pale-bg rounded-full font-bold w-10 h-10 flex items-center justify-center">
          {getInitials("Academic counsellor")}
        </div>
        <div>
          <p className="font-semibold">Academic Counsellor</p>
          <p>{getLoggedInUser?.full_name}</p>
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
  );
};

export default DashboardHeader;
