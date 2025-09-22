// src/pages/Geolocation.jsx
import React, { useState, useRef } from "react";
import { fetchGeolocationData } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FaMapMarkerAlt, FaDownload } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

function Geolocation() {

  const [mapGenerated, setMapGenerated] = useState(false);
  const [negativeUsers, setNegativeUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  const generateMap = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchGeolocationData();
      setNegativeUsers(data.users || []);
      setMapGenerated(true);
    } catch (err) {
      setError("Failed to fetch geolocation data.");
    }
    setLoading(false);
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
    <div className="relative min-h-screen p-0 md:p-8 flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-50 via-green-50 to-pink-50">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-green-200/20 rounded-full blur-3xl animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-pink-300/30 to-blue-100/20 rounded-full blur-3xl animate-pulse delay-2000" style={{ filter: 'blur(80px)' }} />
      </div>

      <h1 className="z-10 text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-pink-600 drop-shadow-lg">Geolocation Analysis</h1>
      <p className="z-10 text-gray-600 mb-8 text-lg">Visualize the locations of users with negative sentiment on an interactive map.</p>


      <div className="z-10 flex flex-wrap gap-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateMap}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 via-green-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl hover:from-blue-600 hover:to-pink-600 transition-all duration-200"
          disabled={mapGenerated || loading}
        >
          {loading ? "Generating..." : mapGenerated ? "Map Generated" : "Generate Map"}
        </motion.button>
        {mapGenerated && !loading && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadMap}
            className="px-8 py-3 bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white font-bold rounded-2xl shadow-xl hover:from-green-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2"
          >
            <FaDownload /> <span>Export Map</span>
          </motion.button>
        )}
      </div>

      {error && (
        <div className="mb-4 text-red-600 font-semibold bg-red-100 rounded-xl px-4 py-2 shadow">{error}</div>
      )}


      {loading && (
        <div className="mb-8 text-lg text-blue-600 font-semibold animate-pulse">Loading geolocation data...</div>
      )}
      {mapGenerated && !loading && (
        <motion.div
          ref={mapRef}
          className="z-10 mt-8 rounded-3xl shadow-2xl border border-blue-200/40 backdrop-blur-lg bg-white/80"
          style={{ height: "500px", width: "100%", maxWidth: 900 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {negativeUsers.length === 0 ? (
              null
            ) : (
              negativeUsers.map((user, idx) => (
                <Marker key={idx} position={[user.lat, user.lng]}>
                  <Popup>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="font-bold">{user.name}</span> <span className="text-xs text-red-600">Negative Sentiment</span>
                    </div>
                  </Popup>
                </Marker>
              ))
            )}
          </MapContainer>
        </motion.div>
      )}
    </div>
  );
}

export default Geolocation;
