import { FaArrowUp, FaMoneyBillWave } from "react-icons/fa";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";

dayjs.extend(advancedFormat);

export default function Last60DaysIncome({ transactions }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Last 60 Days Income
        </h2>
        <Link
          href="/income"
          className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
        >
          See All →
        </Link>
      </div>

      <ul className="space-y-3">
        {transactions.length === 0 && (
          <p className="text-gray-500 text-sm">No income records.</p>
        )}

        {transactions.map((tx) => (
          <li
            key={tx._id}
            className="bg-gray-50 rounded-xl p-3 flex items-center justify-between hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full text-xl text-green-600">
                <FaMoneyBillWave />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">
                  {tx.source}
                </div>
                <div className="text-xs text-gray-500">
                  {dayjs(tx.date).format("Do MMM YYYY")}
                </div>
              </div>
            </div>

            <div className="text-sm font-semibold text-green-600 flex items-center gap-1">
              <FaArrowUp />
              +${tx.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
