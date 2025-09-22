// src/pages/SentimentAnalysis.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DetailModal from "../components/DetailModal";
import { fetchBatchSentimentAnalysis, fetchSentimentAnalysis } from "../services/api";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";
function SentimentAnalysis() {
  const location = useLocation();
  let posts = location.state?.posts || null;
  if (!posts) {
    try {
      const stored = localStorage.getItem("latestCollectedPosts");
      if (stored) posts = JSON.parse(stored);
    } catch (e) { posts = null; }
  }

  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: null });
  const [sentimentData, setSentimentData] = useState({ positive: 0, neutral: 0, negative: 0, threat: 0 });
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Download JSON utility
  const downloadJSON = () => {
    const data = JSON.stringify(recentResults, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sentiment-results.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const startAnalysis = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (posts && Array.isArray(posts) && posts.length > 0) {
        data = await fetchBatchSentimentAnalysis(posts);
      } else {
        data = await fetchSentimentAnalysis();
      }
      setSentimentData(data.distribution || { positive: 0, neutral: 0, negative: 0, threat: 0 });
      setRecentResults(data.results || []);
      setAnalysisStarted(true);
    } catch (err) {
      setError("Failed to fetch sentiment analysis data.");
    }
    setLoading(false);
  };

  const openModal = (title, data) => {
    setModalContent({ title, data });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="relative min-h-screen p-0 md:p-8 flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-blue-300/30 to-purple-100/20 rounded-full blur-3xl animate-pulse delay-2000" style={{ filter: 'blur(80px)' }} />
      </div>

      <h1 className="z-10 text-3xl md:text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 drop-shadow-lg">Sentiment Analysis</h1>


      {/* Start Analysis Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        onClick={startAnalysis}
        className={`mb-8 px-8 py-3 rounded-2xl text-white font-bold shadow-xl transition-all duration-200 backdrop-blur-lg border border-white/30 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 ${analysisStarted ? 'opacity-70 cursor-not-allowed' : ''}`}
        disabled={analysisStarted || loading}
      >
        {loading ? "Analyzing..." : analysisStarted ? "Analysis Completed" : "Start Analysis"}
      </motion.button>

      {error && (
        <div className="mb-4 text-red-600 font-semibold bg-red-100 rounded-xl px-4 py-2 shadow">{error}</div>
      )}

      {/* Sentiment Distribution */}
      {loading && (
        <div className="mb-8 text-lg text-purple-600 font-semibold animate-pulse">Loading sentiment analysis...</div>
      )}
      {analysisStarted && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div className="bg-green-100/80 p-6 rounded-2xl shadow text-center" whileHover={{ scale: 1.04 }}>
            <h3 className="font-bold text-green-700 text-lg">Positive</h3>
            <p className="text-3xl font-extrabold mt-2">{sentimentData.positive}</p>
          </motion.div>
          <motion.div className="bg-yellow-100/80 p-6 rounded-2xl shadow text-center" whileHover={{ scale: 1.04 }}>
            <h3 className="font-bold text-yellow-700 text-lg">Neutral</h3>
            <p className="text-3xl font-extrabold mt-2">{sentimentData.neutral}</p>
          </motion.div>
          <motion.div className="bg-red-100/80 p-6 rounded-2xl shadow text-center" whileHover={{ scale: 1.04 }}>
            <h3 className="font-bold text-red-700 text-lg">Negative</h3>
            <p className="text-3xl font-extrabold mt-2">{sentimentData.negative}</p>
          </motion.div>
          <motion.div className="bg-pink-100/80 p-6 rounded-2xl shadow text-center" whileHover={{ scale: 1.04 }}>
            <h3 className="font-bold text-pink-700 text-lg">Threat</h3>
            <p className="text-3xl font-extrabold mt-2">{sentimentData.threat}</p>
          </motion.div>
        </div>
      )}

      {/* Recent Analysis Results Table */}
  {analysisStarted && !loading && (
        <motion.div className="z-10 w-full max-w-4xl bg-gradient-to-br from-pink-100 via-purple-50 to-white/80 border border-pink-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-700">Recent Analysis Results</h2>
            <div className="flex space-x-2">
              <CSVLink
                data={recentResults}
                filename={"sentiment-results.csv"}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center space-x-1 font-semibold shadow"
              >
                <FaDownload />
                <span>Export CSV</span>
              </CSVLink>
              <button
                onClick={downloadJSON}
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center space-x-1 font-semibold shadow"
              >
                <FaDownload />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-pink-50">
                <th className="p-3 border">Content</th>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Sentiment</th>
                <th className="p-3 border">Score</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.length === 0 ? (
                <tr><td colSpan={4} className="p-3 border text-center text-gray-400">No results found.</td></tr>
              ) : (
                recentResults.map((res, idx) => (
                  <tr key={idx} className="hover:bg-pink-100/60 cursor-pointer" onClick={() => openModal(`User: ${res.user}`, `Content: ${res.content}\nSentiment: ${res.sentiment}\nScore: ${res.score}`)}>
                    <td className="p-3 border">{res.content}</td>
                    <td className="p-3 border">{res.user}</td>
                    <td className="p-3 border">{res.sentiment}</td>
                    <td className="p-3 border">{res.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Detail Modal */}
      <DetailModal isOpen={modalOpen} onRequestClose={closeModal} title={modalContent.title}>
        <pre className="whitespace-pre-wrap">{modalContent.data}</pre>
      </DetailModal>
    </div>
  );
}

export default SentimentAnalysis;
