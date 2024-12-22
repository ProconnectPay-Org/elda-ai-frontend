import { useCandidates } from "@/hooks/useCandidiates";
import {
  assignCandidateToStaff,
  getAllStaff,
} from "@/lib/actions/user.actions";
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { CandidateData, OptionType } from "@/types";
import ReactSelect, { SingleValue } from "react-select";

interface ModalProps {
  onClose: () => void;
  id?: string;
}

const ReAssignModal = ({ onClose, id }: ModalProps) => {
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);
  const [selectedStaff, setSelectedStaff] =
    useState<SingleValue<OptionType>>(null);
  const [staffOptions, setStaffOptions] = useState<OptionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: staffResponse, isLoading: isLoadingStaff } = useQuery({
    queryKey: ["staff"],
    queryFn: () => getAllStaff(),
    staleTime: 5 * 1000,
  });

  if (!id) {
    console.error("Id or token is missing. Please log in again.");
    return null;
  }

  const handleStaffChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedStaff(selectedOption);
  };

  useEffect(() => {
    const handleBackgroundScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("scroll", handleBackgroundScroll);
    };
  }, []);

  const assignCandidate = async () => {
    if (!selectedStaff) {
      setError("Please select both a staff and one or more candidates.");
      return;
    }
    setIsLoading(true);
    try {
      await assignCandidateToStaff({
        candidate_ids: [id],
        staff_id: selectedStaff.value,
      });
      setError(null);
      toast({
        title: "Success",
        description: "Candidate Re-assigned",
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
    if (staffResponse && staffResponse.results) {
      const options = staffResponse.results.map((staff: CandidateData) => ({
        value: staff.id,
        label: staff.user?.full_name,
      }));
      setStaffOptions(options);
      setError("");
    }
  }, [staffResponse]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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
        <form>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Assign To Another Staff</h2>

            <div className="flex flex-col w-full gap-1.5">
              {singleCandidateLoading ? (
                <p>Loading candidate details...</p>
              ) : singleCandidateError ? (
                <p className="text-red-500">Error loading candidate details.</p>
              ) : (
                <>
                  <p>Name: {singleCandidate?.user?.full_name}</p>
                  <p>Id: {singleCandidate?.id}</p>
                </>
              )}
            </div>
            <div className="flex flex-col w-full gap-1.5">
              <p>Select Staff to Re-Assign</p>
              <ReactSelect
                options={staffOptions}
                onChange={handleStaffChange}
                className="border-gray-border"
                placeholder="Select Staff"
                value={selectedStaff}
                isLoading={isLoadingStaff}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="submit"
              onClick={assignCandidate}
              disabled={isLoading}
              className="w-full bg-red text-white py-2 rounded-lg hover:bg-red-600"
            >
              {isLoading ? "Loading..." : "Re-Assign"}
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

export default ReAssignModal;
