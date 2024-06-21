import DottedBox from "@/components/DottedBox";
import RootLayout from "@/layouts/RootLayout";
import Documents from "../../assets/documents.png";

const Dashboard = () => {
  return (
    <RootLayout title="Dashboard">
      <p className="text-[#DB251A] font-bold text-2xl">Hello, what document do you want to create today?</p>
      <div className="flex gap-8 my-12">
        <DottedBox href="/dashboard/new-resume" docType="Build a new resume" icon={Documents} />
        <DottedBox href="/dashboard/draft-statement-of-purpose" docType="Draft Statement of Purpose" icon={Documents} />
      </div>
    </RootLayout>
  );
};

export default Dashboard;
