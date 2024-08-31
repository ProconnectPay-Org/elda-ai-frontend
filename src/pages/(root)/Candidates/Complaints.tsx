import { useState } from "react";
import { Button } from "@/components/ui/button";
import CandidateLayout from "@/layouts/CandidateLayout";

interface ComplaintFormData {
  issue: string;
  title: string;
  body: string;
}

const Complaints = () => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    issue: "",
    title: "",
    body: "",
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
    if (!formData.issue || !formData.title || !formData.body) {
      setSubmissionMessage("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Replace with actual API call
      await fakeApiCall(formData);

      setSubmissionMessage("Complaint submitted successfully.");
      setFormData({ issue: "", title: "", body: "" }); // Reset form
    } catch (error) {
      setSubmissionMessage("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate API call - replace with actual API call in production
  const fakeApiCall = (data: ComplaintFormData) => {
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CandidateLayout>
      <section className="w-full md:w-[580px] mx-auto p-4">
        <h1 className="text-[#1F384C] font-semibold text-3xl mb-5">
          General Complaints
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="issue" className="text-[#666666]">
              Issue Type
            </label>
            <select
              name="issue"
              id="issue"
              value={formData.issue}
              onChange={handleChange}
              className="border px-4 rounded-lg py-3"
            >
              <option value="">--Select an issue type--</option>
              <option value="signInError">Error while signing in</option>
              <option value="documentNotFound">Cannot find document</option>
              <option value="noResponse">No response</option>
            </select>
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="title" className="text-[#666666]">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="body" className="text-[#666666]">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
          {submissionMessage && (
            <p className={`text-sm ${isSubmitting ? "text-blue-500" : "text-red"}`}>
              {submissionMessage}
            </p>
          )}
          <div className="flex items-center justify-end w-full">
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </section>
    </CandidateLayout>
  );
};

export default Complaints;
