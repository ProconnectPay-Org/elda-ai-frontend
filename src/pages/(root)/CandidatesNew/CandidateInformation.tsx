import CandidateNewLayout from "@/layouts/CandidateNewLayout";
import { useCandidates } from "@/hooks/useCandidiates";
import Cookies from "js-cookie";
import SmallComponent from "@/components/acs-components/SmallComponent";
import { useQuery } from "@tanstack/react-query";
import { getSingleOnboardedCandidateByEmail } from "@/lib/actions/acs.actions";

export default function CandidateInformation() {
  const candidate_id = Cookies.get("candidate_id");
  const candidate_email = Cookies.get("candidate_email") || "";
  const { singleCandidate } = useCandidates(candidate_id);

  const { data: candidate } = useQuery({
    queryKey: ["singleOnboardedCandidate", candidate_id],
    queryFn: () => getSingleOnboardedCandidateByEmail(candidate_email),
  });

  return (
    <CandidateNewLayout>
      <section className="p-6 space-y-8">
        {/* Personal Data Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Personal Data</h2>
          <div className="space-y-4 max-w-3xl">
            <SmallComponent
              label="Full Name"
              value={
                `${singleCandidate?.first_name} ${singleCandidate?.middle_name} ${singleCandidate?.last_name}` ||
                "No name"
              }
            />
            <SmallComponent
              label="Personal Email Address"
              value={`${singleCandidate?.user?.email}` || "No mail"}
            />
            <SmallComponent
              label="Personal Phone Number"
              value={singleCandidate?.phone_number || "No number"}
            />
            <SmallComponent
              label="Personal Whatsapp Number"
              value={singleCandidate?.whatsapp || "No number"}
            />
            <SmallComponent
              label="Gender"
              value={singleCandidate?.gender || "No gender"}
            />
            <SmallComponent
              label="Age"
              value={`${candidate?.age} years old` || "No age"}
            />
          </div>
        </div>

        {/* Educational Data Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Educational Data</h2>
          <div className="space-y-4 max-w-3xl">
            <SmallComponent
              label="Graduate Of"
              value={singleCandidate?.education?.graduate_of || "Not filled"}
            />
            <SmallComponent
              label="Name of University"
              value={singleCandidate?.education?.[0]?.school_name || "N/A"}
            />
            <SmallComponent
              label="Kind of Degree"
              value={singleCandidate?.education?.[0]?.degree_type || "N/A"}
            />
            <SmallComponent
              label="Course of Study Graduated from"
              value={
                singleCandidate?.education?.[0]?.specific_course_of_study ||
                "N/A"
              }
            />
            <SmallComponent
              label="Class of Degree"
              value={
                singleCandidate?.education?.[0]?.class_of_degree || "No degree"
              }
            />
            <SmallComponent
              label="Specific CGPA"
              value={singleCandidate?.education?.[0]?.specific_cgpa || "N/A"}
            />
            <SmallComponent
              label="Do you have a masters degree?"
              value={
                `${
                  singleCandidate?.education?.has_advanced_degree ? "Yes" : "No"
                }` || "N/A"
              }
            />
            <SmallComponent
              label="Kind of degree?"
              value={candidate?.degree?.[1]?.degree || "N/A"}
            />
            <SmallComponent
              label="Course of Study Graduated from with master"
              value={candidate?.degree?.[1]?.course || "N/A"}
            />
            <SmallComponent
              label="Class of Degree (Masters)"
              value={`${candidate?.degree?.[1]?.cgpa_class}` || "N/A"}
            />
            <SmallComponent
              label="Specific CGPA for Masters"
              value={candidate?.degree?.[1]?.cgpa || "N/A"}
            />
            <SmallComponent
              label="Country(ies) you are INTERESTED In"
              value={
                `${candidate?.countries?.map(
                  (country: any) => country.name
                )}` || "No selected country"
              }
            />
            <SmallComponent
              label="Type of Academic Degree Interested in Abroad"
              value={`${candidate?.interest?.academic_type}` || "N/A"}
            />
            <SmallComponent
              label="Academic program or course in mind that aligns with your professional experience"
              value={`${candidate?.interest?.specific_program}` || "N/A"}
            />
            <SmallComponent
              label="Are you opened to taking the GMAT or GRE if it is required"
              value={`${candidate?.interest?.open_to_gmat}` || "N/A"}
            />
            <SmallComponent
              label="Preferred Universities"
              value={`${candidate?.interest?.specific_university}` || "N/A"}
            />
          </div>
        </div>
      </section>
    </CandidateNewLayout>
  );
}
