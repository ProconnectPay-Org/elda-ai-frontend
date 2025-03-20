const SmallComponent = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between w-full items-center">
      <p className="w-[350px] font-medium text-sm">{label}</p>
      <div className="border border-x-gray-text rounded-md p-2 w-[320px]">
        <p className="text-[#323232] text-sm">{value}</p>
      </div>
    </div>
  );
};

export default SmallComponent;
