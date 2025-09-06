import React from "react";
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
} from "react-icons/fa";

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

  return (
    <nav className="bg-blue-600 text-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-start px-4 py-2 space-x-2 overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded hover:bg-blue-700 transition ${
                isActive ? "bg-blue-800 font-semibold" : ""
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
