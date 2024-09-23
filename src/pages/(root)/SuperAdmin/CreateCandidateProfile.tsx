import AdminLayout from "@/layouts/AdminLayout";
import Mail from "../../../assets/mail.png";
import { Button } from "@/components/ui/button";
import CandidateProfileSuccess from "@/components/CandidateProfileSuccess";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { createCandidateProfile } from "@/lib/actions/user.actions";
import { toast } from "@/components/ui/use-toast";

const CreateCandidateProfile = () => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fullnameError, setFullnameError] = useState("");

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
      });

      if (response) {
        setSuccess(true);
        localStorage.setItem("user_password", password);
      } else {
        toast({
          title: "Error",
          description:
            "Profile creation failed: Invalid data or try another password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "Profile creation failed: Invalid data or try another password.",
        variant: "destructive",
      });
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
                  onChange={(e) => setPassword(e.target.value)} // Update password state
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
                  onChange={(e) => setFullname(e.target.value)} // Update fullname state
                />
              </div>
              {fullnameError && (
                <p className="text-red text-sm">{fullnameError}</p>
              )}
            </div>

            {/*  */}
          </div>

          <Button
            className="w-full mt-10 bg-red h-12 text-lg"
            onClick={createProfile}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Loading..." : "Create User ID"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCandidateProfile;
