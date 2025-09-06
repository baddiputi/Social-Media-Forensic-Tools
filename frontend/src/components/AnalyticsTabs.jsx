import React, { useState } from "react";
import TimelineChart from "./TimelineChart";
import WordCloudChart from "./WordCloudChart";
import RelationshipGraph from "./RelationshipGraph";
import MapChart from "./MapChart";

function AnalyticsTabs({ onPointClick, onWordClick, onNodeClick, onMarkerClick }) {
  const tabs = ["Timeline", "Word Cloud", "Relationships", "Map"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${activeTab === index ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 0 && <TimelineChart onPointClick={onPointClick} />}
        {activeTab === 1 && <WordCloudChart onWordClick={onWordClick} />}
        {activeTab === 2 && <RelationshipGraph onNodeClick={onNodeClick} />}
        {activeTab === 3 && <MapChart onMarkerClick={onMarkerClick} />}
      </div>
    </div>
  );
}

export default AnalyticsTabs;
