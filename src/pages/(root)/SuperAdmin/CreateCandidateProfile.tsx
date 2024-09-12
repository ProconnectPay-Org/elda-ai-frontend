import AdminLayout from "@/layouts/AdminLayout";
import Mail from "../../../assets/mail.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CandidateProfileSuccess from "@/components/CandidateProfileSuccess";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { createCandidateProfile } from "@/lib/actions/user.actions";

const CreateCandidateProfile = () => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  // const navigate = useNavigate();

  const createProfile = async () => {
    setIsLoading(true);

    try {
      const response = await createCandidateProfile({
        email,
        password,
        full_name: fullname,
        university,
        course,
        role: "candidate",
      });

      if (response) {
        console.log(response);
        setSuccess(true);
      } else {
        console.log("Profile creation failed: Invalid data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      {success && <CandidateProfileSuccess />}

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
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="email">
                Password <span className="text-red">*</span>
              </label>
              <div className="flex border border-gray-border w-full justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="email"
                  placeholder="Enter a password for candidate"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update email state
                />
              </div>
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
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <p className="">Select University</p>
              <Select onValueChange={setUniversity}>
                {/* Update university state */}
                <SelectTrigger className="border-gray-border">
                  <SelectValue placeholder="Select University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Harvard University">
                    Harvard University
                  </SelectItem>
                  <SelectItem value="Cambridge University">
                    Cambridge University
                  </SelectItem>
                  <SelectItem value="Oxford University">
                    Oxford University
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <p className="">Select Course</p>
              <Select onValueChange={setCourse}>
                {/* Update course state */}
                <SelectTrigger className="border-gray-border">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product Management">
                    Product Management
                  </SelectItem>
                  <SelectItem value="Estate Management">
                    Estate Management
                  </SelectItem>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
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
