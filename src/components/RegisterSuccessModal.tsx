import React from "react";

type SuccessModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const RegisterSuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Form Submitted Successfully!
        </h2>
        <p className="text-gray-text">
          Your form has been submitted. We will review the documents and get
          back to you.
        </p>
        <p>
          Meanwhile you can check out your status{" "}
          <a target="_blank" href="/candidate-status" className="underline text-blue-400">
            here
          </a>
        </p>
        <button
          className="mt-6 px-6 py-2 bg-red text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccessModal;
