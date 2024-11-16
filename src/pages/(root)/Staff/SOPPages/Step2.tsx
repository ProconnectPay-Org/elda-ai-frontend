import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useCandidates } from "@/hooks/useCandidiates";
import { postEditedCandidate } from "@/lib/actions/staff.actions";

const Step2 = ({
  prevStep,
  candidateId: id,
}: {
  prevStep: () => void;
  candidateId: string;
}) => {
  const [manualDescription, setManualDescription] = useState("");
  const [programType, setProgramType] = useState("");
  const [assignedUniversity, setAssignedUniversity] = useState("");
  const [assignedCourse, setAssignedCourse] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  useEffect(() => {
    if (singleCandidate) {
      setProgramType(singleCandidate.education[0]?.degree_type || "");
      setAssignedUniversity(singleCandidate.assigned_university1 || "");
      setAssignedCourse(singleCandidate.assigned_course1 || "");
      setYearsOfExperience(
        singleCandidate.career[0]?.years_of_experience_post_degree || ""
      );
      setManualDescription(singleCandidate.course_description);
    }
  }, [singleCandidate]);

  const handleReview = async () => {
    const response = await postEditedCandidate(id, {
      course_description: manualDescription,
    });
    console.log(response);
  };

  if (singleCandidateLoading) return <div>Loading...</div>;
  if (singleCandidateError) return <div>Error fetching data</div>;

  return (
    <>
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 lg:p-12">
        <div className="w-16 cursor-pointer relative mb-5" onClick={prevStep}>
          <ChevronLeftIcon color="red" />
          <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
        </div>
        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-lg md:text-3xl">
            Candidate&apos;s Details
          </h2>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="programType" className="text-sm">
                Program Type
              </label>
              <Select value={programType} onValueChange={setProgramType}>
                <SelectTrigger className="w-full p-0 h-full rounded-none bg-transparent outline-none border-none">
                  <SelectValue placeholder="MBA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hnd">HND</SelectItem>
                  <SelectItem value="master">Masters</SelectItem>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="mba">MBA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="assignedUniversity" className="text-sm">
                Assigned University
              </label>
              <input
                type="text"
                id="assignedUniversity"
                name="assignedUniversity"
                value={assignedUniversity}
                onChange={(e) => setAssignedUniversity(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="assignedCourse" className="text-sm">
                Assigned Course
              </label>
              <input
                type="text"
                id="assignedCourse"
                name="assignedCourse"
                value={assignedCourse}
                onChange={(e) => setAssignedCourse(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="yearsOfExperience" className="text-sm">
                Number of Years of Professional Work Experience
              </label>
              <input
                type="text"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 border border-gray-border w-full rounded-lg py-1 px-4">
            <label htmlFor="courseDescription" className="text-sm">
              Manually Add Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={manualDescription}
              onChange={(e) => setManualDescription(e.target.value)}
              className="bg-transparent outline-none min-h-20 md:min-h-40"
              placeholder="A brief course description about the course"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-end w-full">
        <Button className="bg-red text-white w-32 h-12" onClick={handleReview}>
          Review
        </Button>
      </div>
    </>
  );
};

export default Step2;
