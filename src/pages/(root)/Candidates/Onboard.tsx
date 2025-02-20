import { Controller, useForm } from "react-hook-form";
import PcpLogo from "@/assets/proconnect-logo-new-no-bg.png";
import PhoneInputField from "@/components/PhoneInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  advancedDegreeTypeOptions,
  classOfDegreeMastersOptions,
  classOfDegreeOptions,
  countriesOfInterestOptions,
  degreeTypeOptions,
  genderOptions,
  graduateOptions,
  membershipOptions,
  typeOfAcademicDegreeOptions,
  yesNoOptions,
} from "@/constants";
import { onboardSchema2 } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Onboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof onboardSchema2>>({
    resolver: zodResolver(onboardSchema2),
    mode: "onBlur",
  });

  // Function to calculate age from date of birth
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const onSubmit = async (data: z.infer<typeof onboardSchema2>) => {
    setIsLoading(true);
    try {
      console.log("Form data before submission:", data);

      const submissionData = {
        ...data,
        full_name: data.firstName,
        email: data.emailAddress,
        phone_number: data.phoneNumber,
        gender: data.gender,
        graduate_of: data.graduateOf,
        state_of_residence: "Lagos",
        date_of_birth: data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString().split("T")[0]
          : null,
        age: data.age,
        whatsapp: data.whatsappNumber,
        specific_cgpa: data.specificCGPA,
        has_masters_degree: data.hasMasters,
        class_of_degree: data.degreeClass,

        degree: [
          {
            cgpa: data.specificCGPA,
            cgpa_class: data.degreeClass,
            course: data.courseOfStudy,
            degree: data.kindOfDegree,
            institution: data.institutionName,
          },
          {
            cgpa: data.specificCGPAMasters,
            cgpa_class: data.classOfDegreeMasters,
            course: data.mastersCourse,
            degree: data.mastersDegree,
            institution: data.mastersInstitution,
          },
        ],
        countries:
          data.countriesOfInterest?.map((country) => ({
            name: country,
          })) || [],
        interest: {
          academic_type: data.typeOfAcademicDegree,
          open_to_gmat: data.GMATGRE,
          specific_program: data.academicProgram,
          specific_university: data.specificUniversity,
        },
      };

      console.log("Submission data:", submissionData);

      const response = await axios.post(
        `${API_URL}onboarding-candidate/`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        // Check if a file was uploaded
        if (data.uploadCV && data.uploadCV.length > 0) {
          const resumeData = new FormData();
          resumeData.append("resume", data.uploadCV[0]);

          const resumeResponse = await axios.patch(
            `${API_URL}onboarding-candidate/s/${data.emailAddress}/`,
            resumeData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Resume upload response:", resumeResponse);
        }

        alert("Onboarding form submitted successfully!");
        // Reset form
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (axios.isAxiosError(error)) {
        alert(
          `Failed to submit form: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        alert("Failed to submit form. Please try again.");
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
              <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="md:col-span-2">
                    <FormInput
                      control={form.control}
                      name="membershipStatus"
                      label="Membership Status"
                      type="select"
                      placeholder="Select membership status"
                      options={membershipOptions}
                    />
                  </div>
                  <div>
                    <FormInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      type="input"
                      placeholder="Enter your first name"
                    />
                    <span className="text-[12px] text-[#667085]">
                      as on international passport
                    </span>
                  </div>

                  <FormInput
                    control={form.control}
                    name="middleName"
                    label="Middle Name"
                    type="input"
                    placeholder="Enter your middle name"
                  />

                  <FormInput
                    control={form.control}
                    name="surname"
                    label="Surname"
                    type="input"
                    placeholder="Enter your surname"
                  />

                  <div>
                    <FormInput
                      control={form.control}
                      name="emailAddress"
                      label="Email"
                      type="input"
                      placeholder="Enter your personal email address"
                    />
                    <span className="text-[12px] text-[#667085]">
                      This will be used for the entire application process so
                      give us the right personal email
                    </span>
                  </div>

                  <PhoneInputField
                    className="md:w-full"
                    name="phoneNumber"
                    label="Phone Number"
                    labelName="font-medium text-sm"
                  />
                  <PhoneInputField
                    name="whatsappNumber"
                    label="WhatsApp Number"
                    className="md:w-full"
                    labelName="font-medium text-sm"
                  />

                  <FormInput
                    control={form.control}
                    name="gender"
                    label="Gender"
                    type="select"
                    options={genderOptions}
                    placeholder="Select your gender"
                  />
                  <div className="mb-4">
                    <label className="form-label text-sm font-medium mb-2">
                      Date of Birth
                    </label>
                    <Controller
                      name="dateOfBirth"
                      control={form.control}
                      render={({ field }) => (
                        <ReactDatePicker
                          selected={field.value}
                          onChange={(date: Date | null) => {
                            if (date) {
                              field.onChange(date);
                              // Calculate and set age when date changes
                              const age = calculateAge(date);
                              form.setValue("age", age);
                            }
                          }}
                          placeholderText="Select your date of birth"
                          dateFormat="yyyy-MM-dd"
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={50}
                          maxDate={new Date()}
                          wrapperClassName="w-full"
                          className="w-full px-3 py-[7px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                      )}
                    />
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                  <FormInput
                    control={form.control}
                    name="age"
                    label="How old are you"
                    type="number"
                    placeholder="Enter your age as at today"
                    className="cursor-not-allowed"
                  />
                </div>
              </div>

              {/* FIRST DEGREE */}
              <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">First Degree</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="graduateOf"
                    label="Graduate Of"
                    type="select"
                    options={graduateOptions}
                    placeholder="--Select--"
                  />
                  <FormInput
                    control={form.control}
                    name="institutionName"
                    label="Name of University or Polytechnic Graduated from"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="kindOfDegree"
                    label="Kind Of Degree"
                    type="select"
                    placeholder="-- Select --"
                    options={degreeTypeOptions}
                  />

                  {/* Class of degree */}
                  <FormInput
                    control={form.control}
                    name="degreeClass"
                    label="Class Of Degree"
                    type="select"
                    placeholder="-- Select --"
                    options={classOfDegreeOptions}
                  />

                  <FormInput
                    control={form.control}
                    name="specificCGPA"
                    label="Specific CGPA"
                    type="input"
                    placeholder=""
                  />

                  <FormInput
                    control={form.control}
                    name="courseOfStudy"
                    label="Course of Study"
                    type="input"
                    placeholder="Enter your course of study"
                  />
                </div>
              </div>

              {/* Second Degree Details */}
              <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">Second Degree</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
                    type="select"
                    placeholder=""
                    options={advancedDegreeTypeOptions}
                  />

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
                    type="select"
                    placeholder="-- Select --"
                    options={classOfDegreeMastersOptions}
                  />

                  <FormInput
                    control={form.control}
                    name="specificCGPAMasters"
                    label="Specific CGPA Masters"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="mastersInstitution"
                    label="Name Of Institution"
                    type="input"
                    placeholder=""
                  />
                </div>
              </div>

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
                  />

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

                  <FormInput
                    control={form.control}
                    name="uploadCV"
                    label="Upload your updated CV"
                    type="file"
                    placeholder=""
                    className="w-auto"
                  >
                    {(field) => (
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file.name);
                            }
                          }}
                          className="hidden"
                          id="cv-upload"
                          accept=".pdf,.doc,.docx"
                        />
                        <label
                          htmlFor="cv-upload"
                          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                            />
                          </svg>
                          Upload CV
                        </label>
                      </div>
                    )}
                  </FormInput>

                  <FormInput
                    control={form.control}
                    name="GMATGRE"
                    label="Are you open to taking the GMAT or GRE if it is required by your selected country (or countries)?"
                    type="select"
                    options={yesNoOptions}
                    placeholder="--Select--"
                  />

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Countries of Interest
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {countriesOfInterestOptions.map((country) => (
                        <div
                          key={country.value}
                          className="flex items-center space-x-2"
                        >
                          <Controller
                            name="countriesOfInterest"
                            control={form.control}
                            render={({ field }) => (
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={country.value}
                                  checked={
                                    Array.isArray(field.value)
                                      ? field.value.includes(country.value)
                                      : false
                                  }
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || [];
                                    const newValue = checked
                                      ? [
                                          ...(Array.isArray(currentValue)
                                            ? currentValue
                                            : []),
                                          country.value,
                                        ]
                                      : Array.isArray(currentValue)
                                      ? currentValue.filter(
                                          (val) => val !== country.value
                                        )
                                      : [];
                                    field.onChange(newValue);
                                  }}
                                />
                                <Label
                                  htmlFor={country.value}
                                  className="text-sm font-normal cursor-pointer"
                                >
                                  {country.label}
                                </Label>
                              </div>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
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
                  {isLoading ? "Submitting..." : "Submit"}
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
