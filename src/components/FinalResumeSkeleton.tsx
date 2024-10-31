import { Skeleton } from "@/components/ui/skeleton";

const FinalResumeSkeleton = () => {
  return (
    <>
      <div className="border md:min-w-[484px] space-y-5 pb-5 max-w-[600px] mx-auto min-h-svh rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-[#F1F8F9] p-5 w-full flex flex-col items-center gap-3">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center flex-wrap justify-center gap-3">
            <div className="flex flex-col items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20 mt-1" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20 mt-1" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20 mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Career Strategic Purpose */}
        <div className="space-y-2 px-5 w-full">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Biodata */}
        <div className="space-y-2 px-5 w-full">
          <Skeleton className="h-6 w-48" />
          <div className="flex flex-col gap-2">
            <div className="flex">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
            <div className="flex">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
            <div className="flex">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
            <div className="flex">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
            <div className="flex">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="space-y-2 px-5 w-full">
          <Skeleton className="h-6 w-48" />
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="h-4 w-60" />
              <div className="flex gap-3 items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-2 px-5 w-full">
          <Skeleton className="h-6 w-48" />
          {[...Array(2)].map((_, idx) => (
            <div key={idx}>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </div>

        {/* References */}
        <div className="px-5 w-full">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="mt-5 md:mt-8 w-full flex items-center justify-end">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </>
  );
};

export default FinalResumeSkeleton;
