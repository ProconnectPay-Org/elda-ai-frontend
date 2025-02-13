import { Controller, useForm } from "react-hook-form";
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
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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

const degreeTypeOptions = [
  {
    value: "Bachelor of Science",
    label: "Bachelor of Arts",
  },
  {
    value: "Bachelor of Education",
    label: "Bachelor of Education",
  },
  {
    value: "Bachelor of Law",
    label: "Bachelor of Law",
  },
  {
    value: "Bachelor of Engineering",
    label: "Bachelor of Engineering",
  },
  {
    value: "Bachelor of Medicine and Surgery",
    label: "Bachelor of Medicine and Surgery",
  },

  {
    value: "Bachelor of Dental Surgery",
    label: "Bachelor of Dental Surgery",
  },

  {
    value: "Bachelor of Pharmacy",
    label: "Bachelor of Pharmacy",
  },

  {
    value: "Bachelor of Nursing",
    label: "Bachelor of Nursing",
  },

  {
    value: "Bachelor of Medical Laboratory Science",
    label: "Bachelor of Medical Laboratory Science",
  },

  {
    value: "Higher National Diploma",
    label: "Higher National Diploma",
  },
]; 

const classOfDegreeOptions = [
  {
      value: "First Class and below 32 years old – All 17 countries",
      label: "First Class and below 32 years old – All 17 countries",
    },
    {
      value: "First Class and above 32 years old – restricted to the U.S and Canada 🇺🇸 🇨🇦",
      label: "First Class and above 32 years old – restricted to the U.S and Canada 🇺🇸 🇨🇦",
    },
    {
      value: "Second Class Upper and below 32 years old – All 17 Countries",
      label: "Second Class Upper and below 32 years old – All 17 Countries",
    },

    {
      value: "Second Class Upper and above 32 years old - restricted to the U.S and Canada 🇺🇸 🇨🇦",
      label: "Second Class Upper and above 32 years old - restricted to the U.S and Canada 🇺🇸 🇨🇦",
    },

    {
      value: "Second Class Lower and below 32 years old – cannot apply to selected countries 🇨🇦 🇸🇬 🇨🇳 🇦🇺",
      label: "Second Class Lower and below 32 years old – cannot apply to selected countries 🇨🇦 🇸🇬 🇨🇳 🇦🇺",
    },

    {
      value: "Second Class Lower and above 32 years old – restricted only to the U.S 🇺🇸",
      label: "Second Class Lower and above 32 years old – restricted only to the U.S 🇺🇸",
    },

    {
      value: "Third Class and below 32 years old - restricted only to the U.S and U.K 🇺🇸 🇬🇧",
      label: "Third Class and below 32 years old - restricted only to the U.S and U.K 🇺🇸 🇬🇧",
    },

    {
      value: "Third Class and above 32 years old - restricted only to the U.S 🇺🇸",
      label: "Third Class and above 32 years old - restricted only to the U.S 🇺🇸",
    },

    {
      value: "Pass and below 32 years old – not eligible",
      label: "Pass and below 32 years old – not eligible",
    },

    {
      value: "Pass and above 32 years old – not eligible",
      label: "Pass and above 32 years old – not eligible",
    },
];

const classOfDegreeMastersOptions = [
  {
    value: "First Class",
    label: "First Class",
  },
  {
    value: "Second Class Upper",
    label: "Second Class Upper",
  },
  {
    value: "Second Class Lower",
    label: "Second Class Lower",
  },
  {
    value: "Third Class",
    label: "Third Class",
  },
  {
    value: "Pass",
    label: "Pass",
  },
  {
    value: "Not Applicable",
    label: "Not Applicable",
  },
];

const typeOfAcademicDegreeOptions = [
  {
    value:
      "MBA",
    label:
      "MBA",
  },
  {
    value:
      "MSc",
    label:
      "MSc",
  },
  {
    value:
      "MRes",
    label:
      "MRes",
  },
  {
    value:
      "LLM",
    label:
      "LLM",
  },
  {
    value:
      "MBA",
    label:
      "MBA",
  },
  {
    value:
      "MENG",
    label:
      "MENG",
  },
  {
    value:
      "MA",
    label:
      "MA",
  },
  {
    value:
      "Open to ANY Suitable Option recommended by the Team",
    label:
      "Open to ANY Suitable Option recommended by the Team",
  },
  
];

const countriesOfInterestOptions = [
  {
    value:
      "United States",
    label:
      "United States",
  },
  {
    value:
      "United Kingdom",
    label:
      "United Kingdom",
  },
  {
    value:
      "Canada",
    label:
      "Canada",
  },
  {
    value:
      "Australia",
    label:
      "Australia",
  },
  {
    value:
      "Germany",
    label:
      "GErmany",
  },
  {
    value:
      "France",
    label:
      "France",
  },
  {
    value:
      "Netherlands",
    label:
      "Netherlands",
  },
  {
    value:
      "Singapore",
    label:
      "Singapore",
  },{
    value:
      "Japan",
    label:
      "Japan",
  },
  {
    value:
      "Switzerland",
    label:
      "Switzerland",
  },
];





const Onboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OnboardFormData>({} as FormData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <FormInput
                  control={form.control}
                  name="membershipStatus"
                  label="Membership Status"
                  type="select"
                  placeholder="Select membership status"
                  options={membershipOptions}
                  className="md:col-span-2"
                />

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

                <PhoneInputField name="phoneNumber" label="Phone Number"/>
                <PhoneInputField name="whatsappNumber" label="WhatsApp Number" />

                <FormInput
                  control={form.control}
                  name="gender"
                  label="Gender"
                  type="select"
                  options={genderOptions}
                  placeholder="Select your gender"
                />
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date of Birth
                  </label>
                  <Controller
                    name="dateOfBirth"
                    control={form.control}
                    render={({ field }) => (
                      <ReactDatePicker
                        {...field}
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date: Date | null) => {
                          const formattedDate = date ? date.toISOString() : null;
                          field.onChange(formattedDate);
                          setSelectedDate(date);
                        }}
                        placeholderText="Select your date of birth"
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={50}
                        maxDate={new Date()}
                        wrapperClassName="w-full"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        // selectsRange={false}
                      />
                    )}
                  />
                </div>


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
                  type="select"
                  placeholder="-- Select --"
                  options={degreeTypeOptions}
                />


                {/* Class of degree */}
                <FormInput
                  control={form.control}
                  name="classOfDegree"
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

                <FormInput
                  control={form.control}
                  name="mastersCourse"
                  label="Course of Study Graduated from with master's if applicable"
                  type="input"
                  placeholder=""
                />
                {/*Class of degree masters  */}
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
                        {...field} 
                        className="hidden" 
                        id="cv-upload"
                      />
                      <label 
                        htmlFor="cv-upload" 
                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 text-sm"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        Upload CV
                      </label>
                      {field.value && (
                        <span className="text-sm text-gray-500 truncate max-w-[200px]">
                          {field.value[0]?.name || 'Selected file'}
                        </span>
                      )}
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
                  <Label className="text-sm font-medium">Countries of Interest</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {countriesOfInterestOptions.map((country) => (
                      <div key={country.value} className="flex items-center space-x-2">
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
                                    ? [...(Array.isArray(currentValue) ? currentValue : []), country.value]
                                    : (Array.isArray(currentValue) 
                                        ? currentValue.filter((val) => val !== country.value) 
                                        : []);
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

                <div className="w-full md:col-span-2">
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