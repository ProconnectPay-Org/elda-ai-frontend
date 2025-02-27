import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ACSCandidateProps } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Cookies from "js-cookie";

export const onboardColumns = (
  handleDeleteCandidate: (userId: string, fullName: string) => void
): ColumnDef<ACSCandidateProps>[] => [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "whatsapp",
    header: "WhatsApp",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
  },
  {
    accessorKey: "first_country",
    header: "First Country",
  },
  {
    accessorKey: "second_country",
    header: "Second Country",
  },
  {
    accessorKey: "assigned_course1",
    header: "Recommended Course 1",
  },
  {
    accessorKey: "assigned_course2",
    header: "Recommended Course 2",
  },
  {
    accessorKey: "assigned_university1",
    header: "Recommended School 1",
  },
  {
    accessorKey: "assigned_university2",
    header: "Recommended School 2",
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
    accessorKey: "class_of_degree",
    header: "Class of Degree",
  },
  {
    accessorKey: "specific_cgpa",
    header: "CGPA",
  },
  {
    accessorKey: "graduate_of",
    header: "Graduate Of",
  },
  {
    accessorKey: "has_masters_degree",
    header: "Has Masters?",
    cell: ({ row }) => (row.original.has_masters_degree ? "Yes" : "No"),
  },
  {
    accessorKey: "has_paid",
    header: "Has Paid?",
    cell: ({ row }) => (row.original.has_paid ? "Yes" : "No"),
  },
  {
    accessorKey: "bank",
    header: "Bank Paid From",
  },
  {
    accessorKey: "state_of_residence",
    header: "State of Residence",
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      const resume = row.original.resume;
      return resume ? (
        <a
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View CV
        </a>
      ) : (
        "No CV"
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => new Date(row.original.updated_at).toLocaleDateString(),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const isAnalyst = Cookies.get("user_role") === "analyst";
      const { full_name, id: user_id } = row.original;

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
            <DropdownMenuSeparator />
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
      );
    },
  },
];
