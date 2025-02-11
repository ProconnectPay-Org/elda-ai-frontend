import { useCandidates } from "@/hooks/useCandidiates";
import {
  getAllStaff,
  reAssignCandidateToStaff,
  unassignCandidateFromStaff,
} from "@/lib/actions/user.actions";
import { useState, useEffect } from "react";
import { toast } from "./ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { CandidateData, OptionType } from "@/types";
import ReactSelect, { SingleValue } from "react-select";

interface ModalProps {
  onClose: () => void;
  id?: string;
  mode: "reassign" | "unassign";
}

const ReAssignModal = ({ onClose, id, mode }: ModalProps) => {
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
    setIsLoading(true);
    try {
      if (mode === "reassign") {
        if (!selectedStaff) {
          setError("Please select a new staff.");
          return;
        }
        await reAssignCandidateToStaff({
          candidate_id: id,
          staff_id: singleCandidate?.assigned_manager[0]?.id,
          new_staff_id: selectedStaff.value,
        });
        toast({
          title: "Success",
          description: "Candidate Re-assigned",
          variant: "success",
        });
      } else if (mode === "unassign") {
        await unassignCandidateFromStaff({
          candidate_id: id,
          staff_id: singleCandidate?.assigned_manager[0]?.id,
        });
        toast({
          title: "Success",
          description: "Candidate Unassigned",
          variant: "success",
        });
      }
      onClose();
    } catch (error) {
      console.error("Error processing request:", error);
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
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
            <h2 className="text-2xl font-bold">
              {mode === "reassign"
                ? "Re-assign Candidate"
                : "Unassign Candidate"}
            </h2>

            <div className="flex flex-col w-full gap-1.5">
              {singleCandidateLoading ? (
                <p>Loading candidate details...</p>
              ) : singleCandidateError ? (
                <p className="text-red-500">Error loading candidate details.</p>
              ) : (
                <>
                  <p className="font-semibold">
                    Name: {singleCandidate?.user?.full_name}
                  </p>
                  <p className="text-xs">Id: {singleCandidate?.id}</p>
                </>
              )}
            </div>
            <div>
              <p className="font-semibold">Current Staff Assigned</p>
              {singleCandidateLoading ? (
                <p>Getting staff...</p>
              ) : singleCandidateError ? (
                <p className="text-red-500">Error loading staff details.</p>
              ) : (
                <>
                  <p>
                    {singleCandidate?.assigned_manager[0]?.user?.full_name ||
                      "Not yet assigned"}
                  </p>
                </>
              )}
            </div>
            {mode === "reassign" && (
              <div className="flex flex-col w-full gap-1.5">
                <p className="font-semibold">Select New Staff</p>
                <ReactSelect
                  options={staffOptions}
                  onChange={handleStaffChange}
                  className="border-gray-border"
                  placeholder="Select Staff"
                  value={selectedStaff}
                  isLoading={isLoadingStaff}
                />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="submit"
              onClick={assignCandidate}
              disabled={isLoading}
              className="w-full bg-red text-white py-2 rounded-lg hover:bg-red-600"
            >
              {isLoading
                ? "Processing..."
                : mode === "reassign"
                ? "Re-Assign"
                : "Unassign"}
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
