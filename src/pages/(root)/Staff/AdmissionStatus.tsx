import RootLayout from "@/layouts/RootLayout";
import AdmissionComponent from "@/components/AdmissionComponent";
import { useParams } from "react-router-dom";

export default function AdmissionStatus() {
  const { id } = useParams<{ id: string }>();
  return (
    <RootLayout title="Dashboard">
      <AdmissionComponent id={id!} />
    </RootLayout>
  );
}
