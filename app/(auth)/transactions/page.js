"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FaArrowUp, FaArrowDown, FaMoneyCheckAlt } from "react-icons/fa";
import Loading from "@/components/Loading";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/v1/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data.recentTransactions);
    } catch (err) {
      setError("Failed to fetch transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">All Transactions</h1>

      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && transactions.length === 0 && (
        <p className="text-gray-500 text-sm">No transactions found.</p>
      )}

      <ul className="space-y-3">
        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-3 rounded-full text-xl text-gray-600">
                <FaMoneyCheckAlt />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">
                  {tx.source || tx.category}
                </div>
                <div className="text-xs text-gray-500">
                  {dayjs(tx.date).format("Do MMM YYYY")}
                </div>
              </div>
            </div>

            <div
              className={`text-sm font-semibold flex items-center gap-1 ${
                tx.type === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {tx.type === "income" ? <FaArrowUp /> : <FaArrowDown />} $
              {tx.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
