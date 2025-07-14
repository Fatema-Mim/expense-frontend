"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  FaMoneyBillWave,
  FaArrowUp,
  FaPlus,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import ReusableFormModal from "@/components/ReusableFormModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function IncomePage() {
  const [incomeData, setIncomeData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [incomeToDelete, setIncomeToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newIncome, setNewIncome] = useState({
    source: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const incomeFields = [
    {
      name: "source",
      label: "Source",
      type: "text",
      placeholder: "e.g. Salary",
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      placeholder: "e.g. 1000",
    },
    { name: "date", label: "Date", type: "date", placeholder: "" },
  ];

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/v1/income/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomeData(res.data);
    } catch (err) {
      setError("Failed to fetch income");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new income
  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/v1/income/add`, newIncome, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModalOpen(false);
      fetchIncome();
    } catch (err) {
      alert("Failed to add income");
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/income/${incomeToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchIncome();
    } catch (err) {
      alert("Failed to delete income");
    } finally {
      setIncomeToDelete(null);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/income/downloadexcel`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income-data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to download Excel");
    }
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Income Overview</h1>

        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex cursor-pointer items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-sm"
          >
            <FaDownload /> Download Excel
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded hover:bg-green-200 text-sm"
          >
            <FaPlus /> Add Income
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {incomeData.length === 0 && !loading && (
        <p className="text-sm text-gray-500">No income data found.</p>
      )}

      <ul className="space-y-4">
        {incomeData.map((item) => (
          <li
            key={item._id}
            className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm hover:bg-gray-50"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-green-100 text-green-600 p-3 rounded-full text-lg">
                <FaMoneyBillWave />
              </div>
              <div>
                <div className="text-sm font-semibold">{item.source}</div>
                <div className="text-xs text-gray-500">
                  {dayjs(item.date).format("Do MMM YYYY")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-green-600 font-bold flex items-center gap-1">
                <FaArrowUp /> ${item.amount}
              </div>
              <button
                onClick={() => {
                  setIncomeToDelete(item._id);
                  setConfirmOpen(true);
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalOpen && (
        <ReusableFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddIncome}
          title="Add New Income"
          fields={incomeFields}
          formData={newIncome}
          setFormData={setNewIncome}
        />
      )}
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this income entry? This action cannot be undone."
      />
    </div>
  );
}
