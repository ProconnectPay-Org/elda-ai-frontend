import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SuccessImage from "@/assets/sop-successful.svg";
import { useQuery } from "@tanstack/react-query";
import { generateSop, updateSop } from "@/lib/actions/staff.actions";

const Step4 = ({
  prevStep,
  candidateId,
  file,
}: {
  prevStep: () => void;
  candidateId: string;
  file: File | null;
}) => {
  const [searchParams] = useSearchParams();
  const routeType = searchParams.get("type");

  const [showModal, setShowModal] = useState(false);
  const [candidateSop, setCandidateSop] = useState("");
  const [sopId, setSopId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [sopLoading, setSopLoading] = useState(false);
  const sopRef = useRef<HTMLDivElement>(null);

  const prefix = routeType === "school2" ? "2" : "1"; // Default to `1` if it's not `craft-sop-2`

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["sopGenerate"],
    queryFn: () =>
      prefix === "2"
        ? generateSop(candidateId, "second")
        : generateSop(candidateId, "first"),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setCandidateSop(data.SOP?.text);
      setSopId(data.SOP?.id);
    }
  }, [data]);

  const handleUpdateSop = async () => {
    if (!file) return;
    localStorage.setItem("sopCurrentPage", String(0));
    setSopLoading(true);
    try {
      const response = await updateSop(sopId, candidateId, candidateSop, file);
      if (response) {
        handleShowModal();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSopLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 lg:p-12">
        <div className="w-16 cursor-pointer relative mb-5" onClick={prevStep}>
          <ChevronLeftIcon color="red" />
          <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
        </div>
        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-xl md:text-3xl">
            Review New Statement of Purpose
          </h2>

          <div className="flex flex-col gap-5 w-full mx-auto">
            <div ref={sopRef} className="hidden">
              <h1 className="text-red font-bold text-center mb-4 text-xl uppercase">
                Statement of Purpose
              </h1>
              <p>{candidateSop}</p>
            </div>
            <Textarea
              placeholder={
                isLoading ? "Generating your SOP..." : "Type your message here."
              }
              value={candidateSop}
              disabled={!isEditing}
              className="text-lg p-4 leading-[32px] min-h-80 text-black"
              onChange={(e) => setCandidateSop(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-between w-full">
        <Button
          onClick={() => setIsEditing(true)}
          className="border-red text-red w-32 h-12"
          variant="outline"
        >
          Edit
        </Button>

        <Button
          className="bg-red text-white w-32 h-12"
          onClick={handleUpdateSop}
          disabled={sopLoading || !file}
        >
          {sopLoading ? "Completing..." : "Complete"}
        </Button>
      </div>

      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="w-[90%] rounded-md sm:max-w-md flex flex-col items-center justify-center md:py-8">
            <DialogHeader>
              <DialogTitle className="text-red text-2xl">
                Sop Successfully Created
              </DialogTitle>
            </DialogHeader>
            <img src={SuccessImage} alt="" />
            <div className="flex items-center flex-col justify-center gap-6">
              <Link
                to={`/sop/${candidateId}?type=${
                  prefix === "2" ? "school2" : "school1"
                }`}
                target="_blank"
              >
                <Button className="bg-red">
                  Full Preview SOP {prefix === "2" ? "2" : "1"}
                </Button>
              </Link>
              <Link to="/assigned-candidates">
                <Button variant="outline" className="border-red text-red">
                  Back to dashboard
                </Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Step4;
