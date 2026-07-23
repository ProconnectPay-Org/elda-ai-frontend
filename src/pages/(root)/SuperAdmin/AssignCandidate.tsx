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
  reAssignCandidateToStaff,
  unassignCandidateFromStaff,
} from "@/lib/actions/user.actions";
import { CandidateData, OptionType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const AssignCandidate: React.FC = () => {
  const [selectedStaff, setSelectedStaff] =
    useState<SingleValue<OptionType>>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<
    MultiValue<OptionType>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<
    "assign" | "reassign" | "unassign"
  >("assign");
  const [selectedStaffCandidates, setSelectedStaffCandidates] = useState<
    OptionType[]
  >([]);
  const [checkedCandidates, setCheckedCandidates] = useState<OptionType[]>([]);
  const [sourceStaff, setSourceStaff] = useState<SingleValue<OptionType>>(null);
  const [targetStaff, setTargetStaff] = useState<SingleValue<OptionType>>(null);

  const isAnalyst = Cookies.get("user_role") === "analyst";
  const queryClient = useQueryClient();

  const {
    data: staffResponse,
    isLoading: isLoadingStaff,
    fetchNextPage: fetchNextStaffPage,
    hasNextPage: hasNextStaffPage,
    isFetchingNextPage: isFetchingNextStaffPage,
  } = useInfiniteQuery({
    queryKey: ["staff"],
    queryFn: async ({ pageParam = 1 }) => getAllStaff(pageParam, 50),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 1000,
  });

  const {
    data: candidatesResponse,
    isLoading: candidatesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["candidates", selectedAction],
    queryFn: async ({ pageParam = 1 }) => {
      const count = 50;
      return getCandidatesToAssign(
        count,
        selectedAction === "assign" ? "False" : "True",
        pageParam,
      );
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 1000,
  });

  // Create staff options
  const staffOptions =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (staffResponse?.pages as any[])?.flatMap((page) =>
      page.results.map((staff: CandidateData) => ({
        value: staff.id || "",
        label: staff.user?.full_name || "",
      })),
    ) || [];

  // Create candidate options - no local filtering needed since server handles it
  const candidateOptions =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (candidatesResponse?.pages as any[])?.flatMap((page) =>
      page.results.map((candidate: CandidateData) => ({
        value: candidate.id || "",
        label: candidate?.full_name || "",
      })),
    ) || [];

  const handleStaffChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedStaff(selectedOption);

    if (staffResponse && selectedOption) {
      const foundStaff = staffResponse.pages
        .flatMap((p) => p.results)
        .find((staff: CandidateData) => staff.id === selectedOption.value);

      if (foundStaff) {
        const candidates = (foundStaff.assigned_candidates || []).map(
          (candidate: CandidateData) => ({
            value: candidate.id,
            label: `${candidate.first_name} ${candidate.middle_name} ${candidate.last_name}`,
          }),
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
      prevCandidates.filter((item) => item.value !== candidate.value),
    );
  };

  const handleSourceStaffChange = (selectedOption: SingleValue<OptionType>) => {
    setSourceStaff(selectedOption);

    if (staffResponse && selectedOption) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundStaff = (staffResponse.pages as any[])
        ?.flatMap((p) => p.results)
        .find((staff: CandidateData) => staff.id === selectedOption.value);

      if (foundStaff) {
        const candidates = (foundStaff.assigned_candidates || []).map(
          (candidate: CandidateData) => {
            const { first_name, middle_name, last_name } = candidate;
            const hasValidName = first_name?.trim() && last_name?.trim();

            return {
              value: candidate.id,
              label: hasValidName
                ? `${first_name} ${middle_name} ${last_name}`
                : "Unnamed Candidate",
            };
          },
        );

        setSelectedStaffCandidates(candidates);
      } else {
        setSelectedStaffCandidates([]);
      }
    }
  };

  const assignCandidate = async () => {
    if (!selectedStaff || selectedCandidates.length === 0) {
      setError("Please select both a staff and one or more candidates.");
      return;
    }
    setIsLoading(true);
    try {
      const candidate_ids = selectedCandidates.map(
        (candidate) => candidate.value,
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
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      queryClient.invalidateQueries({ queryKey: ["staff"] });
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

  const reassignCandidate = async () => {
    if (!sourceStaff || !targetStaff || selectedCandidates.length === 0) {
      setError(
        "Please select both the original and new staff, and one or more candidates.",
      );
      return;
    }

    setIsLoading(true);
    try {
      const candidate_ids = selectedCandidates.map(
        (candidate) => candidate.value,
      );
      await reAssignCandidateToStaff({
        candidate_ids,
        new_staff_id: targetStaff.value,
        staff_id: sourceStaff.value,
      });

      toast({
        title: "Success",
        description: "Candidates reassigned",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error reassigning candidates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unassignCandidate = async () => {
    if (!selectedStaff || checkedCandidates.length === 0) {
      setError("Please select a staff and candidates to unassign.");
      return;
    }
    setIsLoading(true);
    try {
      const candidate_id = checkedCandidates.map(
        (candidate) => candidate.value,
      );
      await unassignCandidateFromStaff({
        candidate_ids: candidate_id,
        staff_id: selectedStaff.value,
      });
      toast({
        title: "Success",
        description: "Candidates unassigned",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error unassigning candidates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear form when action changes
  useEffect(() => {
    setSelectedStaff(null);
    setSelectedCandidates([]);
    setSourceStaff(null);
    setTargetStaff(null);
    setCheckedCandidates([]);
    setError(null);
  }, [selectedAction]);

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

          {/* ASSIGN INPUT FIELDS */}
          {selectedAction === "assign" && (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col w-full gap-1.5">
                <p>Select Staff</p>
                <ReactSelect
                  options={staffOptions}
                  onChange={handleStaffChange}
                  className="border-gray-border"
                  placeholder="Select Staff"
                  value={selectedStaff}
                  isLoading={isLoadingStaff || isFetchingNextStaffPage}
                  onMenuScrollToBottom={() => {
                    if (hasNextStaffPage && !isFetchingNextStaffPage) {
                      fetchNextStaffPage();
                    }
                  }}
                />
              </div>
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
                  isLoading={candidatesLoading || isFetchingNextPage}
                  onMenuScrollToBottom={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                      fetchNextPage();
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* RE-ASSIGN INPUT FIELDS */}
          {selectedAction === "reassign" && (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col w-full gap-1.5">
                <p>Select Current Staff</p>
                <ReactSelect
                  options={staffOptions}
                  onChange={(option) => {
                    setSelectedStaff(option);
                    handleSourceStaffChange(option);
                  }}
                  className="border-gray-border"
                  placeholder="Select Staff"
                  value={selectedStaff}
                  isLoading={isLoadingStaff || isFetchingNextStaffPage}
                  onMenuScrollToBottom={() => {
                    if (hasNextStaffPage && !isFetchingNextStaffPage) {
                      fetchNextStaffPage();
                    }
                  }}
                />
              </div>

              <div className="flex flex-col w-full gap-1.5">
                <p>Select Candidates to re-assign</p>
                <ReactSelect
                  isMulti
                  options={selectedStaffCandidates}
                  onChange={handleCandidateChange}
                  className="border-gray-border"
                  placeholder="Select Candidates"
                  value={selectedCandidates}
                  components={{
                    MultiValueContainer: () => null,
                  }}
                  isLoading={isLoadingStaff}
                />
              </div>

              <div className="flex flex-col w-full gap-1.5">
                <p>Select New Staff</p>
                <ReactSelect
                  options={staffOptions}
                  onChange={(option) => {
                    setTargetStaff(option);
                  }}
                  className="border-gray-border"
                  placeholder="Select Staff"
                  value={targetStaff}
                  isLoading={isLoadingStaff || isFetchingNextStaffPage}
                  onMenuScrollToBottom={() => {
                    if (hasNextStaffPage && !isFetchingNextStaffPage) {
                      fetchNextStaffPage();
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* UN ASSIGN INPUT FIELDS */}
          {selectedAction === "unassign" && (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col w-full gap-1.5">
                <p>Select Staff</p>
                <ReactSelect
                  options={staffOptions}
                  onChange={handleStaffChange}
                  className="border-gray-border"
                  placeholder="Select Staff"
                  value={selectedStaff}
                  isLoading={isLoadingStaff}
                />
              </div>
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
                            (c) => c.value === candidate.value,
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCheckedCandidates((prev) => [
                                ...prev,
                                candidate,
                              ]);
                            } else {
                              setCheckedCandidates((prev) =>
                                prev.filter((c) => c.value !== candidate.value),
                              );
                            }
                          }}
                        />
                        {candidate.label?.trim()
                          ? candidate.label
                          : "No name ~ has not filled form yet"}
                      </label>
                    ))}
                  </>
                ) : (
                  <p>No candidates assigned to this staff.</p>
                )}
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red mt-2">{error}</p>}

          {/* Display selected candidates */}
          {selectedCandidates.length > 0 && (
            <div className="mt-4 w-full">
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

          <Button
            className="bg-red mt-10 w-full h-12 text-lg"
            disabled={isLoading || isAnalyst}
            onClick={() => {
              if (selectedAction === "assign") assignCandidate();
              if (selectedAction === "reassign") reassignCandidate();
              if (selectedAction === "unassign") unassignCandidate();
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
