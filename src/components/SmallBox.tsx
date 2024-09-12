import { SmallBoxProps } from "@/types";

const SmallBox = ({name, number, icon}: SmallBoxProps) => {
  return (
    <div className="flex items-center w-full md:w-fit justify-between gap-6 bg-gray py-6 px-4 rounded-lg">
      <div>
        <p className="text-gray-text">{name}</p>
        <p className="text-black-text text-[28px] font-semibold">{number}</p>
      </div>
      <div>
        <img src={icon} alt="icon" />
      </div>
    </div>
  );
};

export default SmallBox;
