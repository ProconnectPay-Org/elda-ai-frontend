import React, { useEffect, useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { ChevronLeftIcon, XCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReactSelect, { MultiValue, SingleValue } from "react-select";
import { getAllCandidates } from "@/lib/actions/user.actions";
import { AllCandidates, OptionType } from "@/types";

const AssignCandidate: React.FC = () => {
  const [selectedStaff, setSelectedStaff] =
    useState<SingleValue<OptionType>>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<
    MultiValue<OptionType>
  >([]);
  const [candidateOptions, setCandidateOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const staffOptions: OptionType[] = [
    { value: "staff1", label: "Opeyemi Esther" },
    { value: "staff2", label: "Hannah Mary" },
    { value: "staff3", label: "Joy Nwakwo" },
    { value: "staff4", label: "Sarah Comfort" },
    { value: "staff5", label: "Justina Alas" },
    { value: "staff6", label: "Gabriel Samuel" },
  ];

  const assignCandidate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getAllCandidates();
        if (response && response.results) {
          const unassignedCandidates = response.results.filter(
            (candidate: AllCandidates) => !candidate.assigned
          );
          const options = unassignedCandidates.map(
            (candidate: AllCandidates) => ({
              value: candidate.user?.full_name,
              label: candidate.user?.full_name,
            })
          );
          setCandidateOptions(options);
        } else {
          setError("Failed to fetch candidates.");
        }
      } catch (error) {
        setError("An error occurred while fetching candidates.");
        console.error("Error fetching candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

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
            {isLoading ? "candidate is being assigned..." : "Assign"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AssignCandidate;
