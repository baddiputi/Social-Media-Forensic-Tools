// src/pages/TimelineAnalysis.jsx
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { FaClock } from "react-icons/fa";

function TimelineAnalysis() {
  const [timelineGenerated, setTimelineGenerated] = useState(false);

  // Dummy timeline data
  const timelineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Posts Collected",
        data: [50, 70, 40, 90, 120, 80, 100],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.3)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Dummy activity log
  const activityLog = [
    { time: "2025-09-01 10:15", event: "High spike in user activity" },
    { time: "2025-09-02 14:30", event: "Increased negative sentiment detected" },
    { time: "2025-09-03 09:45", event: "Unusual posting pattern noticed" },
    { time: "2025-09-04 21:10", event: "Potential coordinated activity" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-700">Timeline Analysis</h1>
      <p className="text-gray-600">
        Visualize trends and posting behavior over time to detect unusual activity.
      </p>

      {/* Generate Timeline Button */}
      <button
        onClick={() => setTimelineGenerated(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Generate Timeline
      </button>

      {timelineGenerated && (
        <>
          {/* Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Posting Trends Over Time</h2>
            <div className="w-full max-w-2xl mx-auto">
              <Line data={timelineData} />
            </div>
          </div>

          {/* Peak Periods */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Peak Activity Periods</h2>
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
          </div>

          {/* Activity Log */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Timeline Activity</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border p-2 text-left">Timestamp</th>
                    <th className="border p-2 text-left">Event</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLog.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border p-2">{a.time}</td>
                      <td className="border p-2">{a.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TimelineAnalysis;
