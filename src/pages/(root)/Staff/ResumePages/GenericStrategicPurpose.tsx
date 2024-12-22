import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep5FormData } from "@/types";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import aiSpark from "@/assets/ai-prompt-spark.svg";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { careerStrategyPurpose } from "@/lib/actions/staff.actions";
import { useEffect, useState } from "react";
import { useCandidates } from "@/hooks/useCandidiates";
import { updatePersonalDetails } from "@/lib/actions/staffresume.actions";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const GenericStrategicPurpose = () => {
  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ResumeStep5FormData>();
  const { id } = useParams<{ id: string }>();
  const [refineLoading, setRefineLoading] = useState(false);
  const [isSaving, setIsSavinng] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const { singleCandidate, singleCandidateLoading } = useCandidates(id);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["careerStrategyPurpose", id],
    queryFn: () => careerStrategyPurpose(id),
    staleTime: 5 * 1000 * 60,
    enabled: false,
  });

  const promptValue = watch("prompt");

  useEffect(() => {
    if (singleCandidate?.career_strategic_purpose === "") {
      refetch();
    } else {
      setValue("prompt", singleCandidate?.career_strategic_purpose || "");
    }
  }, [singleCandidate, refetch, setValue]);

  useEffect(() => {
    if (data) {
      setValue("prompt", data);
    }
  }, [data, setValue]);

  useEffect(() => {
    if (singleCandidate?.career_strategic_purpose !== promptValue) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [promptValue, singleCandidate]);

  const handleRefinePrompt = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRefineLoading(true);
    try {
      const refinedContent = await careerStrategyPurpose(id);
      setValue("prompt", refinedContent);
    } catch (error) {
      console.error("Error refining prompt:", error);
    } finally {
      setRefineLoading(false);
    }
  };

  const saveCSP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSavinng(true);
    try {
      const promptValue = getValues("prompt");

      const cspData = {
        career_strategic_purpose: promptValue,
      } as ResumeStep5FormData;

      await updatePersonalDetails(cspData);

      toast({
        variant: "success",
        title: "Saved Successfully",
        description: "Career Strategic Purpose saved successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Saving CSP",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSavinng(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold mb-4">CAREER STRATEGIC PURPOSE</h2>
        {/* <div className="space-y-2">
          <label htmlFor="">Type of program</label>
          <div className="w-full flex items-center gap-4 border border-[#667085] px-3 rounded-full overflow-hidden">
            <Input
              type="text"
              placeholder="MBA"
              value="MBA"
              className="bg-transparent focus:ring-0 focus-visible:ring-0 outline-none border-0 focus-within:ring-0 max-h-fit"
            />
            <img src={helpIcon} alt="help icon" />
          </div>
          <small>Choose the correct program</small>
        </div> */}
      </div>

      <div className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl space-y-5">
        <p className="text-center text-red font-bold text-2xl">
          CAREER STRATEGIC PURPOSE
        </p>
        <div className="flex flex-col">
          <label htmlFor="prompt">Prompt</label>
          <div className="flex items-start border border-gray-border rounded-2xl gap-2 py-2 px-4 bg-white">
            <img src={aiSpark} alt="ai spark" className="cursor-pointer" />
            <Textarea
              className="border-0 focus:ring-0 focus:outline-0 focus-visible:ring-0 outline-0 ring-0 shadow-none"
              id="prompt"
              {...register("prompt")}
              placeholder={`${
                isLoading || singleCandidateLoading
                  ? "Getting Career Strategic Purpose"
                  : "Enter your prompt"
              }`}
              onChange={(e) => {
                setValue("prompt", e.target.value);
              }}
            />
          </div>
          {errors.prompt && (
            <span className="text-red text-sm">
              {getErrorMessage(errors.prompt)}
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handleRefinePrompt}
            disabled={refineLoading}
            className="bg-red"
          >
            {refineLoading ? "Re-generating..." : "Re-Generate"}
          </Button>
          <Button
            onClick={saveCSP}
            disabled={!isUpdated || isSaving}
            className="bg-red"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Saving...
              </div>
            ) : (
              "Save CSP"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenericStrategicPurpose;
