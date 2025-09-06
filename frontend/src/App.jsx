import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Overview from "./pages/Overview";
import DataCollection from "./pages/DataCollection";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import TimelineAnalysis from "./pages/TimelineAnalysis";
import NetworkAnalysis from "./pages/NetworkAnalysis";
import Geolocation from "./pages/Geolocation";
import Reports from "./pages/Reports";
import WordCloudPage from "./pages/WordCloudPage";
import Settings from "./pages/Settings";

// Layout components
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <main className="flex-grow p-6 bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/datacollection" element={<DataCollection />} />
          <Route path="/sentimentanalysis" element={<SentimentAnalysis />} />
          <Route path="/timelineanalysis" element={<TimelineAnalysis />} />
          <Route path="/networkanalysis" element={<NetworkAnalysis />} />
          <Route path="/geolocation" element={<Geolocation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/wordcloud" element={<WordCloudPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
