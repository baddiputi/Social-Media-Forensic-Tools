import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllPosts, createPost, fetchUsers } from "../services/api";
import DashboardCard from "../components/DashboardCard";
import AnalyticsTabs from "../components/AnalyticsTabs";
import DetailModal from "../components/DetailModal";
import SummaryTable from "../components/SummaryTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import Tooltip from "../components/Tooltip";

function Dashboard() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: null });
  const [loading, setLoading] = useState(false);
  const [notif, setNotif] = useState({ show: false, type: "success", message: "" });
  // Try navigation state, then localStorage, then fallback to DB
  const [posts, setPosts] = useState(() => {
    if (location.state?.posts) return location.state.posts;
    try {
      const stored = localStorage.getItem("latestCollectedPosts");
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return [];
  });
  const [apiError, setApiError] = useState("");

  // If no posts in state or localStorage, fetch from backend
  useEffect(() => {
    if (!(location.state?.posts) && posts.length === 0) {
      fetchAllPosts()
        .then((data) => {
          setPosts(data);
          setApiError("");
        })
        .catch((err) => {
          setApiError("Could not fetch posts from backend.");
        });
    }
  }, [location.state, posts.length]);

  const openModal = (title, data) => {
    setModalContent({ title, data });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Full Case Report Download
  const downloadReport = () => {
    const elements = [
      document.getElementById("summary-table"),
      document.getElementById("tab-content-0"),
      document.getElementById("tab-content-1"),
      document.getElementById("tab-content-2"),
      document.getElementById("tab-content-3"),
    ];
    setLoading(true);
    const pdf = new jsPDF("landscape", "pt", "a4");
    let yOffset = 20;

    const addElementToPDF = (index) => {
      if (index >= elements.length) {
        pdf.save("case-report.pdf");
        setLoading(false);
        setNotif({ show: true, type: "success", message: "Case report downloaded!" });
        return;
      }
      html2canvas(elements[index]).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 40; // margin
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 20, yOffset, pdfWidth, pdfHeight);
        yOffset += pdfHeight + 20;
        if (index < elements.length - 1) pdf.addPage();
        addElementToPDF(index + 1);
      });
    };
    addElementToPDF(0);
  };

  return (
    <div className="relative min-h-screen p-0 md:p-6 flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Notification */}
      <Notification show={notif.show} type={notif.type} message={notif.message} onClose={() => setNotif({ ...notif, show: false })} />
      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <Loader text="Generating report..." />
        </div>
      )}
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-2000" style={{ filter: 'blur(80px)' }} />
      </div>

      {/* Download Full Case Report Button */}
      <Tooltip text="Download a beautiful PDF report of your dashboard!">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={downloadReport}
          className="z-10 mb-8 px-8 py-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-white font-bold rounded-2xl shadow-xl hover:from-green-500 hover:to-teal-500 transition-all duration-200 backdrop-blur-lg border border-white/30"
        >
          Download Full Case Report
        </motion.button>
      </Tooltip>

      {/* Show posts fetched from database */}
      <div className="z-10 w-full max-w-2xl mb-8">
        <div className="bg-white/80 rounded-xl shadow p-4 mb-4">
          <h2 className="text-lg font-bold mb-2 text-blue-700">Posts from Database</h2>
          {apiError && <div className="text-red-500 mb-2">{apiError}</div>}
          {posts.length === 0 && !apiError && <div className="text-gray-500">No posts found.</div>}
          <ul className="list-disc pl-6 space-y-1">
            {posts.slice(0, 5).map((post, idx) => (
              <li key={post.id || idx} className="text-gray-800">
                {post.content || JSON.stringify(post)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Dashboard Cards */}
        <motion.div whileHover={{ y: -8, scale: 1.04 }} transition={{ type: 'spring', stiffness: 200 }}>
          <Tooltip text="Total number of posts collected">
            <DashboardCard
              title="Total Posts"
              value="120"
              icon="📝"
              color="blue"
              onClick={() => openModal("Total Posts Details", "List of all posts...")}
            />
          </Tooltip>
        </motion.div>
        <motion.div whileHover={{ y: -8, scale: 1.04 }} transition={{ type: 'spring', stiffness: 200, delay: 0.05 }}>
          <Tooltip text="Number of positive sentiment posts">
            <DashboardCard
              title="Positive Posts"
              value="80"
              icon="😊"
              color="green"
              onClick={() => openModal("Positive Posts Details", "List of positive posts...")}
            />
          </Tooltip>
        </motion.div>
        <motion.div whileHover={{ y: -8, scale: 1.04 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}>
          <Tooltip text="Number of neutral sentiment posts">
            <DashboardCard
              title="Neutral Posts"
              value="30"
              icon="😐"
              color="yellow"
              onClick={() => openModal("Neutral Posts Details", "List of neutral posts...")}
            />
          </Tooltip>
        </motion.div>
        <motion.div whileHover={{ y: -8, scale: 1.04 }} transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}>
          <Tooltip text="Number of negative sentiment posts">
            <DashboardCard
              title="Negative Posts"
              value="10"
              icon="😡"
              color="red"
              onClick={() => openModal("Negative Posts Details", "List of negative posts...")}
            />
          </Tooltip>
        </motion.div>

        {/* Summary Table */}
        <motion.div id="summary-table" className="md:col-span-4 lg:col-span-4 mt-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SummaryTable data={[
            { metric: "Total Posts", value: 120 },
            { metric: "Positive Posts", value: 80 },
            { metric: "Neutral Posts", value: 30 },
            { metric: "Negative Posts", value: 10 },
            { metric: "Top Influencer", value: "Alice" },
          ]} />
        </motion.div>

        {/* Analytics Tabs */}
        <motion.div className="md:col-span-2 lg:col-span-2 mt-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <AnalyticsTabs
            onPointClick={openModal}
            onMarkerClick={openModal}
            onWordClick={openModal}
            onNodeClick={openModal}
          />
        </motion.div>
      </div>

      {/* Modal for details */}
      <DetailModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        title={modalContent.title}
      >
        {modalContent.data}
      </DetailModal>
    </div>
  );
}

export default Dashboard;
