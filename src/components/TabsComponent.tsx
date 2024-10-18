import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { AllCandidates, AllCandidatesResponse } from "@/types";
import { getAllCandidates } from "@/lib/actions/user.actions";
import { allTabsColumns } from "./AllTabsColumns";
import { useQuery } from "@tanstack/react-query";

const TabsComponent = () => {
  const { data, isLoading, error } = useQuery<AllCandidatesResponse, Error>({
    queryKey: ["allCandidates"],
    queryFn: getAllCandidates,
    staleTime: 5 * 1000,
  });

  const tableData: AllCandidates[] =
    data?.results.map((candidate, index) => ({
      ...candidate,
      serialNumber: index + 1,
      full_name: candidate.user?.full_name || "No name",
      country: candidate.user?.country || "No country",
      assigned_university: candidate.assigned_university || "No university",
      assigned_course: candidate.assigned_course || "No course assigned",
      school_application_status:
        candidate.school_application_status || "No status",
      resume_status: candidate.resume_status || "No status",
      sop_status: candidate.sop_status || "No status",
      duplicate: candidate.duplicate || "none",
    })) || [];

  const assignedData = tableData.filter((candidate) => candidate.assigned);
  const unassignedData = tableData.filter((candidate) => !candidate.assigned);

  if (error) {
    return <p className="text-center text-red-600">Error loading candidates</p>;
  }

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
            isLoading={isLoading}
          />
        </TabsContent>

        {/* Display only assigned candidates */}
        <TabsContent value="assigned">
          <DataTable
            columns={allTabsColumns}
            data={assignedData}
            isLoading={isLoading}
          />
        </TabsContent>

        {/* Display only unassigned candidates */}
        <TabsContent value="unassigned">
          <DataTable
            columns={allTabsColumns}
            data={unassignedData}
            isLoading={isLoading}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabsComponent;
