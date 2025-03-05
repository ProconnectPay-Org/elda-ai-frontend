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
        <p className="font-semibold text-sm w-20 sm:w-fit md:text-2xl text-red">
          {text}
        </p>
        <div className="border border-red px-2 h-6 flex items-center gap-1 rounded-md">
          {icon}
          <p className="text-[10px] text-center text-gray-text">
            {status === "True" ? "Completed" : status}
          </p>
        </div>
      </div>
      {/* <ChevronRight color="red" size={20} /> */}
      <button
        className={`py-2 px-2 md:px-5 rounded-xl text-xs md:text-base text-white ${
          status === "Completed" || status === "True"
            ? "bg-green-500"
            : "bg-red"
        }`}
      >
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
    admission_letter: "Admission Letter",
    gre_document: "GRE or GMAT result",
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
      title: "1st School Application Status",
      status: singleCandidate?.school_application_status1,
    },
    {
      title: "2nd School Application Status",
      status: singleCandidate?.school_application_status2,
    },
  ];

  const isAtLeastOneSchoolApplicationCompleted = () =>
    singleCandidate?.school_application_status1 === "True" ||
    singleCandidate?.school_application_status2 === "True";

  const areAllDocumentsUploaded = Object.keys(documents).every(
    (key) => data?.[key]
  );

  return (
    <CandidateLayout>
      <section className="md:max-w-[880px] mx-auto space-y-10">
        <h1 className="font-bold text-4xl">
          Welcome, {loggedInUser?.full_name}
        </h1>
        <div>
          <b>ASSIGNED MANAGER</b>
          <p className="italic">
            {singleCandidate?.assigned_manager[0]?.user?.full_name ||
              "Not yet assigned"}
          </p>
          <p className="font-medium">
            For issues and support, email{" "}
            <a className="text-blue-500 underline" href="mailto:info@proconnectpay.com">info@proconnectpay.com</a>
          </p>
        </div>

        <div
          className={`md:h-[80px] rounded-2xl w-full p-5 bg-gradient-to-r ${
            isAtLeastOneSchoolApplicationCompleted()
              ? "from-green-400"
              : "from-red"
          }  to-[#919293] gap-2 flex items-center`}
        >
          <img src={ExclamationWhite} alt="exclamation mark" />
          <p className="text-white font-medium text-sm md:text-2xl">
            {isAtLeastOneSchoolApplicationCompleted()
              ? "At Least One Application Completed"
              : "Not Completed"}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="px-5">
            <div className="mb-5">
              <h3 className="font-semibold text-lg">Recommended Schools</h3>
              <ul className="list-decimal">
                <li>{singleCandidate?.assigned_university1}</li>
                <li>{singleCandidate?.assigned_university2}</li>
              </ul>
            </div>
            <div className="mb-5">
              <h3 className="font-semibold text-lg">Program Types</h3>
              <ul className="list-decimal">
                <li>{singleCandidate?.program_type1}</li>
                <li>{singleCandidate?.program_type2}</li>
              </ul>
            </div>
            <div className="mb-5">
              <h3 className="font-semibold text-lg">Recommended Courses</h3>
              <ul className="list-decimal">
                <li>{singleCandidate?.assigned_course1}</li>
                <li>{singleCandidate?.assigned_course2}</li>
              </ul>
            </div>
          </div>
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
