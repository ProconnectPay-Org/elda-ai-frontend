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
import SchoolApplicationModal from "./SchoolApplicationModal";
import { useState } from "react";
import ReAssignModal from "./ReAssignModal";
import NewSchoolCourseModal from "./NewSchoolCourseModal";
import Cookies from "js-cookie";

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
    accessorKey: "email_address",
    header: "Email",
    cell: ({ row }) => (
      <p className="">{row.original?.email_address || "No name"}</p>
    ),
  },
  {
    accessorKey: "first_country",
    header: "First Country",
    cell: ({ row }) => {
      const country = row.original.first_country;
      return <p className="capitalize">{country || "No country"}</p>;
    },
  },
  {
    accessorKey: "second_country",
    header: "Second Country",
    cell: ({ row }) => {
      const country = row.original.second_country;
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
    accessorKey: "program_type1",
    header: "Program Type 1",
  },
  {
    accessorKey: "program_type2",
    header: "Program Type 2",
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
      const [isUnAssignModalOpen, setIsUnAssignModalOpen] = useState(false);
      const [schoolCourseModalOpen, setSchoolCourseModalOpen] = useState(false);
      const isAnalyst = Cookies.get("user_role") === "analyst";

      const openModal = () => {
        setIsModalOpen(true);
      };

      const closeModal = () => {
        setIsModalOpen(false);
      };

      const openReAssignModal = () => {
        setIsAssignModalOpen(true);
      };

      const closeReAssignModal = () => {
        setIsAssignModalOpen(false);
      };

      const openUnAssignModal = () => {
        setIsUnAssignModalOpen(true);
      };

      const closeUnAssignModal = () => {
        setIsUnAssignModalOpen(false);
      };

      const openSchoolCourseModal = () => {
        setSchoolCourseModalOpen(true);
      };

      const closeSchoolCourseModal = () => {
        setSchoolCourseModalOpen(false);
      };

      const {
        id,
        resume_status,
        sop_status1,
        sop_status2,
        full_name,
        user_id,
      } = row.original;

      const isResumeDisabled = resume_status !== "Completed";
      const isSopDisabled1 = sop_status1 !== "Completed";
      const isSopDisabled2 = sop_status2 !== "Completed";

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
              <DropdownMenuItem
                onClick={openReAssignModal}
                disabled={isAnalyst}
              >
                Reassign Candidate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={openUnAssignModal}
                disabled={isAnalyst}
              >
                Un-assign from current manager
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={isResumeDisabled}>
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
              <DropdownMenuItem disabled={isSopDisabled1}>
                <Link
                  to={`/sop/${id}?type=school1`}
                  target="_blank"
                  className={
                    isSopDisabled1
                      ? "text-gray-400 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                  aria-disabled={isSopDisabled1}
                >
                  View Crafted SOP 1
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isSopDisabled2}>
                <Link
                  to={`/sop/${id}?type=school2`}
                  target="_blank"
                  className={
                    isSopDisabled2
                      ? "text-gray-400 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                  aria-disabled={isSopDisabled2}
                >
                  View Crafted SOP 2
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={openSchoolCourseModal}
                disabled={isAnalyst}
              >
                Change assigned school or course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openModal} disabled={isAnalyst}>
                School Application Status
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isAnalyst}>
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
            <ReAssignModal
              onClose={closeReAssignModal}
              id={id}
              mode={"reassign"}
            />
          )}
          {isUnAssignModalOpen && (
            <ReAssignModal
              onClose={closeUnAssignModal}
              id={id}
              mode={"unassign"}
            />
          )}
          {schoolCourseModalOpen && (
            <NewSchoolCourseModal onClose={closeSchoolCourseModal} id={id} />
          )}
        </>
      );
    },
  },
];
