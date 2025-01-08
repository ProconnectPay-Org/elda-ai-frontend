import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useCandidates } from "@/hooks/useCandidiates";
import { useParams } from "react-router-dom";
import FinalResumeSkeleton from "@/components/FinalResumeSkeleton";
import {
  AdvancedEducation,
  CandidateCareer,
  CareerInterest,
  EducationHistory,
  JobExperience,
} from "@/types";
import {
  formatDate,
  formatMonthDay,
  getCountryNameFromISO,
  getDemonymFromISO,
} from "@/lib/utils";

// Define your styles
const styles = StyleSheet.create({
  page: {
    width: "896px", // Fixed A4 width
    height: "1124px", // Fixed A4 height
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 0,
    margin: 0,
    overflow: "hidden",
    position: "relative",
    top: -25,
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
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  resumeUsername: {
    fontWeight: 700,
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
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  utilityClass: {
    width: "200px",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 700,
  },
  flexItemsCenterGap3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  flex: { display: "flex" },
  smallText: { fontSize: "14px", lineHeight: 1.5, textAlign: "justify" },
  careerInterestText: {
    fontSize: "14px",
    lineHeight: 1.5,
    textAlign: "justify",
    textTransform: "capitalize",
  },
  blueSmallText: {
    color: "#1e3a8a",
    fontSize: "14px",
    lineHeight: 1.5,
    textAlign: "justify",
  },
  fontBold: {
    fontWeight: 700,
  },
  fontMedTextSm: {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: 1.5,
  },
  smallBold: {
    fontWeight: 600,
    fontSize: "0.875rem",
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
    alignItems: "center",
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
    fontSize: "14px",
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
    marginBottom: "4px",
  },
  mb2: {
    marginBottom: "8px",
  },
  break: {
    display: "flex",
    flexDirection: "column",
  },
});

const NewResumePdf = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error("No ID provided");
    return null;
  }

  const {
    singleCandidate: formData,
    singleCandidateLoading,
    singleCandidateError,
  } = useCandidates(id);  

  if (singleCandidateLoading) {
    return <FinalResumeSkeleton />;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  const jobCount = formData?.career[0]?.jobs_to_show || 0;  

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.flexSection}>
            <Text style={styles.resumeUsername}>
              <span>{formData?.first_name}</span>
              <span>&nbsp;</span> {/* Explicit space */}
              <span>{formData?.middle_name}</span>
              <span>&nbsp;</span> {/* Explicit space */}
              <span>{formData?.last_name}</span>
            </Text>

            <View style={styles.specialClass}>
              <View style={styles.newClass}>
                ✉️
                <Text style={styles.blueSmallText}>
                  {formData?.email_address}
                </Text>
              </View>
              <Text style={styles.semiBold}>|</Text>
              <View style={styles.newClass}>
                📞
                <Text style={styles.smallText}>{formData?.phone_number}</Text>
              </View>
              <Text style={styles.semiBold}>|</Text>
              <View style={styles.newClass}>
                🌎
                <Text style={styles.smallText}>
                  {formData?.city_of_birth}, {formData?.state_of_birth} State,{" "}
                  {getCountryNameFromISO(formData?.country_of_birth)}
                </Text>
              </View>
            </View>

            <View style={styles.flexItemsCenterGap3}>
              <Text style={styles.smallBold}>
                {formData?.career[0].profession}
              </Text>
              <Text style={styles.semiBold}>|</Text>
              <Text style={styles.smallBold}>Global Citizen</Text>
              <Text style={styles.semiBold}>|</Text>
              <Text style={styles.smallBold}>{formData?.career[0].sector}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>CAREER STRATEGIC PURPOSE</Text>
            <Text style={styles.smallText}>
              {formData?.career_strategic_purpose ||
                formData?.sop?.[0]?.text ||
                "Not Provided"}
            </Text>
          </View>

          {/* PERSONAL DETAILS */}
          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>PERSONAL BIODATA</Text>
            <View>
              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Date of Birth:</Text>
                <Text style={styles.width200TextSm}>
                  {formatMonthDay(formData?.birth_date)}
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Gender:</Text>
                <Text style={styles.width200TextSm}>{formData?.gender}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Nationality:</Text>
                <Text style={styles.width200TextSm}>
                  {getDemonymFromISO(formData?.country_of_birth)}
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Interests:</Text>
                <Text style={styles.careerInterestText}>
                  {formData?.career
                    ?.flatMap((item: CandidateCareer) =>
                      item.career_interests
                        .slice(0, 3)
                        .map((interest: CareerInterest) => interest.name)
                    )
                    .join(", ") || "Not Provided"}
                </Text>
              </View>

              <View style={styles.flex}>
                <Text style={styles.utilityClass}>Preferred Call Name:</Text>
                <Text style={styles.widthCapitalize}>
                  {formData?.preferred_call_name || "Not Provided"}
                </Text>
              </View>
            </View>
          </View>

          {/* WORK EXPERIENCE */}
          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>WORK EXPERIENCE</Text>
            {formData?.job_experience
              ?.slice(0, jobCount)
              .map((experience: JobExperience) =>
                experience.business_name ? (
                  <View key={experience.id} style={styles.mb2}>
                    <View>
                      <Text style={styles.smallBold}>
                        {experience.business_name}: {experience.job_title}
                      </Text>
                      <View style={styles.flexItemsCenterGap3}>
                        <Text style={styles.fontMedTextSm}>
                          📍 Location: {experience.state}, {experience.country}
                        </Text>
                        <Text style={styles.semiBold}>|</Text>
                        <Text style={styles.fontMedTextSm}>
                          📅 Duration: {formatDate(experience.year_started)} -{" "}
                          {experience.year_ended === "1960-01-01"
                            ? "Till Date"
                            : formatDate(experience.year_ended) || "Till Date"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.break}>
                      <Text style={styles.redBoldSm}>
                        Job Description and Key Achievements
                      </Text>
                      <Text style={styles.smallText}>
                        {experience.job_summary}
                      </Text>
                    </View>
                  </View>
                ) : null
              )}
          </View>

          {/* EDUCATION DETAILS */}
          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>EDUCATION AND TRAINING</Text>
            {formData?.education?.map((item: EducationHistory) => (
              <View key={item.id} style={styles.my1}>
                <Text style={styles.capSmallBold}>
                  {item.degree_type} ({item.specific_course_of_study}){" "}
                </Text>
                <View style={styles.smGap3}>
                  {item.school_name}, {getCountryNameFromISO(item.country)}{" "}
                  <Text style={styles.semiBold}>|</Text>
                  <Text style={styles.semiBold}>
                    Graduated {formatDate(String(item.graduation_date))}
                  </Text>
                </View>
              </View>
            ))}
            {formData?.advanced_education?.map((item: AdvancedEducation) =>
              item.admission_date === null ||
              !item.advanced_degree_type ? null : (
                <View key={item.id}>
                  <View style={styles.moreClasses}>
                    {item.advanced_degree_type} ({item.graduate_type}){" "}
                    <Text style={styles.semiBold}>|</Text>
                    Graduated {formatDate(String(item.graduation_date))}
                  </View>
                  <Text style={styles.smallText}>
                    {item.school_name}, {getCountryNameFromISO(item.country)}
                  </Text>
                </View>
              )
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.resumeTitleText}>REFERENCES</Text>
            <Text>Available on request</Text>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default NewResumePdf;
