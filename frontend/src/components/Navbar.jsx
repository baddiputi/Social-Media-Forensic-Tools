import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartBar,
  FaBookOpen,
  FaDatabase,
  FaSmile,
  FaCalendarAlt,
  FaProjectDiagram,
  FaMapMarkedAlt,
  FaCloud,
  FaFileAlt,
  FaCog,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
    { name: "Overview", path: "/overview", icon: <FaBookOpen /> },
    { name: "Data Collection", path: "/datacollection", icon: <FaDatabase /> },
    { name: "Sentiment Analysis", path: "/sentimentanalysis", icon: <FaSmile /> },
    { name: "Timeline Analysis", path: "/timelineanalysis", icon: <FaCalendarAlt /> },
    { name: "Network Analysis", path: "/networkanalysis", icon: <FaProjectDiagram /> },
    { name: "Geolocation", path: "/geolocation", icon: <FaMapMarkedAlt /> },
    { name: "WordCloud", path: "/wordcloud", icon: <FaCloud /> },
    { name: "Reports", path: "/reports", icon: <FaFileAlt /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Always show dropdown, close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <nav className="backdrop-blur-xl bg-gradient-to-r from-blue-700/80 via-cyan-600/80 to-indigo-700/80 text-white shadow-lg px-4 py-2 relative z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaBars className="text-2xl cursor-pointer" onClick={() => setOpen((o) => !o)} />
        </div>
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-700/80 hover:bg-cyan-800/90 transition font-semibold shadow"
          >
            <FaChevronDown className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
            <span>Menu</span>
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white/90 text-gray-900 rounded-2xl shadow-2xl py-2 z-50 border border-cyan-200 overflow-y-auto max-h-[80vh]"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-xl hover:bg-cyan-100/80 transition gap-2 ${
                        isActive ? "bg-cyan-200/80 font-bold" : ""
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
