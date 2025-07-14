// components/ConfirmModal.jsx
import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
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
          >
            Cancel
          </button>
          <button
            className="px-4 cursor-pointer py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
