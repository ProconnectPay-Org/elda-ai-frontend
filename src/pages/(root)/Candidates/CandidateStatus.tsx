import CandidateLayout from "@/layouts/CandidateLayout";

const CandidateStatus = () => {
  return (
    <CandidateLayout>
      <section className="md:w-[880px] mx-auto space-y-10">
        <h1 className="font-bold text-4xl">Welcome, Grace</h1>

        <div className="h-[80px] rounded-2xl w-full p-5 bg-gradient-to-r from-red to-[#919293] flex items-center">
          <p className="text-white font-medium text-2xl">Not Completed</p>
        </div>

        <div>

        </div>

      </section>
    </CandidateLayout>
  );
};

export default CandidateStatus;
