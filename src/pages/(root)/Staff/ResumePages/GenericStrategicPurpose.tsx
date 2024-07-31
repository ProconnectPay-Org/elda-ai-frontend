import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/utils";
import { ResumeStep5FormData } from "@/types";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";

const GenericStrategicPurpose = () => {
  const {
    register,
    // control,
    formState: { errors },
  } = useFormContext<ResumeStep5FormData>();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-bold">CAREER STRATEGIC PURPOSE AI PROMPT</h2>
        <div className="space-y-2">
          <label htmlFor="">Type of program</label>
          <Input type="email" className="rounded-full" />
          <small>Choose the correct the program</small>
        </div>
      </div>
      <div className="border border-pale-bg bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl space-y-5">
        <p className="text-center text-red font-bold text-2xl">
          CAREER STRATEGIC PURPOSE
        </p>
        <div className="flex flex-col">
          <label htmlFor="prompt">Prompt</label>
          <Textarea
            className="border border-gray-border rounded-2xl py-2 px-4"
            id="prompt"
            {...register("prompt")}
            placeholder="Enter your prompt"
          />
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
