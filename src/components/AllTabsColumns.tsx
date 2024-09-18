import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";

interface CandidateData {
  serialNumber: number;
  full_name: string;
  country: string;
  university: string;
  course: string;
  schoolApplicationStatus: string;
  resumeStatus: string;
  sopStatus: string;
  duplicate: string;
}

export const allTabsColumns: ColumnDef<CandidateData>[] = [
  {
    accessorKey: "serialNumber",
    header: "S/N",
  },
  {
    accessorKey: "full_name",
    header: "Candidate Name",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.full_name || "No name"}</p>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.country || "No country"}</p>
    ),
  },
  {
    accessorKey: "university",
    header: "Assigned University",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.university || "No university"}</p>
    ),
  },
  {
    accessorKey: "course",
    header: "Assigned Course",
    cell: ({ row }) => (
      <p className="capitalize">
        {row.original.course || "No course assigned"}
      </p>
    ),
  },
  {
    accessorKey: "schoolApplicationStatus",
    header: () => <div className="text-center">School Application Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button
          className="py-1 h-5 rounded-xl bg-[#D5F4EA] text-[#2A6350] px-5 hover:bg-green-200"
          onClick={() =>
            alert(`Status: ${row.original.schoolApplicationStatus || "none"}`)
          }
        >
          {row.original.schoolApplicationStatus || "none"}
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
          onClick={() =>
            alert(`Resume Status: ${row.original.resumeStatus || "none"}`)
          }
        >
          {row.original.resumeStatus || "none"}
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
          onClick={() =>
            alert(`SOP Status: ${row.original.sopStatus || "none"}`)
          }
        >
          {row.original.sopStatus || "none"}
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
          onClick={() =>
            alert(`Duplicate: ${row.original.duplicate || "none"}`)
          }
        >
          {row.original.duplicate || "none"}
        </Button>
      </div>
    ),
  },
];
