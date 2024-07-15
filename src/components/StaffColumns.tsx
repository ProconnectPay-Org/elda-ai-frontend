import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export const StaffColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //   {
  //     accessorKey: "serialNumber",
  //     header: "S/N",
  //   },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "staffStatus",
    header: "Staff Status",
  },
  {
    accessorKey: "assignedCandidates",
    header: "Assigned Candidates",
  },
  {
    accessorKey: "permission",
    header: "Permission",
  },
  {
    accessorKey: "deleteAccount",
    header: () => <div className="text-center">Delete Account</div>,
    cell: () => (
      <div className="flex justify-center">
        <Button
          className="bg-[#D74632]"
          onClick={() => alert(`Status: Deleted`)}
        >
          Delete Account
        </Button>
      </div>
    ),
  },
];
