import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useCandidates } from "@/hooks/useCandidiates";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import Cookies from "js-cookie";

const SopTemplate = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return null;
  }

  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  if (singleCandidateLoading) {
    return (
      <div className="flex items-center justify-center">
        Loading SOP...
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  const sopText = singleCandidate?.sop
    ?.at(-1)
    ?.text.replace(/^\*\*?Statement of Purpose\*\*?/i, "");

  // Define styles for the PDF
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      // lineHeight: 1.5,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 8, // Reduce the margin here
      textTransform: "uppercase",
      color: "#db251a",
      lineHeight: 1.5,
    },
    paragraph: {
      marginBottom: 6, // Ensure this isn't excessively large
      textAlign: "justify",
      lineHeight: 1.4,
    },
  });

  const userRole = Cookies.get("user_role");

  // Create the PDF Document
  const SOPDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          STATEMENT OF PURPOSE FOR {singleCandidate?.last_name}{" "}
          {singleCandidate?.first_name} {singleCandidate?.middle_name}: PURSUING
          AN {singleCandidate?.program_type1} IN{" "}
          {singleCandidate?.assigned_course1} AT{" "}
          {singleCandidate?.assigned_university1}
        </Text>
        {sopText?.split("\n").map((paragraph: string, index: number) => (
          <Text key={index} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className="py-4 px-8">
      <div className="px-8">
        <h1 className="text-red font-bold text-center mb-4 text-xl uppercase">
          STATEMENT OF PURPOSE FOR {singleCandidate?.last_name}{" "}
          {singleCandidate?.first_name} {singleCandidate?.middle_name}: PURSUING
          AN {singleCandidate?.program_type1} IN{" "}
          {singleCandidate?.assigned_course1} AT{" "}
          {singleCandidate?.assigned_university1}
        </h1>
        <div>
          {sopText?.split("\n").map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 text-lg text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {userRole !== "candidate" && (
        <PDFDownloadLink
          document={<SOPDocument />}
          fileName={`${singleCandidate?.first_name || "Candidate"}_SOP.pdf`}
          className="my-5 bg-red text-white px-4 py-2 rounded"
        >
          Download SOP
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default SopTemplate;
