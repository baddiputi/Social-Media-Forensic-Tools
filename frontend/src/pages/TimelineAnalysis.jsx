// src/pages/TimelineAnalysis.jsx
import React, { useState } from "react";
import { fetchTimelineAnalysis } from "../services/api";
import { Line } from "react-chartjs-2";
import { FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

function TimelineAnalysis() {
  const [timelineGenerated, setTimelineGenerated] = useState(false);
  const [timelineData, setTimelineData] = useState({ labels: [], datasets: [] });
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateTimeline = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTimelineAnalysis();
      setTimelineData(data.timeline || { labels: [], datasets: [] });
      setActivityLog(data.activityLog || []);
      setTimelineGenerated(true);
    } catch (err) {
      setError("Failed to fetch timeline analysis data.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen p-0 md:p-8 flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-300/30 to-purple-100/20 rounded-full blur-3xl animate-pulse delay-2000" style={{ filter: 'blur(80px)' }} />
      </div>

      {/* Title */}
      <h1 className="z-10 text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg">Timeline Analysis</h1>
      <p className="z-10 text-gray-600 mb-8 text-lg">Visualize trends and posting behavior over time to detect unusual activity.</p>

      {/* Generate Timeline Button */}

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        onClick={generateTimeline}
        className="z-10 mb-8 px-8 py-3 rounded-2xl text-white font-bold shadow-xl transition-all duration-200 backdrop-blur-lg border border-white/30 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
        disabled={timelineGenerated || loading}
      >
        {loading ? "Generating..." : timelineGenerated ? "Timeline Generated" : "Generate Timeline"}
      </motion.button>

      {error && (
        <div className="mb-4 text-red-600 font-semibold bg-red-100 rounded-xl px-4 py-2 shadow">{error}</div>
      )}

      {loading && (
        <div className="mb-8 text-lg text-blue-600 font-semibold animate-pulse">Loading timeline analysis...</div>
      )}
      {timelineGenerated && !loading && (
        <>
          {/* Line Chart */}
          <motion.div className="z-10 w-full max-w-3xl bg-gradient-to-br from-blue-100 via-purple-50 to-white/80 border border-blue-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="font-bold text-2xl mb-4 text-blue-700">Posting Trends Over Time</h2>
            <div className="w-full max-w-2xl mx-auto">
              <Line data={timelineData} />
            </div>
          </motion.div>

          {/* Peak Periods */}
          <motion.div className="z-10 w-full max-w-2xl bg-gradient-to-br from-green-100 via-yellow-50 to-white/80 border border-green-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="font-bold text-2xl mb-4 text-green-700">Peak Activity Periods</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <FaClock className="text-green-600" />
                <span>Friday - 120 posts (Highest activity)</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaClock className="text-yellow-600" />
                <span>Sunday - 100 posts</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaClock className="text-blue-600" />
                <span>Thursday - 90 posts</span>
              </li>
            </ul>
          </motion.div>

          {/* Activity Log */}
          <motion.div className="z-10 w-full max-w-2xl bg-gradient-to-br from-purple-100 via-blue-50 to-white/80 border border-purple-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-bold text-2xl mb-4 text-purple-700">Recent Timeline Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border p-3 text-left">Timestamp</th>
                    <th className="border p-3 text-left">Event</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLog.length === 0 ? (
                    <tr><td colSpan={2} className="border p-3 text-center text-gray-400">No activity log found.</td></tr>
                  ) : (
                    activityLog.map((a, i) => (
                      <tr key={i} className="hover:bg-purple-50">
                        <td className="border p-3">{a.time}</td>
                        <td className="border p-3">{a.event}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default TimelineAnalysis;
