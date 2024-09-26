import { Step5FormData } from "@/types";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getErrorMessage } from "@/lib/utils";
import UploadCloud from "@/assets/upload-cloud.png";
import FileIcon from "@/assets/icon-file.png";

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

  const labels = [
    "BSC or HND certificate",
    "Bank statement of 1k USD",
    "Int'l Passport",
    "First Degree Transcript",
    "Current CV",
    "NIN Slip",
    "Upload utility bill with house address",
    "Post-Graduate Transcript",
    "Post-Graduate Certificate",
  ];

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file instanceof File) {
      setUploadStates((prev) => ({
        ...prev,
        [index]: {
          progress: 0,
          uploaded: false,
          error: null,
          uploading: true,
          file,
        },
      }));
      setValue(`document${index + 1}` as `document${number}`, file);
      startUpload(index);
    } else {
      console.error("Input not instance of File");
    }
  };

  const startUpload = (index: number) => {
    // Simulate file upload progress
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        setUploadStates((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            progress: 100,
            uploaded: true,
            uploading: false,
          },
        }));
      } else {
        progress += 10;
        setUploadStates((prev) => ({
          ...prev,
          [index]: { ...prev[index], progress },
        }));
      }
    }, 200);
  };

  const cancelUpload = (index: number) => {
    setUploadStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        progress: 0,
        uploading: false,
        file: undefined,
        uploaded: false,
      },
    }));
    setValue(`document${index + 1}` as `document${number}`, undefined);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload {i + 1}
          </label>

          {uploadStates[i]?.uploaded ? (
            <>
              <div className="mt-1 w-full p-4 border border-gray-border rounded-md shadow-sm bg-white text-gray-text flex gap-4 items-center">
                <img src={FileIcon} alt="file icon" />
                <div className="flex flex-col gap-8 w-full">
                  {uploadStates[i]?.file?.name} ({uploadStates[i]?.progress}%)
                  <div
                    className="bg-red h-2.5 rounded-full"
                    style={{ width: `${uploadStates[i].progress}%` }}
                  ></div>
                </div>
              </div>
              {errors[`document${i + 1}` as `document${number}`] && (
                <p className="mt-2 text-red text-sm">
                  {getErrorMessage(
                    errors[`document${i + 1}` as `document${number}`]
                  )}
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center relative gap-x-10 h-11 justify-end border border-gray-border bg-white rounded-md py-2 px-4 mt-1 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <div className="absolute w-[full] h-[full] opacity-0">
                  <input type="file" onChange={(e) => handleFileChange(i, e)} />
                </div>
                <img
                  src={UploadCloud}
                  alt="upload cloud"
                  className="block float-end"
                />
              </div>
              {uploadStates[i]?.uploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-red h-2.5 rounded-full"
                      style={{ width: `${uploadStates[i].progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="mt-1 text-sm text-gray-700">
                      {uploadStates[i].progress}% uploaded
                    </p>
                    <button
                      type="button"
                      className="mt-1 text-sm text-red-600 underline"
                      onClick={() => cancelUpload(i)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {errors[`document${i + 1}` as `document${number}`] && (
                <p className="mt-2 text-red text-sm">
                  {getErrorMessage(
                    errors[`document${i + 1}` as `document${number}`]
                  )}
                </p>
              )}
            </>
          )}
          <p className="text-xs text-gray-text mt-1">
            {labels[i] || `Other Document ${i - 1}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UploadDocuments;
