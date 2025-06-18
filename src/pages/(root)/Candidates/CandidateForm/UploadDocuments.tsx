import { Step5FormData } from "@/types";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getErrorMessage } from "@/lib/utils";
import UploadCloud from "@/assets/upload-cloud.png";
import FileIcon from "@/assets/icon-file.png";
import { useQuery } from "@tanstack/react-query";
import {
  fetchVerificationDocument,
  submitDocuments,
} from "@/lib/actions/candidate.actions";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "@/components/ui/use-toast";
import { AxiosProgressEvent } from "axios";

type UploadState = {
  progress: number;
  uploaded: boolean;
  error: string | null;
  uploading: boolean;
  file?: File;
};

const UploadDocuments: React.FC = () => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<Step5FormData>();

  const [uploadStates, setUploadStates] = useState<{
    [key: number]: UploadState;
  }>({});
  const [isUploaded, setIsUploaded] = useState<boolean[]>(
    Array(13).fill(false)
  );
  const verificationDocumentsId = Cookies.get("verification_document_id");
  const candidate_id = Cookies.get("candidate_id");

  const labels = [
    "bsc_hnd_certificate",
    "bank_statement",
    "intl_passport",
    "first_degree_transcript",
    "current_cv",
    "nin_slip",
    "post_graduate_certificate",
    "post_graduate_transcript",
    "utility_bill",
    "admission_letter",
    "gre_document",
    "change_of_name",
    "passport_photograph",
    "waec",
    "recommendation_letter",
  ];

  const beLabels = [
    "BSc or HND Certificate",
    "Bank statement",
    "Intl passport",
    "First degree transcript",
    "Current CV",
    "NIN slip",
    "Post graduate certificate",
    "Post graduate transcript",
    "Utility bill",
    "Letter of admission",
    "GRE or GMAT result",
    "Change of name document",
    "Passport Photograph",
    "WAEC/NECO Result",
    // "Recommendation letter",
    "Academic Recommendation Letter",
    "Professional Recommendation Letter",
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["verificationDocumentsDatas", candidate_id],
    queryFn: fetchVerificationDocument,
    staleTime: 5 * 1000 * 60,
    enabled: !!verificationDocumentsId,
  });

  useEffect(() => {
    if (data) {
      const updatedIsUploaded = labels.map((label) => !!data[label]);
      setIsUploaded(updatedIsUploaded);
    }
  }, [data]);

  const handleFileChange = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file instanceof File) {
      // Reset upload state for this file
      setUploadStates((prev) => ({
        ...prev,
        [index]: {
          progress: 0,
          uploaded: false,
          error: null,
          uploading: true, // Set uploading to true immediately
          file,
        },
      }));

      // Set the value in form state
      setValue(`document${index + 1}` as `document${number}`, file);

      // Upload the document
      await uploadDocument(file, index);
    } else {
      console.error("Input not instance of File");
    }
  };

  const uploadDocument = (file: File, index: number) => {
    if (!candidate_id) {
      console.error("Candidate ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("candidate", candidate_id);
    formData.append(labels[index], file); // Append the specific document label

    // Use the submitDocuments function with progress tracking
    submitDocuments(formData, (progressEvent: AxiosProgressEvent) => {
      if (progressEvent.lengthComputable && progressEvent.total !== undefined) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setUploadStates((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            progress, // Update progress state
            uploading: true, // Mark as uploading
          },
        }));
      }
    })
      .then(() => {
        // Success handling
        setUploadStates((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            uploaded: true, // Mark this file as uploaded
            uploading: false, // Mark uploading as false
          },
        }));
        setIsUploaded((prev) => {
          const newState = [...prev];
          newState[index] = true; // Mark this file as uploaded
          return newState;
        });
        toast({
          title: "Success",
          description: `${beLabels[index]} uploaded successfully.`,
          variant: "success",
        });
      })
      .catch((error) => {
        console.error("Error uploading document:", error);
        setUploadStates((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            error: "Failed to upload document.", // Set error message
            uploading: false, // Mark uploading as false
          },
        }));
        toast({
          title: "Error",
          description: "Failed to upload document. Please try again.",
          variant: "destructive",
        });
      });
  };

  const cancelUpload = (index: number) => {
    setUploadStates((prev) => ({
      ...prev,
      [index]: {
        progress: 0,
        uploading: false,
        file: undefined,
        uploaded: false,
        error: null,
      } as UploadState,
    }));

    setIsUploaded((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });

    setValue(`document${index + 1}` as `document${number}`, undefined);
  };

  const useAnotherFile = (index: number) => {
    cancelUpload(index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
      {isLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-xl flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      )}
      {Array.from({ length: 13 }, (_, i) => (
        <div key={i} className="mb-4">
          <label className="block text-sm capitalize font-medium text-gray-700">
            Upload {i + 1} - {beLabels[i] || `Other Document ${i - 1}`}
          </label>

          {uploadStates[i]?.uploaded || isUploaded[i] ? (
            <>
              <div className="mt-1 w-full p-4 border border-gray-border rounded-md shadow-sm bg-white text-gray-text flex gap-4 items-center">
                <img src={FileIcon} alt="file icon" />
                <div className="flex flex-col gap-2 w-full">
                  <span className="truncate max-w-48 lg:max-w-60">
                    {uploadStates[i]?.file?.name ||
                      data[labels[i]]?.split("/").pop()?.split("?")[0]}
                  </span>
                  <div className="bg-red h-2.5 rounded-full">
                    <div
                      className="bg-red h-2.5 rounded-full"
                      style={{ width: `${uploadStates[i]?.progress || 0}%` }} // Set width based on progress
                    />
                  </div>
                </div>
              </div>
              <button
                className="text-sm underline text-blue-500"
                onClick={() => useAnotherFile(i)}
                type="button"
              >
                Use another file
              </button>
              {errors[`document${i + 1}` as `document${number}`] && (
                <p className="mt-2 text-red text-sm">
                  {getErrorMessage(
                    errors[`document${i + 1}` as `document${number}`]
                  )}
                </p>
              )}
            </>
          ) : (
            <div className="flex items-center relative gap-x-10 h-11 justify-end border border-gray-border bg-white rounded-md py-2 px-4 mt-1 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <div className="absolute w-full h-full opacity-0 cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(i, e)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-center w-full">
                {uploadStates[i]?.uploading && (
                  <Loader2 className="animate-spin" />
                )}
              </div>
              <img
                src={UploadCloud}
                alt="upload cloud"
                className="block float-end"
              />
            </div>
          )}
          <i className="text-sm text-blue-500 float-end">Max 5mb</i>
        </div>
      ))}
    </div>
  );
};

export default UploadDocuments;
