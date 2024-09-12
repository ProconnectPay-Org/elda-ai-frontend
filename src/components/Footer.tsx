import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuth from "@/hooks/useAuth";

const Footer = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="flex items-center justify-start gap-4">
      {/* {loggedInUser && ( */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          {/* <AvatarFallback>{getInitials(loggedInUser?.name)}</AvatarFallback> */}
          <AvatarFallback>{getInitials("Elda David")}</AvatarFallback>
        </Avatar>
      {/* )} */}
      {/* <p className="text-black cursor-pointer text-xs">{loggedInUser?.email}</p> */}
      <p className="text-black cursor-pointer font-semibold hover:font-normal" onClick={handleLogout}>
        Log Out
      </p>
    </div>
  );
};

export default Footer;
