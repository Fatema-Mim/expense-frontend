"use client";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ReusableFormModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Form",
  fields = [],
  formData,
  setFormData,
}) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetFields = () => {
    const cleared = {};
    fields.forEach((field) => {
      cleared[field.name] = "";
    });
    setFormData(cleared);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await onSubmit(e);
      if (result !== false) {
        resetFields();    
        onClose();        
      }
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          disabled={loading}
          className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-red-500 text-lg"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm mb-1 font-medium text-gray-600">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder={field.placeholder}
                required
                disabled={loading}
              />
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded bg-gray-200 hover:bg-gray-300 text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded text-sm text-white cursor-pointer ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
