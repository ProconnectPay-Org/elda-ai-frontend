import CandidateLayout from "@/layouts/CandidateLayout";
import { ChevronRight } from "lucide-react";

const StatusBox = ({ text, status }: { text: string; status: string }) => {
  return (
    <div className="w-full h-[60px] rounded-2xl bg-[#F5F7F9] flex justify-between items-center p-5">
      <div className="flex items-center gap-4">
        <p className="font-semibold text-2xl text-red">{text}</p>
        <div className="border border-red w-[80px] h-6 flex items-center justify-center rounded-md">
          <p className=" text-xs text-center">{status}</p>
        </div>
      </div>
      <ChevronRight color="red" />
    </div>
  );
};

const CandidateStatus = () => {
  return (
    <CandidateLayout>
      <section className="md:w-[880px] mx-auto space-y-10">
        <h1 className="font-bold text-4xl">Welcome, Grace</h1>

        <div className="h-[80px] rounded-2xl w-full p-5 bg-gradient-to-r from-red to-[#919293] flex items-center">
          <p className="text-white font-medium text-2xl">Not Completed</p>
        </div>

        <div>
          <StatusBox text="Resume" status="Completed" />
        </div>
      </section>
    </CandidateLayout>
  );
};

export default CandidateStatus;
