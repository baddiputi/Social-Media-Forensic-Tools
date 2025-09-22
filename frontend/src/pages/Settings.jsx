// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import { FaDownload, FaMoon, FaSun } from "react-icons/fa";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

function Settings() {

  // Theme state (persisted)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // User preferences
  const [preferences, setPreferences] = useState({
    defaultDashboard: "Overview",
    defaultExportFormat: "PDF",
  });

  // Apply theme on body
  // Tailwind dark mode toggle
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handlers

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const handlePreferenceChange = (key, value) =>
    setPreferences({ ...preferences, [key]: value });

  // Export config handlers
  const handleExportConfig = (format = "JSON") => {
    const data = { theme, preferences };
    if (format === "JSON") {
      const dataStr = JSON.stringify(data, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "settings.json";
      link.click();
    } else if (format === "PDF") {
      const doc = new jsPDF();
      doc.text("Settings Export", 10, 10);
      doc.text(JSON.stringify(data, null, 2), 10, 20);
      doc.save("settings.pdf");
    } else if (format === "CSV") {
      // Only preferences as CSV (flat)
      const csvRows = [
        ["Key", "Value"],
        ...Object.entries(data.preferences).map(([k, v]) => [k, v]),
        ["theme", data.theme],
      ];
      const csvContent = csvRows.map((r) => r.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "settings.csv";
      link.click();
    }
  };

  const handleImportConfig = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const imported = JSON.parse(e.target.result);
      if (imported.theme) setTheme(imported.theme);
      if (imported.preferences) setPreferences(imported.preferences);
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        Settings
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative w-full max-w-2xl"
      >
        {/* Theme Switcher */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold">Theme</h2>
            <p>Switch between Light and Dark mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>

        {/* User Preferences */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Default Dashboard</label>
              <select
                value={preferences.defaultDashboard}
                onChange={(e) => handlePreferenceChange("defaultDashboard", e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
              >
                <option>Overview</option>
                <option>Data Collection</option>
                <option>Sentiment Analysis</option>
                <option>Timeline Analysis</option>
                <option>Network Analysis</option>
                <option>Geolocation</option>
                <option>Reports</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Default Export Format</label>
              <select
                value={preferences.defaultExportFormat}
                onChange={(e) => handlePreferenceChange("defaultExportFormat", e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
              >
                <option>PDF</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
            </div>
          </div>
        </div>

        {/* Export Configuration */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExportConfig(preferences.defaultExportFormat)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-400 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            <FaDownload className="mr-2" /> Export Configuration
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Settings;
