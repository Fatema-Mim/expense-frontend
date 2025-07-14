"use client";
import { FaTimes } from "react-icons/fa";

export default function ReusableFormModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Form",
  fields = [],
  formData,
  setFormData,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          {title}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm mb-1 font-medium text-gray-600">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 cursor-pointer py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 cursor-pointer py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
