import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RootLayout from "@/layouts/RootLayout";
import { getData } from "@/lib/actions/user.actions";
import { CandidateData } from "@/types";
import { MailIcon, PhoneCallIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const CandidateProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<CandidateData | null>(null);

  useEffect(() => {
    const fetchCandidateData = async () => {
      const data = await getData();
      const candidateData = data.find((candidate) => candidate.id === id);
      setCandidate(candidateData || null);
    };

    fetchCandidateData();
  }, [id]);

  if (!candidate) {
    return <p>Loading...</p>;
  }

  return (
    <RootLayout title="Candidate Profile">
      <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-0">
        <div className="flex items-start gap-5 flex-col md:flex-row">
          <div>
            {/* <img src="" alt="" /> */}
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="font-bold">
                {getInitials(candidate.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-2xl">{candidate.name}</p>
            <p>Profession: Accountant</p>
            <p>Course: {candidate.recommended_course}</p>
            <p>School: {candidate.recommended_school}</p>
            <div className="flex items-center gap-4">
              <div className="bg-pale-bg text-red rounded-xl px-2 text-xs flex items-center gap-1 py-1">
                <PhoneCallIcon size={16} />
                {candidate.phone}
              </div>
              <div className="bg-pale-bg text-red rounded-xl px-2 text-xs flex items-center gap-1 py-1">
                <MailIcon size={16} />
                {candidate.email}
              </div>
            </div>
            <p className="text-xs">Candidate ID: {id}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Assigned Manager</h3>
          <p>Opeyemi</p>
        </div>
      </div>
      <hr className="w-full h-2 my-8" />
      <div>
        <h3 className="font-semibold text-lg mb-4">CAREER STRATEGIC PURPOSE</h3>
        <p className="text-[#5E6366]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quidem
          tenetur eveniet aliquam alias. Sapiente architecto aliquam nesciunt
          obcaecati minus distinctio non a assumenda maxime perspiciatis. Ut
          commodi accusamus libero recusandae nam iure possimus. Aut corrupti
          blanditiis, saepe laudantium architecto reiciendis dolores ab quidem
          molestiae fugiat beatae minima. Ad modi quia, quos, veniam delectus
          adipisci ratione dolore rem labore deserunt minus. Provident tempora
          laudantium nesciunt dolor amet eaque. Autem vel eveniet at beatae
          repudiandae, ullam perferendis labore earum unde tempore consequuntur
          ab praesentium rem nihil consequatur laborum est aliquam modi
          voluptatem possimus quaerat. Odio, eaque? Ad reprehenderit
          voluptatibus aperiam quaerat.
        </p>
      </div>
      <hr className="w-full h-2 my-8" />
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">EDUCATION HISTORY</h3>
          <p className="text-[#5E6366] font-semibold">
            2 degrees(BSc and Masters)
          </p>
        </span>
        <span className="flex gap-5 items-center">
          <p className="text-[#5E6366] font-semibold">2014-2019</p>
          <p className="font-semibold">
            Bachelor of Science at University of Lagos
          </p>
        </span>
        <span className="flex gap-5 items-center">
          <p className="text-[#5E6366] font-semibold">2020-2021</p>
          <p className="font-semibold">
            Masters of Science at University of Benin
          </p>
        </span>
      </div>
      <hr className="w-full h-2 my-8" />
      <div className="flex flex-col gap-4">
        <span className="flex gap-5 items-center">
          <h3 className="font-semibold text-lg">WORK HISTORY</h3>
          <p className="text-[#5E6366] font-semibold">
            2 degrees(BSc and Masters)
          </p>
        </span>
        <span className="flex gap-5 items-center">
          <p className="text-[#5E6366] font-semibold">2014-2019</p>
          <p className="font-semibold">Accountant at ProconnectPAY</p>
        </span>
        <span className="flex gap-5 items-center">
          <p className="text-[#5E6366] font-semibold">2020-2021</p>
          <p className="font-semibold">Accountant at Zenith Bank</p>
        </span>
      </div>
      {/* Display other candidate details as needed */}
    </RootLayout>
  );
};

export default CandidateProfile;
