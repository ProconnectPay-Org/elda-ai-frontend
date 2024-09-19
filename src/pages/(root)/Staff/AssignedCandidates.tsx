import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/DataTable";
import SmallBox from "@/components/SmallBox";
import { columns } from "@/components/ui/Columns";
import { smallBox } from "@/constants";
// import useAuth from "@/hooks/useAuth";
import RootLayout from "@/layouts/RootLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { copyToClipboard } from "@/lib/utils";
import DottedBox from "@/components/DottedBox";
import { CopyIcon, MailIcon, PhoneCallIcon } from "lucide-react";
import { getData } from "@/lib/actions/user.actions";
import { CandidateData } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const AssignedCandidates = () => {
  const [tableData, setTableData] = useState<CandidateData[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<CandidateData | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await getData();
      setTableData(data);
    };

    fetchTableData();
  }, []);

  const handleRowClick = (row: CandidateData) => {
    setSelectedRowData(row);
    setIsDialogOpen(true);
  };

  // const closeModal = () => {
  //   setSelectedRowData(null);
  //   setIsDialogOpen(false);
  // };

  // const { loggedInUser } = useAuth();

  return (
    <RootLayout title="Assigned Candidates">
      {/* {loggedInUser && ( */}
      <p className="text-red text-[32px] font-semibold">
        {/* Welcome, {loggedInUser.name}! */}
        Welcome, Elda David!
      </p>
      {/* )} */}
      <div className="flex justify-between w-full gap-8 flex-wrap mt-4">
        {smallBox.map((box) => (
          <SmallBox
            key={box.name}
            name={box.name}
            number={box.number}
            icon={box.icon}
          />
        ))}
      </div>
      <div className="border-2 border-gray w-full rounded-lg mt-8">
        <div className="px-2 md:px-5 py-5 flex items-center md:gap-4 justify-between md:justify-normal">
          <p className="font-medium text-base md:text-xl">
            Assigned Candidates
          </p>
          <span className="text-xs md:text-sm bg-pale-bg py-2 px-4 rounded-3xl text-red">
            10 new candidates
          </span>
        </div>
        <DataTable
          columns={columns}
          data={tableData}
          onRowClick={handleRowClick}
        />
      </div>

      {selectedRowData && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[364px] md:w-full">
            <DialogHeader>
              <div className="flex w-full justify-between mt-4">
                <DialogTitle className="text-red">
                  Candidate Details
                </DialogTitle>
                <Link
                  to={`/assigned-candidates/${selectedRowData.id}`}
                  className="underline text-sm text-red font-medium"
                >
                  View All
                </Link>
              </div>
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                <div className="w-1/2">
                  <p>Full Name</p>
                  <p className="text-primary font-medium">
                    {selectedRowData.name}
                  </p>
                </div>
                <div className="w-1/2 flex flex-col items-start">
                  <p>Status</p>
                  <p
                    className={`${
                      selectedRowData.status === "completed"
                        ? "bg-green-200 text-green-800"
                        : "text-red bg-pale-bg"
                    } text-[10px] p-1 rounded-xl`}
                  >
                    {selectedRowData.status}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                <div>
                  <p>Phone Number</p>
                  <p
                    onClick={() =>
                      copyToClipboard(selectedRowData.phone || "", toast)
                    }
                    className="text-primary font-medium flex items-center gap-1"
                  >
                    <PhoneCallIcon size={16} />
                    {selectedRowData.phone}
                    <CopyIcon size={16} cursor="pointer" />
                  </p>
                </div>
                <div className="w-1/2">
                  <p>Recommended School</p>
                  <p className="text-primary font-medium">
                    {selectedRowData.recommended_school}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-0 justify-between">
                <div>
                  <p>Email Address</p>
                  <p
                    onClick={() =>
                      copyToClipboard(selectedRowData.email || "", toast)
                    }
                    className="text-primary font-medium flex items-center gap-1"
                  >
                    <MailIcon size={16} />
                    {selectedRowData.email}
                    <CopyIcon size={16} cursor="pointer" />
                  </p>
                </div>
                <div className="w-1/2">
                  <p>Recommended Course</p>
                  <p className="text-primary font-medium">
                    {selectedRowData.recommended_course}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-5 md:gap-0 justify-between">
                <DottedBox
                  className="border-red rounded-md text-sm font-bold p-2 hover:bg-pale-bg"
                  href="/craft-sop"
                  docType="Draft Statement Of Purpose"
                  icon=""
                />
                <Link
                  to="/refine-resume"
                  className="bg-red w-1/2 hover:bg-pale-bg text-white hover:text-red border hover:border-red text-center py-2 rounded-md"
                >
                  Refine Resume
                </Link>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </RootLayout>
  );
};

export default AssignedCandidates;
