
import React, { useState, useEffect } from "react";
import { fetchReportSummary } from "../services/api";
import SummaryTable from "../components/SummaryTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

function Loader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function Notification({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center space-x-2"
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-lg font-bold">×</button>
    </motion.div>
  );
}

function Reports() {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      setError("");
      try {
        const data = await fetchReportSummary();
        setSummaryData(data.summary || []);
      } catch (err) {
        setError("Failed to fetch report summary data.");
      }
      setFetching(false);
    };
    fetchData();
  }, []);

  const downloadPDF = async () => {
    const element = document.getElementById("report-section");
    setLoading(true);
    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);
      pdf.save("case-report.pdf");
      setNotification("PDF downloaded!");
    } catch (e) {
      setNotification("Failed to download PDF.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 py-10">
      <AnimatePresence>
        {notification && (
          <Notification message={notification} onClose={() => setNotification("")} />
        )}
      </AnimatePresence>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        Case Reports
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative w-full max-w-4xl"
      >
        <div className="flex gap-4 mb-6 justify-end">
          <CSVLink
            data={summaryData}
            filename={"case-report.csv"}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 transition"
            onClick={() => setNotification("CSV downloaded!")}
            disabled={fetching || summaryData.length === 0}
          >
            <FaFileCsv className="mr-2" /> Download CSV
          </CSVLink>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={downloadPDF}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-400 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            disabled={loading || fetching}
          >
            <FaFilePdf className="mr-2" />
            {loading ? "Exporting..." : "Download PDF"}
          </motion.button>
        </div>
        <div
          id="report-section"
          className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-2xl p-8 space-y-8"
        >
          {fetching ? (
            <Loader />
          ) : error ? (
            <div className="text-red-600 font-semibold mb-4">{error}</div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-indigo-200 via-cyan-100 to-blue-100 rounded-2xl p-6 shadow"
              >
                <h2 className="font-semibold text-lg mb-2 text-indigo-700">Summary</h2>
                <SummaryTable data={summaryData} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 rounded-2xl p-6 shadow"
              >
                <h2 className="font-semibold text-lg mb-2 text-cyan-700">Timeline Report</h2>
                <p className="text-gray-700">Timeline charts will be here (Placeholder)</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-r from-blue-100 via-indigo-100 to-cyan-100 rounded-2xl p-6 shadow"
              >
                <h2 className="font-semibold text-lg mb-2 text-blue-700">Network Analysis Report</h2>
                <p className="text-gray-700">Network graphs and influencers will be here (Placeholder)</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-r from-lime-100 via-green-100 to-cyan-100 rounded-2xl p-6 shadow"
              >
                <h2 className="font-semibold text-lg mb-2 text-green-700">Geolocation Report</h2>
                <p className="text-gray-700">Map visualization will be here (Placeholder)</p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Reports;
