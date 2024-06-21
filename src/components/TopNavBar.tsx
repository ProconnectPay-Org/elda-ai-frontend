// import DropDownMenuBar from "./DropDownMenu";
// import { Avatar, AvatarFallback } from "./ui/avatar";

const TopNavBar = ({ title }: { title?: string }) => {
  return (
    <div className="min-w-full p-8 border-b flex justify-between items-center border-b-gray h-[80px]">
      <p className="font-normal text-2xl">{title}</p>
      {/* <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>
        <DropDownMenuBar />
      </div> */}
    </div>
  );
};

export default TopNavBar;
