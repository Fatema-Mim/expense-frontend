"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FinancePieChart({ balance, income, expense }) {
  const data = [
    { name: "Total Balance", value: balance },
    { name: "Total Income", value: income },
    { name: "Total Expense", value: expense },
  ];

  const COLORS = ["#7C3AED", "#F97316", "#EF4444"]; // purple, orange, red

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
           
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
