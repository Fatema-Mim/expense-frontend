"use client";
import dayjs from "dayjs";

export default function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white p-3 rounded shadow text-sm border border-gray-200">
      {data.source && <p className="font-medium">Source: {data.source}</p>}
      {data.category && <p className="font-medium">Category: {data.category}</p>}
      <p className="text-gray-500">Date: {dayjs(data.date).format("DD MMM YYYY")}</p>
      <p className="text-green-600 font-semibold">Amount: ${data.amount}</p>
    </div>
  );
}
