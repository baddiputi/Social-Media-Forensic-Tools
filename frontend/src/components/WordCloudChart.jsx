// src/pages/WordCloudPage.jsx
import React from "react";
// import ReactWordcloud from "react-wordcloud";

const sampleWords = [
  { text: "cybersecurity", value: 50 },
  { text: "malware", value: 30 },
  { text: "phishing", value: 25 },
  { text: "data breach", value: 20 },
  { text: "threat", value: 15 },
  { text: "vulnerability", value: 10 },
  { text: "alert", value: 8 },
  { text: "exploit", value: 5 },
];

function WordCloudPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Most Used Keywords & Hashtags</h1>
      <div className="bg-white p-6 rounded shadow-lg">
  {/* Word cloud visualization is temporarily unavailable. */}
  <div className="text-gray-500">Word cloud visualization is temporarily unavailable.<br />Please contact the developer to enable this feature with a React 18 compatible library.</div>
      </div>
    </div>
  );
}

export default WordCloudPage;
