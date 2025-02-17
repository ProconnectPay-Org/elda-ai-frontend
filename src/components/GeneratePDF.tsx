import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
  View,
  Font,
} from "@react-pdf/renderer";
import ResumePdf from "./ResumePdf";

// Font.register({ family: "Roboto", src: source });
Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});
Font.registerEmojiSource({
  format: "png",
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

// Styles for react-pdf
const styles = StyleSheet.create({
  page: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 30,
    paddingTop: 30,
    margin: 0,
  },
  section: {
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  flexSection: {
    backgroundColor: "#f1f8f9",
    padding: 20,
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    top: -30,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  resumeUsername: {
    fontWeight: "extrabold",
    fontSize: "36px",
    lineHeight: "40px",
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  resumeTitleText: {
    fontWeight: 700,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    color: "#102694",
  },
  resumeInnerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  width200TextSm: {
    width: "200px",
    fontSize: "14px",
    lineHeight: "1.25rem",
  },
  utilityClass: {
    width: "200px",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "bold",
  },
  flexItemsCenterGap3: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    gap: "10px",
  },
  flex: { display: "flex", flexDirection: "row", alignItems: "center" },
  smallText: { fontSize: "14px", lineHeight: "24px", textAlign: "justify" },
  careerInterestText: {
    fontSize: "14px",
    lineHeight: "1.5rem",
    textAlign: "justify",
    textTransform: "capitalize",
  },
  blueSmallText: {
    color: "#1e3a8a",
    fontSize: "14px",
    lineHeight: "1.5rem",
    textAlign: "justify",
  },
  fontBold: {
    fontWeight: 700,
  },
  fontMedTextSm: {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "1.5rem",
  },
  smallBold: {
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "1.25rem",
  },
  capSmallBold: {
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    textTransform: "capitalize",
  },
  semiBold: {
    fontWeight: 600,
  },
  newClass: {
    display: "flex",
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: "4px",
  },
  specialClass: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  moreClasses: {
    fontWeight: 600,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    textTransform: "capitalize",
  },
  smGap3: {
    fontSize: "12px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  redBoldSm: {
    color: "red",
    fontWeight: 700,
    fontSize: "14px",
  },
  widthCapitalize: {
    width: "200px",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    textTransform: "capitalize",
  },
  my1: {
    marginTop: "4px",
    marginBottom: "8px",
  },
  mb2: {
    marginBottom: "8px",
  },
  break: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
});

const GeneratePDF: React.FC = () => {
  // react-pdf Document
  const MyDocument = () => (
    <Document>
      <Page size={"A3"} style={styles.page}>
        <View style={{ position: "relative", top: -20 }}>
          <View style={styles.flexSection}>
            <View style={styles.resumeUsername}>
              <Text style={{ fontWeight: "heavy" }}>Suleiman</Text>
              {/* <Text>&nbsp;</Text> Explicit space */}
              <Text style={{ fontWeight: "heavy" }}>Oluwaseun</Text>
              {/* <Text>&nbsp;</Text> Explicit space */}
              <Text style={{ fontWeight: "heavy" }}>Oyetunde</Text>
            </View>

            <View style={styles.specialClass}>
              <View style={styles.newClass}>
                <Text>✉️</Text>
                <Text style={styles.blueSmallText}>songlover854@gmail.com</Text>
              </View>
              <Text style={styles.semiBold}>|</Text>
              <View style={styles.newClass}>
                <Text>📞</Text>
                <Text style={styles.smallText}>2349169869272</Text>
              </View>
              <Text style={styles.semiBold}>|</Text>
              <View style={styles.newClass}>
                <Text>🌎</Text>
                <Text style={styles.smallText}>
                  Sango, Ota, Lagos State, Nigeria
                </Text>
              </View>
            </View>

            <View style={styles.flexItemsCenterGap3}>
              <Text style={styles.smallBold}>Mechanic</Text>
              <Text style={styles.semiBold}>|</Text>
              <Text style={styles.smallBold}>Global Citizen</Text>
              <Text style={styles.semiBold}>|</Text>
              <Text style={styles.smallBold}>Engineering</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>CAREER STRATEGIC PURPOSE</Text>
            <Text style={styles.smallText}>
              I am embarking on an exhilarating journey to build a global career
              that resonates with my passion for technology and innovation. As I
              pursue a global postgraduate education, I am actively seeking
              opportunities to deepen my understanding of IT and its
              transformative potential across diverse industries. My recent
              experiences in enhancing operational efficiency and implementing
              data-driven solutions have ignited a desire to collaborate with
              professionals from various cultural backgrounds, fostering an
              exchange of ideas that transcends borders. I am committed to
              leveraging my skills in data analysis and process optimization to
              contribute meaningfully to global projects, while continuously
              expanding my knowledge and perspective. By immersing myself in a
              rich academic environment and engaging with thought leaders
              worldwide, I am shaping a future where I can make a significant
              impact in the tech landscape on a global scale.
            </Text>
          </View>

          {/* PERSONAL DETAILS */}
          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>PERSONAL BIODATA</Text>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.utilityClass}>Date of Birth:</Text>
                <Text style={styles.width200TextSm}>26th August</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Gender:</Text>
                <Text style={styles.width200TextSm}>Male</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Nationality:</Text>
                <Text style={styles.width200TextSm}>Nigerian</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Interests:</Text>
                <Text style={{ fontSize: "14px" }}>
                  Development, Aeronautics, Software engineering
                </Text>
              </View>

              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Preferred Call Name:</Text>
                <Text style={styles.widthCapitalize}>Wale</Text>
              </View>
            </View>
          </View>

          {/* WORK EXPERIENCE */}
          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>WORK EXPERIENCE</Text>

            <View style={styles.mb2}>
              <View>
                <Text style={styles.smallBold}>
                  Proconnect an EduFintech: Frontend Developer
                </Text>
                <View style={styles.flexItemsCenterGap3}>
                  <Text style={styles.fontMedTextSm}>
                    📍 Location: Lagos, NG
                  </Text>
                  <Text style={styles.semiBold}>|</Text>
                  <Text style={styles.fontMedTextSm}>
                    📅 Duration: January 2024 - Till Date
                  </Text>
                </View>
              </View>
              <View style={styles.break}>
                <Text style={styles.redBoldSm}>
                  Job Description and Key Achievements
                </Text>
                <Text style={styles.smallText}>
                  As a frontend developer at ProConnect, I transform Figma
                  designs into fully functional websites, enhancing user
                  experience and engagement. I have successfully implemented
                  innovative solutions that streamline the development process,
                  reducing project turnaround time by 30%. By utilizing modern
                  frameworks and technologies, I ensure that our platforms are
                  not only visually appealing but also highly efficient,
                  attracting thousands of users each month. My commitment to
                  continuous improvement has led me to initiate a user feedback
                  loop that informs our design and development strategies,
                  resulting in a 25% increase in user satisfaction ratings.
                  Through collaboration with cross-functional teams, I
                  contribute to the overall success of our projects, driving
                  both innovation and performance within the company.
                </Text>
              </View>
            </View>
            <View style={styles.mb2}>
              <View>
                <Text style={styles.smallBold}>
                  Proconnect an EduFintech: Frontend Developer
                </Text>
                <View style={styles.flexItemsCenterGap3}>
                  <Text style={styles.fontMedTextSm}>
                    📍 Location: Lagos, NG
                  </Text>
                  <Text style={styles.semiBold}>|</Text>
                  <Text style={styles.fontMedTextSm}>
                    📅 Duration: January 2024 - Till Date
                  </Text>
                </View>
              </View>
              <View style={styles.break}>
                <Text style={styles.redBoldSm}>
                  Job Description and Key Achievements
                </Text>
                <Text style={styles.smallText}>
                  As a frontend developer at ProConnect, I transform Figma
                  designs into fully functional websites, enhancing user
                  experience and engagement. I have successfully implemented
                  innovative solutions that streamline the development process,
                  reducing project turnaround time by 30%. By utilizing modern
                  frameworks and technologies, I ensure that our platforms are
                  not only visually appealing but also highly efficient,
                  attracting thousands of users each month. My commitment to
                  continuous improvement has led me to initiate a user feedback
                  loop that informs our design and development strategies,
                  resulting in a 25% increase in user satisfaction ratings.
                  Through collaboration with cross-functional teams, I
                  contribute to the overall success of our projects, driving
                  both innovation and performance within the company.
                </Text>
              </View>
            </View>
          </View>

          {/* EDUCATION DETAILS */}
          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>EDUCATION AND TRAINING</Text>
            <View style={styles.my1}>
              <Text style={styles.capSmallBold}>
                Bachelor of Science (BSC) (Physics)
              </Text>
              <View style={styles.smGap3}>
                <Text style={styles.smallText}>
                  University Of Lagos, Nigeria
                </Text>
                <Text style={styles.semiBold}>|</Text>
                <Text style={styles.semiBold}>Graduated December 2024</Text>
              </View>
            </View>

            <View
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <View style={styles.moreClasses}>
                <Text>MSC (Master of Engineering (M.ENG)) </Text>
                <Text style={styles.semiBold}>|</Text>
                <Text>Graduated December 2024</Text>
              </View>
              <Text style={styles.smallText}>
                University of Ibadan, Nigeria
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>REFERENCES</Text>
            <Text>Available on request</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  // ReactPDF.render(<MyDocument />);

  return (
    <div>
      {/* <MyDocument /> */}
      <ResumePdf />

      {/* Download Link */}
      <PDFDownloadLink
        document={<MyDocument />}
        fileName="generated-document.pdf"
        style={{
          display: "inline-block",
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#db2135",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Download PDF
      </PDFDownloadLink>

      {/* Hidden Section for Pre-rendering */}
    </div>
  );
};

export default GeneratePDF;
