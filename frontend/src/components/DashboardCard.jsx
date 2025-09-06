import React from "react";

function DashboardCard({ title, value, icon, color, onClick }) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl shadow-lg ${colorClasses[color]} text-white hover:opacity-90 transition`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-3xl font-bold">{value}</span>
      </div>
      <p className="mt-2">{title}</p>
    </div>
  );
}

export default DashboardCard;
