import React from "react";
import { motion } from "framer-motion";

const colorGradients = {
  blue: "from-blue-400 via-blue-500 to-blue-600",
  green: "from-green-400 via-emerald-400 to-teal-400",
  yellow: "from-yellow-300 via-yellow-400 to-yellow-500",
  red: "from-pink-500 via-red-500 to-red-600",
};

function DashboardCard({ title, value, icon, color, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-3xl shadow-2xl bg-gradient-to-br ${colorGradients[color]} text-white transition-all duration-200 border border-white/30 backdrop-blur-lg hover:shadow-2xl hover:brightness-105`}
      style={{ minHeight: 140, position: 'relative', overflow: 'hidden' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-4xl drop-shadow-lg">{icon}</span>
        <span className="text-4xl font-extrabold tracking-tight drop-shadow-lg">{value}</span>
      </div>
      <p className="mt-4 text-lg font-semibold tracking-wide drop-shadow-sm">{title}</p>
      {/* Glass shine effect */}
      <span className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-3xl bg-white/10 backdrop-blur-sm" style={{ mixBlendMode: 'overlay', opacity: 0.15 }} />
    </motion.div>
  );
}

export default DashboardCard;
