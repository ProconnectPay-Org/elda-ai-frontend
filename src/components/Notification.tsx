import { NotificationProps } from "@/types";

const Notification = ({ activity_type, title, body, date }: NotificationProps) => {
  return (
    <div className="flex items-start md:items-center gap-4 my-4">
      <img src={activity_type} alt="icon" />
      <div className="flex flex-col gap-0">
        <div className="flex flex-col md:flex-row md:gap-2">
          <p className="font-medium min-w-40">{title}</p>
          <p className="text-sm">{body}</p>
        </div>
        <p className="text-xs">{date}</p>
      </div>
    </div>
  );
};

export default Notification;
