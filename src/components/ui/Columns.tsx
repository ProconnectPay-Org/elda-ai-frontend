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
import { CandidateData } from "@/types";
import { Link } from "react-router-dom";

export const columns: ColumnDef<CandidateData>[] = [
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
    accessorKey: "serial_number",
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "recommended_school",
    header: "Recommended School",
  },
  {
    accessorKey: "recommended_course",
    header: "Recommended Course",
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => (
      <p className="capitalize text-center">
        {row.original.resume || "No name"}
      </p>
    ),
  },
  {
    accessorKey: "sop_status",
    header: () => (
      <div>
        <p className="text-center">SOP</p>
      </div>
    ),
    cell: ({ row }) => (
      <p className="capitalize text-center">{row.original.sop_status || "No name"}</p>
    ),
  },
  {
    accessorKey: "school_application_status",
    header: () => (
      <div>
        <p className="text-center">School Application Status</p>
      </div>
    ),
    cell: ({ row }) => (
      <p className="capitalize text-center">
        {row.original.school_application_status || "No name"}
      </p>
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
            <DropdownMenuItem>
              <Link to={`/refine-resume/${payment.id}`}>Refine Resume</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/craft-sop/${payment.id}`}>Craft SOP</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy candidate ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
