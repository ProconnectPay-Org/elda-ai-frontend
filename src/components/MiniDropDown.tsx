import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useState } from "react";
import {
  toggleSchoolApplicationStatus,
  toggleSchoolApplicationStatus2,
  toggleSchoolApplicationStatus2Back,
  toggleSchoolApplicationStatusBack,
} from "@/lib/actions/user.actions";
import { toast } from "./ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const MiniDropDown = ({
  open,
  onOpenChange,
  id,
  schoolAppliedTo,
  onClose,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
  schoolAppliedTo: "School1" | "School2";
  onClose: () => void;
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const isAnalyst = Cookies.get("user_role") === "analyst";
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const response =
        schoolAppliedTo === "School1"
          ? await toggleSchoolApplicationStatus(id)
          : await toggleSchoolApplicationStatus2(id);

      if (response) {
        toast({
          description: `${schoolAppliedTo} Application has been completed.`,
          title: "Marked as completed.",
          variant: "success",
        });

        await queryClient.invalidateQueries({
          queryKey: ["allTableCandidates"],
        });
        await queryClient.refetchQueries({ queryKey: ["allTableCandidates"] });
        await queryClient.invalidateQueries({
          queryKey: ["staffDetails"],
        });
        await queryClient.refetchQueries({ queryKey: ["staffDetails"] });
      }
    } catch (error) {
      console.error("Error marking as completed:", error);
      toast({
        title: "Something went wrong.",
        description: "Failed to mark as completed.",
        variant: "destructive",
      });
    } finally {
      setSubmitLoading(false);
      // Give time for UI update before closing dropdown
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  const handleRemove = async () => {
    setRemoveLoading(true);
    try {
      const response =
        schoolAppliedTo === "School1"
          ? await toggleSchoolApplicationStatusBack(id)
          : await toggleSchoolApplicationStatus2Back(id);

      if (response) {
        toast({
          title: "Application marked as pending.",
          variant: "success",
        });

        await queryClient.invalidateQueries({
          queryKey: ["allTableCandidates"],
        });
        await queryClient.refetchQueries({ queryKey: ["allTableCandidates"] });
        await queryClient.invalidateQueries({
          queryKey: ["staffDetails"],
        });
        await queryClient.refetchQueries({ queryKey: ["staffDetails"] });
      }
    } catch (error) {
      console.error("Error marking as pending:", error);
      toast({
        title: "Something went wrong.",
        description: "Failed to mark as pending.",
        variant: "destructive",
      });
    } finally {
      setRemoveLoading(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <span />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleRemove}
          disabled={isAnalyst || removeLoading || submitLoading}
          className="bg-orange text-white cursor-pointer"
        >
          {removeLoading ? "Marking..." : "Mark as Pending"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSubmit}
          disabled={isAnalyst || submitLoading || removeLoading}
          className="bg-green-400 text-white cursor-pointer"
        >
          {submitLoading ? "Marking..." : "Mark as Completed"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MiniDropDown;
