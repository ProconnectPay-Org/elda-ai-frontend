import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { deleteStaff } from "@/lib/actions/user.actions";

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
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.full_name || "No name"}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Staff Status",
  },
  {
    accessorKey: "assigned_candidates",
    header: "Assigned Candidates",
    cell: ({ row }) => (
      <p className="capitalize font-semibold">
        {row.original.assigned_candidates || "0"}
      </p>
    ),
  },
  {
    accessorKey: "permission",
    header: "Permission",
  },
  {
    accessorKey: "deleteAccount",
    header: () => <div className="text-center">Delete Account</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="bg-[#D74632]"
          onClick={async () => {
            const confirmed = window.confirm(
              `Are you sure you want to delete ${row.original.full_name}'s account?`
            );

            if (confirmed) {
              try {
                await deleteStaff(row.original.id);
                alert(`Staff ${row.original.full_name} deleted successfully.`);
              } catch (error) {
                alert("Failed to delete staff. Please try again.");
                console.error("Error deleting staff:", error);
              }
            }
          }}
        >
          Delete Account
        </Button>
      </div>
    ),
  },
];
