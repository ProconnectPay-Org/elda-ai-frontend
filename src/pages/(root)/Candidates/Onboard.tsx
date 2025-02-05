import { useForm } from "react-hook-form";
import PcpLogo from "@/assets/proconnect-logo-new-no-bg.png";
import PhoneInputField from "@/components/PhoneInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { genderOptions } from "@/constants";
import { onboardSchema } from "@/lib/utils";
import { OnboardFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import FormInput from "@/components/FormInput";

const yesNoOptions = [
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
];

const graduateOptions = [
  {
    value: "Polytechnic",
    label: "Polytechnic",
  },
  {
    value: "University",
    label: "University",
  },
];

const membershipOptions = [
  {
    value: "NEW CANDIDATE - JUST ONBOARDED",
    label: "NEW CANDIDATE - JUST ONBOARDED",
  },
  {
    value: "REPEAT CANDIDATE DENIED ADMISSION INITIALLY FOR 1 APPLICATION DONE",
    label: "REPEAT CANDIDATE DENIED ADMISSION INITIALLY FOR 1 APPLICATION DONE",
  },
  {
    value:
      "REPEAT CANDIDATE DENIED ADMISSION INITIALLY FOR 2 APPLICATIONS DONE",
    label:
      "REPEAT CANDIDATE DENIED ADMISSION INITIALLY FOR 2 APPLICATIONS DONE",
  },
];

const Onboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardFormData>({} as FormData);

  const defaultValues = {
    ...formData,
  };

  const form = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof onboardSchema>) => {
    setIsLoading(true);
    try {
      console.log("Submitting data:", data);
      setFormData(data); // Save submitted data to state
      // Perform API call or any logic
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full form-bg">
      <div className="flex items-center justify-center flex-col pt-8 mx-auto max-w-[500px] h-[200px]">
        <img src={PcpLogo} alt="pcp-logo" className="w-[50%] md:scale-150" />
      </div>
      <div className="p-8 md:px-16 md:py-12 xl:px-20">
        <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
          <h3 className="font-semibold text-xl sm:text-2xl">
            Candidate Onboarding Form
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 md:gap-8">
                <FormInput
                  control={form.control}
                  name="membershipStatus"
                  label="Membership Status"
                  type="select"
                  placeholder="Select membership status"
                  options={membershipOptions}
                />

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8 w-full">
                  <FormInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    type="input"
                    placeholder="Enter your first name"
                  />
                  <FormInput
                    control={form.control}
                    name="middleName"
                    label="Middle Name"
                    type="input"
                    placeholder="Enter your middle name"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8 w-full">
                  <FormInput
                    control={form.control}
                    name="surname"
                    label="Surname"
                    type="input"
                    placeholder="Enter your surname"
                  />
                  <FormInput
                    control={form.control}
                    name="emailAddress"
                    label="Email"
                    type="input"
                    placeholder="Enter your personal email address"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <PhoneInputField name="phoneNumber" />
                  <PhoneInputField name="whatsappNumber" />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="gender"
                    label="Gender"
                    type="select"
                    options={genderOptions}
                    placeholder="Select your gender"
                  />
                  <FormInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="input"
                    placeholder="Enter your date of birth"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="age"
                    label="How old are you"
                    type="input"
                    placeholder="Enter your age as at today"
                  />
                  <FormInput
                    control={form.control}
                    name="graduateOf"
                    label="Graduate Of"
                    type="select"
                    options={graduateOptions}
                    placeholder="--Select--"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="graduatedFrom"
                    label="Name of University or Polytechnic Graduated from"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="kindOfDegree"
                    label="Kind Of Degree"
                    type="input"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="classOfDegree"
                    label="Class Of Degree"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="specificCGPA"
                    label="Specific CGPA"
                    type="input"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="hasMasters"
                    label="Do you have a Master's Degree"
                    type="select"
                    options={yesNoOptions}
                    placeholder="--Select--"
                  />
                  <FormInput
                    control={form.control}
                    name="mastersDegree"
                    label="If yes, kind of degree"
                    type="input"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="mastersCourse"
                    label="Course of Study Graduated from with master's if applicable"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="classOfDegreeMasters"
                    label="Class of degree masters"
                    type="input"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="specificCGPAMasters"
                    label="Specific CGPA Masters"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="typeOfAcademicDegree"
                    label="Type of Academic Degree Interested in Abroad"
                    type="input"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="academicProgram"
                    label="Do you have a specific academic program or course in mind that aligns with your professional experience, whether as an employee, entrepreneur, intern, or recent graduate?"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="specificUniversity"
                    label="Do you have a specific University in mind?"
                    type="input"
                    placeholder=""
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="uploadCV"
                    label="Upload your updated CV"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="GMATGRE"
                    label="Are you open to taking the GMAT or GRE if it is required by your selected country (or countries)?"
                    type="select"
                    options={yesNoOptions}
                    placeholder="--Select--"
                  />
                </div>
                  <FormInput
                    control={form.control}
                    name="countryInterestedIn"
                    label="Country you are INTERESTED In"
                    type="input"
                    placeholder=""
                  />

                <div className="w-full">
                  <Button className="bg-red w-full" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
