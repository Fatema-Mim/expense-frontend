"use client";

import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  loading = false, // add loading prop with default false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-md w-[90%] max-w-sm p-6 space-y-4">
        <div className="flex items-center gap-3 text-red-600">
          <FaExclamationTriangle className="text-xl" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <p className="text-gray-700 text-sm">{message}</p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            className="px-4 py-1.5 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 cursor-pointer py-1.5 rounded text-white ${
              loading ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto"
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

