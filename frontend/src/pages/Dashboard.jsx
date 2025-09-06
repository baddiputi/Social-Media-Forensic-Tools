import React, { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import AnalyticsTabs from "../components/AnalyticsTabs";
import DetailModal from "../components/DetailModal";
import SummaryTable from "../components/SummaryTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: null });

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

    const pdf = new jsPDF("landscape", "pt", "a4");
    let yOffset = 20;

    const addElementToPDF = (index) => {
      if (index >= elements.length) {
        pdf.save("case-report.pdf");
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
    <div className="p-6">
      {/* Download Full Case Report Button */}
      <button
        onClick={downloadReport}
        className="mb-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Download Full Case Report
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dashboard Cards */}
        <DashboardCard
          title="Total Posts"
          value="120"
          icon="📝"
          color="blue"
          onClick={() => openModal("Total Posts Details", "List of all posts...")}
        />
        <DashboardCard
          title="Positive Posts"
          value="80"
          icon="😊"
          color="green"
          onClick={() => openModal("Positive Posts Details", "List of positive posts...")}
        />
        <DashboardCard
          title="Neutral Posts"
          value="30"
          icon="😐"
          color="yellow"
          onClick={() => openModal("Neutral Posts Details", "List of neutral posts...")}
        />
        <DashboardCard
          title="Negative Posts"
          value="10"
          icon="😡"
          color="red"
          onClick={() => openModal("Negative Posts Details", "List of negative posts...")}
        />

        {/* Summary Table */}
        <div id="summary-table" className="md:col-span-4 lg:col-span-4">
          <SummaryTable data={[
            { Metric: "Total Posts", Count: 120 },
            { Metric: "Positive Posts", Count: 80 },
            { Metric: "Neutral Posts", Count: 30 },
            { Metric: "Negative Posts", Count: 10 },
            { Metric: "Top Influencer", Count: "Alice" },
          ]} />
        </div>

        {/* Analytics Tabs */}
        <div className="md:col-span-2 lg:col-span-2">
          <AnalyticsTabs
            onPointClick={openModal}
            onMarkerClick={openModal}
            onWordClick={openModal}
            onNodeClick={openModal}
          />
        </div>
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
