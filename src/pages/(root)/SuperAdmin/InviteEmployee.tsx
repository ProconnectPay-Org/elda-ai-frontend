import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Mail from "@/assets/mail.png";
import CandidateProfileSuccess from "@/components/CandidateProfileSuccess";
import { useState } from "react";
import { createCandidateProfile } from "@/lib/actions/user.actions";

const InviteEmployee = () => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [fullnameError, setFullnameError] = useState<string | null>(null);

  const handleSendInvite = async () => {
    setIsLoading(true);
    setEmailError(null);
    setPasswordError(null);
    setFullnameError(null);

    try {
      let valid = true;

      if (!email) {
        setEmailError("Email is required.");
        valid = false;
      }

      if (!fullname) {
        setFullnameError("Full Name is required.");
        valid = false;
      }

      if (!password) {
        setPasswordError("Password is required.");
        valid = false;
      }

      if (!valid) return;

      const response = await createCandidateProfile({
        email,
        password,
        full_name: fullname,
        role: "staff",
      });

      if (response) {
        console.log(response);
        setSuccess(true);
        localStorage.setItem("user_password", password);
      } else {
        throw new Error("Profile creation failed: Invalid data");
      }
    } catch (error: any) {
      console.error("Error inviting employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      {success && (
        <CandidateProfileSuccess text="Employee Successfully invited" />
      )}

      <div className="flex flex-col mx-auto gap-12 lg:max-w-[800px]">
        <div className="flex items-center">
          <Link to="/admin-dashboard">
            <ArrowLeftIcon color="red" className="cursor-pointer" />
          </Link>
          <h2 className="text-red text-2xl md:text-3xl font-bold text-center w-full">
            Invite Employee
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
                  placeholder="Enter staff's email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailError && (
                <p className="text-red text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="fullName">Full Name</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  className="border-none w-full focus:outline-none"
                  id="fullName"
                  placeholder="Enter the full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              {fullnameError && (
                <p className="text-red text-sm mt-1">{fullnameError}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-1.5">
              <label htmlFor="password">Password</label>
              <div className="flex border border-gray-border justify-between gap-2 items-center py-2 px-4 rounded-lg">
                <input
                  type="password"
                  className="border-none w-full focus:outline-none"
                  id="password"
                  placeholder="Enter a password for staff"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-red text-sm mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          <Button
            onClick={handleSendInvite}
            className="bg-red w-full mt-10 h-12 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Sending Invite...
              </>
            ) : (
              "Send Invite"
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InviteEmployee;
