import { Link } from "react-router-dom";
import { copyToClipboard } from "@/lib/utils";
import DottedBox from "@/components/DottedBox";
import { CopyIcon, MailIcon, PhoneCallIcon, X } from "lucide-react";
import { useCandidates } from "@/hooks/useCandidiates";
import { useToast } from "./ui/use-toast";

interface ModalProps {
  onClose: () => void;
  id?: string;
}

const SelectedCandidateModal = ({ onClose, id }: ModalProps) => {
  const { singleCandidate: candidateData } = useCandidates(id);
  const { toast } = useToast();

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
        <div className="flex justify-end">
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div>
          <div className="flex w-full justify-between mt-4">
            <h3 className="text-red">Candidate Details</h3>
            <Link
              to={`/assigned-candidates/${id}`}
              className="underline text-sm text-red font-medium"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
            <div className="w-1/2">
              <label>Full Name</label>
              <p className="text-primary font-medium">
                {candidateData?.user?.full_name}
              </p>
            </div>
            <div className="w-1/2 flex flex-col items-start">
              <label>Status</label>
              <p
                className={`${
                  candidateData?.status === "completed"
                    ? "bg-green-200 text-green-800"
                    : "text-red bg-pale-bg"
                } text-[10px] p-1 rounded-xl`}
              >
                {candidateData?.status || "Pending"}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
            <div className="w-1/2">
              <label>Phone Number</label>
              <span
                onClick={() =>
                  copyToClipboard(candidateData?.phone_number || "", toast)
                }
                className="text-primary font-medium flex items-center gap-1"
              >
                <PhoneCallIcon size={16} />
                {candidateData?.phone_number}
                <CopyIcon size={16} cursor="pointer" />
              </span>
            </div>
            <div className="w-1/2">
              <label>Email Address</label>
              <span
                onClick={() =>
                  copyToClipboard(candidateData?.user?.email || "", toast)
                }
                className="text-primary font-medium flex items-center gap-1"
              >
                <MailIcon size={16} />
                {candidateData?.user?.email}
                <CopyIcon size={16} cursor="pointer" />
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
            <div className="w-1/2">
              <label>Recommended School 1</label>
              <p className="text-primary font-medium">
                {candidateData?.assigned_university1}
              </p>
            </div>
            <div className="w-1/2">
              <label>Recommended Course 1</label>
              <p className="text-primary font-medium">
                {candidateData?.assigned_course1}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
            <div className="w-1/2">
              <label>Recommended School 2</label>
              <p className="text-primary font-medium">
                {candidateData?.assigned_university2}
              </p>
            </div>
            <div className="w-1/2">
              <label>Recommended Course 2</label>
              <p className="text-primary font-medium">
                {candidateData?.assigned_course2}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-0 justify-between">
            <DottedBox
              className="border-red rounded-md text-xs font-bold p-2 hover:bg-pale-bg"
              href={`/craft-sop/${candidateData?.id}?type=school1`}
              docType="Draft SOP 1"
              icon=""
            />
            {/* <DottedBox
              className="border-red rounded-md text-xs font-bold p-2 hover:bg-pale-bg"
              href={`/craft-sop/${candidateData?.id}?type=school2`}
              docType="Draft SOP 2"
              icon=""
            /> */}
            <Link
              to={`/refine-resume/${candidateData?.id}`}
              className="bg-red w-1/2 hover:bg-pale-bg text-white hover:text-red border hover:border-red text-center py-2 rounded-md text-xs"
            >
              Refine Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCandidateModal;
