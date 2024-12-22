import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { CandidateData } from "@/types";
import { getSingleCandidate } from "@/lib/actions/user.actions";
import { postEditedCandidate } from "@/lib/actions/staff.actions";
import { sortedSchools } from "@/constants";

interface ModalProps {
  onClose: () => void;
  id?: string;
}

const NewSchoolCourseModal = ({ onClose, id }: ModalProps) => {
  const [formValues, setFormValues] = useState({
    assigned_course1: "",
    assigned_university1: "",
    assigned_course2: "",
    assigned_university2: "",
    program_type1: "",
    program_type2: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const accessToken =
    Cookies.get("access_token") || Cookies.get("staff_access_token");

  if (!id || !accessToken) {
    console.error("Id or token is missing. Please log in again.");
    return null;
  }

  const { data: candidate, isLoading: candidateLoading } =
    useQuery<CandidateData>({
      queryKey: ["candidateData", id],
      queryFn: () => getSingleCandidate(id),
      staleTime: 5 * 60 * 1000,
    });

  useEffect(() => {
    if (candidate) {
      setFormValues({
        program_type1: candidate.program_type1 || "",
        assigned_university1: candidate.assigned_university1 || "",
        assigned_course1: candidate.assigned_course1 || "",
        program_type2: candidate.program_type2 || "",
        assigned_university2: candidate.assigned_university2 || "",
        assigned_course2: candidate.assigned_course2 || "",
      });
    }
  }, [candidate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeSchoolCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await postEditedCandidate(id, formValues, accessToken);
      console.log(response);
      console.log(formValues);

      toast({
        variant: "success",
        title: "Success",
        description: "School and course updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-modal="true"
      role="dialog"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        tabIndex={-1}
        onClick={handleContentClick}
      >
        {candidateLoading ? (
          <p>Loading....</p>
        ) : (
          <form>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Change School or Course</h2>

              <p>
                Candidate - {candidate?.first_name} {candidate?.last_name}
              </p>

              {[
                {
                  label: "Program Type (1)",
                  name: "program_type1",
                  type: "select",
                  options: ["MSC", "MBA"],
                },
                {
                  label: "Assign School (1)",
                  name: "assigned_university1",
                  type: "select",
                  options: sortedSchools.map((s) => s.name),
                },
                {
                  label: "Assign a Course (1)",
                  name: "assigned_course1",
                  type: "input",
                },
                {
                  label: "Program Type (2)",
                  name: "program_type2",
                  type: "select",
                  options: ["MSC", "MBA"],
                },
                {
                  label: "Assign School (2)",
                  name: "assigned_university2",
                  type: "select",
                  options: sortedSchools.map((s) => s.name),
                },
                {
                  label: "Assign a Course (2)",
                  name: "assigned_course2",
                  type: "input",
                },
              ].map(({ label, name, type, options }, index) => (
                <div key={index} className="flex flex-col w-full gap-1.5">
                  <label htmlFor={name}>{label}</label>
                  {type === "select" ? (
                    <div className="relative">
                      <select
                        name={name}
                        id={name}
                        className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                        onChange={handleChange}
                        value={formValues[name as keyof typeof formValues]}
                      >
                        <option value="">--Select an option--</option>
                        {options?.map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {svgSpan}
                    </div>
                  ) : (
                    <input
                      name={name}
                      id={name}
                      placeholder="Fill in a course"
                      value={formValues[name as keyof typeof formValues]}
                      onChange={handleChange}
                      className="border w-full border-gray-border h-[42px] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                disabled={isLoading}
                onClick={changeSchoolCourse}
                className="w-full bg-red text-white py-2 rounded-lg hover:bg-red-600"
              >
                {isLoading ? "Changing..." : "Change"}
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
        )}
      </div>
    </div>
  );
};

export default NewSchoolCourseModal;
