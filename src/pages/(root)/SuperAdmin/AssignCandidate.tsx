import React, { useEffect, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { ChevronLeftIcon, XCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReactSelect, { MultiValue, SingleValue } from "react-select";
import {
  assignCandidateToStaff,
  getAllStaff,
  getCandidatesToAssign,
  // reAssignCandidateToStaff,
  // unassignCandidateFromStaff,
} from "@/lib/actions/user.actions";
import { CandidateData, OptionType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const AssignCandidate: React.FC = () => {
  const [selectedStaff, setSelectedStaff] =
    useState<SingleValue<OptionType>>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<
    MultiValue<OptionType>
  >([]);
  const [candidateOptions, setCandidateOptions] = useState<OptionType[]>([]);
  const [assignedCandidateOptions, setAssignedCandidateOptions] = useState<
    OptionType[]
  >([]);
  const [staffOptions, setStaffOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<
    "assign" | "reassign" | "unassign"
  >("assign");
  const [selectedStaffCandidates, setSelectedStaffCandidates] = useState<
    OptionType[]
  >([]);
  const [checkedCandidates, setCheckedCandidates] = useState<OptionType[]>([]);

  const isAnalyst = Cookies.get("user_role") === "analyst";

  const { data: staffResponse, isLoading: isLoadingStaff } = useQuery({
    queryKey: ["staff"],
    queryFn: () => getAllStaff(),
    staleTime: 5 * 1000,
  });

  const { data: allCandidates, isLoading: allCandidatesLoading } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const count = 1000;
      return getCandidatesToAssign(count);
    },
    staleTime: 5 * 1000,
  });

  const handleStaffChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedStaff(selectedOption);

    if (staffResponse && selectedOption) {
      const foundStaff = staffResponse.results.find(
        (staff: CandidateData) => staff.id === selectedOption.value
      );

      if (foundStaff) {
        const candidates = (foundStaff.assigned_candidates || []).map(
          (candidate: CandidateData) => ({
            value: candidate.id,
            label: `${candidate.first_name} ${candidate.middle_name} ${candidate.last_name}`,
          })
        );

        setSelectedStaffCandidates(candidates);
      } else {
        setSelectedStaffCandidates([]);
      }
    }
  };

  const handleCandidateChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectedCandidates(selectedOptions);
  };

  const handleRemoveCandidate = (candidate: OptionType) => {
    setSelectedCandidates((prevCandidates) =>
      prevCandidates.filter((item) => item.value !== candidate.value)
    );
  };

  const assignCandidate = async () => {
    if (!selectedStaff || selectedCandidates.length === 0) {
      setError("Please select both a staff and one or more candidates.");
      return;
    }
    setIsLoading(true);
    try {
      const candidate_ids = selectedCandidates.map(
        (candidate) => candidate.value
      );
      await assignCandidateToStaff({
        candidate_ids,
        staff_id: selectedStaff.value,
      });
      setError(null);
      toast({
        title: "Success",
        description: "Candidates assigned",
        variant: "success",
      });
    } catch (error) {
      console.error("Error assigning candidates:", error);
      toast({
        title: "Error",
        description: "There was an error assigning candidates.",
        variant: "destructive",
      });
      setError("An error occurred while assigning candidates.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔄 Re-Assign
  // const reassignCandidate = async () => {
  //   if (!selectedStaff || selectedCandidates.length === 0) {
  //     setError("Please select both a new staff and candidates to reassign.");
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const candidate_ids = selectedCandidates.map(
  //       (candidate) => candidate.value
  //     );
  //     await reAssignCandidateToStaff({
  //       candidate_ids,
  //       new_staff_id: selectedStaff.value,
  //     });
  //     toast({
  //       title: "Success",
  //       description: "Candidates reassigned",
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "Error",
  //       description: "Error reassigning candidates",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // 🚫 Unassign
  // const unassignCandidate = async () => {
  //   if (!selectedStaff || selectedCandidates.length === 0) {
  //     setError("Please select a staff and candidates to unassign.");
  //     return;
  //   }
  //   setIsLoading(true);
  //   try {
  //     const candidate_ids = selectedCandidates.map(
  //       (candidate) => candidate.value
  //     );
  //     await unassignCandidateFromStaff({
  //       candidate_ids,
  //       staff_id: selectedStaff.value,
  //     });
  //     toast({
  //       title: "Success",
  //       description: "Candidates unassigned",
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "Error",
  //       description: "Error unassigning candidates",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (allCandidates) {
      const unassignedCandidates = allCandidates.results.filter(
        (candidate: CandidateData) => !candidate.assigned
      );
      const options = unassignedCandidates.map((candidate: CandidateData) => ({
        value: candidate.id,
        label: candidate?.full_name,
      }));
      setCandidateOptions(options);

      const assignedCandidates = allCandidates.results.filter(
        (candidate: CandidateData) => candidate.assigned
      );
      const assignedOptions = assignedCandidates.map(
        (candidate: CandidateData) => ({
          value: candidate.id,
          label: candidate?.full_name,
        })
      );
      setAssignedCandidateOptions(assignedOptions);
    }
  }, [allCandidates]);

  useEffect(() => {
    if (staffResponse && staffResponse.results) {
      const options = staffResponse.results.map((staff: CandidateData) => ({
        value: staff.id,
        label: staff.user?.full_name,
      }));
      setStaffOptions(options);
      setError("");
    }
  }, [staffResponse]);

  return (
    <AdminLayout>
      <div className="flex items-start lg:gap-24 lg:px-32">
        <Link to="/admin-dashboard">
          <div className="w-16 cursor-pointer relative">
            <ChevronLeftIcon color="red" />
            <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
          </div>
        </Link>
        <div className="flex flex-col items-start justify-center w-[76%]">
          <h2 className="text-red text-3xl font-bold text-center w-full mb-10">
            Assign Candidate
          </h2>

          {/* TRIGGERS */}
          <div className="flex gap-6 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAction === "assign"}
                onChange={() => setSelectedAction("assign")}
              />
              Assign
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAction === "reassign"}
                onChange={() => setSelectedAction("reassign")}
              />
              Re-Assign
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAction === "unassign"}
                onChange={() => setSelectedAction("unassign")}
              />
              Un-Assign
            </label>
          </div>

          <div className="w-full mb-5">
            {/* Reassign extra info (old staff) */}
            {selectedAction === "reassign" && (
              <div className="flex flex-col w-full gap-1.5">
                <p>Select Candidates to re-assign</p>
                <ReactSelect
                  isMulti
                  options={assignedCandidateOptions}
                  onChange={handleCandidateChange}
                  className="border-gray-border"
                  placeholder="Select Candidates"
                  value={selectedCandidates}
                  components={{
                    MultiValueContainer: () => null,
                  }}
                  isLoading={allCandidatesLoading}
                />
                {error && <p className="text-sm text-red">{error}</p>}
              </div>
            )}
          </div>

          {/* INPUT FIELDS */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col w-full gap-1.5">
              <p>
                Select Staff{" "}
                {selectedAction === "reassign" && "to re-assign candidates to"}
              </p>
              <ReactSelect
                options={staffOptions}
                onChange={handleStaffChange}
                className="border-gray-border"
                placeholder="Select Staff"
                value={selectedStaff}
                isLoading={isLoadingStaff}
              />
            </div>
            {selectedAction === "assign" && (
              <div className="flex flex-col w-full gap-1.5">
                <p>Select Candidate(s)</p>
                <ReactSelect
                  isMulti
                  options={candidateOptions}
                  onChange={handleCandidateChange}
                  className="border-gray-border"
                  placeholder="Select Candidates"
                  value={selectedCandidates}
                  components={{
                    MultiValueContainer: () => null,
                  }}
                  isLoading={allCandidatesLoading}
                />
                {error && <p className="text-sm text-red">{error}</p>}
              </div>
            )}

            {/* Unassign case: After staff selected, show assigned candidates */}
            {selectedAction === "unassign" && selectedStaff && (
              <div className="flex flex-col gap-2 mt-4">
                <p>Select Candidates to Unassign</p>
                {selectedStaffCandidates.length > 0 ? (
                  <>
                    <label className="flex items-center gap-2 font-semibold text-lg my-5">
                      <input
                        type="checkbox"
                        checked={
                          checkedCandidates.length ===
                          selectedStaffCandidates.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCheckedCandidates(selectedStaffCandidates);
                          } else {
                            setCheckedCandidates([]);
                          }
                        }}
                      />
                      Select All Candidates
                    </label>

                    {selectedStaffCandidates.map((candidate) => (
                      <label
                        key={candidate.value}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={checkedCandidates.some(
                            (c) => c.value === candidate.value
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCheckedCandidates((prev) => [
                                ...prev,
                                candidate,
                              ]);
                            } else {
                              setCheckedCandidates((prev) =>
                                prev.filter((c) => c.value !== candidate.value)
                              );
                            }
                          }}
                        />
                        {candidate.label || "No name ~ has not filled form yet"}
                      </label>
                    ))}
                  </>
                ) : (
                  <p>No candidates assigned to this staff.</p>
                )}
              </div>
            )}
          </div>

          {/* Display selected candidates */}
          <div className="mt-4">
            {selectedCandidates.length > 0 && (
              <div>
                <ul className="flex flex-col flex-wrap gap-2">
                  {selectedCandidates.map((candidate) => (
                    <li
                      key={candidate.value}
                      className="flex border border-gray-border rounded-full items-center gap-2 bg-gray-200 py-1 px-2 justify-between"
                    >
                      {candidate.label}
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveCandidate(candidate)}
                      >
                        <XCircleIcon className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button
            className="bg-red mt-10 w-full h-12 text-lg"
            disabled={isLoading || isAnalyst}
            onClick={() => {
              if (selectedAction === "assign") assignCandidate();
              // if (selectedAction === "reassign") reassignCandidate();
              // if (selectedAction === "unassign") unassignCandidate();
            }}
          >
            {isLoading
              ? "Processing..."
              : selectedAction === "assign"
              ? "Assign"
              : selectedAction === "reassign"
              ? "Re-Assign"
              : "Un-Assign"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AssignCandidate;
