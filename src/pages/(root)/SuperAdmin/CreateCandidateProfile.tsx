import AdminLayout from "@/layouts/AdminLayout";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CandidateProfileSuccess from "@/components/CandidateProfileSuccess";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { createCandidateProfile } from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";
import { CustomAxiosError } from "@/types";
import Cookies from "js-cookie";
import { countryOptions, programTypes, sortedSchools } from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminSideBar from "@/components/AdminSideBar";
import { useQuery } from "@tanstack/react-query";
import { getSingleOnboardedCandidateData } from "@/lib/actions/acs.actions";
import { Skeleton } from "@/components/ui/skeleton";

const createCandidateSchema = () =>
  z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    fullname: z.string().min(1, "Full name is required"),
    programType1: z.string().min(1, "Program Type 1 is required"),
    assignedSchool1: z.string().min(1, "Assigned School 1 is required"),
    assignedCourse1: z.string().min(1, "Assigned Course 1 is required"),
    country1: z.string().min(1, "Country is required"),
    country2: z.string().min(1, "Country is required"),
    programType2: z.string().min(1, "Program Type 2 is required"),
    assignedSchool2: z.string().min(1, "Assigned School 2 is required"),
    assignedCourse2: z.string().min(1, "Assigned Course 2 is required"),
  });

const formSchema = createCandidateSchema();

const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
};

const CreateCandidateProfile = () => {
  const { id } = useParams<{ id: string }>();

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: candidate,
    isLoading: candidateLoading,
    error,
  } = useQuery({
    queryKey: ["candidate", id],
    queryFn: () =>
      id
        ? getSingleOnboardedCandidateData(id)
        : Promise.reject("No ID provided"),
    enabled: !!id,
    staleTime: 5 * 60 * 10,
  });

  useEffect(() => {
    if (candidate) {
      form.reset({
        email: candidate.email || "",
        fullname: candidate.full_name || "",
        programType1: candidate.program_type1 || "",
        country1: candidate.first_country || "",
        assignedSchool1: candidate.assigned_university1 || "",
        assignedCourse1: candidate.assigned_course1 || "",
        programType2: candidate.program_type2 || "",
        country2: candidate.second_country || "",
        assignedSchool2: candidate.assigned_university2 || "",
        assignedCourse2: candidate.assigned_course2 || "",
      });
    }
  }, [candidate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      programType1: "",
      assignedSchool1: "",
      assignedCourse1: "",
      country1: "",
      country2: "",
      programType2: "",
      assignedSchool2: "",
      assignedCourse2: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const response = await createCandidateProfile({
        email: data.email,
        password: data.password,
        full_name: data.fullname,
        role: "candidate",
        assigned_course1: data.assignedCourse1,
        assigned_university1: data.assignedSchool1,
        first_country: data.country1,
        second_country: data.country2,
        assigned_course2: data.assignedCourse2,
        assigned_university2: data.assignedSchool2,
        program_type1: data.programType1,
        program_type2: data.programType2,
      });

      if (response) {
        setSuccess(true);
        Cookies.set("user_password", data.password);
      }
    } catch (error) {
      const axiosError = error as CustomAxiosError;
      if (axiosError.response && axiosError.response.data) {
        const errorData = axiosError.response.data;
        if (Array.isArray(errorData)) {
          toast({
            title: "Error",
            description: errorData.join(", "),
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: errorData.detail || "An error occurred.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (candidateLoading) {
    return (
      <AdminLayout>
        <div className="flex items-start justify-start">
          <AdminSideBar />
          <div className="flex flex-col mx-auto w-full gap-12 lg:max-w-[800px]">
            <h2 className="text-red text-2xl md:text-3xl font-bold text-center w-full">
              Loading Candidate Profile...
            </h2>
            <SkeletonLoader />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return <p>Error getting candidates</p>;
  }

  return (
    <AdminLayout>
      {success && <CandidateProfileSuccess text="Registration Successful" />}

      <div className="flex items-start justify-start">
        {/* RECOMMENDED CANDIDATES SIDEBAR */}
        <AdminSideBar />

        <div className="flex flex-col mx-auto w-full gap-12 lg:max-w-[800px]">
          <div className="flex items-center">
            <Link to="/admin-dashboard">
              <ArrowLeftIcon color="red" className="cursor-pointer" />
            </Link>
            <h2 className="text-red text-2xl md:text-3xl font-bold text-center w-full">
              Create Candidate Profile
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">Email *</FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Input
                          id={"email"}
                          placeholder="Enter Candidate's Email Address"
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
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">Password *</FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Input
                          id={"password"}
                          placeholder="Enter a password for candidate"
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
                control={form.control}
                name={"fullname"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">Full Name *</FormLabel>
                    <div className="flex w-full flex-col relative">
                      <FormControl>
                        <Input
                          id={"fullname"}
                          placeholder="Enter the full name of candidate"
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
                control={form.control}
                name={"programType1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Program Type (1) *
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
                control={form.control}
                name={"country1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">Country 1*</FormLabel>
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
                control={form.control}
                name={"assignedSchool1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Assign School (1) *
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

              <FormField
                control={form.control}
                name={"assignedCourse1"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Assigned Course 1 *
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
                control={form.control}
                name={"programType2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Program Type (2) *
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
                control={form.control}
                name={"country2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">Country 2*</FormLabel>
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
                control={form.control}
                name={"assignedSchool2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Assign School (2) *
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

              <FormField
                control={form.control}
                name={"assignedCourse2"}
                render={({ field }) => (
                  <div className="">
                    <FormLabel className="form-label">
                      Assigned Course 2 *
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

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="form-btn bg-red"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : (
                    "Create User ID"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCandidateProfile;
