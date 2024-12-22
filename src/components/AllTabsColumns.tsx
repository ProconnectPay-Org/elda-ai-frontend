import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { CandidateData } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { getCountryNameFromISO } from "@/lib/utils";
import SchoolApplicationModal from "./SchoolApplicationModal";
import { useState } from "react";
import ReAssignModal from "./ReAssignModal";
import NewSchoolCourseModal from "./NewSchoolCourseModal";

export const allTabsColumns = (
  handleDeleteCandidate: (userId: string, fullName: string) => void
): ColumnDef<CandidateData>[] => [
  {
    accessorKey: "serialNumber",
    header: "S/N",
  },
  {
    accessorKey: "full_name",
    header: "Candidate Name",
    cell: ({ row }) => (
      <p className="capitalize">{row.original?.full_name || "No name"}</p>
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
    accessorKey: "assigned_course1",
    header: "Recommended Course 1",
    cell: ({ row }) => (
      <p className="capitalize">
        {row.original.assigned_course1 || "No course assigned"}
      </p>
    ),
  },
  {
    accessorKey: "assigned_university1",
    header: "Recommended School 1",
    cell: ({ row }) => (
      <p className="capitalize">
        {row.original.assigned_university1 || "No school assigned"}
      </p>
    ),
  },
  {
    accessorKey: "assigned_school2",
    header: "Recommended School 2",
  },
  {
    accessorKey: "assigned_course2",
    header: "Recommended Course 2",
  },
  {
    accessorKey: "school_application_status1",
    header: () => (
      <div className="text-center">School Application Status 1</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.school_application_status1 === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
          onClick={() =>
            alert(
              `Status: ${row.original.school_application_status1 || "none"}`
            )
          }
        >
          {row.original.school_application_status1 === "True" ? (
            "Completed"
          ) : (
            <>{row.original.school_application_status1 || "none"}</>
          )}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "school_application_status2",
    header: () => (
      <div className="text-center">School Application Status 2</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.school_application_status2 === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
        >
          {row.original.school_application_status2 === "True" ? (
            "Completed"
          ) : (
            <>{row.original.school_application_status2 || "none"}</>
          )}
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
    accessorKey: "sop_status1",
    header: () => <div className="text-center">SOP 1</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.sop_status1 === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
        >
          {row.original.sop_status1 || "none"}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "sop_status2",
    header: () => <div className="text-center">SOP 2</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.sop_status2 === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
        >
          {row.original.sop_status2 || "none"}
        </Button>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
      const [schoolCourseModalOpen, setSchoolCourseModalOpen] = useState(false);

      const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      const openReAssignModal = () => {
        setIsAssignModalOpen(true);
      };

      const closeAssignModal = () => {
        setIsAssignModalOpen(false);
      };

      const openSchoolCourseModal = () => {
        setSchoolCourseModalOpen(true);
      };

      const closeSchoolCourseModal = () => {
        setSchoolCourseModalOpen(false);
      };

      const { id, resume_status, sop_status, full_name, user_id } =
        row.original;

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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={`/candidates/${id}`} target="_blank">
                  Candidate Info
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openReAssignModal}>
                Reassign Candidate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
                  to={`/sop/${id}?type=school1`}
                  target="_blank"
                  className={
                    isSopDisabled
                      ? "text-gray-400 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                  aria-disabled={isSopDisabled}
                >
                  View Crafted SOP 1
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to={`/sop/${id}?type=school2`}
                  target="_blank"
                  className={
                    isSopDisabled
                      ? "text-gray-400 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                  aria-disabled={isSopDisabled}
                >
                  View Crafted SOP 2
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openSchoolCourseModal}>
                Change assigned school or course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openModal}>
                School Application Status
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    if (user_id) {
                      handleDeleteCandidate(
                        String(user_id),
                        full_name || "Unknown User"
                      );
                    } else {
                      console.error("User ID is undefined");
                    }
                  }}
                  className="w-full bg-red"
                >
                  Delete Candidate
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isModalOpen && (
            <SchoolApplicationModal onClose={closeModal} id={id} />
          )}
          {isAssignModalOpen && (
            <ReAssignModal onClose={closeAssignModal} id={id} />
          )}
          {schoolCourseModalOpen && (
            <NewSchoolCourseModal onClose={closeSchoolCourseModal} id={id} />
          )}
        </>
      );
    },
  },
];
