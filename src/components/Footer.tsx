import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuth from "@/hooks/useAuth";

const Footer = () => {
  const { loggedInUser, handleLogout } = useAuth();

  return (
    <div className="flex items-center justify-evenly">
      {loggedInUser && (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{getInitials(loggedInUser?.name)}</AvatarFallback>
        </Avatar>
      )}
      <p className="text-black cursor-pointer text-xs">{loggedInUser?.email}</p>
      <p className="text-black cursor-pointer" onClick={handleLogout}>
        Log Out
      </p>
    </div>
  );
};

export default Footer;
