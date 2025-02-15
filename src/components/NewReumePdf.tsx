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
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

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

const processJobExperiences = (formData: any) => {
  return formData.job_experience
    .sort((a: JobExperience, b: JobExperience) => a.id - b.id)
    .slice(0, 3);
};

const manageCookies = (jobExperiences: JobExperience[]) => {
  jobExperiences.forEach((job, index) => {
    Cookies.set(`work_experience_id${index + 1}`, String(job.id), {
      expires: 7,
    });
  });

  // Clear extra cookies if necessary
  for (let i = jobExperiences.length + 1; i <= 3; i++) {
    Cookies.remove(`work_experience_id${i}`);
  }
};

const manageAdvancedEducationCookies = (educationData: AdvancedEducation[]) => {
  if (educationData.length > 0) {
    const sortedAdvancedEducation = educationData.sort((a, b) => a.id - b.id);

    Cookies.set(
      "advanced_education1_id",
      String(sortedAdvancedEducation[0].id),
      {
        expires: 7,
      }
    );
  } else {
    Cookies.remove("advanced_education1_id");
  }
};

const retrieveAdvancedEducationFromCookies = (formData: any) => {
  const advancedEducationIdFromCookie = Cookies.get("advanced_education1_id");

  if (!advancedEducationIdFromCookie) return null;

  const matchedEducation = formData?.advanced_education?.find(
    (edu: AdvancedEducation) => String(edu.id) === advancedEducationIdFromCookie
  );

  return matchedEducation || null;
};

const retrieveJobsFromCookies = (formData: any) => {
  const workExperienceIdsFromCookies = [
    Cookies.get("work_experience_id1"),
    Cookies.get("work_experience_id2"),
    Cookies.get("work_experience_id3"),
  ].filter(Boolean);

  const retrievedIds =
    formData?.job_experience?.map((job: JobExperience) => job.id) || [];

  return retrievedIds
    .filter((id: string) => workExperienceIdsFromCookies.includes(String(id)))
    .sort((a: any, b: any) => a - b);
};

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

  const [myJobs, setMyJobs] = useState<JobExperience[]>([]);
  const [selectedEducation, setSelectedEducation] =
    useState<AdvancedEducation | null>(null);

  useEffect(() => {
    if (formData) {
      const sortedJobExperiences = processJobExperiences(formData);

      manageCookies(sortedJobExperiences);

      const matchingSortedIds = retrieveJobsFromCookies(formData);

      const jobExperiences = formData.job_experience
        ?.filter((job: JobExperience) => matchingSortedIds.includes(job.id))
        .sort(
          (a: JobExperience, b: JobExperience) =>
            matchingSortedIds.indexOf(a.id) - matchingSortedIds.indexOf(b.id)
        );

      setMyJobs(jobExperiences);

      // Process advanced education
      if (formData?.advanced_education?.length) {
        manageAdvancedEducationCookies(formData.advanced_education);
      }
      const matchedEducation = retrieveAdvancedEducationFromCookies(formData);
      setSelectedEducation(matchedEducation);
    }
  }, [formData]);

  if (singleCandidateLoading) {
    return <FinalResumeSkeleton />;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  const businessNameWithCurrentJob =
    myJobs?.find((job: JobExperience) => job.job_status === "current")
      ?.job_title || "No current job";

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
                  {formData?.email_address || formData?.user?.email}
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
              <Text style={styles.smallBold}>{businessNameWithCurrentJob}</Text>
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
                  {formatMonthDay(formData?.birth_date || "")}
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
            {myJobs.map((experience: JobExperience) =>
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

            {formData?.education[0]?.has_advanced_degree &&
              selectedEducation && (
                <View>
                  <View style={styles.moreClasses}>
                    {selectedEducation.advanced_degree_type} (
                    {selectedEducation.graduate_type})
                  </View>
                  <View style={styles.smGap3}>
                    <Text style={styles.smallText}>
                      {selectedEducation.school_name},{" "}
                      {getCountryNameFromISO(selectedEducation.country)}
                    </Text>
                    <Text style={styles.semiBold}>|</Text>
                    <Text style={styles.semiBold}>
                      Graduated{" "}
                      {formatDate(String(selectedEducation.graduation_date))}
                    </Text>
                  </View>
                </View>
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
