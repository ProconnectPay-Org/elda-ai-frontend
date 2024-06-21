import { logoutAccount } from "@/lib/actions/user.actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAccount();
    navigate("/"); // Assuming you want to redirect after logout
  };

  return (
    <div className="flex items-center justify-evenly">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-black cursor-pointer" onClick={handleLogout}>
        Log Out
      </p>
    </div>
  );
};

export default Footer;
