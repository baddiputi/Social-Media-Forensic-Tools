import React from "react";

import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="backdrop-blur-xl bg-gradient-to-r from-blue-700/80 via-cyan-600/80 to-indigo-700/80 text-white py-4 mt-auto shadow-inner rounded-t-3xl"
    >
      <div className="container mx-auto px-6 text-center">
        <span className="text-sm font-medium tracking-wide">
          &copy; {new Date().getFullYear()} SM Forensics Tool. All rights reserved.
        </span>
      </div>
    </motion.footer>
  );
}

export default Footer;
