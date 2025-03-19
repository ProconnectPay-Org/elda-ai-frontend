const getPageFromUrl = (url: string | null) => {
  if (!url) return null;
  try {
    return new URL(url, window.location.origin).searchParams.get("page");
  } catch (error) {
    console.error("Error parsing page URL:", error);
    return null;
  }
};

const usePagination = (
  allCandidates: any,
  currentTab: string,
  searchParam: string,
  setSearchParams: (params: Record<string, string>) => void
) => {
  const handleNextPage = () => {
    const nextPage = getPageFromUrl(allCandidates?.next);
    if (nextPage) {
      setSearchParams({
        [searchParam]: currentTab === searchParam ? "true" : "false",
        page: nextPage,
      });
    }
  };

  const handlePreviousPage = () => {
    const previousPage = getPageFromUrl(allCandidates?.previous) || "1";
    setSearchParams({
      [searchParam]: currentTab === searchParam ? "true" : "false",
      page: previousPage,
    });
  };

  return { handleNextPage, handlePreviousPage };
};

export default usePagination;
