const SmallComponent = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col md:flex-row justify-start md:justify-between w-full md:items-center">
      <p className="w-full md:w-[350px] font-medium text-sm">{label}</p>
      <div className="border border-x-gray-text rounded-md p-2 w-full md:w-[320px]">
        <p className="text-[#323232] text-sm">{value}</p>
      </div>
    </div>
  );
};

export default SmallComponent;
