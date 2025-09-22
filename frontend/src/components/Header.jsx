// src/components/Header.jsx
import React from "react";
import { FaShieldAlt } from "react-icons/fa";

import { motion } from "framer-motion";

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="backdrop-blur-xl bg-gradient-to-r from-blue-700/80 via-cyan-600/80 to-indigo-700/80 text-white py-4 px-8 shadow-lg flex items-center gap-4 rounded-b-3xl"
    >
      <FaShieldAlt size={32} className="drop-shadow-lg" />
      <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow">
        SM Forensics Tool
      </h1>
    </motion.header>
  );
}

export default Header;
