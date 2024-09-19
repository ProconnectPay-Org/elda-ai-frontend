import { DataTable } from "@/components/DataTable";
import { StaffColumns } from "@/components/StaffColumns";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { getAllStaff } from "@/lib/actions/user.actions";
import { AllStaff, AllStaffResponse } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Staff = () => {
  const [tableData, setTableData] = useState<AllStaff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data: AllStaffResponse = await getAllStaff();
        console.log(data);

        const staffWithSerial: AllStaff[] = data.results.map(
          (staff, index) => ({
            ...staff,
            full_name: staff.user?.full_name || "No name",
            serialNumber: index + 1,
            status: staff.status || "Inactive",
            assigned_candidates: Array.isArray(staff.assigned_candidates)
            ? staff.assigned_candidates.length
            : "0",
            permission: staff.permission || "No permissions granted",
          })
        );

        setTableData(staffWithSerial);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, []);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-12">
        <div className="flex justify-between items-center border rounded-sm py-2 px-3 border-[#EAECF0]">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-red leading-8 mb-2">
              Team Members
            </h2>
            <p className="text-sm md:text-base">Invite and Manage your Staff</p>
          </div>

          <Link to="/admin/invite-employee">
            <Button
              variant="outline"
              className="border-red text-red md:h-[52px] flex items-center gap-2.5 hover:text-white hover:bg-red"
            >
              Invite Employee
            </Button>
          </Link>
        </div>

        <DataTable columns={StaffColumns} data={tableData} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
};

export default Staff;
