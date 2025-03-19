import { useForm } from "react-hook-form";
import PcpLogo from "@/assets/proconnect-logo-new-no-bg.png";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { typeOfAcademicDegreeOptions, yesNoOptions } from "@/constants";
import { onboardSchema2 } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import { useSearchParams } from "react-router-dom";
import { ICountry } from "country-state-city";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import PersonalInformationForm from "@/components/onboard/PersonalInformationForm";
import CountrySelector from "@/components/onboard/CountrySelector";
import FileUpload from "@/components/onboard/FileUpload";
import SaveBtn from "@/components/SaveBtn";
import DegreeForm from "@/components/onboard/DegreeForm";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Onboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof onboardSchema2>>({
    resolver: zodResolver(onboardSchema2),
    mode: "onBlur",
  });
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      if (!email) return;
      try {
        const { data } = await axios.get(
          `${API_URL}onboarding-candidate/s/${email}/`
        );

        if (Array.isArray(data.degree) && data.degree.length > 0) {
          // Sort degrees by id in ascending order
          const sortedDegrees = [...data.degree].sort((a, b) => a.id - b.id);

          // Store the first two IDs in cookies if they exist
          if (sortedDegrees[0]?.id) {
            Cookies.set("first_degree_id", String(sortedDegrees[0].id));
          }
          if (sortedDegrees[1]?.id) {
            Cookies.set("second_degree_id", String(sortedDegrees[1].id));
          }
        }

        // for countries
        if (Array.isArray(data.countries) && data.countries.length > 0) {
          // Sort countries by id in ascending order
          const sortedCountries = [...data.countries].sort(
            (a, b) => a.id - b.id
          );

          // Store the first two IDs in cookies if they exist
          if (sortedCountries[0]?.id) {
            Cookies.set("first_country_id", String(sortedCountries[0].id));
          }
          if (sortedCountries[1]?.id) {
            Cookies.set("second_country_id", String(sortedCountries[1].id));
          }
        }

        const nameParts = data.full_name?.split(" ") || [];
        const [first_name, middle_name, surname] =
          nameParts.length === 3
            ? nameParts
            : [nameParts[0], "", nameParts[1] || ""];
        form.reset({
          membershipStatus: data.membership || "",
          emailAddress: data.email,
          firstName: first_name || "",
          middleName: middle_name || "",
          surname: surname || "",
          phoneNumber: data.phone_number,
          whatsappNumber: data.whatsapp,
          gender: data.gender || "Male",
          dateOfBirth: data.date_of_birth
            ? new Date(data.date_of_birth)
            : undefined,
          age: data.age,
          // First degree
          graduateOf: data.graduate_of || "Polytechnic",
          specificCGPA: data.degree?.[0]?.cgpa || "",
          degreeClass: data.degree?.[0]?.cgpa_class || "",
          courseOfStudy: data.degree?.[0]?.course || "",
          kindOfDegree: data.degree?.[0]?.degree || "",
          institutionName: data.degree?.[0]?.institution || "",

          // Second degree
          hasMasters: data.has_masters_degree ? "true" : "false",
          specificCGPAMasters: data.degree?.[1]?.cgpa || "",
          classOfDegreeMasters: data.degree?.[1]?.cgpa_class || "",
          mastersCourse: data.degree?.[1]?.course || "",
          mastersDegree: data.degree?.[1]?.degree || "",
          mastersInstitution: data.degree?.[1]?.institution || "",

          // Countries of Interest
          countriesOfInterest:
            data.countries?.map((c: ICountry) => c.name) || [],

          typeOfAcademicDegree: data.interest?.academic_type || "",
          GMATGRE: data.interest?.open_to_gmat == "Yes" ? "true" : "false",
          academicProgram: data.interest?.specific_program || "",
          specificUniversity: data.interest?.specific_university || "",
        });
        const trimmedResume = data.resume.split("/").pop()?.split("?")[0];
        setSelectedFile(trimmedResume);
        form.setValue("uploadCV", trimmedResume);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };

    fetchCandidateDetails();
  }, [email]);

  const onSubmit = async (data: z.infer<typeof onboardSchema2>) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${API_URL}onboarding-candidate/s/${data.emailAddress}/`,
        {
          ...data,
          membership: data.membershipStatus,
          full_name: [data.firstName, data.middleName, data.surname]
            .filter(Boolean)
            .join(" "),
          email: data.emailAddress,
          phone_number: data.phoneNumber,
          gender: data.gender,
          graduate_of: data.graduateOf,
          date_of_birth: data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split("T")[0]
            : null,
          age: data.age,
          whatsapp: data.whatsappNumber,
          specific_cgpa: data.specificCGPA,
          has_masters_degree: data.hasMasters === "true",
          class_of_degree: data.degreeClass,
          interest: {
            academic_type: data.typeOfAcademicDegree,
            open_to_gmat: data.GMATGRE === "true" ? "Yes" : "No",
            specific_program: data.academicProgram,
            specific_university: data.specificUniversity,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        toast({
          title: "Success",
          description: "Your form has been submitted successfully.",
          variant: "default",
          className: "bg-green-500 text-white",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: `Failed to submit form: ${
            error.response?.data?.message || error.message
          }`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit form. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full form-bg overflow-hidden">
      <div className="flex items-center justify-center flex-col pt-8 mx-auto max-w-[500px] h-[200px]">
        <img src={PcpLogo} alt="pcp-logo" className="w-[50%] md:scale-150 " />
      </div>
      <div className="p-8 md:px-16 md:py-12 xl:px-20 flex flex-col">
        <h3 className="font-semibold text-xl sm:text-2xl">
          Candidate Onboarding Form
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-8"
          >
            <div className="flex flex-col gap-14">
              <PersonalInformationForm />

              <DegreeForm />

              {/* OTHER INFORMATION */}
              <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">
                  Other Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="typeOfAcademicDegree"
                    label="Type of Academic Degree Interested in"
                    type="select"
                    placeholder="-- Select --"
                    options={typeOfAcademicDegreeOptions}
                    asterisks="*"
                  />

                  <FormInput
                    control={form.control}
                    name="academicProgram"
                    label="Do you have a specific academic program or course in mind that aligns with your professional experience, whether as an employee, entrepreneur, intern, or recent graduate?"
                    type="input"
                    placeholder=""
                    asterisks="*"
                  />
                  <FormInput
                    control={form.control}
                    name="specificUniversity"
                    label="Do you have a specific University in mind?"
                    type="input"
                    placeholder=""
                    asterisks="*"
                  />

                  <CountrySelector />

                  <FormInput
                    control={form.control}
                    name="GMATGRE"
                    label="Are you open to taking the GMAT or GRE if it is required by your selected country (or countries)?"
                    type="select"
                    options={yesNoOptions}
                    placeholder="--Select--"
                  />

                  <FileUpload
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-x-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                  className="px-8 border-[2px] border-red font-bold text-[20px] text-red items-center justify-center"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="items-center justify-center px-8 bg-red font-bold text-[20px] text-white"
                >
                  {isLoading ? <SaveBtn text="Submitting" /> : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboard;
