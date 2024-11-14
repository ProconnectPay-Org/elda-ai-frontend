import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import AdminLayout from "@/layouts/AdminLayout";
import { getComplaints } from "@/lib/actions/user.actions";
import { getInitials } from "@/lib/utils";
import { User } from "@/types";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type complaintProps = {
  complaint: string;
  complaint_date: string;
  complaint_status: "pending" | "in_progress" | "resolved" | "closed";
  user: User;
};

const ViewComplaints = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getComplaints"],
    queryFn: getComplaints,
    staleTime: 6 * 1000 * 60,
  });

  const { toast } = useToast();

  const [selectedComplaint, setSelectedComplaint] = useState<number | null>(
    null
  );
  const [replyText, setReplyText] = useState("");

  {
    isError &&
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get Complaints",
      });
  }

  return (
    <AdminLayout>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">All Comments</h2>
      </div>
      {isLoading && (
        <div className="mt-4 animate-pulse">
          <div className="flex gap-2 items-center">
            <Skeleton className="rounded-full w-12 h-12  bg-pale-bg" />
            <Skeleton className="w-10 h-3 bg-pale-bg" />
            <Skeleton className="w-10 h-3 bg-pale-bg" />
          </div>
          <div className="flex gap-2 mb-3">
            <Skeleton className="bg-pale-bg w-20 h-3" />
            <Skeleton className="bg-pale-bg w-20 h-3" />
          </div>
          <div className="flex gap-2 items-center mb-3">
            <Skeleton className="bg-pale-bg w-20 h-3" />
            <Skeleton className="bg-pale-bg w-20 h-3" />
          </div>
          <div className="flex items-center gap-2">
            <ChatBubbleIcon />
            <p className="text-xs">Reply</p>
          </div>
        </div>
      )}

      <div>
        {data?.results?.map((complaint: complaintProps, index: number) => (
          <div key={index} className="mt-8 space-y-2 border-b border-black pb-5">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-pale-bg text-red font-semibold">
                {getInitials(complaint.user.full_name)}
              </div>
              <p className="font-semibold text-lg">
                {complaint.user.full_name}
              </p>
              <p className="text-xs">{complaint.complaint_date}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Complaint:</p>
              <p>{complaint.complaint}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold">Complaint Status: </p>
              <p
                className={`${
                  complaint.complaint_status === "pending"
                    ? "bg-orange"
                    : complaint.complaint_status === "resolved"
                    ? "bg-green-500"
                    : complaint.complaint_status === "in_progress"
                    ? "bg-blue-500"
                    : "bg-gray-500"
                } p-1 px-2 rounded-full text-white text-sm`}
              >
                {complaint.complaint_status}
              </p>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer w-fit"
              onClick={() => setSelectedComplaint(index)}
            >
              <ChatBubbleIcon />
              <p className="text-xs">Reply</p>
            </div>

            {selectedComplaint === index && (
              <div className="mt-2 flex flex-col">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full md:w-[360px] border p-2 rounded"
                />
                <button className="mt-2 w-fit bg-red text-white py-1 px-4 rounded">
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ViewComplaints;
