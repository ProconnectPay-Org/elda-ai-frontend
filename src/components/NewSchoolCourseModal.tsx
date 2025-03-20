import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { CandidateData } from "@/types";
import { getSingleCandidate } from "@/lib/actions/user.actions";
import { postEditedCandidate, updateSop } from "@/lib/actions/staff.actions";
import { countryOptions, programTypes, sortedSchools } from "@/constants";

interface ModalProps {
  onClose: () => void;
  id?: string;
}

const NewSchoolCourseModal = ({ onClose, id }: ModalProps) => {
  const [formValues, setFormValues] = useState({
    assigned_course1: "",
    assigned_university1: "",
    first_country: "",
    second_country: "",
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

  const queryClient = useQueryClient();

  useEffect(() => {
    if (candidate) {
      setFormValues({
        program_type1: candidate.program_type1 || "",
        assigned_university1: candidate.assigned_university1 || "",
        assigned_course1: candidate.assigned_course1 || "",
        first_country: candidate.first_country || "",
        program_type2: candidate.program_type2 || "",
        assigned_university2: candidate.assigned_university2 || "",
        assigned_course2: candidate.assigned_course2 || "",
        second_country: candidate.second_country || "",
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

    // Initialize SOP status as unchanged
    let updatedSOPStatus1 = candidate?.sop_status1 || "Completed";
    let updatedSOPStatus2 = candidate?.sop_status2 || "Completed";

    // Check if fields ending in 1 have changed
    const hasFirstChanged =
      formValues.assigned_course1 !== candidate?.assigned_course1 ||
      formValues.assigned_university1 !== candidate?.assigned_university1 ||
      formValues.first_country !== candidate?.first_country ||
      formValues.program_type1 !== candidate?.program_type1;

    // Check if fields ending in 2 have changed
    const hasSecondChanged =
      formValues.assigned_course2 !== candidate?.assigned_course2 ||
      formValues.assigned_university2 !== candidate?.assigned_university2 ||
      formValues.second_country !== candidate?.second_country ||
      formValues.program_type2 !== candidate?.program_type2;

    // Update SOP status if the corresponding values changed
    if (hasFirstChanged) updatedSOPStatus1 = "Pending";
    if (hasSecondChanged) updatedSOPStatus2 = "Pending";

    try {
      await postEditedCandidate(
        id,
        {
          formValues,
          sop_status1: updatedSOPStatus1,
          sop_status2: updatedSOPStatus2,
        },
        accessToken
      );

      toast({
        variant: "success",
        title: "Success",
        description: "School and course updated successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["allTableCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["staffDetails"] });
      queryClient.invalidateQueries({ queryKey: ["candidateData"] });

      // Determine which SOP ID to update
      if (updatedSOPStatus1 === "Pending") {
        await handleUpdateSop(candidate?.first_sop?.id || "");
      } else if (updatedSOPStatus2 === "Pending") {
        await handleUpdateSop(candidate?.second_sop?.id || "");
      }
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

  const handleUpdateSop = async (sopId: string) => {
    if (!sopId) return;

    try {
      const soptext = {
        text: "", // Update this with the new SOP content if needed
        id: sopId,
      };

      const response = await updateSop(sopId, soptext);

      if (response) {
        toast({
          variant: "success",
          title: "SOP Updated",
          description: "Your changes have been saved.",
        });
      }
    } catch (error) {
      console.error("Error updating SOP:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update SOP. Please try again.",
      });
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
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Change School or Course</h2>

              <p>
                Candidate - {candidate?.user?.full_name}
                {candidate?.id}
              </p>

              {[
                {
                  label: "Program Type (1)",
                  name: "program_type1",
                  type: "select",
                  options: programTypes.map((t) => t),
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
                  label: "Country (1)",
                  name: "first_country",
                  type: "select",
                  options: countryOptions.map((t) => t),
                },
                {
                  label: "Program Type (2)",
                  name: "program_type2",
                  type: "select",
                  options: programTypes.map((t) => t),
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
                {
                  label: "Country (2)",
                  name: "second_country",
                  type: "select",
                  options: countryOptions.map((t) => t),
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
