import { getInitials } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countryOptions, programTypes, sortedSchools } from "@/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

declare interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  age: string;
  gender: string;
  graduate_of: string;
}

interface CandidateDetailsProps {
  candidate: Candidate | null;
}

const SmallComponent = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between w-full items-center">
      <p className="w-[350px] font-medium text-sm">{label}</p>
      <div className="border border-x-gray-text rounded-md p-2 w-[320px]">
        <p className="text-[#323232] text-sm">{value}</p>
      </div>
    </div>
  );
};

const AcsCandidateDetails: React.FC<CandidateDetailsProps> = ({
  candidate,
}) => {
  if (!candidate) {
    return (
      <div className="p-6">
        <p className="text-gray-500 font-semibold text-xl">Welcome to your ACS Dashboard</p>
        <p className="text-gray-500">Select a candidate to view details</p>
      </div>
    );
  }

  const form1 = useForm({
    resolver: zodResolver(
      z.object({
        programType1: z.string().min(1, "Program Type 1 is required"),
        assignedSchool1: z.string().min(1, "Assigned School 1 is required"),
        assignedCourse1: z.string().min(1, "Assigned Course 1 is required"),
        country1: z.string().min(1, "Country is required"),
      })
    ),
    defaultValues: {
      programType1: "",
      assignedSchool1: "",
      assignedCourse1: "",
      country1: "",
    },
  });

  const form2 = useForm({
    resolver: zodResolver(
      z.object({
        programType2: z.string().min(1, "Program Type 2 is required"),
        assignedSchool2: z.string().min(1, "Assigned School 2 is required"),
        assignedCourse2: z.string().min(1, "Assigned Course 2 is required"),
        country2: z.string().min(1, "Country is required"),
      })
    ),
    defaultValues: {
      programType2: "",
      assignedSchool2: "",
      assignedCourse2: "",
      country2: "",
    },
  });

  const onSubmitForm1 = async (data: any) => {
    console.log("Form 1 submitted:", data);
  };

  const onSubmitForm2 = async (data: any) => {
    console.log("Form 2 submitted:", data);
  };

  return (
    <div>
      <div className="border-b border-x-gray-text p-6 flex justify-between items-center">
        <p className="text-[#1F384C] font-semibold text-xl">
          Candidate Profile
        </p>
        <div className="flex items-center gap-2">
          <div className="text-red bg-pale-bg rounded-full font-bold w-10 h-10 flex items-center justify-center">
            {getInitials("Academic counsellor")}
          </div>
          <div>
            <p className="font-semibold">Academic Counsellor</p>
            <p>Opeyemi</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:max-w-[760px]">
        <p className="text-xl font-semibold">Personal Data</p>
        <div className="space-y-4">
          <SmallComponent
            label="Full Name"
            value={candidate.full_name || "No name"}
          />
          <SmallComponent
            label="Personal Email Address"
            value={candidate.email || "No mail"}
          />
          <SmallComponent
            label="Personal Phone Number"
            value={candidate.phone_number || "No name"}
          />
          <SmallComponent
            label="Personal Whatsapp Number"
            value={candidate.phone_number || "No name"}
          />
          <SmallComponent
            label="Gender"
            value={candidate.gender || "No name"}
          />
          <SmallComponent
            label="Age"
            value={`${candidate.age} years old` || "No name"}
          />
        </div>
      </div>

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      <div className="p-6 md:max-w-[760px]">
        <p className="text-xl font-semibold">Educational Data</p>
        <div className="space-y-4">
          <SmallComponent
            label="Graduate Of"
            value={candidate.graduate_of || "No name"}
          />
          <SmallComponent
            label="Name of University"
            value={candidate.email || "No mail"}
          />
          <SmallComponent
            label="Kind of Degree"
            value={candidate.phone_number || "No name"}
          />
          <SmallComponent
            label="Course of Study Graduated from"
            value={candidate.phone_number || "No name"}
          />
          <SmallComponent
            label="Class of Degree"
            value={candidate.gender || "No name"}
          />
          <SmallComponent
            label="Specific CGPA"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Do you have a masters degree?"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Kind of degree?"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Course of Study Graduated from with master"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Class of Degree"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Specific CGPA for Masters"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Country you are INTERESTED In"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Type of Academic Degree Interested in Abroad"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Academic program or course in mind that aligns with your professional experience"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Are you opened to taking the GMAT or GRE if it is required"
            value={`${candidate.age} years old` || "No name"}
          />
          <SmallComponent
            label="Preferred Universities"
            value={`${candidate.age} years old` || "No name"}
          />
        </div>
      </div>

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      <div className="p-6 md:max-w-[760px]">
        <p className="text-xl font-semibold">Uploaded resume</p>
        <div className="p-4 rounded-lg border border-[#CFD3D4] flex justify-between items-center">
          <div>
            <img src="" alt="" />
            <p className="text-[#667085] font-medium">Nwakaego Joy cv.pdf</p>
          </div>
          <Button className="bg-red w-18">View</Button>
        </div>
      </div>

      <hr className="h-[1px] w-full my-4 bg-gray-text" />

      <div className="p-6 w-full">
        <p className="text-xl font-semibold">
          Recommend courses, schools and country
        </p>
        <div className="flex w-full gap-10">
          <Form {...form1}>
            <form
              onSubmit={form1.handleSubmit(onSubmitForm1)}
              className="w-full md:w-1/2 space-y-4"
            >
              <FormField
                control={form1.control}
                name={"country1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Country Option 1
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select a country--" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryOptions.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form1.control}
                name={"programType1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Type of Degree Program
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select a program--" />
                          </SelectTrigger>
                          <SelectContent>
                            {programTypes.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form1.control}
                name={"assignedCourse1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Course Option 1
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Input
                          id={"assignedCourse1"}
                          placeholder="Fill in a course"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form1.control}
                name={"assignedSchool1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      University Option 1
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select a school--" />
                          </SelectTrigger>
                          <SelectContent>
                            {sortedSchools.map((program) => (
                              <SelectItem
                                key={program.uniqueId}
                                value={program.name}
                              >
                                {program.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button type="submit" className="form-btn bg-red">
                  Save
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  className="form-btn border-red text-red"
                >
                  Delete
                </Button>
              </div>
            </form>
          </Form>

          <Form {...form2}>
            <form
              onSubmit={form2.handleSubmit(onSubmitForm2)}
              className="w-full md:w-1/2 space-y-4"
            >
              <FormField
                control={form2.control}
                name={"country2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Country Option 2
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select a country--" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryOptions.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form2.control}
                name={"programType2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Type of Degree Program
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select a program--" />
                          </SelectTrigger>
                          <SelectContent>
                            {programTypes.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form2.control}
                name={"assignedCourse2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Course Option 2
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Input
                          id={"assignedCourse2"}
                          placeholder="Fill in a course"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form2.control}
                name={"assignedSchool2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      University Option 2
                    </FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Select a school--" />
                          </SelectTrigger>
                          <SelectContent>
                            {sortedSchools.map((program) => (
                              <SelectItem
                                key={program.uniqueId}
                                value={program.name}
                              >
                                {program.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button type="submit" className="form-btn bg-red">
                  Save
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  className="form-btn border-red text-red"
                >
                  Delete
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AcsCandidateDetails;
