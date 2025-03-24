import React, { useRef, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    BarElement, // Import BarElement here
  } from "chart.js";
  import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
  import { Chart } from "react-chartjs-2";
  
  // Register everything required
  ChartJS.register(
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title,
    BarElement, // Register BarElement here
    MatrixController,
    MatrixElement
  );
  

function AdminReport() {
  const COLORS = {
    HIGH: "red",
    MEDIUM: "yellow",
    LOW: "green",
  };

  // Data for Bar Chart (First Graph - data1)
  const barData = {
    labels: [
      "Organization",
      "Business Alignment",
      "Contract Management",
      "Performance Management",
      "Financial Management",
      "Vendor Alignment",
      "Relationship Management",
      "Project Management",
      "Compliance Management",
      "Risk Management",
    ],
    datasets: [
      {
        label: "Scores",
        data: [5.3, 5.4, 5.4, 5.3, 4.95, 5.8, 4.55, 4.55, 5.9, 5.75],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Graph 1: Scores by Category" },
    },
    scales: {
      x: { title: { display: true, text: "Category" } },
      y: { title: { display: true, text: "Score" }, beginAtZero: true },
    },
  };

  // Data for Heatmap (Second Graph - data2)
  const heatmapData1 = {
    datasets: [
      {
        label: "Heatmap 1",
        data: [
          { x: 1, y: "Organization", v: 5.8 },
          { x: 2, y: "Process", v: 5.25 },
          { x: 3, y: "Automation", v: 5.0 },
          // Add other rows here...
        ],
        backgroundColor: (ctx) => {
          const value = ctx.raw.v;
          return value > 7 ? COLORS.HIGH : value > 5 ? COLORS.MEDIUM : COLORS.LOW;
        },
      },
    ],
  };

  const heatmapOptions1 = {
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { type: "category" },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Value: ${ctx.raw.v}`,
        },
      },
    },
  };

  // Data for Heatmap (Third Graph - data3)
  const heatmapData2 = {
    datasets: [
      {
        label: "Heatmap 2",
        data: [
          { x: 1, y: "Q1", v: 2 },
          { x: 2, y: "Q2", v: 8 },
          { x: 3, y: "Q3", v: 4 },
          // Add other rows here...
        ],
        backgroundColor: (ctx) => {
          const value = ctx.raw.v;
          return value > 7 ? COLORS.HIGH : value > 5 ? COLORS.MEDIUM : COLORS.LOW;
        },
      },
    ],
  };

  const heatmapOptions2 = {
    scales: {
      x: { type: "linear", position: "bottom" },
      y: { type: "category" },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Value: ${ctx.raw.v}`,
        },
      },
    },
  };

  return (
    <div>
      <h1>Admin Report</h1>

      {/* Bar Chart */}
      <div>
        <h2>Graph 1: Scores by Category</h2>
        <Chart type="bar" data={barData} options={barOptions} />
      </div>

      {/* Heatmap 1 */}
      <div>
        <h2>Graph 2: Heatmap of Data2</h2>
        <Chart type="matrix" data={heatmapData1} options={heatmapOptions1} />
      </div>

      {/* Heatmap 2 */}
      <div>
        <h2>Graph 3: Heatmap of Questions Data</h2>
        <Chart type="matrix" data={heatmapData2} options={heatmapOptions2} />
      </div>
    </div>
  );
}

export default React.memo(AdminReport);
