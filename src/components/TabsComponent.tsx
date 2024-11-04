import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { CandidateData } from "@/types";
import { allTabsColumns } from "./AllTabsColumns";
import { useCandidates } from "@/hooks/useCandidiates";

const TabsComponent = () => {
  const { allCandidates, allCandidatesError, allCandidatesLoading } =
    useCandidates();

  const tableData: CandidateData[] =
    allCandidates?.results.map((candidate: CandidateData, index: number) => ({
      ...candidate,
      serialNumber: index + 1,
      full_name: candidate.user?.full_name || "No name",
      country: candidate.country_of_birth || "No country",
      assigned_university:
        candidate.education[0].school_name || "None Assigned",
      assigned_course:
        candidate.education[0].specific_course_of_study || "No course assigned",
      school_application_status:
        candidate.school_application_status || "No status",
      resume_status: candidate.resume_status || "No status",
      sop_status: candidate.sop_status || "No status",
      duplicate: candidate.duplicate || "none",
    })) || [];

  const assignedData = tableData.filter((candidate) => candidate.assigned);
  const unassignedData = tableData.filter((candidate) => !candidate.assigned);

  if (allCandidatesError) return <p>Error: {allCandidatesError.message}</p>;

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
          <DataTable
            columns={allTabsColumns}
            data={tableData}
            isLoading={allCandidatesLoading}
          />
        </TabsContent>

        {/* Display only assigned candidates */}
        <TabsContent value="assigned">
          <DataTable
            columns={allTabsColumns}
            data={assignedData}
            isLoading={allCandidatesLoading}
          />
        </TabsContent>

        {/* Display only unassigned candidates */}
        <TabsContent value="unassigned">
          <DataTable
            columns={allTabsColumns}
            data={unassignedData}
            isLoading={allCandidatesLoading}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabsComponent;
