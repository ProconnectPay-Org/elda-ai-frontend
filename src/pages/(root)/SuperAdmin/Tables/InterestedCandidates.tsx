import { DataTable } from "@/components/DataTable";
import { InterestedCandidatesProps } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteInterestedCandidate,
  getAllInterestedCandidates,
} from "@/lib/actions/user.actions";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import AdminLayout from "@/layouts/AdminLayout";
import { interestedColumns } from "@/components/InterestedColumns";

const InterestedCandidates = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCSVLoading, setIsCSVLoading] = useState(false);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 50;

  const queryClient = useQueryClient();

  const {
    data: allCandidates,
    error: allCandidatesError,
    isLoading: allCandidatesLoading,
  } = useQuery({
    queryKey: ["allInterestedCandidates", page],
    queryFn: async () => {
      return getAllInterestedCandidates(page);
    },
    staleTime: 5 * 1000 * 60,
  });

  const deleteCandidateMutation = useMutation({
    mutationFn: deleteInterestedCandidate,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Candidate deleted successfully.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["allInterestedCandidates"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete candidate. Please try again.",
      });
    },
  });

  const handleDeleteCandidate = async (email: string, fullName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${fullName}'s account?`
    );
    if (confirmed) {
      deleteCandidateMutation.mutate(email);
    }
  };

  const handleNextPage = () => {
    if (allCandidates?.next) {
      const nextPage = new URL(allCandidates.next).searchParams.get("page");
      if (nextPage)
        setSearchParams({
          page: nextPage,
        });
    }
  };

  const handlePreviousPage = () => {
    if (allCandidates?.previous) {
      const previousUrl = new URL(allCandidates.previous);
      const previousPage = previousUrl.searchParams.get("page") || "1";
      setSearchParams({
        page: previousPage,
      });
    } else {
      setSearchParams({ page: "1" });
    }
  };

  useEffect(() => {
    if (allCandidates?.next) {
      const nextPage = parseInt(
        new URL(allCandidates.next).searchParams.get("page") || "1",
        10
      );
      queryClient.prefetchQuery({
        queryKey: ["allInterestedCandidates", nextPage],
        queryFn: () => getAllInterestedCandidates(nextPage),
      });
    }
  }, [page, allCandidates, queryClient]);

  const totalCandidates = allCandidates?.count || 0;
  const totalPages = Math.ceil(totalCandidates / pageSize);
  const startingIndex = (page - 1) * pageSize;

  const tableData: InterestedCandidatesProps[] =
    allCandidates?.results.map(
      (candidate: InterestedCandidatesProps, index: number) => ({
        ...candidate,
        serialNumber: startingIndex + index + 1,
        full_name: candidate?.full_name || "No name",
        email: candidate?.email || "No email",
        phone: candidate?.phone || "No phone",
        residence_country: candidate?.residence_country || "No country",
        country_interested_in: candidate?.country_interested_in || "No country",
        enquiries: candidate?.enquiries || "No enquiries",
        product: candidate?.product || "No product",
        gender: candidate?.gender || "No gender",
      })
    ) || [];

  const handleDownloadCSV = async () => {
    try {
      setIsCSVLoading(true);

      let allResults: InterestedCandidatesProps[] = [];
      let page = 1;
      let hasNext = true;

      // Fetch all pages
      while (hasNext) {
        const response = await getAllInterestedCandidates(page);
        const results = response.results.map(
          (candidate: InterestedCandidatesProps, index: number) => ({
            serialNumber: (page - 1) * pageSize + index + 1,
            full_name: candidate?.full_name || "No name",
            email: candidate?.email || "No email",
            phone: candidate?.phone || "No phone",
            residence_country: candidate?.residence_country || "No country",
            country_interested_in:
              candidate?.country_interested_in || "No country",
            enquiries: candidate?.enquiries || "No enquiries",
            product: candidate?.product || "No product",
            gender: candidate?.gender || "No gender",
          })
        );

        allResults = [...allResults, ...results];

        hasNext = !!response.next;
        page++;
      }

      // Convert to CSV
      const headers = Object.keys(allResults[0]);
      const csvRows = [
        headers.join(","), // header row
        ...allResults.map((row) =>
          headers.map((field) => `"${(row as any)[field] ?? ""}"`).join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Download CSV
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "interested_candidates.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV Download Error:", error);
      alert("Failed to download CSV");
    } finally {
      setIsCSVLoading(false);
    }
  };

  if (allCandidatesError) return <p>Error: {allCandidatesError.message}</p>;

  return (
    <AdminLayout>
      <div className="w-full relative">
        <div className="w-fit absolute left-0 mb-2 px-4 mt-4">
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 text-sm flex items-center gap-2"
          >
            {isCSVLoading ? (
              <>
                <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Downloading...
              </>
            ) : (
              "Download CSV"
            )}
          </button>
        </div>
        {/* Display all candidates */}
        <DataTable
          columns={interestedColumns(handleDeleteCandidate)}
          data={tableData}
          isLoading={allCandidatesLoading}
        />
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={!allCandidates?.previous}
          className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!allCandidates?.next}
          className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </AdminLayout>
  );
};

export default InterestedCandidates;
