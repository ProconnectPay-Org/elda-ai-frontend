import { useState, useEffect } from "react";
import RootLayout from "@/layouts/RootLayout";
import { ResumeFormData } from "@/types";
import { Button } from "@/components/ui/button";

const FinalResume = () => {
  const [formData, setFormData] = useState<ResumeFormData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("ResumeData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <RootLayout title="Final Resume Refined">
      <div className="border md:min-w-[484px] space-y-5 pb-5 max-w-[600px] mx-auto min-h-svh rounded-lg overflow-hidden">
        <div className="bg-[#F1F8F9] p-5 w-full flex flex-col items-center gap-3">
          <h1 className="font-bold underline text-lg uppercase">
            {formData.fullName}
          </h1>
          <div className="flex items-center flex-wrap justify-center gap-3">
            <div>
              <img src="" alt="" />
              <p className="text-xs md:text-sm">{formData.email}</p>
            </div>
            <div>
              <img src="" alt="" />
              <p className="text-xs md:text-sm">{formData.phoneNumber}</p>
            </div>
            <div>
              <img src="" alt="" />
              <p className="text-xs md:text-sm">
                {formData.city}, {formData.state} {formData.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <img src="" alt="" />
              <p className="text-sm font-semibold">{formData.jobTitle}</p>
            </div>
            <hr className="h-4 w-[2px] bg-black" />
            <div>
              <img src="" alt="" />
              <p className="text-sm font-semibold">{formData.interest}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 px-5 w-full">
          <h2 className="text-[#102694] font-bold text-lg">
            CAREER STRATEGIC PURPOSE
          </h2>
          <p className="text-sm">
            My strategic career objective is to leverage my extensive experience
            in {formData.profession} to drive transformative growth for
            organization. I aim to strategically position businesses for success
            through innovative sales and marketing strategies, fostering
            meaningful client relationships, and optimizing communication
            channels. With a commitment to achieving and exceeding revenue
            targets, my goal is to contribute as a dynamic leader, utilizing a
            comprehensive skill set to propel business expansion, enhance market
            presence, and cultivate lasting partnerships in a dynamic and
            competitive business landscape.
          </p>
        </div>

        <div className="space-y-2 px-5 w-full">
          <h2 className="text-[#102694] font-bold text-lg">BIODATA</h2>
          <div>
            <div className="flex">
              <p className="font-medium w-[200px]">Date of Birth:</p>
              <p className="font-medium w-[200px]">{formData.dateOfBirth}</p>
            </div>
            <div className="flex">
              <p className="font-medium w-[200px]">Gender:</p>
              <p className="font-medium w-[200px]">{formData.gender}</p>
            </div>
            <div className="flex">
              <p className="font-medium w-[200px]">Nationality:</p>
              <p className="font-medium w-[200px]">{formData.nationality}</p>
            </div>
            <div className="flex">
              <p className="font-medium w-[200px]">Interest:</p>
              <p className="font-medium">{formData.interest}</p>
            </div>
            <div className="flex">
              <p className="font-medium w-[200px]">Preferred Call Name:</p>
              <p className="font-medium w-[200px]">
                {formData.fullName.split(" ")[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 px-5 w-full">
          <h2 className="text-[#102694] font-bold text-lg">WORK EXPERIENCE</h2>
          <div>
            <p className="font-bold">
              {formData.nameOfCompany} - {formData.jobTitle}
            </p>
            <div className="flex gap-3 items-center">
              <p className="font-medium">Location: {formData.location}</p>
              <hr className="h-4 w-[2px] bg-black" />
              <p className="font-medium">
                Duration: {formData.startDate} -{" "}
                {formData.endDate || "Till Date"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-red font-bold">
              JOB DESCRIPTION AND KEY ACHIEVEMENT
            </p>
            <p className="text-sm">{formData.companyDescription}</p>
          </div>

          <div>
            <p className="font-bold">
              SCREAM AWARDS NIGERIA - Media Presenter/ Business Development
              Manager
            </p>
            <div className="flex gap-3 items-center">
              <p className="font-medium">Location: Lagos State (In-Person)</p>
              <hr className="h-4 w-[2px] bg-black" />
              <p className="font-medium">
                Duration: September 2021 - Till Date
              </p>
            </div>
          </div>
          <div>
            <p className="text-red font-bold">
              JOB DESCRIPTION AND KEY ACHIEVEMENT
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur. Imperdiet sit cras at
              suscipit a. Sit in nulla tempus facilisi diam. Nulla dictumst
              malesuada ut nunc placerat penatibus imperdiet commodo. Vel enim
              tempus sit donec cras. Sed tortor egestas sit nisi scelerisque in
              purus. Vitae arcu adipiscing libero gravida risus tortor. Magnis
              dictumst nulla mattis tellus nec ipsum adipiscing. Arcu massa
              hendrerit mattis
            </p>
          </div>
        </div>

        <div className="space-y-1 px-5 w-full">
          <h2 className="text-[#102694] font-bold text-lg">
            TRAININGS AND EDUCATION
          </h2>
          <p className="font-semibold">
            {formData.kindOfDegree} ({formData.course})
          </p>
          <p className="text-sm">{formData.tertiaryInstitutionAttended}</p>
        </div>

        <div className="px-5 w-full">
          <h2 className="text-[#102694] font-bold text-lg">REFERENCES</h2>
          <p className="text-sm">Available on request</p>
        </div>
      </div>
      <div className="mt-5 md:mt-8 w-full flex items-center justify-end">
        <Button className="bg-red">Complete</Button>
      </div>
    </RootLayout>
  );
};

export default FinalResume;
