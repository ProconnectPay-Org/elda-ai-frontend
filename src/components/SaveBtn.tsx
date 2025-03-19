import { Loader2 } from "lucide-react";

const SaveBtn = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      {text} <Loader2 className="animate-spin" />
    </div>
  );
};

export default SaveBtn;
