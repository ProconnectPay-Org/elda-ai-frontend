import { ColumnDef } from "@tanstack/react-table";
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
import NewSchoolCourseModal from "../NewSchoolCourseModal";

export const columns: ColumnDef<CandidateData>[] = [
  {
    accessorKey: "serial_number",
    header: "S/N",
  },
  {
    accessorKey: "full_name",
    header: "Student Name",
  },
  {
    accessorKey: "assigned_school1",
    header: "Recommended School 1",
  },
  {
    accessorKey: "assigned_course1",
    header: "Recommended Course 1",
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
    accessorKey: "assigned_school2",
    header: "Recommended School 2",
  },
  {
    accessorKey: "assigned_course2",
    header: "Recommended Course 2",
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
    accessorKey: "resume_status",
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
    accessorKey: "sop_status1",
    header: () => (
      <div>
        <p className="text-center">SOP 1</p>
      </div>
    ),
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
    header: () => (
      <div>
        <p className="text-center">SOP 2</p>
      </div>
    ),
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
    accessorKey: "school_application_status1",
    header: () => (
      <div>
        <p className="text-center">School Application Status 1</p>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className={`py-1 h-5 rounded-xl ${
            row.original.school_application_status1 === "Pending"
              ? "bg-orange text-white"
              : "bg-[#D5F4EA] text-[#2A6350]"
          } px-5 hover:bg-green-200`}
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
      <div>
        <p className="text-center">School Application Status 2</p>
      </div>
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false); // Separate modal state
      const [schoolCourseModalOpen, setSchoolCourseModalOpen] = useState(false);

      const openSchoolModal = () => {
        setIsSchoolModalOpen(true);
      };

      const closeSchoolModal = () => {
        setIsSchoolModalOpen(false);
      };

      const openSchoolCourseModal = () => {
        setSchoolCourseModalOpen(true);
      };

      const closeSchoolCourseModal = () => {
        setSchoolCourseModalOpen(false);
      };

      const { id, resume_status, sop_status1, sop_status2 } = row.original;
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
                <Link
                  to={
                    isSopDisabled1
                      ? `/craft-sop/${id}?type=school1`
                      : `/sop/${id}?type=school1`
                  }
                >
                  {isSopDisabled1
                    ? "Craft SOP for school 1"
                    : "View Crafted SOP 1"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to={
                    isSopDisabled2
                      ? `/craft-sop/${id}?type=school2`
                      : `/sop/${id}?type=school2`
                  }
                >
                  {isSopDisabled2
                    ? "Craft SOP for school 2"
                    : "View Crafted SOP 2"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={`/assigned-candidates/${id}`}>Candidate Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openSchoolCourseModal}>
                Change assigned school or course
              </DropdownMenuItem>
              <DropdownMenuItem className="z-20" onClick={openSchoolModal}>
                School Application Status
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link target="_blank" to={`/school-one/${id}`}>Fill Details For School One</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link target="_blank" to={`/school-two/${id}`}>Fill Details for School Two</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link target="_blank" to={`/admission-status/${id}`}>Admission Status</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modals */}
          {isSchoolModalOpen && (
            <SchoolApplicationModal onClose={closeSchoolModal} id={id} />
          )}
          {schoolCourseModalOpen && (
            <NewSchoolCourseModal onClose={closeSchoolCourseModal} id={id} />
          )}
        </>
      );
    },
  },
];
