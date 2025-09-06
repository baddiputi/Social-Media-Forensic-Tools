import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const data = {
  nodes: [{ id: "Alice", group: 1 }, { id: "Bob", group: 2 }, { id: "Charlie", group: 2 }, { id: "David", group: 3 }],
  links: [{ source: "Alice", target: "Bob" }, { source: "Alice", target: "Charlie" }, { source: "Bob", target: "David" }],
};

function RelationshipGraph({ onNodeClick }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-gray-700 font-semibold mb-4">User Relationships</h3>
      <ForceGraph2D
        graphData={data}
        nodeLabel="id"
        nodeAutoColorBy="group"
        onNodeClick={node => onNodeClick && onNodeClick(`User: ${node.id}`, `Group: ${node.group}`)}
      />
    </div>
  );
}

export default RelationshipGraph;
