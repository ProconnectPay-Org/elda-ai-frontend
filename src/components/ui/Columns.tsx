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
import SchoolApplicationModal from "../SchoolApplicationModal";
import { useState } from "react";

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
      <p className="capitalize text-center">
        {row.original.sop_status || "No name"}
      </p>
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
      const [isModalOpen, setIsModalOpen] = useState(false);

      const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      const { id, resume_status, sop_status } = row.original;
      const isResumeDisabled = resume_status !== "Completed";
      const isSopDisabled = sop_status !== "Completed";

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Other Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link
                  to={
                    isResumeDisabled
                      ? `/refine-resume/${id}`
                      : `/download-resume/${id}`
                  }
                >
                  {isResumeDisabled ? "Refine Resume" : "View Resume"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={isSopDisabled ? `/craft-sop/${id}` : `/sop/${id}`}>
                  {isSopDisabled ? "Craft SOP" : "View Crafted SOP"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={`/assigned-candidates/${id}`}>Candidate Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openModal}>
                School Application Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isModalOpen && (
            <SchoolApplicationModal onClose={closeModal} id={row.original.id} />
          )}
        </>
      );
    },
  },
];
