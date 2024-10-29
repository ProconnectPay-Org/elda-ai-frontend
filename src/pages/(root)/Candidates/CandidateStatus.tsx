import CandidateLayout from "@/layouts/CandidateLayout";
import { ChevronRight } from "lucide-react";
import IconCheck from "@/assets/icon-check.svg";
import ExclamationRed from "@/assets/exclamation-red.svg";
import ExclamationWhite from "@/assets/exclamation-white.svg";
import IconProgress from "@/assets/icon-progress.svg";
import { statusProps } from "@/constants";
import useAuth from "@/hooks/useAuth";

const StatusBox = ({
  text,
  status,
  icon,
}: {
  text: string;
  status: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="w-full h-[60px] rounded-2xl bg-[#F5F7F9] flex justify-between items-center p-5 cursor-pointer">
      <div className="flex items-center gap-4">
        <p className="font-semibold text-2xl text-red">{text}</p>
        <div className="border border-red px-2 h-6 flex items-center gap-2 rounded-md">
          {icon}
          <p className="text-[10px] text-center text-gray-text">{status}</p>
        </div>
      </div>
      <ChevronRight color="red" size={20} />
    </div>
  );
};

const CandidateStatus = () => {
  const { loggedInUser } = useAuth();
  console.log(loggedInUser);
  

  return (
    <CandidateLayout>
      <section className="md:max-w-[880px] mx-auto space-y-10">
        <h1 className="font-bold text-4xl">Welcome, {loggedInUser?.full_name}</h1>

        <div className="h-[80px] rounded-2xl w-full p-5 bg-gradient-to-r from-red to-[#919293] gap-2 flex items-center">
          <img src={ExclamationWhite} alt="exclamation mark" />
          <p className="text-white font-medium text-2xl">Not Completed</p>
        </div>

        <div className="flex flex-col gap-5">
          {statusProps.map((item, index) => (
            <StatusBox
              key={index}
              icon={
                item.status === "Completed" ? (
                  <img src={IconCheck} alt="Check Icon" />
                ) : item.status === "In Progress" ? (
                  <img src={IconProgress} alt="Progress Icon" />
                ) : (
                  <img src={ExclamationRed} alt="Exclamation Icon" />
                )
              }
              text={item.title}
              status={item.status}
            />
          ))}
        </div>
      </section>
    </CandidateLayout>
  );
};

export default CandidateStatus;
