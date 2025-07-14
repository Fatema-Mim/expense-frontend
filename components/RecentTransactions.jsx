import { FaArrowDown, FaArrowUp, FaMoneyCheckAlt } from "react-icons/fa";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";

dayjs.extend(advancedFormat);

export default function RecentTransactions({ transactions }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h2>
        <Link
          href="/transactions"
          className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
        >
          See All <span>→</span>
        </Link>
      </div>

      <ul className="space-y-3">
        {transactions.slice(0, 5).map((tx) => (
          <li
            key={tx._id}
            className="bg-gray-50 rounded-xl p-3 flex items-center justify-between hover:bg-gray-100 transition"
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
              {tx.type === "income" ? <FaArrowUp /> : <FaArrowDown />}
              {tx.type === "income" ? "+" : "-"}${tx.amount}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
