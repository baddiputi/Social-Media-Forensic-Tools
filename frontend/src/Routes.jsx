// src/Routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import DataCollection from "./pages/DataCollection";
import Overview from "./pages/Overview";
import TimelineAnalysis from "./pages/TimelineAnalysis";
import NetworkAnalysis from "./pages/NetworkAnalysis";
import Geolocation from "./pages/Geolocation";
import WordCloudPage from "./pages/WordCloudPage";
import Navbar from "./components/Navbar"; // optional, for navigation links

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> {/* Optional: add navigation */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/analytics" element={<Analytics />} />
  <Route path="/reports" element={<Reports />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
  <Route path="/datacollection" element={<DataCollection />} />
  <Route path="/overview" element={<Overview />} />
  <Route path="/timelineanalysis" element={<TimelineAnalysis />} />
  <Route path="/networkanalysis" element={<NetworkAnalysis />} />
  <Route path="/geolocation" element={<Geolocation />} />
  <Route path="/wordcloud" element={<WordCloudPage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
