// src/pages/NetworkAnalysis.jsx
import React, { useState, useRef } from "react";
import { fetchNetworkAnalysis } from "../services/api";
import ForceGraph2D from "react-force-graph-2d";
import { FaUsers, FaProjectDiagram, FaUserShield, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function NetworkAnalysis() {
  const [centerUser, setCenterUser] = useState("");
  const [graphGenerated, setGraphGenerated] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [stats, setStats] = useState({ totalUsers: 0, connections: 0, clusters: 0, isolated: 0, topInfluencers: [], suspiciousPatterns: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateGraph = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNetworkAnalysis();
      setGraphData(data.graph || { nodes: [], links: [] });
      setStats(data.stats || { totalUsers: 0, connections: 0, clusters: 0, isolated: 0, topInfluencers: [], suspiciousPatterns: [] });
      setGraphGenerated(true);
    } catch (err) {
      setError("Failed to fetch network analysis data.");
    }
    setLoading(false);
  };

  // Custom node rendering for avatars and highlight
  const fgRef = useRef();
  const [hoverNode, setHoverNode] = useState(null);
  const groupColors = ["#6366f1", "#22d3ee", "#f59e42", "#f43f5e", "#84cc16"];

  return (
    <div className="relative min-h-screen p-0 md:p-8 flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-300/30 to-blue-200/20 rounded-full blur-3xl animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-300/30 to-purple-100/20 rounded-full blur-3xl animate-pulse delay-2000" style={{ filter: 'blur(80px)' }} />
      </div>

      <h1 className="z-10 text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 drop-shadow-lg">Network Analysis</h1>
      <p className="z-10 text-gray-600 mb-8 text-lg">Analyze the social network of users, detect top influencers and suspicious patterns.</p>

      {/* Center User Input */}

      <motion.div className="z-10 w-full max-w-2xl bg-gradient-to-br from-purple-100 via-blue-50 to-white/80 border border-purple-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 flex flex-col md:flex-row gap-4 items-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <input
          type="text"
          placeholder="Center User (Optional)"
          value={centerUser}
          onChange={(e) => setCenterUser(e.target.value)}
          className="border p-3 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateGraph}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          disabled={graphGenerated || loading}
        >
          {loading ? "Generating..." : graphGenerated ? "Graph Generated" : "Generate Network Graph"}
        </motion.button>
      </motion.div>

      {error && (
        <div className="mb-4 text-red-600 font-semibold bg-red-100 rounded-xl px-4 py-2 shadow">{error}</div>
      )}

      {loading && (
        <div className="mb-8 text-lg text-purple-600 font-semibold animate-pulse">Loading network analysis...</div>
      )}
      {graphGenerated && !loading && (
        <>
          {/* Stats */}
          <motion.div className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="bg-blue-100/80 p-6 rounded-2xl shadow flex items-center space-x-3">
              <FaUsers className="text-blue-600 text-2xl" />
              <div>
                <p className="text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="bg-green-100/80 p-6 rounded-2xl shadow flex items-center space-x-3">
              <FaProjectDiagram className="text-green-600 text-2xl" />
              <div>
                <p className="text-gray-500">Connections</p>
                <p className="text-2xl font-bold">{stats.connections}</p>
              </div>
            </div>
            <div className="bg-yellow-100/80 p-6 rounded-2xl shadow flex items-center space-x-3">
              <FaUserShield className="text-yellow-600 text-2xl" />
              <div>
                <p className="text-gray-500">Clusters</p>
                <p className="text-2xl font-bold">{stats.clusters}</p>
              </div>
            </div>
          </motion.div>

          {/* Top Influencers */}
          <motion.div className="z-10 w-full max-w-2xl bg-gradient-to-br from-pink-100 via-purple-50 to-white/80 border border-pink-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <h2 className="text-2xl font-bold text-pink-700 mb-2">Top Influencers</h2>
            <ul className="list-disc list-inside text-lg">
              {stats.topInfluencers.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </motion.div>

          {/* Suspicious Patterns */}
          <motion.div className="z-10 w-full max-w-2xl bg-gradient-to-br from-red-100 via-yellow-50 to-white/80 border border-red-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.21 }}>
            <h2 className="text-2xl font-bold text-red-700 mb-2">Suspicious Patterns</h2>
            <ul className="list-disc list-inside text-lg">
              {stats.suspiciousPatterns.map((pattern, i) => (
                <li key={i} className="text-red-600">{pattern}</li>
              ))}
            </ul>
          </motion.div>

          {/* Network Graph */}
          <motion.div className="z-10 w-full max-w-5xl bg-gradient-to-br from-blue-100 via-purple-50 to-white/80 border border-blue-200/40 backdrop-blur-lg rounded-3xl shadow-2xl p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Interactive Network Graph</h2>
            <div className="w-full flex justify-center">
              <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                nodeLabel={node => `${node.id} (Group ${node.group})`}
                nodeAutoColorBy="group"
                linkDirectionalArrowLength={6}
                linkDirectionalArrowRelPos={1}
                width={800}
                height={400}
                backgroundColor="rgba(255,255,255,0)"
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const label = node.id;
                  const fontSize = 16/globalScale;
                  ctx.save();
                  // Highlight on hover
                  if (hoverNode && hoverNode.id === node.id) {
                    ctx.shadowColor = groupColors[(node.group-1)%groupColors.length];
                    ctx.shadowBlur = 20;
                  }
                  // Node circle
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, 18, 0, 2 * Math.PI, false);
                  ctx.fillStyle = groupColors[(node.group-1)%groupColors.length] + 'cc';
                  ctx.fill();
                  ctx.lineWidth = 3;
                  ctx.strokeStyle = '#fff';
                  ctx.stroke();
                  // Avatar (first letter)
                  ctx.font = `bold ${fontSize*1.5}px Arial`;
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = "#fff";
                  ctx.fillText(label[0], node.x, node.y-2);
                  // Label
                  ctx.font = `bold ${fontSize}px Arial`;
                  ctx.fillStyle = "#222";
                  ctx.fillText(label, node.x, node.y+18);
                  ctx.restore();
                }}
                onNodeHover={setHoverNode}
                linkColor={() => "#6366f1"}
                linkWidth={l => (hoverNode && (l.source.id === hoverNode.id || l.target.id === hoverNode.id)) ? 4 : 2}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">Tip: Hover nodes to highlight, see group color, and view user info.</div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default NetworkAnalysis;
