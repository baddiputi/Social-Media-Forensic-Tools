import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Notification({ show, type = "info", message, onClose }) {
  const colors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500 text-gray-900",
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-semibold ${colors[type]} flex items-center gap-3`}
        >
          <span>{message}</span>
          <button onClick={onClose} className="ml-2 text-white/80 hover:text-white text-lg">&times;</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;
