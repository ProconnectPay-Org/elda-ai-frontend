import { ACSCandidateProps } from "@/types";
import SmallComponent from "./SmallComponent";
import AcsLoading from "./AcsLoading";

interface CandidateDetailsProps {
  candidate: ACSCandidateProps | null;
}

const EducationData = ({ candidate }: CandidateDetailsProps) => {
  if (!candidate) {
    return <AcsLoading />;
  }
  return (
    <div className="p-6 md:max-w-[760px]">
      {/* EDUCATIONAL DATA */}
      <p className="text-xl font-semibold">Educational Data</p>
      <div className="space-y-4">
        <SmallComponent
          label="Graduate Of"
          value={candidate.graduate_of || "No name"}
        />
        <SmallComponent
          label="Name of University"
          value={candidate.degree?.[0]?.institution || "N/A"}
        />
        <SmallComponent
          label="Kind of Degree"
          value={candidate.degree?.[0]?.degree || "N/A"}
        />
        <SmallComponent
          label="Course of Study Graduated from"
          value={candidate.degree?.[0]?.course || "N/A"}
        />
        <SmallComponent
          label="Class of Degree"
          value={candidate.degree?.[0]?.cgpa_class || "No degree"}
        />
        <SmallComponent
          label="Specific CGPA"
          value={candidate.degree?.[0]?.cgpa || "N/A"}
        />
        <SmallComponent
          label="Do you have a masters degree?"
          value={`${candidate.has_masters_degree ? "Yes" : "No"}` || "N/A"}
        />
        <SmallComponent
          label="School of masters degree?"
          value={candidate.degree?.[1]?.institution || "N/A"}
        />
        <SmallComponent
          label="Kind of degree?"
          value={candidate.degree?.[1]?.degree || "N/A"}
        />
        <SmallComponent
          label="Course of Study Graduated from with master"
          value={candidate.degree?.[1]?.course || "N/A"}
        />
        <SmallComponent
          label="Class of Degree (Masters)"
          value={`${candidate.degree?.[1]?.cgpa_class}` || "N/A"}
        />
        <SmallComponent
          label="Specific CGPA for Masters"
          value={candidate.degree?.[1]?.cgpa || "N/A"}
        />
        <SmallComponent
          label="Country(ies) you are INTERESTED In"
          value={
            `${candidate.countries?.map((country: any) => country.name)}` ||
            "No selected country"
          }
        />
        <SmallComponent
          label="Type of Academic Degree Interested in Abroad"
          value={`${candidate.interest?.academic_type}` || "N/A"}
        />
        <SmallComponent
          label="Academic program or course in mind that aligns with your professional experience"
          value={`${candidate.interest?.specific_program}` || "N/A"}
        />
        <SmallComponent
          label="Are you opened to taking the GMAT or GRE if it is required"
          value={`${candidate.interest?.open_to_gmat}` || "N/A"}
        />
        <SmallComponent
          label="Preferred Universities"
          value={`${candidate.interest?.specific_university}` || "N/A"}
        />
      </div>
    </div>
  );
};

export default EducationData;
