import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";

const Footer = () => {
  const { handleLogout, loggedInUser } = useAuth();

  return (
    <div className="flex items-center justify-start gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          {getInitials(loggedInUser?.full_name || "")}
        </AvatarFallback>
      </Avatar>
      <p className="text-black cursor-pointer text-xs">
        {loggedInUser?.email || ""}
      </p>
      <Button
        className="h-fit w-fit bg-red hover:bg-rose-900 flex items-center justify-center"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="white"
          viewBox="0 0 256 256"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M124,216a12,12,0,0,1-12,12H48a12,12,0,0,1-12-12V40A12,12,0,0,1,48,28h64a12,12,0,0,1,0,24H60V204h52A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"></path>
        </svg>
      </Button>
    </div>
  );
};

export default Footer;
