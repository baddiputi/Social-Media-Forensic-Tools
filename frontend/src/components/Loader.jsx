import React from "react";
import { motion } from "framer-motion";

function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin mb-3"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <span className="text-blue-600 font-semibold text-lg animate-pulse">{text}</span>
    </div>
  );
}

export default Loader;
