import { DataTable } from "@/components/DataTable";
import SmallBox from "@/components/SmallBox";
import { Payment, columns } from "@/components/ui/Columns";
import { smallBox } from "@/constants";
import useAuth from "@/hooks/useAuth";
import RootLayout from "@/layouts/RootLayout";
import { useEffect, useState } from "react";

const AssignedCandidates = () => {
  const [tableData, setTableData] = useState<Payment[]>([]); // Initialize as an array of Payment

  async function getData(): Promise<Payment[]> {
    return [
      {
        id: "m5gr84i9",
        amount: 316,
        email: "ken99@yahoo.com",
        serialNumber: 1,
        name: "Ken Smith",
        recommendedSchool: "Harvard University",
        recommendedCourse: "Computer Science",
        resume: "resume_1",
        sop: "sop_1",
        schoolApplicationStarted: "true01",
        schoolApplicationCompleted: "true14",
      },
      {
        id: "3u1reuv4",
        amount: 242,
        email: "Abe45@gmail.com",
        serialNumber: 2,
        name: "Abe Johnson",
        recommendedSchool: "Stanford University",
        recommendedCourse: "Electrical Engineering",
        resume: "resume_2",
        sop: "sop_2",
        schoolApplicationStarted: "true03",
        schoolApplicationCompleted: "true15",
      },
      {
        id: "derv1ws0",
        amount: 837,
        email: "Monserrat44@gmail.com",
        serialNumber: 3,
        name: "Monserrat Gomez",
        recommendedSchool: "MIT",
        recommendedCourse: "Mechanical Engineering",
        resume: "resume_3",
        sop: "sop_3",
        schoolApplicationStarted: "true05",
        schoolApplicationCompleted: "true16",
      },
      {
        id: "5kma53ae",
        amount: 874,
        email: "Silas22@gmail.com",
        serialNumber: 4,
        name: "Silas Thompson",
        recommendedSchool: "UC Berkeley",
        recommendedCourse: "Data Science",
        resume: "resume_4",
        sop: "sop_4",
        schoolApplicationStarted: "true07",
        schoolApplicationCompleted: "true17",
      },
      {
        id: "bhqecj4p",
        amount: 721,
        email: "carmella@hotmail.com",
        serialNumber: 5,
        name: "Carmella Lee",
        recommendedSchool: "Princeton University",
        recommendedCourse: "Physics",
        resume: "resume_5",
        sop: "sop_5",
        schoolApplicationStarted: "true09",
        schoolApplicationCompleted: "true18",
      },
    ];
  }

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await getData();
      setTableData(data);
    };

    fetchTableData();
  }, []);

  const { loggedInUser } = useAuth();

  return (
    <RootLayout title="Dashboard">
      {loggedInUser && (
        <p className="text-red text-[32px] font-semibold">
          Welcome, {loggedInUser.name}!
        </p>
      )}
      <div className="flex justify-between gap-8 flex-wrap mt-4">
        {smallBox.map((box) => (
          <SmallBox
            key={box.name}
            name={box.name}
            number={box.number}
            icon={box.icon}
          />
        ))}
      </div>
      <div className="border-2 border-gray w-full rounded-lg mt-8">
        <div className="px-5 py-5 flex items-center gap-4">
          <p className="font-medium text-xl">Assigned Candidates</p>
          <span className="text-sm bg-pale-bg py-2 px-4 rounded-3xl text-red">
            10 new candidates
          </span>
        </div>
        <DataTable columns={columns} data={tableData} />
      </div>
    </RootLayout>
  );
};

export default AssignedCandidates;
