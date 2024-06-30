import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const DropDownMenuBar = () => {
  const { handleLogout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative top-4 right-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuBar;
