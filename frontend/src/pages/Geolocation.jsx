// src/pages/Geolocation.jsx
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt, FaDownload } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import html2canvas from "html2canvas";

function Geolocation() {
  const [mapGenerated, setMapGenerated] = useState(false);

  // Dummy negative users data with coordinates
  const negativeUsers = [
    { name: "User1", lat: 28.6139, lng: 77.209 }, // Delhi
    { name: "User2", lat: 19.076, lng: 72.8777 }, // Mumbai
    { name: "User3", lat: 13.0827, lng: 80.2707 }, // Chennai
  ];

  const mapRef = useRef(null);

  const generateMap = () => {
    setMapGenerated(true);
  };

  const downloadMap = () => {
    if (!mapRef.current) return;

    html2canvas(mapRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "negative-users-map.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">Geolocation Analysis</h1>
      <p className="text-gray-600">
        Visualize the locations of users with negative sentiment on an interactive map.
      </p>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={generateMap}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Generate Map
        </button>
        {mapGenerated && (
          <button
            onClick={downloadMap}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition flex items-center space-x-2"
          >
            <FaDownload /> <span>Export Map</span>
          </button>
        )}
      </div>

      {mapGenerated && (
        <div
          ref={mapRef}
          className="mt-6 rounded shadow"
          style={{ height: "500px", width: "100%" }}
        >
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {negativeUsers.map((user, idx) => (
              <Marker key={idx} position={[user.lat, user.lng]}>
                <Popup>
                  <strong>{user.name}</strong> - Negative Sentiment
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default Geolocation;
