import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { deleteStaff } from "@/lib/actions/user.actions";
import { AllStaff } from "@/types";
import { Avatar, AvatarFallback } from "./ui/avatar";
import clsx from "clsx";
import Cookies from "js-cookie";

const isAnalyst = Cookies.get("user_role") === "analyst";

export const StaffColumns: ColumnDef<AllStaff>[] = [
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
    accessorKey: "serialNumber",
    header: "S/N",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.user?.full_name || "No name"}</p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.user?.email || "No email"}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Staff Status",
  },
  // {
  //   accessorKey: "assigned_candidates",
  //   header: "Assigned Candidates",
  //   cell: ({ row }) => (
  //     <p className="capitalize font-semibold">
  //       {row.original.assigned_candidates || "0"}
  //     </p>
  //   ),
  // },
  {
    accessorKey: "assigned_candidates",
    header: "Assigned Candidates",
    cell: ({ row }) => {
      const assignedCandidates = row.original.assigned_candidates;

      return assignedCandidates && assignedCandidates.length > 0 ? (
        <div className="flex -space-x-3">
          {assignedCandidates.slice(0, 5).map((candidate, index) => (
            <Avatar
              key={candidate.id || index}
              className={clsx(
                "w-8 h-8 border-2 border-white",
                index >= 4 && "hidden"
              )}
            >
              <AvatarFallback>
                {candidate.first_name?.charAt(0) || "-"}
              </AvatarFallback>
            </Avatar>
          ))}
          {assignedCandidates.length > 5 && (
            <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full text-sm font-medium border-2 border-white">
              +{assignedCandidates.length - 5}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No candidates</p>
      );
    },
  },
  {
    accessorKey: "deleteAccount",
    header: () => <div className="text-center">Delete Account</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className={`bg-[#D74632] ${
            isAnalyst ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={async () => {
            const confirmed = window.confirm(
              `Are you sure you want to delete ${row.original.user?.full_name}'s account?`
            );

            if (confirmed) {
              try {
                await deleteStaff(row.original.user.id);
                alert(
                  `Staff ${row.original.user?.full_name} deleted successfully.`
                );
              } catch (error) {
                alert("Failed to delete staff. Please try again.");
                console.error("Error deleting staff:", error);
              }
            }
          }}
          disabled={isAnalyst}
        >
          Delete Account
        </Button>
      </div>
    ),
  },
];
