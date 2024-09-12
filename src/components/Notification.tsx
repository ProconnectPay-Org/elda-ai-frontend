import { NotificationProps } from "@/types";

const Notification = ({ icon, title, text, date }: NotificationProps) => {
  return (
    <div className="flex items-start md:items-center gap-4 my-4">
      <img src={icon} alt="icon" />
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:gap-2">
          <p className="font-medium">{title}</p>
          <p className="">{text}</p>
        </div>
        <p className="text-xs">{date}</p>
      </div>
    </div>
  );
};

export default Notification;
