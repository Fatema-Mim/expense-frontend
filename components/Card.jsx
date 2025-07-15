import { FaWallet, FaMoneyBillWave, FaReceipt } from "react-icons/fa";

const iconMap = {
  "Total Balance": <FaWallet className="text-purple-500" size={28} />,
  "Total Income": <FaMoneyBillWave className="text-orange-500" size={28} />,
  "Total Expense": <FaReceipt className="text-red-500" size={28} />,
  Loan: <FaWallet className="text-red-600" size={28} />, // you can choose icon/color for loan
};

export default function Card({ title, amount }) {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      {iconMap[title] || <FaWallet className="text-gray-500" size={28} />}
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-lg font-bold text-gray-800">
          ৳ {amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
