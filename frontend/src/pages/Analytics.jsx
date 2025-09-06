import React from "react";
import TimelineChart from "../components/TimelineChart";
import WordCloudChart from "../components/WordCloudChart";
import RelationshipGraph from "../components/RelationshipGraph";
import MapChart from "../components/MapChart";

function Analytics() {
  const handleClick = (title, data) => {
    alert(`${title}: ${data}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>

      {/* Timeline & Word Cloud */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Timeline</h2>
          <TimelineChart onPointClick={handleClick} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Word Cloud</h2>
          <WordCloudChart onWordClick={handleClick} />
        </div>
      </div>

      {/* Relationships & Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Relationship Graph</h2>
          <RelationshipGraph onNodeClick={handleClick} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Map</h2>
          <MapChart onMarkerClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
