import CandidateNewLayout from "@/layouts/CandidateNewLayout";
import AdmissionComponent from "@/components/AdmissionComponent";
import Cookies from "js-cookie";

export default function AdmissionStatusPrompt() {
  const candidate_id = Cookies.get("candidate_id");

  return (
    <CandidateNewLayout>
      <div className="my-8 md:m-0">
        <AdmissionComponent id={candidate_id!} />
        </div>
    </CandidateNewLayout>
  );
}
