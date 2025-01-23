import useAuth from "@/hooks/useAuth";
import DropDownMenuBar from "./DropDownMenu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

const TopNavBar = ({ title }: { title?: string }) => {
  const { loggedInUser } = useAuth();

  return (
    <div className="min-w-full hidden p-8 pl-2 border-b md:flex justify-between items-center border-b-gray h-[80px]">
      <p className="font-normal text-2xl">{title}</p>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>
            {getInitials(loggedInUser?.full_name || "")}
          </AvatarFallback>
        </Avatar>
        <DropDownMenuBar />
      </div>
    </div>
  );
};

export default TopNavBar;
