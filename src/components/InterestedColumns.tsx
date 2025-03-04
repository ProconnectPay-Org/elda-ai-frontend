import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { InterestedCandidatesProps } from "@/types";
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

export const interestedColumns = (
  handleDeleteCandidate: (userId: string, fullName: string) => void
): ColumnDef<InterestedCandidatesProps>[] => [
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
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "residence_country",
    header: "Country of Residence",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "country_interested_in",
    header: "Country Interested In",
  },
  {
    accessorKey: "enquiries",
    header: "Enquires For",
  },
  {
    accessorKey: "product",
    header: "Product Interested In",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const isAnalyst = Cookies.get("user_role") === "analyst";
      const { full_name, email } = row.original;

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
                  if (email) {
                    handleDeleteCandidate(email, full_name || "Unknown User");
                  } else {
                    console.error("User email is undefined");
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
