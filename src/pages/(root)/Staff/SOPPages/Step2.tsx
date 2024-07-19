import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Step2 = () => {
  return (
    <RootLayout title="Draft Statement Of Purpose">
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl p-12">
        <Link to="/">
          <div className="w-16 cursor-pointer relative mb-5">
            <ChevronLeftIcon color="red" />
            <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
          </div>
        </Link>
        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-3xl">
            Enter Candidate&apos;s Name or Email Address
          </h2>

          <div className="flex justify-between w-full gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="email"
                placeholder="Havard University"
              />
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Program Type
              </label>
              <Select>
                <SelectTrigger className="w-full p-0 h-full rounded-none bg-transparent outline-none border-none focus:outline-none focus-visible:outline-none active:border-none focus:border-none">
                  <SelectValue placeholder="MBA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">HND</SelectItem>
                  <SelectItem value="dark">Masters</SelectItem>
                  <SelectItem value="system">First Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between w-full gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Assigned University
              </label>
              <Select>
                <SelectTrigger className="w-full p-0 h-full rounded-none bg-transparent outline-none border-none focus:outline-none focus-visible:outline-none active:border-none focus:border-none">
                  <SelectValue placeholder="Havard University" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">HND</SelectItem>
                  <SelectItem value="dark">Masters</SelectItem>
                  <SelectItem value="system">First Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Assigned Course
              </label>
              <Select>
                <SelectTrigger className="w-full p-0 h-full rounded-none bg-transparent outline-none border-none focus:outline-none focus-visible:outline-none active:border-none focus:border-none">
                  <SelectValue placeholder="Project Management" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">HND</SelectItem>
                  <SelectItem value="dark">Masters</SelectItem>
                  <SelectItem value="system">First Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between w-full gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Number of Years of Professional Work Experience
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="email"
                placeholder="2"
              />
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="email" className="text-sm">
                Manually Add School Description
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="email"
                placeholder="Lorem ipsum dolor sit amet consectetur. Sit rhoncus"
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="text" className="text-sm">
                Generate Course Description
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="text"
                placeholder="Havard University"
              />
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full md:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="text" className="text-sm">
                Generate School Description
              </label>
              <input
                className="border-none w-full focus:outline-none bg-transparent"
                id="text"
                placeholder="Havard University"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-end w-full">
        <Link to="/craft-sop/3">
          <Button className="bg-red text-white w-32 h-12">Review</Button>
        </Link>
      </div>
    </RootLayout>
  );
};

export default Step2;
