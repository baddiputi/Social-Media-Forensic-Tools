import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TimelineChart({ onPointClick }) {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      { label: "Positive", data: [10, 20, 15, 25, 30, 20, 40], borderColor: "green", backgroundColor: "rgba(0,255,0,0.2)", tension: 0.4 },
      { label: "Negative", data: [5, 8, 6, 4, 7, 5, 3], borderColor: "red", backgroundColor: "rgba(255,0,0,0.2)", tension: 0.4 },
      { label: "Neutral", data: [12, 15, 10, 20, 18, 16, 22], borderColor: "gray", backgroundColor: "rgba(128,128,128,0.2)", tension: 0.4 },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    onClick: (event, elements) => {
      if (elements.length > 0 && onPointClick) {
        const datasetIndex = elements[0].datasetIndex;
        const index = elements[0].index;
        onPointClick(`${data.datasets[datasetIndex].label} on ${data.labels[index]}`, `Value: ${data.datasets[datasetIndex].data[index]}`);
      }
    },
  };

  return <Line data={data} options={options} />;
}

export default TimelineChart;
