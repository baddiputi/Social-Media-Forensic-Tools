// src/pages/WordCloud.jsx
import React, { useMemo } from "react";
import WordCloud from "react-wordcloud"; // use the v2 fork compatible with React 18

const words = [
  { text: "COVID", value: 120 },
  { text: "Security", value: 90 },
  { text: "Breach", value: 60 },
  { text: "Warning", value: 80 },
  { text: "Alert", value: 50 },
  { text: "Data", value: 100 },
  { text: "Hashtag", value: 70 },
  { text: "User", value: 40 },
  { text: "Threat", value: 55 },
  { text: "Malware", value: 65 },
  // Add more words as needed
];

function WordCloudPage() {
  // optional callback on word click
  const handleWordClick = (word) => {
    alert(`Word: ${word.text}\nFrequency: ${word.value}`);
  };

  // WordCloud options
  const options = useMemo(
    () => ({
      rotations: 2,
      rotationAngles: [-15, 15],
      fontSizes: [20, 60],
      enableTooltip: true,
      deterministic: false,
      padding: 3,
      fontFamily: "Arial",
      fontWeight: "bold",
      scale: "sqrt",
    }),
    []
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Word Cloud</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <WordCloud
          words={words}
          options={options}
          callbacks={{ onWordClick: handleWordClick }}
        />
      </div>
    </div>
  );
}

export default WordCloudPage;
