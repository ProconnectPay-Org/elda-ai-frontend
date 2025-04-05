import CandidateNewLayout from "@/layouts/CandidateNewLayout";
import { useCandidates } from "@/hooks/useCandidiates";
import Cookies from "js-cookie";
import SmallComponent from "@/components/acs-components/SmallComponent";
import { AdvancedEducation } from "@/types";
import { getCountryNameFromISO } from "@/lib/utils";

export default function CandidateInformation() {
  const candidate_id = Cookies.get("candidate_id");
  const advancedEducationId = Cookies.get("advanced_education1_id");
  const { singleCandidate } = useCandidates(candidate_id);

  // Get the matching advanced education object
  const matchingAdvancedEducation = singleCandidate?.advanced_education?.find(
    (edu: AdvancedEducation) => edu?.id?.toString() === advancedEducationId
  );

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
              value={`${singleCandidate?.user?.email}` || "Not filled yet"}
            />
            <SmallComponent
              label="Preferred Call Name"
              value={
                `${singleCandidate?.preferred_call_name}` || "No name set yet"
              }
            />
            <SmallComponent
              label="Personal Phone Number"
              value={singleCandidate?.phone_number || "Not filled yet"}
            />
            <SmallComponent
              label="Gender"
              value={singleCandidate?.gender || "No gender"}
            />
            <SmallComponent
              label="Date of birth"
              value={`${singleCandidate?.birth_date}` || "Not filled yet"}
            />
            <SmallComponent
              label="Maiden Name"
              value={`${singleCandidate?.maiden_name}` || "N/A"}
            />
            <SmallComponent
              label="City of birth"
              value={`${singleCandidate?.city_of_birth}` || "Not filled yet"}
            />
            <SmallComponent
              label="State of birth"
              value={`${singleCandidate?.state_of_birth}` || "Not filled yet"}
            />
            <SmallComponent
              label="Country of birth"
              value={`${singleCandidate?.country_of_birth}` || "Not filled yet"}
            />
            <SmallComponent
              label="Country of Residence"
              value={
                `${singleCandidate?.country_current_reside}` || "Not filled yet"
              }
            />
            <SmallComponent
              label="State of Residence"
              value={
                `${singleCandidate?.state_current_reside}` || "Not filled yet"
              }
            />
            <SmallComponent
              label="City of residence"
              value={
                `${singleCandidate?.city_current_reside}` || "Not filled yet"
              }
            />
            <SmallComponent
              label="House Address"
              value={
                `${singleCandidate?.current_house_address}` || "Not filled yet"
              }
            />
            <SmallComponent
              label="Postal Address"
              value={`${singleCandidate?.postal_code}` || "Not filled yet"}
            />
          </div>
        </div>

        {/* Educational Data Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Educational Data</h2>
          <div className="space-y-4 max-w-3xl">
            <SmallComponent
              label="Current Status"
              value={
                singleCandidate?.education[0]?.current_status || "Not filled"
              }
            />
            <SmallComponent
              label="Kind of Degree"
              value={singleCandidate?.education[0]?.degree_type || "Not filled"}
            />
            <SmallComponent
              label="Country of Education"
              value={singleCandidate?.education?.[0]?.country || "Not filled"}
            />
            <SmallComponent
              label="Course of Study"
              value={
                singleCandidate?.education?.[0]?.specific_course_of_study ||
                "Not filled"
              }
            />
            <SmallComponent
              label="Class of Degree"
              value={
                singleCandidate?.education?.[0]?.class_of_degree || "Not filled"
              }
            />
            <SmallComponent
              label="Specific CGPA"
              value={
                singleCandidate?.education?.[0]?.specific_cgpa || "Not filled"
              }
            />
            <SmallComponent
              label="Name of Institution"
              value={
                singleCandidate?.education?.[0]?.school_name || "Not filled"
              }
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
              label="Kind of degree (Masters)"
              value={matchingAdvancedEducation?.advanced_degree_type || "N/A"}
            />
            <SmallComponent
              label="Graduate Type (Masters)"
              value={matchingAdvancedEducation?.graduate_type || "N/A"}
            />
            <SmallComponent
              label="Class of Degree (Masters)"
              value={`${matchingAdvancedEducation?.class_of_degree}` || "N/A"}
            />
            <SmallComponent
              label="Specific CGPA (Masters)"
              value={matchingAdvancedEducation?.specific_cgpa || "N/A"}
            />
            <SmallComponent
              label="Country of Study (Masters)"
              value={
                getCountryNameFromISO(matchingAdvancedEducation?.country) ||
                "N/A"
              }
            />
            <SmallComponent
              label="Name of School (Masters)"
              value={matchingAdvancedEducation?.school_name || "N/A"}
            />
            <SmallComponent
              label="Year Admitted (Masters)"
              value={matchingAdvancedEducation?.admission_date || "N/A"}
            />
            <SmallComponent
              label="Year Graduated (Masters)"
              value={matchingAdvancedEducation?.graduation_date || "N/A"}
            />
          </div>
        </div>
      </section>
    </CandidateNewLayout>
  );
}
