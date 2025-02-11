// hooks/useStaffDetails.ts
import { useEffect, useState } from "react";
import { Staff } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getStaffDetails } from "@/lib/actions/staff.actions";
import { useSearchParams } from "react-router-dom";

const useStaffDetails = () => {
  const [searchParams] = useSearchParams();
  const [loggedInStaff, setLoggedInStaff] = useState<Staff | null>(null);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading: isStaffLoading } = useQuery({
    queryKey: ["staffDetails", page],
    queryFn: async () => {
      return page ? getStaffDetails(page) : getStaffDetails();
    },
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    if (data) {
      setLoggedInStaff(data);
    }
  }, [data]);

  return {
    loggedInStaff,
    isStaffLoading,
  };
};

export default useStaffDetails;
