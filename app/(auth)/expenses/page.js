"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  FaMoneyBillWave,
  FaArrowDown,
  FaPlus,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import ReusableFormModal from "@/components/ReusableFormModal";
import ConfirmModal from "@/components/ConfirmModal";

export default function Expenses() {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const expenseFields = [
    { name: "category", label: "Category", type: "text", placeholder: "e.g. Rent" },
    { name: "amount", label: "Amount", type: "number", placeholder: "e.g. 300" },
    { name: "date", label: "Date", type: "date", placeholder: "" },
  ];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/v1/expense/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenseData(res.data);
    } catch (err) {
      setError("Failed to fetch expense");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/v1/expense/add", newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModalOpen(false);
      fetchExpenses();
    } catch (err) {
      alert("Failed to add expense");
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/v1/expense/${expenseToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (err) {
      alert("Failed to delete expense");
    } finally {
      setExpenseToDelete(null);
    }
  };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/v1/expense/downloadexcel", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense-data.xlsx");
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
        <h1 className="text-2xl font-bold text-gray-800">Expense Overview</h1>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="flex cursor-pointer items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 text-sm"
          >
            <FaDownload /> Download Excel
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center cursor-pointer gap-2 bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 text-sm"
          >
            <FaPlus /> Add Expense
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {expenseData.length === 0 && !loading && (
        <p className="text-sm text-gray-500">No expense data found.</p>
      )}

      <ul className="space-y-4">
        {expenseData.map((item) => (
          <li
            key={item._id}
            className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm hover:bg-gray-50"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-red-100 text-red-600 p-3 rounded-full text-lg">
                <FaMoneyBillWave />
              </div>
              <div>
                <div className="text-sm font-semibold">{item.category}</div>
                <div className="text-xs text-gray-500">
                  {dayjs(item.date).format("Do MMM YYYY")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-red-600 font-bold flex items-center gap-1">
                <FaArrowDown /> ${item.amount}
              </div>
              <button
                onClick={() => {
                  setExpenseToDelete(item._id);
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

      {modalOpen && (
        <ReusableFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddExpense}
          title="Add New Expense"
          fields={expenseFields}
          formData={newExpense}
          setFormData={setNewExpense}
        />
      )}

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this expense entry? This action cannot be undone."
      />
    </div>
  );
}
