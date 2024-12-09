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
} from "@/lib/actions/user.actions";
import { CandidateData, OptionType } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

const AssignCandidate: React.FC = () => {
  const [selectedStaff, setSelectedStaff] =
    useState<SingleValue<OptionType>>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<
    MultiValue<OptionType>
  >([]);
  const [candidateOptions, setCandidateOptions] = useState<OptionType[]>([]);
  const [staffOptions, setStaffOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

          {/* INPUT FIELDS */}
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
            <div className="flex flex-col w-full gap-1.5">
              <p>Select Candidates</p>
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
            disabled={isLoading}
            onClick={assignCandidate}
          >
            {isLoading ? "Candidate is being assigned..." : "Assign"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AssignCandidate;
