import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { AllCandidatesResponse } from "@/types";
import { getAllCandidates } from "@/lib/actions/user.actions";
import { allTabsColumns } from "./AllTabsColumns";

interface CandidateData {
  serialNumber: number;
  full_name: string;
  country: string;
  university: string;
  course: string;
  schoolApplicationStatus: string;
  resumeStatus: string;
  sopStatus: string;
  duplicate: string;
  assigned: boolean;
}

const TabsComponent = () => {
  const [tableData, setTableData] = useState<CandidateData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data: AllCandidatesResponse = await getAllCandidates();

        const candidatesWithSerial: CandidateData[] = data.results.map(
          (candidate, index) => ({
            ...candidate,
            serialNumber: index + 1,
            country: candidate.country || "No country", // Set default values
            university: candidate.university || "No university",
            course: candidate.course || "No course assigned",
            schoolApplicationStatus:
              candidate.schoolApplicationStatus || "No status",
            resumeStatus: candidate.resumeStatus || "No status",
            sopStatus: candidate.sopStatus || "No status",
            duplicate: candidate.duplicate || "none",
          })
        );

        setTableData(candidatesWithSerial);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, []);

  // Filter candidates based on their assigned status
  const assignedData = tableData.filter((candidate) => candidate.assigned);
  const unassignedData = tableData.filter((candidate) => !candidate.assigned);

  return (
    <Tabs
      defaultValue="all"
      className="w-full flex justify-center items-center flex-col"
    >
      <TabsList className="w-full md:w-[400px] bg-transparent justify-between">
        <TabsTrigger
          value="all"
          className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="assigned"
          className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
        >
          Assigned
        </TabsTrigger>
        <TabsTrigger
          value="unassigned"
          className="data-[state=active]:border-b-4 rounded-none shadow-none font-bold text-base border-red"
        >
          Unassigned
        </TabsTrigger>
      </TabsList>
      <div className="w-full">
        {/* Display all candidates */}
        <TabsContent value="all">
          <DataTable columns={allTabsColumns} data={tableData} isLoading={isLoading} />
        </TabsContent>

        {/* Display only assigned candidates */}
        <TabsContent value="assigned">
          <DataTable columns={allTabsColumns} data={assignedData} isLoading={isLoading} />
        </TabsContent>

        {/* Display only unassigned candidates */}
        <TabsContent value="unassigned">
          <DataTable columns={allTabsColumns} data={unassignedData} isLoading={isLoading} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabsComponent;
