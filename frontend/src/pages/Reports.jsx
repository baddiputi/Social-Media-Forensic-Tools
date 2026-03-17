import React from "react";
import SummaryTable from "../components/SummaryTable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";

function Reports() {
  const summaryData = [
    { metric: "Total Posts", value: 120 },
    { metric: "Positive Posts", value: 80 },
    { metric: "Neutral Posts", value: 30 },
    { metric: "Negative Posts", value: 10 },
    { metric: "Top Influencer", value: "@exampleuser" },
    { metric: "Suspicious Patterns", value: 3 },
  ];

  const downloadPDF = () => {
    const element = document.getElementById("report-section");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);
      pdf.save("case-report.pdf");
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Case Reports</h1>

      <div className="flex gap-4">
        {/* Download CSV */}
        <CSVLink
          data={summaryData}
          filename={"case-report.csv"}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download CSV
        </CSVLink>

        {/* Download PDF */}
        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      <div id="report-section" className="mt-6 space-y-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Summary</h2>
          <SummaryTable data={summaryData} />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Timeline Report</h2>
          <p>Timeline charts will be here (Placeholder)</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Network Analysis Report</h2>
          <p>Network graphs and influencers will be here (Placeholder)</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Geolocation Report</h2>
          <p>Map visualization will be here (Placeholder)</p>
        </div>
      </div>
    </div>
  );
}

export default Reports;
