import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const fetchActivities = async (url?: string) => {
    setLoading(true);
    try {
      const data = await getAllActivities(url);
      setActivities(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (err) {
      setError("Error in sending request: " + err);
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchActivities();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="py-12 h-[80%] md:h-[60vh] flex flex-col items-center w-[96%] justify-center">
        <DialogHeader className="flex">
          <DialogTitle className="text-red flex items-center justify-center gap-3">
            All Notifications
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-8 h-full overflow-y-scroll">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center">{error}</p>
          ) : (
            <>
              {activities.map((item) => (
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
              <div className="pagination-buttons flex gap-4 mt-4">
                <button
                  onClick={() => fetchActivities(previousPage || undefined)}
                  disabled={!previousPage}
                  className="btn"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchActivities(nextPage || undefined)}
                  disabled={!nextPage}
                  className="btn"
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
