import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

const Step3 = () => {
  return (
    <RootLayout title="Draft Statement Of Purpose">
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl p-12">
        <Link to="/craft-sop/2">
          <div className="w-16 cursor-pointer relative mb-5">
            <ChevronLeftIcon color="red" />
            <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
          </div>
        </Link>
        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-lg">
            FIRST DRAFT OF STATEMENT OF PURPOSE CRAFTED USING GEMINI AND META AI
          </h2>

          <div className="flex flex-col gap-5 w-full mx-auto md:w-[760px]">
            <div>
              <label>Prompt</label>
              <Textarea
                placeholder="Type your message here."
                value="Using the drafted DATA provided – draft a personalized comprehensive narrative and statement of purpose ESSAY that exceeds 1200 words."
                className="md:min-h-[100px] text-lg p-4 leading-[36px]"
              />
            </div>
            <div className="flex items-center justify-end w-full">
              <Button className="bg-red">Generate</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-end w-full">
        <Link to="/craft-sop/4">
          <Button className="bg-red text-white w-32 h-12">Review</Button>
        </Link>
      </div>
    </RootLayout>
  );
};

export default Step3;
