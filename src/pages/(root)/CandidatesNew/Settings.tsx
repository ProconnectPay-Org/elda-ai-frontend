import SaveBtn from "@/components/SaveBtn";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import CandidateNewLayout from "@/layouts/CandidateNewLayout";
import { updatePassword } from "@/lib/actions/user.actions";
import { PasswordProps } from "@/types";
import { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    re_new_password: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePasswords = (data: typeof formData) => {
    if (!data.old_password || !data.new_password || !data.re_new_password) {
      return "All fields are required.";
    }
    if (data.old_password === data.new_password) {
      return "New password cannot be the same as the old password.";
    }
    if (data.new_password.length < 8) {
      return "New password cannot be less than 8 characters.";
    }
    if (data.new_password !== data.re_new_password) {
      return "New passwords do not match.";
    }
    return null;
  };

  const onSubmitPassword = async (e: React.FormEvent, data: PasswordProps) => {
    e.preventDefault();

    const validationError = validatePasswords(data);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await updatePassword(data);

      if (response === "Password updated successfully.") {
        toast({
          variant: "success",
          title: "Success",
          description: "Password successfully changed",
        });
      } else {
        const errorMessage =
          response?.response?.data?.non_field_errors?.[0] || response?.detail;

        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      }
    } catch (error: any) {
      console.error("Failed to update password:", error);

      const errorMessage =
        error?.response?.data?.non_field_errors?.[0] || error?.detail;

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof PasswordProps, value: string) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    const validationError = validatePasswords(updatedForm);
    setError(validationError);
  };

  return (
    <CandidateNewLayout>
      <h2 className="font-semibold text-2xl mb-5">Change Password</h2>
      <div className="w-full bg-gray p-4 md:p-8 rounded-2xl">
        <form className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
            <div className="w-full md:w-1/2">
              <label>Current Password</label>
              <input
                type="text"
                placeholder="Enter your current password"
                className="w-full p-2 rounded-md"
                onChange={(e) => handleChange("old_password", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
            <div className="w-full">
              <label>New Password</label>
              <input
                type="text"
                placeholder="Enter a new password"
                className="w-full p-2 rounded-md"
                onChange={(e) => handleChange("new_password", e.target.value)}
              />
            </div>

            <div className="w-full">
              <label>Confirm Password</label>
              <input
                type="text"
                className="w-full p-2 rounded-md"
                onChange={(e) =>
                  handleChange("re_new_password", e.target.value)
                }
              />
            </div>
          </div>
          {/* Show one error message below all fields */}
          {error && <p className="text-red text-sm">{error}</p>}

          <Button
            onClick={(e) => onSubmitPassword(e, formData)}
            className="bg-red"
          >
            {saving ? <SaveBtn text="Saving" /> : "Save"}
          </Button>
        </form>
      </div>
    </CandidateNewLayout>
  );
};

export default Settings;
