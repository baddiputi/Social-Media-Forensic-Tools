
import React, { useEffect, useState } from "react";
import TimelineChart from "../components/TimelineChart";
import WordCloudChart from "../components/WordCloudChart";
import RelationshipGraph from "../components/RelationshipGraph";
import MapChart from "../components/MapChart";
import { fetchAnalyticsData } from "../services/api";
import { motion } from "framer-motion";


function Analytics() {
  const [analytics, setAnalytics] = useState({
    timeline: { labels: [], datasets: [] },
    wordcloud: [],
    network: { nodes: [], links: [] },
    map: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAnalyticsData();
        setAnalytics({
          timeline: data.timeline || { labels: [], datasets: [] },
          wordcloud: data.wordcloud || [],
          network: data.network || { nodes: [], links: [] },
          map: data.map || [],
        });
      } catch (err) {
        setError("Failed to fetch analytics data.");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleClick = (title, data) => {
    alert(`${title}: ${data}`);
  };

  return (
    <div className="relative min-h-screen p-0 md:p-8 flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-300/30 to-purple-100/20 rounded-full blur-3xl animate-pulse delay-2000" style={{ filter: 'blur(80px)' }} />
      </div>

      <h1 className="z-10 text-3xl md:text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg">Analytics Dashboard</h1>

      {loading && <div className="mb-8 text-lg text-blue-600 font-semibold animate-pulse">Loading analytics data...</div>}
      {error && <div className="mb-8 text-red-600 font-semibold bg-red-100 rounded-xl px-4 py-2 shadow">{error}</div>}

      {/* Timeline & Word Cloud */}
      <div className="z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 via-blue-50 to-white/80 border border-blue-200/40 backdrop-blur-lg p-6"
        >
          <h2 className="font-bold text-xl mb-3 text-blue-700 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-400 animate-pulse" /> Timeline
          </h2>
          <TimelineChart onPointClick={handleClick} data={analytics.timeline} />
        </motion.div>

        <motion.div
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}
          className="rounded-3xl shadow-2xl bg-gradient-to-br from-pink-100 via-pink-50 to-white/80 border border-pink-200/40 backdrop-blur-lg p-6"
        >
          <h2 className="font-bold text-xl mb-3 text-pink-700 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-pink-400 animate-pulse" /> Word Cloud
          </h2>
          <WordCloudChart onWordClick={handleClick} words={analytics.wordcloud} />
        </motion.div>
      </div>

      {/* Relationships & Map */}
      <div className="z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="rounded-3xl shadow-2xl bg-gradient-to-br from-purple-100 via-purple-50 to-white/80 border border-purple-200/40 backdrop-blur-lg p-6"
        >
          <h2 className="font-bold text-xl mb-3 text-purple-700 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-purple-400 animate-pulse" /> Relationship Graph
          </h2>
          <RelationshipGraph onNodeClick={handleClick} data={analytics.network} />
        </motion.div>

        <motion.div
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
          className="rounded-3xl shadow-2xl bg-gradient-to-br from-green-100 via-green-50 to-white/80 border border-green-200/40 backdrop-blur-lg p-6"
        >
          <h2 className="font-bold text-xl mb-3 text-green-700 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-400 animate-pulse" /> Map
          </h2>
          <MapChart onMarkerClick={handleClick} markers={analytics.map} />
        </motion.div>
      </div>
    </div>
  );
}

export default Analytics;
