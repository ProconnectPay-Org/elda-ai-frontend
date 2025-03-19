import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

const useDeleteCandidate = (
  mutationFn: (id: string) => Promise<any>, // Accept a mutation function
  queryKey: string
) => {
  const queryClient = useQueryClient();

  const deleteCandidateMutation = useMutation({
    mutationFn, // Use the passed mutation function
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Candidate deleted successfully.",
        variant: "success",
      });

      // Refetch related data after deletion
      await queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete item. Please try again.",
      });
    },
  });

  const handleDeleteCandidate = async (userId: string, fullName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${fullName}'s account?`
    );
    if (confirmed) {
      deleteCandidateMutation.mutate(userId);
    }
  };

  return { handleDeleteCandidate };
};

export default useDeleteCandidate;
