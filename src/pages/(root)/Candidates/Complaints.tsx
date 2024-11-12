import { useState } from "react";
import { Button } from "@/components/ui/button";
import CandidateLayout from "@/layouts/CandidateLayout";
import { ComplaintType } from "@/types";
import { postComplaints } from "@/lib/actions/candidate.actions";
import { toast } from "@/components/ui/use-toast";

const Complaints = () => {
  const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState<ComplaintType>({
    complaint: "",
    complaint_status: "",
    complaint_body: "",
    complaint_date: getDate(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage(null);

    // Simple validation check
    if (!formData.complaint || !formData.complaint_status) {
      setSubmissionMessage("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    console.log(formData);

    try {
      const concatenatedComplaint = `${formData.complaint} - ${formData.complaint_body}`;

      await postComplaints({
        complaint: concatenatedComplaint, // Concatenated complaint
        complaint_status: formData.complaint_status,
        complaint_date: formData.complaint_date,
      });
      toast({
        title: "Success",
        description: "Complaint submitted successfully.",
        variant: "success",
      });
      setSubmissionMessage("Complaint submitted successfully.");
      setFormData({
        complaint: "",
        complaint_body: "",
        complaint_status: "",
        complaint_date: "",
      }); // Reset form
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
      setSubmissionMessage("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CandidateLayout>
      <section className="w-full md:w-[580px] mx-auto p-4">
        <h1 className="text-red font-semibold text-3xl mb-5">
          General Complaints
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="complaint" className="text-[#666666]">
              Issue Type
            </label>
            <select
              name="complaint"
              id="complaint"
              value={formData.complaint}
              onChange={handleChange}
              className="border px-4 rounded-lg py-3"
            >
              <option value="">--Select an issue type--</option>
              <option value="School Application Issue">
                School Application Issue
              </option>
              <option value="Loan Application Issue">
                Loan Application Issue
              </option>
              <option value="Visa Processing Issue">
                Visa Processing Issue
              </option>
              <option value="Other Issues">Other Issues</option>
            </select>
          </div>

          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="complaint" className="text-[#666666]">
              Complaint Status
            </label>
            <select
              name="complaint_status"
              id="complaint_status"
              value={formData.complaint_status}
              onChange={handleChange}
              className="border px-4 rounded-lg py-3"
            >
              <option value="">--Select a status--</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="complaint_status" className="text-[#666666]">
              Describe your issue here
            </label>
            <textarea
              id="complaint_body"
              name="complaint_body"
              value={formData.complaint_body}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              maxLength={255}
            />
            <i className="text-xs">Max 255 characters</i>
          </div>
          {submissionMessage && (
            <p
              className={`text-sm ${
                isSubmitting ? "text-blue-500" : "text-red"
              }`}
            >
              {submissionMessage}
            </p>
          )}
          <div className="flex items-center justify-end w-full">
            <Button disabled={isSubmitting} className="bg-red">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </section>
    </CandidateLayout>
  );
};

export default Complaints;
