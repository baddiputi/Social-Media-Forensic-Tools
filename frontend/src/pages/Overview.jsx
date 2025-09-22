// src/pages/Overview.jsx
import React from "react";
import { FaSearch, FaChartLine, FaProjectDiagram, FaMapMarkedAlt, FaFileAlt, FaCloud } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


function Overview() {
  const navigate = useNavigate();
  const features = [
    {
      icon: <FaSearch className="text-blue-600 text-4xl mb-4" />, title: "Data Collection",
      desc: "Collect posts from multiple platforms (Twitter, Facebook, Instagram, Reddit) using keywords, hashtags, and user filters with export options."
    },
    {
      icon: <FaChartLine className="text-green-600 text-4xl mb-4" />, title: "Sentiment Analysis",
      desc: "Analyze collected posts for positive, negative, neutral, and threat-related sentiments with visual distribution charts."
    },
    {
      icon: <FaProjectDiagram className="text-purple-600 text-4xl mb-4" />, title: "Network Analysis",
      desc: "Discover relationships between users, identify clusters, top influencers, and suspicious patterns with interactive graphs."
    },
    {
      icon: <FaMapMarkedAlt className="text-red-600 text-4xl mb-4" />, title: "Geolocation Mapping",
      desc: "Visualize the locations of negative or suspicious users on an interactive world map, exportable for reports."
    },
    {
      icon: <FaFileAlt className="text-yellow-600 text-4xl mb-4" />, title: "Case Reporting",
      desc: "Generate professional case reports including timelines, network graphs, word clouds, and summary tables in PDF or CSV formats."
    },
    {
      icon: <FaCloud className="text-indigo-600 text-4xl mb-4" />, title: "Word Cloud",
      desc: "Identify the most frequently used keywords and hashtags by users with an interactive and exportable word cloud visualization."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 py-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Social Media Forensics Tool
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Investigate social media data with powerful forensic features including data collection, sentiment analysis, timeline trends, network exploration, geolocation mapping, and automated case reporting.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            whileHover={{ scale: 1.04 }}
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center transition"
          >
            {f.icon}
            <h2 className="text-xl font-bold mb-2 text-blue-900 drop-shadow">{f.title}</h2>
            <p className="text-gray-700">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/datacollection")}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-2xl shadow-xl text-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Start Investigation 🚀
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Overview;
