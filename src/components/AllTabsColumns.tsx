import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { CandidateData } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { getCountryNameFromISO } from "@/lib/utils";

export const allTabsColumns: ColumnDef<CandidateData>[] = [
  {
    accessorKey: "serialNumber",
    header: "S/N",
  },
  {
    accessorKey: "full_name",
    header: "Candidate Name",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.user?.full_name || "No name"}</p>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      const country = getCountryNameFromISO(row.original.country_of_birth);
      return <p className="capitalize">{country || "No country"}</p>;
    },
  },
  {
    accessorKey: "assigned_course",
    header: "Assigned Course",
    cell: ({ row }) => (
      <p className="capitalize">
        {row.original.assigned_course1 || "No course assigned"}
      </p>
    ),
  },
  {
    accessorKey: "assigned_school",
    header: "Assigned School",
    cell: ({ row }) => (
      <p className="capitalize">
        {row.original.assigned_university1 || "No school assigned"}
      </p>
    ),
  },
  {
    accessorKey: "school_application_status",
    header: () => <div className="text-center">School Application Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="py-1 h-5 rounded-xl bg-[#D5F4EA] text-[#2A6350] px-5 hover:bg-green-200"
          onClick={() =>
            alert(`Status: ${row.original.school_application_status || "none"}`)
          }
        >
          {row.original.school_application_status || "none"}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "resume_status",
    header: () => <div className="text-center">Resume Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="py-1 h-5 rounded-xl bg-[#D5F4EA] text-[#2A6350] px-5 hover:bg-green-200"
          onClick={() =>
            alert(`Resume Status: ${row.original.resume_status || "none"}`)
          }
        >
          {row.original.resume_status || "none"}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "sop_status",
    header: () => <div className="text-center">SOP Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="py-1 h-5 rounded-xl bg-[#D5F4EA] w-full text-[#2A6350] px-5 hover:bg-green-200"
          onClick={() =>
            alert(`SOP Status: ${row.original.sop_status || "none"}`)
          }
        >
          {row.original.sop_status || "none"}
        </Button>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id, resume_status, sop_status, sop } = row.original;

      const isResumeDisabled = resume_status !== "Completed";
      const isSopDisabled = sop_status !== "Completed";

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
              <Link
                to={`/download-resume/${id}`}
                target="_blank"
                className={
                  isResumeDisabled
                    ? "text-gray-400 cursor-not-allowed pointer-events-none"
                    : ""
                }
                aria-disabled={isResumeDisabled}
              >
                View Resume
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={`${sop[0]?.file}`}
                target="_blank"
                className={
                  isSopDisabled
                    ? "text-gray-400 cursor-not-allowed pointer-events-none"
                    : ""
                }
                aria-disabled={isSopDisabled}
              >
                View Crafted SOP
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
