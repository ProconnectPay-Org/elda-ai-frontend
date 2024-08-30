import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep5FormData } from "@/types";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import helpIcon from "@/assets/help-icon.svg";
import aiSpark from "@/assets/ai-prompt-spark.svg";

const GenericStrategicPurpose = () => {
  const {
    register,
    // control,
    formState: { errors },
  } = useFormContext<ResumeStep5FormData>();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold mb-4">CAREER STRATEGIC PURPOSE AI PROMPT</h2>
        <div className="space-y-2">
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
          <small>Choose the correct the program</small>
        </div>
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
              className="border-0 focus:ring-0 focus:outline-none focus-visible:ring-0"
              id="prompt"
              {...register("prompt")}
              placeholder="Enter your prompt"
            />
          </div>
          {errors.prompt && (
            <span className="text-red text-sm">
              {getErrorMessage(errors.prompt)}
            </span>
          )}
        </div>
        <div className="flex justify-end">
          <Button className="bg-red">Generate</Button>
        </div>
      </div>
    </div>
  );
};

export default GenericStrategicPurpose;
