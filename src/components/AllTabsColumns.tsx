import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";

interface Candidate {
  serialNumber: string;
  candidateName: string;
  country: string;
  assignedUniversity: string;
  assignedCourse: string;
  schoolApplicationStatus: string;
  resumeStatus: string;
  sopStatus: string;
  duplicate: string;
}

export const allTabsColumns: ColumnDef<Candidate>[] = [
  {
    accessorKey: "serialNumber",
    header: "S/N",
  },
  {
    accessorKey: "candidateName",
    header: "Candidate Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "assignedUniversity",
    header: "Assigned University",
  },
  {
    accessorKey: "assignedCourse",
    header: "Assigned Course",
  },
  {
    accessorKey: "schoolApplicationStatus",
    header: () => <div className="text-center">School Application Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="py-1 h-5 rounded-xl bg-[#D5F4EA] text-[#2A6350] px-5 hover:bg-green-200"
          onClick={() =>
            alert(`Status: ${row.original.schoolApplicationStatus}`)
          }
        >
          {row.original.schoolApplicationStatus}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "resumeStatus",
    header: () => <div className="text-center">Resume Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="py-1 h-5 rounded-xl bg-[#D5F4EA] text-[#2A6350] px-5 hover:bg-green-200"
          onClick={() => alert(`Resume Status: ${row.original.resumeStatus}`)}
        >
          {row.original.resumeStatus}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "sopStatus",
    header: () => <div className="text-center">SOP Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="py-1 h-5 rounded-xl bg-[#D5F4EA] w-full text-[#2A6350] px-5 hover:bg-green-200"
          onClick={() => alert(`Resume Status: ${row.original.resumeStatus}`)}
        >
          {row.original.sopStatus}
        </Button>
      </div>
    ),
  },
  {
    accessorKey: "duplicate",
    header: () => <div className="text-center">Duplicate</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="bg-[#D74632] w-full"
          onClick={() => alert(`Duplicate: ${row.original.duplicate}`)}
        >
          {row.original.duplicate}
        </Button>
      </div>
    ),
  },
];
