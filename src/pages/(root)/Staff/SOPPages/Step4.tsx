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
import { generateSop, updateSop } from "@/lib/actions/staff.actions";
import { useCandidates } from "@/hooks/useCandidiates";
import { toast } from "@/components/ui/use-toast";

const Step4 = ({
  prevStep,
  candidateId,
}: {
  prevStep: () => void;
  candidateId: string;
}) => {
  const [searchParams] = useSearchParams();
  const routeType = searchParams.get("type");

  const [showModal, setShowModal] = useState(false);
  const [candidateSop, setCandidateSop] = useState("");
  const [sopId, setSopId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [sopLoading, setSopLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sopRef = useRef<HTMLDivElement>(null);

  const { singleCandidate, singleCandidateLoading, refetchSingleCandidate } =
    useCandidates(candidateId);

  const prefix = routeType === "school2" ? "2" : "1"; // Default to `1` if it's not `craft-sop-2`
  const prefixName = routeType === "school2" ? "second" : "first";

  useEffect(() => {
    const existingSop = singleCandidate?.[`${prefixName}_sop`];
    if (existingSop) {
      setCandidateSop(existingSop.text);
      setSopId(existingSop.id);
    }
  }, [singleCandidate, prefixName]);

  const createSop = async () => {
    setIsLoading(true);
    try {
      const response = await generateSop(candidateId, prefixName);
      if (response?.SOP) {
        setCandidateSop(response.SOP.text);
        setSopId(response.SOP.id);
        toast({
          variant: "success",
          title: "SOP Generated",
          description: "A new Statement of Purpose has been created.",
        });
      }
    } catch (error) {
      console.error("Error generating SOP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSop = async () => {
    if (!sopId) return;

    setSopLoading(true);
    try {
      const soptext = {
        text: candidateSop,
        id: sopId,
      };
      const response = await updateSop(sopId, soptext);
      if (response) {
        setCandidateSop(response.SOP?.text);
        toast({
          variant: "success",
          title: "SOP Updated",
          description: "Your changes have been saved.",
        });
        await refetchSingleCandidate();
      }
    } catch (error) {
      console.error("Error updating SOP:", error);
    } finally {
      setSopLoading(false);
    }
  };

  const handleCompleted = () => {
    localStorage.setItem("sopCurrentPage", String(0));
    setShowModal((prev) => !prev);
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
                isLoading || singleCandidateLoading
                  ? "Loading..."
                  : "Type your SOP here."
              }
              value={candidateSop}
              disabled={!isEditing || isLoading || singleCandidateLoading}
              className="text-lg p-4 leading-[32px] min-h-80 text-black"
              onChange={(e) => setCandidateSop(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-5">
          <Button
            onClick={handleUpdateSop}
            className="border-red bg-red text-white"
            variant={"default"}
            disabled={!isEditing || sopLoading}
          >
            {sopLoading ? "Saving..." : "Save"}
          </Button>

          <Button
            onClick={createSop}
            className="border-red text-red"
            variant={"outline"}
          >
            {isLoading ? "Generating Sop..." : "Generate Sop"}
          </Button>
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
          onClick={handleCompleted}
        >
          Complete
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
