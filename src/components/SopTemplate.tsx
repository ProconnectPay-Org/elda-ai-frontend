import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
  View,
} from "@react-pdf/renderer";
import { useCandidates } from "@/hooks/useCandidiates";
import { useParams, useSearchParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import Cookies from "js-cookie";

const SopTemplate = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // school1 or school2
  const prefix = type === "school2" ? "2" : "1"; // Determine the prefix

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
      paddingBottom: 16,
      width: "896px", // Fixed A4 width
      height: "1124px", // Fixed A4 height
      // lineHeight: 1.5,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: -28,
      textTransform: "uppercase",
      color: "#db251a",
      lineHeight: 1.5,
    },
    paragraph: {
      textAlign: "justify",
      lineHeight: 1.4,
    },
  });

  const userRole = Cookies.get("user_role");

  // Create the PDF Document
  const SOPDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>
            STATEMENT OF PURPOSE FOR {singleCandidate?.last_name}{" "}
            {singleCandidate?.first_name} {singleCandidate?.middle_name}:
            PURSUING AN {singleCandidate?.[`program_type${prefix}`]} IN{" "}
            {singleCandidate?.[`assigned_course${prefix}`]} AT{" "}
            {singleCandidate?.[`assigned_university${prefix}`]}
          </Text>
        </View>
        <View>
          {sopText?.split("\n").map((paragraph: string, index: number) => (
            <Text style={styles.paragraph} key={index}>
              {paragraph}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="py-4 px-8">
      <div className="px-8">
        <h1 className="text-red font-bold text-center mb-4 text-xl uppercase">
          STATEMENT OF PURPOSE FOR {singleCandidate?.last_name}{" "}
          {singleCandidate?.first_name} {singleCandidate?.middle_name}: PURSUING
          AN {singleCandidate?.[`program_type${prefix}`]} IN{" "}
          {singleCandidate?.[`assigned_course${prefix}`]} AT{" "}
          {singleCandidate?.[`assigned_university${prefix}`]}
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
          fileName={`${
            singleCandidate?.first_name || "Candidate"
          }_SOP${prefix}.pdf`}
          className="my-5 bg-red text-white px-4 py-2 rounded"
        >
          Download SOP {prefix}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default SopTemplate;
