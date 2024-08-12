import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./DataTable";
import { useEffect, useState } from "react";
import { AllColumn } from "@/types";
import { getAllData } from "@/lib/actions/user.actions";
import { allTabsColumns } from "./AllTabsColumns";

const TabsComponent = () => {
  const [tableData, setTableData] = useState<AllColumn[]>([]);

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await getAllData();
      setTableData(data);
    };

    fetchTableData();
  }, []);

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
        <TabsContent value="all">
          <DataTable columns={allTabsColumns} data={tableData} />
        </TabsContent>
        <TabsContent value="assigned">
          <DataTable columns={allTabsColumns} data={tableData} />
        </TabsContent>
        <TabsContent value="unassigned">
          <DataTable columns={allTabsColumns} data={tableData} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabsComponent;
