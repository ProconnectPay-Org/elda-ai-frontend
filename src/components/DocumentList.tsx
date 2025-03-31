import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchVerificationDocument,
  submitDocuments,
} from "@/lib/actions/candidate.actions";
import { ChevronDown, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";
import IconProgress from "@/assets/icon-progress.svg";
import { toast } from "./ui/use-toast";

const SkeletonDocumentBox = () => {
  return (
    <div className="w-full h-[40px] flex justify-between items-center animate-pulse">
      <div className="w-2/3 h-5 bg-[#e0e0e0] rounded-md"></div>
      <div className="w-1/4 h-5 bg-[#c0c0c0] rounded-md"></div>
    </div>
  );
};

const DocumentList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<{
    [key: string]: boolean;
  }>({});

  const verificationDocumentsId = Cookies.get("verification_document_id");
  const candidate_id = Cookies.get("candidate_id");

  const queryClient = useQueryClient();

  const { data, isLoading: docsLoading } = useQuery({
    queryKey: ["verificationDocumentsDatas", candidate_id],
    queryFn: fetchVerificationDocument,
    staleTime: 5 * 60 * 1000,
    enabled: !!verificationDocumentsId,
  });

  const documents = {
    bank_statement: "Bank Statement",
    bsc_hnd_certificate: "BSc/HND Certificate",
    current_cv: "Current CV",
    first_degree_transcript: "First Degree Transcript",
    intl_passport: "International Passport",
    nin_slip: "NIN Slip",
    post_graduate_certificate: "Post-Graduate Certificate",
    post_graduate_transcript: "Post-Graduate Transcript",
    utility_bill: "Utility Bill",
    admission_letter: "Admission Letter",
    gre_document: "GRE or GMAT result",
    passport_photograph: "Passport Photograph",
    change_of_name_document: "Change of name document",
  };

  const handleFileChange = async (
    key: keyof typeof documents,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !candidate_id) return;

    setUploadingFiles((prev) => ({ ...prev, [key]: true }));

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("candidate", candidate_id);
      formData.append(key, file); // Append the respective document file

      await submitDocuments(formData, () => {}); // No need for progress tracking

      queryClient.invalidateQueries({
        queryKey: ["verificationDocumentsDatas"],
      });
      toast({
        title: "Success",
        variant: "success",
        description: `${documents[key]} uploaded successfully!`,
      });
    } catch (error) {
      toast({
        title: "Upload Error",
        variant: "destructive",
        description: `Failed to upload${documents[key]}. Try again!`,
      });
      console.error(`Error uploading ${key}:`, error);
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [key]: false }));
    }
  };

  const areAllDocumentsUploaded = Object.keys(documents).every(
    (key) => data?.[key]
  );

  return (
    <>
      <div
        className="w-full h-[60px] rounded-2xl bg-[#F5F7F9] flex justify-between items-center p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 md:gap-4">
          <p className="font-semibold text-sm md:text-2xl text-red">
            Verification Documents
          </p>
          <div className="border border-red px-2 h-6 flex items-center gap-2 rounded-md">
            <img src={IconProgress} alt="Progress Icon" />
            <p className="text-[10px] text-center text-gray-text">
              {areAllDocumentsUploaded ? "Completed" : "In Progress"}
            </p>
          </div>
        </div>
        {!isExpanded ? (
          <ChevronRight color="red" size={20} />
        ) : (
          <ChevronDown color="red" size={20} />
        )}
      </div>
      {isExpanded && (
        <div className="space-y-4 m-4">
          {docsLoading
            ? Array(13) // Render skeletons for 5 placeholders
                .fill(null)
                .map((_, index) => <SkeletonDocumentBox key={index} />)
            : Object.entries(documents).map(([key, label]) => (
                <div
                  key={key}
                  className="flex md:border-b py-3 flex-col md:flex-row md:justify-between md:items-center"
                >
                  <div className="flex">
                    <p className="md:text-lg font-semibold w-64">{label}</p>
                    {data?.[key] ? (
                      <a
                        href={data[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 text-xs md:text-sm underline text-center"
                      >
                        Uploaded
                      </a>
                    ) : (
                      <span className="text-red text-center text-xs md:text-sm">
                        Not Uploaded
                      </span>
                    )}
                  </div>

                  <div className="flex items-center relative w-fit">
                    <input
                      type="file"
                      className="hidden"
                      id={`${key}-upload`}
                      accept="*"
                      onChange={(e) =>
                        handleFileChange(key as keyof typeof documents, e)
                      }
                      disabled={uploadingFiles[key]}
                    />
                    <label
                      htmlFor={`${key}-upload`}
                      className={`inline-flex w-full font-semibold text-[14px] items-center px-4 py-2 rounded-md cursor-pointer border
                        ${
                          uploadingFiles[key]
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >
                      {uploadingFiles[key] ? (
                        <svg
                          className="animate-spin w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.817 3 7.937l3-2.646z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                      )}
                    </label>
                  </div>
                </div>
              ))}
        </div>
      )}
    </>
  );
};

export default DocumentList;
