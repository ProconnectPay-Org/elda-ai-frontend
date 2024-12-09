import { copyToClipboard } from "@/lib/utils";
import React from "react";
import { useToast } from "./ui/use-toast";
import { CopyIcon } from "lucide-react";

interface CopyTextProps {
  label: string;
  text: string | null | undefined;
  className?: string;
}

const CopyText: React.FC<CopyTextProps> = ({ label, text, className }) => {
  const { toast } = useToast();
  return (
    <div className="flex flex-row gap-2">
      <label className={`font-semibold ${className}`}>{label} :</label>
      <div className="flex gap-2">
        <p className="capitalize flex items-center gap-2">
          {text || "No information provided"}
        </p>
        <button
          onClick={() => copyToClipboard(text || "", toast)}
          title="Copy to clipboard"
        >
          <CopyIcon size={16} cursor="pointer" />
        </button>
      </div>
    </div>
  );
};

export default CopyText;
