import React from 'react'

export default function NoData({message = "Add your income and expenses to see your financial overview here"}) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md p-8 mx-auto max-w-md text-center">
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="gray" strokeWidth="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h8"
          stroke="gray"
          strokeWidth="2"
        />
      </svg>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Data Available
      </h2>
      <p className="text-gray-600">
        {message}
      </p>
    </div>
  )
}
