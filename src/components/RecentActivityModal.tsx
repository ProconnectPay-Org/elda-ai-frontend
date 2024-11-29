import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { getAllActivities } from "@/lib/actions/user.actions";
import Notification from "./Notification";
import messageIcon from "@/assets/message-icon.png";
import shieldIcon from "@/assets/shield-icon.png";
import { useQuery } from "@tanstack/react-query";

interface RecentActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Activity {
  id: number;
  title: string;
  body: string;
  activity_type: string;
  date: string;
}

const RecentActivityModal = ({
  open,
  onOpenChange,
}: RecentActivityModalProps) => {
  const [page, setPage] = React.useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["activities", page],
    queryFn: () => getAllActivities(page),
    staleTime: 5 * 60 * 1000,
  });

  const activities = data?.results || [];
  const nextPage = data?.next;
  const previousPage = data?.previous;
  const totalActivities = data?.count || 0;
  const itemsPerPage = 50;
  const totalPages = Math.ceil(totalActivities / itemsPerPage);

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  const handleNextPage = () => {
    if (nextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="py-12 h-[80%] md:h-[60vh] flex flex-col items-center w-[96%] justify-center">
        <DialogHeader className="flex">
          <DialogTitle className="text-red flex items-center justify-center gap-3">
            All Notifications
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-8 h-full overflow-y-scroll">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center">{error.message || "Error fetching activities"}</p>
          ) : (
            <>
              {activities.map((item: Activity) => (
                <Notification
                  key={item.id}
                  activity_type={
                    item.activity_type === "success" ? messageIcon : shieldIcon
                  }
                  date={item.date}
                  title={item.title}
                  body={item.body}
                />
              ))}

              {/* Pagination Controls */}
              <div className="fixed bottom-4 flex gap-4 mt-4 items-center">
                <button
                  onClick={handlePreviousPage}
                  className="bg-red text-white px-3 py-2 rounded disabled:opacity-50"
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="bg-red text-white px-3 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RecentActivityModal;
