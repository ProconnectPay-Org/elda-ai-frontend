import AdminLayout from "@/layouts/AdminLayout";
import { getComplaints } from "@/lib/actions/user.actions";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

type complaintProps = {
  complaint: string;
  complaint_date: string;
  complaint_status: "pending" | "in_progress" | "resolved" | "closed";
  user: User;
};

const ViewComplaints = () => {
  const { data } = useQuery({
    queryKey: ["getComplaints"],
    queryFn: getComplaints,
    staleTime: 6 * 1000 * 60,
  });

  return (
    <AdminLayout>
      <div>
        {data?.results?.map((complaint: complaintProps, index: number) => (
          <div key={index} className="mt-4">
            <div className="flex gap-2">
              <p>Complaint:</p>
              <p>{complaint.complaint}</p>
            </div>
            <div className="flex gap-2">
              <p>Date: </p>
              <p>{complaint.complaint_date}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p>Complaint Status: </p>
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
            <div className="flex gap-2">
              <p>Complaint by: </p>
              <p>{complaint.user.full_name}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ViewComplaints;
