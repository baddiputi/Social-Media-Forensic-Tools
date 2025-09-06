// src/pages/SentimentAnalysis.jsx
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import DetailModal from "../components/DetailModal";
import { FaDownload } from "react-icons/fa";

function SentimentAnalysis() {
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: null });

  // Sample sentiment distribution data
  const sentimentData = {
    positive: 80,
    neutral: 30,
    negative: 10,
    threat: 5,
  };

  // Sample recent analysis results
  const recentResults = [
    { content: "Data breach reported", user: "Alice", sentiment: "Negative", score: 0.8 },
    { content: "Security patch applied", user: "Bob", sentiment: "Positive", score: 0.9 },
    { content: "Suspicious login detected", user: "Charlie", sentiment: "Threat", score: 0.95 },
    { content: "New analytics tool launched", user: "David", sentiment: "Positive", score: 0.85 },
  ];

  const startAnalysis = () => {
    setAnalysisStarted(true);
  };

  const openModal = (title, data) => {
    setModalContent({ title, data });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Sentiment Analysis</h1>

      {/* Start Analysis Button */}
      <button
        onClick={startAnalysis}
        className="mb-6 px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {analysisStarted ? "Analysis Completed" : "Start Analysis"}
      </button>

      {/* Sentiment Distribution */}
      {analysisStarted && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <h3 className="font-semibold text-green-700">Positive</h3>
            <p className="text-xl">{sentimentData.positive}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow text-center">
            <h3 className="font-semibold text-yellow-700">Neutral</h3>
            <p className="text-xl">{sentimentData.neutral}</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow text-center">
            <h3 className="font-semibold text-red-700">Negative</h3>
            <p className="text-xl">{sentimentData.negative}</p>
          </div>
          <div className="bg-pink-100 p-4 rounded shadow text-center">
            <h3 className="font-semibold text-pink-700">Threat</h3>
            <p className="text-xl">{sentimentData.threat}</p>
          </div>
        </div>
      )}

      {/* Recent Analysis Results Table */}
      {analysisStarted && (
        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Analysis Results</h2>
            <div className="flex space-x-2">
              <CSVLink
                data={recentResults}
                filename={"sentiment-results.csv"}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-1"
              >
                <FaDownload />
                <span>Export CSV</span>
              </CSVLink>
              <button
                onClick={() => openModal("Export JSON", JSON.stringify(recentResults, null, 2))}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-1"
              >
                <FaDownload />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Content</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Sentiment</th>
                <th className="p-2 border">Score</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map((res, idx) => (
                <tr key={idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => openModal(`User: ${res.user}`, `Content: ${res.content}\nSentiment: ${res.sentiment}\nScore: ${res.score}`)}>
                  <td className="p-2 border">{res.content}</td>
                  <td className="p-2 border">{res.user}</td>
                  <td className="p-2 border">{res.sentiment}</td>
                  <td className="p-2 border">{res.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      <DetailModal isOpen={modalOpen} onRequestClose={closeModal} title={modalContent.title}>
        <pre className="whitespace-pre-wrap">{modalContent.data}</pre>
      </DetailModal>
    </div>
  );
}

export default SentimentAnalysis;
