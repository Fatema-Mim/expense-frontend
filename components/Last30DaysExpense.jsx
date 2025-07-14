import { FaArrowDown, FaMoneyBillWave } from "react-icons/fa";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";

dayjs.extend(advancedFormat);

export default function Last30DaysExpense({ transactions }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Last 30 Days Expense</h2>
        <Link
          href="/expenses"
          className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
        >
          See All →
        </Link>
      </div>

      <ul className="space-y-3">
        {transactions.length === 0 && (
          <p className="text-gray-500 text-sm">No expense records.</p>
        )}

        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="bg-gray-50 rounded-xl p-3 flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full text-xl text-red-600">
                <FaMoneyBillWave />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">
                  {tx.category}
                </div>
                <div className="text-xs text-gray-500">
                  {dayjs(tx.date).format("Do MMM YYYY")}
                </div>
              </div>
            </div>

            <div className="text-sm font-semibold text-red-500 flex items-center gap-1">
              <FaArrowDown />
              -${tx.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
