import { NotificationProps } from "@/types";

const Notification = ({ icon, title, text, date }: NotificationProps) => {
  return (
    <div className="flex items-center gap-4 my-4">
      <img src={icon} alt="icon" />
      <div>
        <div className="flex gap-2">
          <p className="font-medium">{title}</p>
          <p className="">{text}</p>
        </div>
        <p className="text-xs">{date}</p>
      </div>
    </div>
  );
};

export default Notification;
