import RootLayout from "@/layouts/RootLayout";
import { SchoolForm, SchoolFormData } from "@/components/SchoolForm";
import { useQuery } from "@tanstack/react-query";
import {
  createCandidateSchoolDetails,
  getCandidateSchoolDetails,
  updateCandidateSchoolDetails,
} from "@/lib/actions/user.actions";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function SchoolOne() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);

  if (!id) {
    console.error("No ID provided");
    return;
  }

  const { data } = useQuery({
    queryKey: ["candidatesSchoolDetails"],
    queryFn: () => getCandidateSchoolDetails(id),
  });

  const schoolOneData = data?.find((entry: any) => entry.school_number === "1");

  const school_one_id = schoolOneData?.id;

  const handleSubmit = async (formData: SchoolFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        school_number: "1",
        application_fee_amount: formData.applicationFeeAmount,
        application_deadline: formData.applicationDeadline,
        date_application_submitted: formData.applicationSubmitted,
        application_fee: formData.applicationFee,
        school_application_url: formData.schoolApplicationUrl,
        session_timeline_for_admission: formData.sessionTimeline,
      };

      if (schoolOneData) {
        await updateCandidateSchoolDetails(id, school_one_id, payload);
        toast({
          title: "Success",
          description: "School One Details Updated Successfully",
          variant: "success",
        });
      } else {
        await createCandidateSchoolDetails(id, payload);
        toast({
          title: "Success",
          description: "School One Details Updated Successfully",
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RootLayout title="Dashboard">
      <div className=" mx-auto mt-4">
        <h2 className="text-2xl font-semibold mb-4">
          Extra Details for School One
        </h2>
        <SchoolForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          initialValues={schoolOneData || {}}
        />
      </div>
    </RootLayout>
  );
}
