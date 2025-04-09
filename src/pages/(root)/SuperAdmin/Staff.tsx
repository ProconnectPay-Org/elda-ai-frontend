import { DataTable } from "@/components/DataTable";
import { StaffColumns } from "@/components/StaffColumns";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/AdminLayout";
import { getAllStaff } from "@/lib/actions/user.actions";
import { AllStaff, AllStaffResponse } from "@/types";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import ReAssignModal from "@/components/ReAssignModal";

const Staff = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;

  const getToken = () => Cookies.get("access_token");
  const isAnalyst = Cookies.get("user_role") === "analyst";

  const [selectedRowData, setSelectedRowData] = useState<AllStaff | null>(null);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isUnAssignModalOpen, setIsUnAssignModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<
    string | undefined
  >(undefined);

  const openReAssignModal = (id: string) => {
    setSelectedCandidateId(id);
    setIsAssignModalOpen(true);
  };

  const closeReAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  const openUnAssignModal = (id: string) => {
    setSelectedCandidateId(id);
    setIsUnAssignModalOpen(true);
  };

  const closeUnAssignModal = () => {
    setIsUnAssignModalOpen(false);
  };

  const { data, isLoading, error } = useQuery<AllStaffResponse, Error>({
    queryKey: ["allStaff", page],
    queryFn: async () => {
      const token = getToken();
      if (!token)
        throw new Error("Access token is missing. Please sign in again.");
      return page ? getAllStaff(page) : getAllStaff();
    },
    enabled: !!getToken(),
    staleTime: 1 * 60 * 1000,
  });

  const handleNextPage = () => {
    if (data?.next) {
      const nextPage = new URL(data.next).searchParams.get("page");
      if (nextPage)
        setSearchParams({
          page: nextPage,
        });
    }
  };

  const handlePreviousPage = () => {
    if (data?.previous) {
      const previousUrl = new URL(data.previous);
      const previousPage = previousUrl.searchParams.get("page") || "1";
      setSearchParams({
        page: previousPage,
      });
    } else {
      setSearchParams({ page: "1" });
    }
  };

  const handleRowClick = (row: AllStaff) => {
    setSelectedRowData(row);
  };

  const startingIndex = (page - 1) * pageSize;

  const tableData: AllStaff[] =
    data?.results
      .filter((staff) => staff?.user?.email !== "badgy2003@gmail.com")
      .map((staff, index) => ({
        ...staff,
        full_name: staff.user?.full_name || "No name",
        serialNumber: startingIndex + index + 1,
        status: staff.status || "Inactive",
        assigned_candidates: staff.assigned_candidates || "No candidates",
      })) || [];

  if (error) {
    return <p className="text-center text-red-600">Error loading staff data</p>;
  }

  return (
    <AdminLayout>
      {isAssignModalOpen && (
        <ReAssignModal
          onClose={closeReAssignModal}
          id={selectedCandidateId}
          mode={"reassign"}
        />
      )}
      {isUnAssignModalOpen && (
        <ReAssignModal
          onClose={closeUnAssignModal}
          id={selectedCandidateId}
          mode={"unassign"}
        />
      )}
      <div className="flex flex-col gap-12">
        <div className="flex justify-between items-center border rounded-sm py-2 px-3 border-[#EAECF0]">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-red leading-8 mb-2">
              Team Members
            </h2>
            <p className="text-sm md:text-base">Invite and Manage your Staff</p>
          </div>

          <Link to="/admin/invite-employee" aria-disabled={isAnalyst}>
            <Button
              variant="outline"
              className={`border-red text-red md:h-[52px] flex items-center gap-2.5 hover:text-white hover:bg-red ${
                isAnalyst ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={(e) => {
                if (isAnalyst) e.preventDefault();
              }}
            >
              Invite Employee
            </Button>
          </Link>
        </div>

        <DataTable
          columns={StaffColumns}
          data={tableData}
          isLoading={isLoading}
          onRowClick={handleRowClick}
        />

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={!data?.previous}
            className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!data?.next}
            className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {selectedRowData && (
          <Sheet
            open={!!selectedRowData}
            onOpenChange={() => setSelectedRowData(null)}
          >
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent className="overflow-y-scroll">
              <SheetHeader>
                <SheetTitle>Staff Name</SheetTitle>
                <SheetDescription className="text-base flex flex-col">
                  <span>{selectedRowData.user.full_name}</span>
                  <span className="text-black underline">
                    Email: {selectedRowData.user.email}
                  </span>
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <h3 className="font-semibold mb-4">Assigned Candidates</h3>
                  <ol className="list-decimal space-y-4 px-4">
                    {selectedRowData.assigned_candidates &&
                    selectedRowData.assigned_candidates.length > 0
                      ? selectedRowData.assigned_candidates.map((cand) => (
                          <li key={cand.id}>
                            <Link
                              target="_blank"
                              to={`/candidates/${cand.id}`}
                              className={`underline mb-4 ${
                                cand.first_name
                                  ? "text-black"
                                  : "text-red font-semibold"
                              }`}
                            >
                              {cand.first_name
                                ? `${cand.first_name} ${
                                    cand.middle_name || ""
                                  } ${cand.last_name || ""}`.trim()
                                : "Not filled form yet - View Profile"}
                            </Link>
                            <div className="flex gap-3 mt-2">
                              <Button
                                className="border-red text-red"
                                onClick={() => {
                                  if (cand.id) {
                                    openUnAssignModal(cand.id);
                                    setSelectedRowData(null);
                                  }
                                }}
                                variant={"outline"}
                              >
                                Unassign
                              </Button>
                              <Button
                                className="bg-red"
                                onClick={() => {
                                  if (cand.id) {
                                    openReAssignModal(cand.id);
                                    setSelectedRowData(null);
                                  }
                                }}
                              >
                                Reassign
                              </Button>
                            </div>
                          </li>
                        ))
                      : "No candidates assigned yet"}
                  </ol>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </AdminLayout>
  );
};

export default Staff;
