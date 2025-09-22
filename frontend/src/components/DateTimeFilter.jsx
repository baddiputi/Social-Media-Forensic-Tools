import React from "react";

function DateTimeFilter({ from, to, onFromChange, onToChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="flex flex-col">
        <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
        <input
          type="datetime-local"
          value={from}
          onChange={e => onFromChange(e.target.value)}
          className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
        <input
          type="datetime-local"
          value={to}
          onChange={e => onToChange(e.target.value)}
          className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
      </div>
    </div>
  );
}

export default DateTimeFilter;
