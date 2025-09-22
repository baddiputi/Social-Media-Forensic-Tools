// src/pages/WordCloud.jsx

import React, { useMemo, useState, useRef } from "react";
// import WordCloud from "react-wordcloud";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa";

import { useEffect } from "react";
import { fetchWordCloudData } from "../services/api";

// ...existing code...

const colorPalette = [
  "#6366f1", // indigo
  "#06b6d4", // cyan
  "#f59e42", // orange
  "#f43f5e", // rose
  "#22d3ee", // sky
  "#a21caf", // purple
  "#16a34a", // green
  "#eab308", // yellow
  "#f472b6", // pink
  "#0ea5e9", // blue
];

function getColor(word, index) {
  return colorPalette[index % colorPalette.length];
}

function Loader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function Notification({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center space-x-2"
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-lg font-bold">×</button>
    </motion.div>
  );
}

function WordCloudPage() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [words, setWords] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const wordCloudRef = useRef();

  // WordCloud options
  const options = useMemo(
    () => ({
      rotations: 2,
      rotationAngles: [-15, 15],
      fontSizes: [24, 70],
      enableTooltip: true,
      deterministic: false,
      padding: 3,
      fontFamily: "Montserrat, Arial, sans-serif",
      fontWeight: "bold",
      scale: "sqrt",
      colors: colorPalette,
      fontStyle: "normal",
      // Custom renderer for vibrant colors
      getWordColor: (word, index) => getColor(word, index),
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      setError("");
      try {
        const data = await fetchWordCloudData();
        setWords(data.words || []);
      } catch (err) {
        setError("Failed to fetch word cloud data.");
      }
      setFetching(false);
    };
    fetchData();
  }, []);

  // Word click handler
  const handleWordClick = (word) => {
    setNotification(`Word: ${word.text} | Frequency: ${word.value}`);
  setTimeout(() => setNotification("") , 2000);
  };

  // Download as image
  const handleDownload = async () => {
    if (!wordCloudRef.current) return;
    setLoading(true);
    try {
      const canvas = await html2canvas(wordCloudRef.current, { backgroundColor: null });
      const link = document.createElement("a");
      link.download = `wordcloud-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      setNotification("Word cloud image downloaded!");
    } catch (e) {
      setNotification("Failed to download image.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 py-10">
      {notification && <Notification message={notification} onClose={() => setNotification("")} />}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        Word Cloud
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative w-full max-w-3xl"
      >
        <div
          ref={wordCloudRef}
          className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center"
        >
          {fetching ? (
            <Loader />
          ) : error ? (
            <div className="text-red-600 font-semibold mb-4">{error}</div>
          ) : (
            <div className="text-gray-500">Word cloud visualization is temporarily unavailable.<br />Please contact the developer to enable this feature with a React 18 compatible library.</div>
          )}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            className="mt-8 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            disabled={loading || fetching}
          >
            <FaDownload className="mr-2" />
            {loading ? "Exporting..." : "Download as Image"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default WordCloudPage;
