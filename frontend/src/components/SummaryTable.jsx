import React from "react";

function SummaryTable({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-4">No data available</p>;
  }

  return (
    <table className="min-w-full bg-white shadow rounded overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-gray-700">Metric</th>
          <th className="px-4 py-2 text-left text-gray-700">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="px-4 py-2">{item.metric}</td>
            <td className="px-4 py-2">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SummaryTable;
