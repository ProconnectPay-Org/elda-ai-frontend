import { SchoolForm, SchoolFormData } from '@/components/SchoolForm'
import RootLayout from '@/layouts/RootLayout'

export default function SchoolTwo() {
    const handleSubmit = (data: SchoolFormData) => {
        console.log(data);
        // Handle form submission
      };
  return (
    <RootLayout title="Dashboard">
      <div className=" mx-auto mt-4">
        <h2 className="text-2xl font-semibold mb-4">
          Extra Details for School Two
        </h2>
        <SchoolForm onSubmit={handleSubmit} />
      </div>
    </RootLayout>
  );
}
