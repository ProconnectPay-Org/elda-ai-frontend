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
import Time from "../../../assets/time.png";
import { NotificationDetails } from "@/constants";
import EmployeeMail from "@/assets/invite-employee.svg";
import CandidateIcon from "@/assets/candidate-profile.svg";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-red text-3xl font-bold">
        Welcome to the Super Admin Dashboard
      </h1>

      <div className="flex flex-col-reverse gap-5 md:gap-0 md:flex-row items-start md:items-center justify-between my-8 md:my-10">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
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
          <Link to="/admin/invite-employee">
            <Button
              variant="outline"
              className="border-red text-red text-xs md:text-base flex items-center gap-2 hover:text-red hover:bg-pale-bg"
            >
              <img src={EmployeeMail} alt="icon" />
              Invite Employee
            </Button>
          </Link>
          <Link to="/admin/create-candidate-profile">
            <Button
              variant="outline"
              className="border-red text-red text-xs md:text-base flex items-center gap-2 hover:text-red hover:bg-pale-bg"
            >
              <img src={CandidateIcon} alt="icon" />
              Create Candidate Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-red border w-full mb-10 rounded-lg flex">
        <div className="p-8 flex flex-col gap-4 items-center justify-center w-1/4 border-r border-red">
          <p className="font-medium text-sm">NUMBER OF CANDIDATE</p>
          <p className="font-bold text-4xl">20</p>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>
        <div className="p-8 flex flex-col gap-4 items-center justify-center w-1/4 border-r border-red">
          <p className="font-medium text-sm">NUMBER OF STAFF</p>
          <p className="font-bold text-4xl">5</p>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>
        <div className="p-8 flex flex-col gap-4 items-center justify-center w-1/4 border-r border-red">
          <p className="font-medium text-sm">PENDING JOBS</p>
          <p className="font-bold text-4xl">100</p>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>
        <div className="p-8 flex flex-col gap-4 items-center justify-center w-1/4">
          <p className="font-medium text-sm">COMPLETED JOBS</p>
          <p className="font-bold text-4xl">8</p>
          <p className="text-xs flex items-center gap-2 capitalize">
            <img src={Time} alt="time-icon" /> just now
          </p>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="w-full lg:min-w-[40%] lg:w-[50%]">
        <span className="flex justify-between">
          <h2 className="text-xl font-medium">Recent Activity</h2>
          <p className="text-red underline cursor-pointer">View all</p>
        </span>
        {NotificationDetails.map((item) => (
          <Notification
            key={item.text}
            icon={item.icon}
            date={item.date}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
