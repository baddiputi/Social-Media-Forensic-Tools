// src/pages/NetworkAnalysis.jsx
import React, { useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { FaUsers, FaProjectDiagram, FaUserShield, FaExclamationTriangle } from "react-icons/fa";

function NetworkAnalysis() {
  const [centerUser, setCenterUser] = useState("");
  const [graphGenerated, setGraphGenerated] = useState(false);

  // Dummy graph data
  const graphData = {
    nodes: [
      { id: "Alice", group: 1 },
      { id: "Bob", group: 2 },
      { id: "Charlie", group: 2 },
      { id: "David", group: 3 },
      { id: "Eve", group: 3 },
    ],
    links: [
      { source: "Alice", target: "Bob" },
      { source: "Alice", target: "Charlie" },
      { source: "Bob", target: "David" },
      { source: "Charlie", target: "Eve" },
    ],
  };

  // Dummy stats
  const stats = {
    totalUsers: graphData.nodes.length,
    connections: graphData.links.length,
    clusters: 3,
    isolated: 0,
    topInfluencers: ["Alice", "Bob"],
    suspiciousPatterns: ["Eve -> Charlie -> David"],
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">Network Analysis</h1>
      <p className="text-gray-600">
        Analyze the social network of users, detect top influencers and suspicious patterns.
      </p>

      {/* Center User Input */}
      <div className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Center User (Optional)"
          value={centerUser}
          onChange={(e) => setCenterUser(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
        <button
          onClick={() => setGraphGenerated(true)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Generate Network Graph
        </button>
      </div>

      {graphGenerated && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 rounded shadow flex items-center space-x-3">
              <FaUsers className="text-blue-600 text-2xl" />
              <div>
                <p className="text-gray-500">Total Users</p>
                <p className="text-xl font-semibold">{stats.totalUsers}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow flex items-center space-x-3">
              <FaProjectDiagram className="text-green-600 text-2xl" />
              <div>
                <p className="text-gray-500">Connections</p>
                <p className="text-xl font-semibold">{stats.connections}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow flex items-center space-x-3">
              <FaUserShield className="text-yellow-600 text-2xl" />
              <div>
                <p className="text-gray-500">Clusters</p>
                <p className="text-xl font-semibold">{stats.clusters}</p>
              </div>
            </div>
          </div>

          {/* Top Influencers */}
          <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-xl font-semibold mb-2">Top Influencers</h2>
            <ul className="list-disc list-inside">
              {stats.topInfluencers.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </div>

          {/* Suspicious Patterns */}
          <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-xl font-semibold mb-2">Suspicious Patterns</h2>
            <ul className="list-disc list-inside">
              {stats.suspiciousPatterns.map((pattern, i) => (
                <li key={i} className="text-red-600">{pattern}</li>
              ))}
            </ul>
          </div>

          {/* Network Graph */}
          <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="text-xl font-semibold mb-4">Interactive Network Graph</h2>
            <ForceGraph2D
              graphData={graphData}
              nodeAutoColorBy="group"
              nodeLabel="id"
              linkDirectionalArrowLength={4}
              linkDirectionalArrowRelPos={1}
              width={800}
              height={400}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default NetworkAnalysis;
