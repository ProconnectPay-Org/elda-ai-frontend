// hooks/useStaffDetails.ts
import { useEffect, useState } from "react";
import { Staff } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getStaffDetails } from "@/lib/actions/staff.actions";

const useStaffDetails = () => {
  const [loggedInStaff, setLoggedInStaff] = useState<Staff | null>(null);

  const { data, isLoading: isStaffLoading } = useQuery({
    queryKey: ["staffDetails"],
    queryFn: getStaffDetails,
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
