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
import SelectedCandidateModal from "../SelectedCandidateModal";

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
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.resume_status === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
        >
          {row.original.resume_status || "none"}
        </Button>
      </div>
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
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.sop_status === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
        >
          {row.original.sop_status || "none"}
        </Button>
      </div>
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
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.school_application_status === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
        >
          {row.original.school_application_status === "True" ? (
            "Completed"
          ) : (
            <>{row.original.school_application_status || "none"}</>
          )}
        </Button>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false); // Separate modal state
      const [isCandidateDataModalOpen, setIsCandidateDataModalOpen] =
        useState(false); 

      const openCandidateModal = () => {
        setIsCandidateDataModalOpen(true);
      };

      const closeCandidateModal = () => {
        setIsCandidateDataModalOpen(false);
      };

      const openSchoolModal = () => {
        setIsSchoolModalOpen(true);
      };

      const closeSchoolModal = () => {
        setIsSchoolModalOpen(false);
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
              <DropdownMenuItem onClick={openCandidateModal}>
                View Candidate Data
              </DropdownMenuItem>
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
              <DropdownMenuItem onClick={openSchoolModal}>
                School Application Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isSchoolModalOpen && (
            <SchoolApplicationModal onClose={closeSchoolModal} id={id} />
          )}
          {isCandidateDataModalOpen && (
            <SelectedCandidateModal onClose={closeCandidateModal} id={id} />
          )}
        </>
      );
    },
  },
];
