import IconCheck from "@/assets/icon-check.svg";
import ExclamationRed from "@/assets/exclamation-red.svg";
import ExclamationWhite from "@/assets/exclamation-white.svg";
import IconProgress from "@/assets/icon-progress.svg";
import useAuth from "@/hooks/useAuth";
import { useCandidates } from "@/hooks/useCandidiates";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Bulb from "../../../assets/bulb.svg";
import progress from "../../../assets/progress.svg";
import globe from "../../../assets/red-globe.svg";
import CandidateNewLayout from "@/layouts/CandidateNewLayout";
import DocumentList from "@/components/DocumentList";
import { useQuery } from "@tanstack/react-query";
import { getCandidateSchoolDetails } from "@/lib/actions/user.actions";
// import eldaLogo from "../../../assets/eldaLogo.png"

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

export default function CandidateStatusPage() {
  const { loggedInUser } = useAuth();
  const candidate_id = Cookies.get("candidate_id");
  const { singleCandidate, singleCandidateLoading } =
    useCandidates(candidate_id);

  const { data } = useQuery({
    queryKey: ["candidatesSchoolDetails"],
    queryFn: () => getCandidateSchoolDetails(candidate_id!),
  });

  const schoolOneData = data?.find((entry: any) => entry.school_number === "1");
  const schoolTwoData = data?.find((entry: any) => entry.school_number === "2");

  const statusProps = [
    {
      title: "Resume Status",
      status: singleCandidate?.resume_status,
      route: `/download-resume/${candidate_id}`,
    },
    {
      title: "Statement of Purpose 1",
      status: singleCandidate?.sop_status1,
      route: `/sop/${candidate_id}?type=school1`,
    },
    {
      title: "Statement of Purpose 2",
      status: singleCandidate?.sop_status2,
      route: `/sop/${candidate_id}?type=school2`,
    },
    {
      title: "School application submission 1",
      status: singleCandidate?.school_application_status1,
    },
    {
      title: "School application submission 2",
      status: singleCandidate?.school_application_status2,
    },
    {
      title: "Extra Statement of Purpose",
      status: singleCandidate?.school_application_status2,
    },
    {
      title: "Extra School Application Submission ",
      status: singleCandidate?.school_application_status2,
    },
    {
      title: "WAEC/NECO Result ",
      // status: singleCandidate?.school_application_status2,
    },
  ];

  const getApplicationStatus = () => {
    const app1Complete = singleCandidate?.school_application_status1 === "True";
    const app2Complete = singleCandidate?.school_application_status2 === "True";

    if (app1Complete && app2Complete) {
      return {
        message: "All Applications Completed",
        color: "from-green-500",
      };
    } else if (app1Complete || app2Complete) {
      return {
        message: "One Application Completed",
        color: "from-yellow-500",
      };
    } else {
      return {
        message: "Not Completed",
        color: "from-red",
      };
    }
  };

  return (
    <CandidateNewLayout>
      <section className="max-w-[1200px] mx-auto space-y-8 pt-10 md:pt-0">
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div className="space-y-1 md:space-y-2">
              <h1 className="font-bold text-xl md:text-3xl text-gray-900">
                Welcome, {loggedInUser?.full_name} 👋
              </h1>
              <p className="font-medium italic text-lg">
                to the <span className="text-red">Pro</span>
                <span className="text-[#2D44A8]">connect</span> Global Education
                Community!
              </p>
            </div>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <p className="font-bold text-gray-700">ASSIGNED MANAGER</p>
              <p className="italic text-gray-600">
                {singleCandidate?.assigned_manager[0]?.user?.full_name ||
                  "Not yet assigned"}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={Bulb} alt="" />
              <h2 className="font-semibold text-xl mb-3 text-gray-800">
                Our AI-powered counselor
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                <span className="text-blue-700 font-semibold">eLDa AI</span>,
                provides personalized, real-time academic and career guidance.
                With 99% accuracy, it ensures you pursue courses that align
                perfectly with your long-term career goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={progress} alt="" />
              <h2 className="font-semibold text-xl mb-3 text-gray-800">
                Tailored Career Insights
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                After analyzing your profile,{" "}
                <span className="text-blue-700 font-semibold">eLDa AI</span> has
                generated career insights and course recommendations designed to
                offer commercially viable and highly promising post-graduation
                opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={globe} alt="" />
              <h2 className="font-semibold text-xl mb-3 text-gray-800">
                Customized Course Selection
              </h2>
              <p className="text-gray-600 leading-relaxed text-justify">
                We carefully select courses that align with the best
                opportunities in your recommended countries. If you have
                alternative commercially viable courses or schools that better
                suit your background.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`md:h-[80px] rounded-2xl w-full p-5 bg-gradient-to-r ${
            getApplicationStatus().color
          }  to-[#919293] gap-2 flex items-center`}
        >
          <img src={ExclamationWhite} alt="exclamation mark" />
          <p className="text-white font-medium text-sm md:text-2xl">
            {getApplicationStatus().message}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {/* <h2 className="text-xl font-semibold text-gray-900">Recommended Schools</h2> */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full ${
                    singleCandidate?.assigned_university1 &&
                    singleCandidate?.assigned_university2
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {singleCandidate?.assigned_university1 &&
                  singleCandidate?.assigned_university2 ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      All Schools Assigned
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Pending Assignment
                    </>
                  )}
                </span>
              </div>
            </div>

            <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <tbody>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Recommended Schools
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.assigned_university1}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.assigned_university2}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Program Types
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.program_type1}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.program_type2}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Recommended Courses
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.assigned_course1}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.assigned_course2}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Recommended Countries
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.first_country}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {singleCandidate?.second_country}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Username
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {schoolOneData?.username || "To be filled by manager"}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {schoolTwoData?.username || "To be filled by manager"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Password
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {schoolOneData?.password || "To be filled by manager"}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {schoolTwoData?.password || "To be filled by manager"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Application Deadline
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {schoolOneData?.application_deadline ||
                      "To be filled by manager"}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {schoolTwoData?.application_deadline ||
                      "To be filled by manager"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Application Fee
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {schoolOneData?.application_fee ||
                      "To be filled by manager"}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {schoolTwoData?.application_fee ||
                      "To be filled by manager"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Application Fee Amount
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {schoolOneData?.application_fee_amount ||
                      "To be filled by manager"}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {schoolTwoData?.application_fee_amount ||
                      "To be filled by manager"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    School Application URL
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    <a
                      href={schoolOneData?.school_application_url}
                      target="_blank"
                      className="underline text-blue-500"
                    >
                      {schoolOneData?.school_application_url ||
                        "To be filled by manager"}
                    </a>
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    <a
                      href={schoolTwoData?.school_application_url}
                      target="_blank"
                      className="underline text-blue-500"
                    >
                      {schoolTwoData?.school_application_url ||
                        "To be filled by manager"}
                    </a>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 border-b border-gray-100">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Date Application Submitted
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {schoolOneData?.date_application_submitted ||
                      "To be filled by manager"}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {schoolTwoData?.date_application_submitted ||
                      "To be filled by manager"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <th className="text-left font-semibold text-sm md:text-lg p-4 bg-gray-50 w-1/3 text-[#1E4580]">
                    Session Targeted for Admission
                  </th>
                  <td className="p-4 text-sm md:text-base">
                    {schoolOneData?.session_timeline_for_admission ||
                      "To be filled by manager"}
                  </td>
                  <td className="p-4 text-sm md:text-base">
                    {schoolTwoData?.session_timeline_for_admission ||
                      "To be filled by manager"}
                  </td>
                </tr>
              </tbody>
            </table>
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

          {/* Uploaded documents */}
          <DocumentList />
        </div>
      </section>
    </CandidateNewLayout>
  );
}
