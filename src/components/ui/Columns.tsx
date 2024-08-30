import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Payment } from "@/types";
import RedCircle from "@/assets/red-circle.svg";

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "recommendedSchool",
    header: "Recommended School",
  },
  {
    accessorKey: "recommendedCourse",
    header: "Recommended Course",
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) =>
      typeof row.original === "string" ? (
        row.original
      ) : (
        <div className="flex justify-center">
          <img src={RedCircle} alt="Red Circle" width={20} height={20} />
        </div>
      ),
  },
  {
    accessorKey: "sop",
    header: () => (
      <div>
        <p className="text-center">SOP</p>
      </div>
    ),
    cell: ({ row }) =>
      typeof row.original === "string" ? (
        row.original
      ) : (
        <div className="flex justify-center">
          <img src={RedCircle} alt="Red Circle" width={20} height={20} />
        </div>
      ),
  },
  {
    accessorKey: "schoolApplicationStarted",
    header: () => (
      <div>
        <p className="text-center">School Application Started</p>
      </div>
    ),
    cell: ({ row }) =>
      typeof row.original === "string" ? (
        row.original
      ) : (
        <div className="flex justify-center">
          <img src={RedCircle} alt="Red Circle" width={20} height={20} />
        </div>
      ),
  },
  {
    accessorKey: "schoolApplicationCompleted",
    header: () => (
      <div>
        <p className="text-center">School Application Completed</p>
      </div>
    ),
    cell: ({ row }) =>
      typeof row.original === "string" ? (
        row.original
      ) : (
        <div className="flex justify-center">
          <img src={RedCircle} alt="Red Circle" width={20} height={20} />
        </div>
      ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
