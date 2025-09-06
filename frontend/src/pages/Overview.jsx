// src/pages/Overview.jsx
import React from "react";
import { FaSearch, FaChartLine, FaProjectDiagram, FaMapMarkedAlt, FaFileAlt, FaCloud } from "react-icons/fa";

function Overview() {
  return (
    <div className="p-8 space-y-10">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Social Media Forensics Tool
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Investigate social media data with powerful forensic features including 
          data collection, sentiment analysis, timeline trends, network exploration, 
          geolocation mapping, and automated case reporting.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <FaSearch className="text-blue-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Data Collection</h2>
          <p className="text-gray-600">
            Collect posts from multiple platforms (Twitter, Facebook, Instagram, Reddit) 
            using keywords, hashtags, and user filters with export options.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <FaChartLine className="text-green-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Sentiment Analysis</h2>
          <p className="text-gray-600">
            Analyze collected posts for positive, negative, neutral, and threat-related sentiments 
            with visual distribution charts.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <FaProjectDiagram className="text-purple-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Network Analysis</h2>
          <p className="text-gray-600">
            Discover relationships between users, identify clusters, top influencers, 
            and suspicious patterns with interactive graphs.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <FaMapMarkedAlt className="text-red-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Geolocation Mapping</h2>
          <p className="text-gray-600">
            Visualize the locations of negative or suspicious users on an interactive world map, 
            exportable for reports.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <FaFileAlt className="text-yellow-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Case Reporting</h2>
          <p className="text-gray-600">
            Generate professional case reports including timelines, network graphs, word clouds, 
            and summary tables in PDF or CSV formats.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
          <FaCloud className="text-indigo-600 text-4xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Word Cloud</h2>
          <p className="text-gray-600">
            Identify the most frequently used keywords and hashtags by users with an 
            interactive and exportable word cloud visualization.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Start Investigation 🚀
        </button>
      </div>
    </div>
  );
}

export default Overview;
