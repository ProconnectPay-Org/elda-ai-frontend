import { useCandidates } from "@/hooks/useCandidiates";
import { useState, useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  id?: string;
}

const SchoolApplicationModal = ({ onClose, id }: ModalProps) => {
  const { singleCandidate, singleCandidateLoading } = useCandidates(id);
  const [schoolAppliedTo, setSchoolAppliedTo] = useState("");
  const [appliedCourse, setAppliedCourse] = useState("");
  const [applicationCompleted, setApplicationCompleted] = useState(false);

  if (singleCandidateLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const handleBackgroundScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("scroll", handleBackgroundScroll);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      schoolAppliedTo,
      appliedCourse,
      applicationCompleted,
    };
    console.log("Submitted form data:", formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        tabIndex={-1}
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">School Application Status</h2>

            <div className="relative w-full">
              <label htmlFor="schoolAppliedTo" className="sr-only">
                School Applied To
              </label>
              <select
                className="border border-gray-border w-full h-[42px] shadow-none bg-white rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                name="schoolAppliedTo"
                id="schoolAppliedTo"
                value={schoolAppliedTo}
                onChange={(e) => setSchoolAppliedTo(e.target.value)}
                required
              >
                <option value="">Select School</option>
                {singleCandidate?.assigned_university1 && (
                  <option value={singleCandidate.assigned_university1}>
                    {singleCandidate.assigned_university1}
                  </option>
                )}
                {singleCandidate?.assigned_university2 && (
                  <option value={singleCandidate.assigned_university2}>
                    {singleCandidate.assigned_university2}
                  </option>
                )}
              </select>
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
            </div>

            <div className="relative w-full">
              <label htmlFor="appliedCourse" className="sr-only">
                Applied Course
              </label>
              <select
                className="border border-gray-border w-full h-[42px] shadow-none bg-white rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                name="appliedCourse"
                id="appliedCourse"
                value={appliedCourse}
                onChange={(e) => setAppliedCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                {singleCandidate?.assigned_course1 && (
                  <option value={singleCandidate.assigned_course1}>
                    {singleCandidate.assigned_course1}
                  </option>
                )}
                {singleCandidate?.assigned_course2 && (
                  <option value={singleCandidate.assigned_course2}>
                    {singleCandidate.assigned_course2}
                  </option>
                )}
              </select>
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
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="applicationCompleted">
                Completed Application
              </label>
              <input
                type="checkbox"
                id="applicationCompleted"
                checked={applicationCompleted}
                onChange={(e) => setApplicationCompleted(e.target.checked)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="submit"
              className="w-full bg-red text-white py-2 rounded-lg hover:bg-red-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolApplicationModal;
