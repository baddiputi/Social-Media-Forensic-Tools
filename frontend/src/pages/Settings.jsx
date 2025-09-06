// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import { FaDownload, FaUpload, FaMoon, FaSun } from "react-icons/fa";

function Settings() {
  // Theme state
  const [theme, setTheme] = useState("light");

  // Notifications state
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  // User preferences
  const [preferences, setPreferences] = useState({
    defaultDashboard: "Overview",
    defaultExportFormat: "PDF",
  });

  // Apply theme on body
  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800";
  }, [theme]);

  // Handlers
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleNotification = (type) =>
    setNotifications({ ...notifications, [type]: !notifications[type] });
  const handlePreferenceChange = (key, value) =>
    setPreferences({ ...preferences, [key]: value });

  const handleExportConfig = () => {
    const dataStr = JSON.stringify({ theme, notifications, preferences }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "settings.json";
    link.click();
  };

  const handleImportConfig = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const imported = JSON.parse(e.target.result);
      if (imported.theme) setTheme(imported.theme);
      if (imported.notifications) setNotifications(imported.notifications);
      if (imported.preferences) setPreferences(imported.preferences);
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700">Settings</h1>

      {/* Theme Switcher */}
      <div className="bg-white p-6 rounded shadow-lg flex items-center justify-between">
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

      {/* Notifications */}
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => toggleNotification("email")}
            />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => toggleNotification("sms")}
            />
            <span>SMS Notifications</span>
          </label>
        </div>
      </div>

      {/* User Preferences */}
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">User Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Default Dashboard</label>
            <select
              value={preferences.defaultDashboard}
              onChange={(e) => handlePreferenceChange("defaultDashboard", e.target.value)}
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            >
              <option>PDF</option>
              <option>CSV</option>
              <option>JSON</option>
            </select>
          </div>
        </div>
      </div>

      {/* Export / Import Configuration */}
      <div className="flex space-x-4">
        <button
          onClick={handleExportConfig}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 flex items-center space-x-2"
        >
          <FaDownload /> <span>Export Configuration</span>
        </button>
        <label className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center space-x-2 cursor-pointer">
          <FaUpload /> <span>Import Configuration</span>
          <input type="file" className="hidden" onChange={handleImportConfig} />
        </label>
      </div>
    </div>
  );
}

export default Settings;
