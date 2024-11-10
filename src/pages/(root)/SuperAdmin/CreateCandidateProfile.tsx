import AdminLayout from "@/layouts/AdminLayout";
import Mail from "../../../assets/mail.png";
import { Button } from "@/components/ui/button";
import CandidateProfileSuccess from "@/components/CandidateProfileSuccess";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { createCandidateProfile } from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";
import { CustomAxiosError } from "@/types";
import Cookies from "js-cookie";
import { sortedSchools } from "@/constants";

const CreateCandidateProfile = () => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [programType1, setProgramType1] = useState("");
  const [assignedSchool1, setAssignedSchool1] = useState("");
  const [assignedCourse1, setAssignedCourse1] = useState("");
  const [programType2, setProgramType2] = useState("");
  const [assignedSchool2, setAssignedSchool2] = useState("");
  const [assignedCourse2, setAssignedCourse2] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [programType1Error, setProgramType1Error] = useState("");
  const [assignedSchool1Error, setAssignedSchool1Error] = useState("");
  const [assignedCourse1Error, setAssignedCourse1Error] = useState("");
  const [programType2Error, setProgramType2Error] = useState("");
  const [assignedSchool2Error, setAssignedSchool2Error] = useState("");
  const [assignedCourse2Error, setAssignedCourse2Error] = useState("");

  const svgSpan = (
    <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </span>
  );

  const validateFields = () => {
    let valid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Full name validation
    if (!fullname) {
      setFullnameError("Full name is required");
      valid = false;
    } else {
      setFullnameError("");
    }

    // Program Type 1 validation
    if (!programType1) {
      setProgramType1Error("Program type is required");
      valid = false;
    } else {
      setProgramType1Error("");
    }

    // Assigned School 1 validation
    if (!assignedSchool1) {
      setAssignedSchool1Error("Assigned school is required");
      valid = false;
    } else {
      setAssignedSchool1Error("");
    }

    // Assigned Course 1 validation
    if (!assignedCourse1) {
      setAssignedCourse1Error("Assigned course is required");
      valid = false;
    } else {
      setAssignedCourse1Error("");
    }

    // Program Type 2 validation
    if (!assignedSchool2) {
      setAssignedSchool2Error("Please select a school for Program Type 2");
      valid = false;
    } else {
      setAssignedSchool2Error("");
    }

    // Assigned Course 2 validation
    if (!programType2) {
      setProgramType2Error(
        "Please select a Program Type for Assigned Course 2"
      );
      valid = false;
    } else {
      setProgramType2Error("");
    }

    // Assigned Course 2 validation
    if (!assignedCourse2) {
      setAssignedCourse2Error("Assigned course is required");
      valid = false;
    } else {
      setAssignedCourse2Error("");
    }

    return valid;
  };

  const createProfile = async () => {
    if (!validateFields()) return;

    setIsLoading(true);

    try {
      const response = await createCandidateProfile({
        email,
        password,
        full_name: fullname,
        role: "candidate",
        assigned_course1: assignedCourse1,
        assigned_university1: assignedSchool1,
        assigned_course2: assignedCourse2,
        assigned_university2: assignedSchool2,
        program_type1: programType1,
        program_type2: programType2,
      });

      if (response) {
        setSuccess(true);
        Cookies.set("user_password", password);
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

  return (
    <AdminLayout>
      {success && <CandidateProfileSuccess text="Registration Successful" />}

      <div className="flex flex-col mx-auto gap-12 lg:max-w-[800px]">
        <div className="flex items-center">
          <Link to="/admin-dashboard">
            <ArrowLeftIcon color="red" className="cursor-pointer" />
          </Link>
          <h2 className="text-red text-2xl md:text-3xl font-bold text-center w-full">
            Create Candidate Profile
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          {/* INPUT FIELDS */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="email">
                Email <span className="text-red">*</span>
              </label>
              <div className="flex border border-gray-border w-full justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <img src={Mail} alt="mail icon" />
                <input
                  className="border-none w-full focus:outline-none"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>
              {emailError && <p className="text-red text-sm">{emailError}</p>}
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="password">
                Password <span className="text-red">*</span>
              </label>
              <div className="flex border border-gray-border w-full justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="password"
                  placeholder="Enter a password for candidate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-red text-sm">{passwordError}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="fullName">Full Name</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="fullName"
                  placeholder="Enter candidate's full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              {fullnameError && (
                <p className="text-red text-sm">{fullnameError}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="programType1">Program Type (1)</label>
              <div className="relative">
                <select
                  name="programType1"
                  id="programType1"
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                  onChange={(e) => setProgramType1(e.target.value)}
                  value={programType1}
                >
                  <option value="">--Select a program--</option>
                  <option value="MSC">MSC</option>
                  <option value="MBA">MBA</option>
                </select>
                {svgSpan}
              </div>
              {programType1Error && (
                <p className="text-red text-sm">{programType1Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedSchool1">Assign School (1)</label>
              <div className="relative">
                <select
                  name="assignedSchool1"
                  id="assignedSchool1"
                  value={assignedSchool1}
                  onChange={(e) => setAssignedSchool1(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                >
                  <option value="">--Select a school--</option>
                  {sortedSchools.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {svgSpan}
              </div>
              {assignedSchool1Error && (
                <p className="text-red text-sm">{assignedSchool1Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedCourse1">Assign a Course (1)</label>
              <div className="relative">
                <input
                  name="assignedCourse1"
                  id="assignedCourse1"
                  placeholder="Fill in a course"
                  value={assignedCourse1}
                  onChange={(e) => setAssignedCourse1(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                />
              </div>
              {assignedCourse1Error && (
                <p className="text-red text-sm">{assignedCourse1Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="programType2">Program Type (2)</label>
              <div className="relative">
                <select
                  name="programType2"
                  id="programType2"
                  value={programType2}
                  onChange={(e) => setProgramType2(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                >
                  <option value="">--Select a program--</option>
                  <option value="MSC">MSC</option>
                  <option value="MBA">MBA</option>
                </select>
                {svgSpan}
              </div>
              {programType2Error && (
                <p className="text-red text-sm">{programType2Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedSchool2">Assign School (2)</label>
              <div className="relative">
                <select
                  name="assignedSchool2"
                  id="assignedSchool2"
                  value={assignedSchool2}
                  onChange={(e) => setAssignedSchool2(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                >
                  <option value="">--Select a school--</option>
                  {sortedSchools.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {svgSpan}
              </div>
              {assignedSchool2Error && (
                <p className="text-red text-sm">{assignedSchool2Error}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="assignedCourse2">Assign a Course (2)</label>
              <div className="relative">
                <input
                  name="assignedCourse2"
                  id="assignedCourse2"
                  placeholder="Fill in a course"
                  value={assignedCourse2}
                  onChange={(e) => setAssignedCourse2(e.target.value)}
                  className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                />
              </div>
              {assignedCourse2Error && (
                <p className="text-red text-sm">{assignedCourse2Error}</p>
              )}
            </div>
          </div>

          <Button
            className="w-full mt-10 bg-red h-12 text-lg"
            onClick={createProfile}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create User ID"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCandidateProfile;
