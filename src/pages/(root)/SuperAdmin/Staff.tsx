import { DataTable } from "@/components/DataTable";
import { StaffColumns } from "@/components/StaffColumns";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { getTeamMembersData } from "@/lib/actions/user.actions";
import { TeamMemberColumn } from "@/types";
import { useEffect, useState } from "react";

const Staff = () => {
  const [tableData, setTableData] = useState<TeamMemberColumn[]>([]);

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await getTeamMembersData();
      setTableData(data);
    };

    fetchTableData();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-12">
        <div className="flex justify-between items-center border rounded-sm py-2 px-3 border-[#EAECF0]">
          <div>
            <h2 className="text-2xl font-bold text-red leading-8 mb-2">
              Team Members
            </h2>
            <p>Invite and Manage your Staff</p>
          </div>
          <Button
            variant="outline"
            className="border-red text-red h-[52px] flex items-center gap-2.5 hover:text-white hover:bg-red"
          >
            Invite Employee
          </Button>
        </div>

        <DataTable columns={StaffColumns} data={tableData} />
      </div>
    </AdminLayout>
  );
};

export default Staff;
