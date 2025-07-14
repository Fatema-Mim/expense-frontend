"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import RecentTransactions from "@/components/RecentTransactions";
import FinancePieChart from "@/components/FinancePieChart";
import Last60DaysIncome from "@/components/Last60DaysIncome";
import BarChartCard from "@/components/BarChartCard";
import Last30DaysExpense from "@/components/Last30DaysExpense";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");  
    const name = localStorage.getItem("fullname");
    setFullname(name || "User");

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome back, {fullname}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Balance" amount={data.totalBalance} />
        <Card title="Total Income" amount={data.totalIncome} />
        <Card title="Total Expense" amount={data.totalExpense} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentTransactions transactions={data.recentTransactions} />
        <FinancePieChart
          balance={data.totalBalance}
          income={data.totalIncome}
          expense={data.totalExpense}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Last60DaysIncome transactions={data.last60DaysIncome.transactions} />
        <BarChartCard
          title="Last 60 Days Income"
          data={data.last60DaysIncome.transactions.map((tx) => ({
            ...tx,
            label: tx.source,
          }))}
          color="#10B981"
          labelKey="label"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Last30DaysExpense transactions={data.last30DaysExpense.transactions} />

        <BarChartCard
          title="Last 30 Days Expense Chart"
          data={data.last30DaysExpense.transactions.map((tx) => ({
            ...tx,
            label: tx.category,
          }))}
          color="#EF4444"
          labelKey="label"
        />
      </div>
    </div>
  );
}
