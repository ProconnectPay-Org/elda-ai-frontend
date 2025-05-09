import AdminLayout from "@/layouts/AdminLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Notification from "@/components/Notification";
import Time from "@/assets/time.png";
import EmployeeMail from "@/assets/invite-employee.svg";
import CandidateIcon from "@/assets/candidate-profile.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAdminInfo,
  getAllActivities,
  getStats,
  sendReminder,
} from "@/lib/actions/user.actions";
import messageIcon from "@/assets/message-icon.png";
import shieldIcon from "@/assets/shield-icon.png";
import { Skeleton } from "@/components/ui/skeleton";
import RecentActivityModal from "@/components/RecentActivityModal";
import { CustomAxiosError, NotificationProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { BellRingIcon, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface staticCardProps {
  title: string;
  value: number | null;
  isLoading: boolean;
  className?: string;
}

const StatisticCard = ({
  title,
  value,
  isLoading,
  className,
}: staticCardProps) => (
  <div
    className={`p-8 hidden md:flex flex-col gap-4 items-center justify-center ${className} w-1/4 border-red`}
  >
    <p className="font-medium text-sm">{title}</p>
    <div className="font-bold text-4xl">
      {isLoading ? <Skeleton className="h-10 w-10" /> : value ?? "0"}
    </div>
    <p className="text-xs flex items-center gap-2 capitalize">
      <img src={Time} alt="time-icon" /> just now
    </p>
  </div>
);

const AdminDashboard = () => {
  const [recentActivity, setRecentActivity] = useState<
    NotificationProps[] | null
  >(null);
  const [numberOfCandidate, setNumberOfCandidate] = useState<number | null>(
    null
  );
  const [numberOfStaff, setNumberOfStaff] = useState<number | null>(null);
  const [completedJobs, setCompletedJobs] = useState<number | null>(null);
  const [pendingJobs, setPendingJobs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState(false);
  const isAnalyst = Cookies.get("user_role") === "analyst";

  const {
    isLoading: isAdminLoading,
    data: AdminData,
    error: adminError,
  } = useQuery({
    queryKey: ["adminData"],
    queryFn: getAdminInfo,
    staleTime: 5 * 60 * 1000,
  });

  const { data: statistics } = useQuery({
    queryKey: ["statistics"],
    queryFn: () => getStats(),
  });
  const adminStats = statistics?.approved_universities_canding;

  const {
    isLoading: isRecentActivityLoading,
    data: RcentActivity,
    error: activityError,
  } = useQuery({
    queryKey: ["recentActivity"],
    queryFn: () => getAllActivities(),
    staleTime: 5 * 60 * 1000,
  });

  const handleReminders = async () => {
    setIsSendingReminder(true);
    try {
      const response = await sendReminder();
      toast({
        title: "Success",
        description: response,
        variant: "success",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSendingReminder(false);
    }
  };

  useEffect(() => {
    const handleAxiosError = (error: unknown) => {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.data
      ) {
        const axiosError = error as CustomAxiosError;
        return axiosError.response?.data?.detail || "Unknown error occurred.";
      }
      return "An error occurred. Please try again.";
    };

    if (adminError) {
      setError("Failed to fetch admin data.");
      const errorMessage = handleAxiosError(adminError);
      toast({
        title: "Error",
        description: `${errorMessage} Login again.`,
        variant: "destructive",
      });
    }

    if (activityError) {
      setError("Failed to fetch recent activities.");
      const errorMessage = handleAxiosError(activityError);
      toast({
        title: "Error",
        description: `${errorMessage} Login again.`,
        variant: "destructive",
      });
    }
  }, [adminError, activityError]);

  useEffect(() => {
    if (AdminData) {
      setCompletedJobs(AdminData.completed_jobs || 0);
      setPendingJobs(AdminData.pending_jobs || 0);
      setNumberOfStaff(AdminData.total_staff || 0);
      setNumberOfCandidate(AdminData.total_candidates || 0);
    }
  }, [AdminData]);

  useEffect(() => {
    if (RcentActivity) {
      setRecentActivity(RcentActivity.results || []);
    }
  }, [RcentActivity]);

  if (error)
    return (
      <div className="flex items-center justify-center h-full font-semibold">
        {error}
      </div>
    );

  return (
    <AdminLayout>
      <div className="flex justify-between w-full items-center">
        <h1 className="text-red text-3xl font-bold">
          Welcome to the Super Admin Dashboard
        </h1>
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-red rounded-md px-3 py-1 text-red">
              View Tables
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tables</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to={"/admin/tables/onboard"} target="_blank">
                <DropdownMenuItem>Onboarded Candidates Table</DropdownMenuItem>
              </Link>
              <Link to={"/admin/tables/interest"} target="_blank">
                <DropdownMenuItem>Interested Candidates Table</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="border-red"
            variant={"outline"}
            onClick={handleReminders}
          >
            {isSendingReminder ? (
              <Loader2 className="animate-spin" />
            ) : (
              <BellRingIcon stroke="red" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row items-start md:items-center justify-between my-8 md:my-10">
        <div className="flex items-center gap-2 lg:gap-4">
          <p className="text-base lg:text-xl">Stats overview for</p>
          <Select>
            <SelectTrigger className="w-[150px] h-[30px]">
              <SelectValue placeholder="Last month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last1month">Last 1 month</SelectItem>
              <SelectItem value="last2months">Last 2 months</SelectItem>
              <SelectItem value="last3months">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Link to="/admin/invite-employee" aria-disabled={isAnalyst}>
            <Button
              variant="outline"
              className={`border-red text-red text-xs md:text-base flex items-center gap-2 hover:text-red hover:bg-pale-bg ${
                isAnalyst ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={(e) => {
                if (isAnalyst) e.preventDefault();
              }}
            >
              <img src={EmployeeMail} alt="icon" />
              Invite Employee
            </Button>
          </Link>
          <Link to="/admin/create-candidate-profile" aria-disabled={isAnalyst}>
            <Button
              variant="outline"
              className={`border-red text-red text-xs md:text-base flex items-center gap-2 hover:text-red hover:bg-pale-bg ${
                isAnalyst ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={(e) => {
                if (isAnalyst) e.preventDefault();
              }}
            >
              <img src={CandidateIcon} alt="icon" />
              Create Candidate Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-red md:border w-full mb-10 rounded-lg flex flex-col md:flex-row gap-2 md:gap-0">
        <StatisticCard
          title="NUMBER OF CANDIDATES"
          value={numberOfCandidate}
          isLoading={isAdminLoading}
          className="border-r"
        />
        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">NUMBER OF CANDIDATE</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {isAdminLoading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              numberOfCandidate || "0"
            )}
          </div>
        </div>

        <StatisticCard
          title="NUMBER OF STAFF"
          value={numberOfStaff}
          isLoading={isAdminLoading}
          className="border-r"
        />

        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">NUMBER OF STAFF</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {isAdminLoading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              numberOfStaff || "0"
            )}
          </div>
        </div>

        <StatisticCard
          title="PENDING JOBS"
          value={pendingJobs}
          isLoading={isAdminLoading}
          className="border-r"
        />

        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">PENDING JOBS</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {isAdminLoading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              pendingJobs || "0"
            )}
          </div>
        </div>

        <StatisticCard
          title="ADMITTED CANDIDATES"
          value={adminStats || 0}
          isLoading={isAdminLoading}
          className="border-r"
        />

        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">ADMITTED CANDIDATES</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {isAdminLoading ? <Skeleton className="h-10 w-10" /> : adminStats}
          </div>
        </div>

        <StatisticCard
          title="COMPLETED JOBS"
          value={completedJobs}
          isLoading={isAdminLoading}
        />
        <div className="py-8 px-4 flex md:hidden gap-4 items-center justify-between rounded-lg border border-red">
          <div>
            <p className="font-medium text-sm">COMPLETED JOBS</p>
            <p className="text-xs flex items-center gap-2 capitalize">
              <img src={Time} alt="time-icon" /> just now
            </p>
          </div>
          <div className="font-bold text-4xl">
            {isAdminLoading ? (
              <Skeleton className="h-10 w-10" />
            ) : (
              completedJobs || "0"
            )}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="w-full lg:min-w-[40%] lg:w-[50%]">
        <span className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Recent Activity</h2>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="text-red border-none bg-transparent hover:bg-transparent hover:text-rose-200 underline cursor-pointer"
          >
            View all
          </Button>
        </span>

        {isRecentActivityLoading ? (
          <div className="space-y-5 mt-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          recentActivity &&
          recentActivity.slice(0, 5).map(
            (
              item: NotificationProps // Display only the first 5 items
            ) => (
              <Notification
                key={item.id}
                activity_type={
                  item.activity_type === "success" ? messageIcon : shieldIcon
                }
                date={item.date}
                title={item.title}
                body={item.body}
              />
            )
          )
        )}
      </div>
      <RecentActivityModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </AdminLayout>
  );
};

export default AdminDashboard;
