import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import aiSpark from "@/assets/ai-prompt-spark.svg";

const Step3 = () => {
  return (
    <>
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 lg:p-12">
        <div className="w-16 cursor-pointer relative mb-5">
          <ChevronLeftIcon color="red" />
          <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
        </div>

        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-lg">
            FIRST DRAFT OF STATEMENT OF PURPOSE CRAFTED USING GEMINI AND META AI
          </h2>

          <div className="flex flex-col gap-5 w-full mx-auto md:w-[760px]">
            <div>
              <label>Prompt</label>
              <div className="flex items-start border border-gray-border rounded-2xl gap-2 py-2 px-4 bg-white">
                <img src={aiSpark} alt="ai spark" className="cursor-pointer" />
                <Textarea
                  className="border-0 focus:ring-0 focus:outline-none focus-visible:ring-0"
                  placeholder="Type your message here."
                  defaultValue="Using the drafted DATA provided – draft a personalized comprehensive narrative and statement of purpose ESSAY that exceeds 1200 words."
                />
              </div>
            </div>
            <div className="flex items-center justify-end w-full">
              <Button className="bg-red">Generate</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-end w-full">
          <Button className="bg-red text-white w-32 h-12">Review</Button>
      </div>
    </>
  );
};

export default Step3;
