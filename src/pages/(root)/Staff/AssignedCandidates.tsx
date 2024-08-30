import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/DataTable";
import SmallBox from "@/components/SmallBox";
import { columns } from "@/components/ui/Columns";
import { smallBox } from "@/constants";
import useAuth from "@/hooks/useAuth";
import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
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
import { Payment } from "@/types";

const AssignedCandidates = () => {
  const [tableData, setTableData] = useState<Payment[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<Payment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      const data = await getData();
      setTableData(data);
    };

    fetchTableData();
  }, []);

  const handleRowClick = (row: Payment) => {
    setSelectedRowData(row);
    setIsDialogOpen(true);
  };

  // const closeModal = () => {
  //   setSelectedRowData(null);
  //   setIsDialogOpen(false);
  // };

  const { loggedInUser } = useAuth();

  return (
    <RootLayout title="Dashboard">
      {loggedInUser && (
        <p className="text-red text-[32px] font-semibold">
          Welcome, {loggedInUser.name}!
        </p>
      )}
      <div className="flex justify-between gap-8 flex-wrap mt-4">
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
        <div className="px-5 py-5 flex items-center gap-4">
          <p className="font-medium text-xl">Assigned Candidates</p>
          <span className="text-sm bg-pale-bg py-2 px-4 rounded-3xl text-red">
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
          <DialogContent>
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
              <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-between">
                <div>
                  <p>Phone Number</p>
                  <p
                    onClick={() => copyToClipboard(selectedRowData.phone || "")}
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
                    {selectedRowData.recommendedSchool}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Email Address</p>
                  <p
                    onClick={() => copyToClipboard(selectedRowData.email || "")}
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
                    {selectedRowData.recommendedCourse}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <DottedBox
                  className="border-red rounded-md text-sm font-bold p-2 hover:bg-pale-bg"
                  href="/craft-sop"
                  docType="Draft Statement Of Purpose"
                  icon=""
                />
                <Button className="bg-red w-1/2 hover:bg-pale-bg hover:text-red border hover:border-red">
                  <Link to="/refine-resume">Refine Resume</Link>
                </Button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </RootLayout>
  );
};

export default AssignedCandidates;
