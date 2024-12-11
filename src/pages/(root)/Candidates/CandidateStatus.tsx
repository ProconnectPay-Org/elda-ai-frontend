import CandidateLayout from "@/layouts/CandidateLayout";
import { ChevronDown, ChevronRight } from "lucide-react";
import IconCheck from "@/assets/icon-check.svg";
import ExclamationRed from "@/assets/exclamation-red.svg";
import ExclamationWhite from "@/assets/exclamation-white.svg";
import IconProgress from "@/assets/icon-progress.svg";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchVerificationDocument } from "@/lib/actions/candidate.actions";
import { useState } from "react";
import { useCandidates } from "@/hooks/useCandidiates";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SkeletonStatusBox = () => {
  return (
    <div className="w-full h-[60px] rounded-2xl bg-[#e0e0e0] flex justify-between items-center p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-32 h-6 bg-[#c0c0c0] rounded-md"></div>
        <div className="border border-[#c0c0c0] px-2 h-6 flex items-center gap-2 rounded-md">
          <div className="w-16 h-4 bg-[#c0c0c0] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonDocumentBox = () => {
  return (
    <div className="w-full h-[40px] flex justify-between items-center animate-pulse">
      <div className="w-2/3 h-5 bg-[#e0e0e0] rounded-md"></div>
      <div className="w-1/4 h-5 bg-[#c0c0c0] rounded-md"></div>
    </div>
  );
};

const StatusBox = ({
  text,
  status,
  icon,
  route,
}: {
  text: string;
  status: string;
  icon: JSX.Element;
  route?: string;
}) => {
  const router = useNavigate();

  const handleClick = () => {
    if ((status === "Completed" || status === "True") && route) {
      router(route);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full h-[60px] rounded-2xl p-5 flex justify-between items-center ${
        status === "Completed"
          ? "bg-[#F5F7F9] cursor-pointer"
          : "bg-gray-200 cursor-not-allowed"
      }`}
      style={{
        pointerEvents: status === "Completed" ? "auto" : "none",
      }}
    >
      <div className="flex items-center gap-2 md:gap-4">
        <p className="font-semibold text-sm md:text-2xl text-red">{text}</p>
        <div className="border border-red px-2 h-6 flex items-center gap-2 rounded-md">
          {icon}
          <p className="text-[10px] text-center text-gray-text">{status}</p>
        </div>
      </div>
      {/* <ChevronRight color="red" size={20} /> */}
      <button className="bg-red text-white py-2 px-2 md:px-5 rounded-xl text-xs md:text-base">
        {status === "Completed" && "View"}
        {status === "True" && "Completed"}
        {status !== "Completed" && status !== "True" && "Not Completed"}
      </button>
    </div>
  );
};

const CandidateStatus = () => {
  const { loggedInUser } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const candidate_id = Cookies.get("candidate_id");
  const { singleCandidate, singleCandidateLoading } =
    useCandidates(candidate_id);
  const { data, isLoading: docsLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchVerificationDocument,
    staleTime: 5 * 60 * 1000,
  });

  const documents = {
    bank_statement: "Bank Statement",
    bsc_hnd_certificate: "BSc/HND Certificate",
    current_cv: "Current CV",
    first_degree_transcript: "First Degree Transcript",
    intl_passport: "International Passport",
    nin_slip: "NIN Slip",
    post_graduate_certificate: "Post-Graduate Certificate",
    post_graduate_transcript: "Post-Graduate Transcript",
    utility_bill: "Utility Bill",
  };

  const statusProps = [
    {
      title: "Resume Status",
      status: singleCandidate?.resume_status,
      route: `/download-resume/${candidate_id}`,
    },
    {
      title: "SOP 1 Status",
      status: singleCandidate?.sop_status1,
      route: `/sop/${candidate_id}?type=school1`,
    },
    {
      title: "SOP 2 Status",
      status: singleCandidate?.sop_status2,
      route: `/sop/${candidate_id}?type=school2`,
    },
    {
      title: "School Application Status 1",
      status: singleCandidate?.school_application_status1,
    },
    {
      title: "School Application Status 2",
      status: singleCandidate?.school_application_status2,
    },
  ];

  const allStatusesCompleted = () => {
    return statusProps.every((item) => item.status === "Completed" || "True");
  };

  const areAllDocumentsUploaded = Object.keys(documents).every(
    (key) => data?.[key]
  );

  return (
    <CandidateLayout>
      <section className="md:max-w-[880px] mx-auto space-y-10">
        <h1 className="font-bold text-4xl">
          Welcome, {loggedInUser?.full_name}
        </h1>

        <div
          className={`h-[80px] rounded-2xl w-full p-5 bg-gradient-to-r ${
            allStatusesCompleted() ? "from-green-400" : "from-red"
          }  to-[#919293] gap-2 flex items-center`}
        >
          <img src={ExclamationWhite} alt="exclamation mark" />
          <p className="text-white font-medium text-2xl">
            {allStatusesCompleted() ? "Completed" : "Not Completed"}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {singleCandidateLoading
            ? Array(3)
                .fill(null)
                .map((_, index) => <SkeletonStatusBox key={index} />)
            : statusProps.map((item, index) => (
                <StatusBox
                  key={index}
                  icon={
                    item.status === "Completed" ? (
                      <img src={IconCheck} alt="Check Icon" />
                    ) : item.status === "True" ? (
                      <img src={IconCheck} alt="Check Icon" />
                    ) : item.status === "pending" ? (
                      <img src={IconProgress} alt="Progress Icon" />
                    ) : (
                      <img src={ExclamationRed} alt="Exclamation Icon" />
                    )
                  }
                  text={item.title}
                  status={item.status || "In Progress"}
                  route={item.route}
                />
              ))}
          <div
            className="w-full h-[60px] rounded-2xl bg-[#F5F7F9] flex justify-between items-center p-5 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-4">
              <p className="font-semibold text-sm md:text-2xl text-red">
                Verification Documents
              </p>
              <div className="border border-red px-2 h-6 flex items-center gap-2 rounded-md">
                <img src={IconProgress} alt="Progress Icon" />
                <p className="text-[10px] text-center text-gray-text">
                  {areAllDocumentsUploaded ? "Completed" : "In Progress"}
                </p>
              </div>
            </div>
            {!isExpanded ? (
              <ChevronRight color="red" size={20} />
            ) : (
              <ChevronDown color="red" size={20} />
            )}
          </div>
          {isExpanded && (
            <div className="space-y-4 m-4">
              {docsLoading
                ? Array(5) // Render skeletons for 5 placeholders
                    .fill(null)
                    .map((_, index) => <SkeletonDocumentBox key={index} />)
                : Object.entries(documents).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <p className="text-lg font-semibold">{label}</p>
                      {data?.[key] ? (
                        <a
                          href={data[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 underline"
                        >
                          Uploaded
                        </a>
                      ) : (
                        <span className="text-red-600">Not Uploaded</span>
                      )}
                    </div>
                  ))}
            </div>
          )}
        </div>
      </section>
    </CandidateLayout>
  );
};

export default CandidateStatus;
