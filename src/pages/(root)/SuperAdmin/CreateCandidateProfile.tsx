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
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CreateCandidateProfile = () => {
  const [Success, setSuccess] = useState(false);

  const createProfile = () => {
    setSuccess((prev) => !prev);
  };

  return (
    <AdminLayout>
      {Success && <CandidateProfileSuccess />}

      <div className="flex items-start lg:gap-24 lg:px-32">
        <Link to="/admin-dashboard">
          <div className="w-16 cursor-pointer relative">
            <ChevronLeftIcon color="red" />
            <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
          </div>
        </Link>
        <div className="flex flex-col items-start justify-center w-[76%]">
          <h2 className="text-red text-3xl font-bold text-center w-full mb-10">
            Create Candidate Profile
          </h2>

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
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="fullName">Full Name</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="fullName"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <p className="">Select University</p>
              <Select>
                <SelectTrigger className="border-gray-border">
                  <SelectValue placeholder="Havard University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last1month">Havard University</SelectItem>
                  <SelectItem value="last2months">
                    Cambridge University
                  </SelectItem>
                  <SelectItem value="last3months">Oxford University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <p className="">Select Course</p>
              <Select>
                <SelectTrigger className="border-gray-border">
                  <SelectValue placeholder="Product Management" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last1month">Product Management</SelectItem>
                  <SelectItem value="last2months">Estate Management</SelectItem>
                  <SelectItem value="last3months">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full mt-10 bg-red h-12 text-lg"
            onClick={createProfile}
          >
            Create User ID
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCandidateProfile;
