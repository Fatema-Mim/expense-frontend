"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import CustomTooltip from "./CustomTooltip";


export default function BarChartCard({ data, title, color, labelKey }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={labelKey} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            fill={color}
            radius={[6, 6, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
