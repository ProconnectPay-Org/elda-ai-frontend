const Pagination = ({
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  hasNext,
  hasPrevious,
}: {
  page: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={handlePreviousPage}
        disabled={!hasPrevious}
        className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={!hasNext}
        className="px-4 py-2 bg-red text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
