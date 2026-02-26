
import "bootstrap/dist/css/bootstrap.min.css";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import StatCard from "./StatCard";
import axios from "axios";

// Register chart.js modules
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = ({
  revenues,
  orders,
  pageViews,
  conversionRate,
  salesData,
  revenueData,
  trafficSources,
  realty,
  infra
}) => {
  // Line chart config (Sales Per Day)

  const brandColors = {
    brown: '#713200',
    gold: '#d4af37',
    sandal: '#f5e1a4',
    white: '#ffffff',
    bg: '#fdf8f0'
  };

  const lineData = {
    labels: salesData.labels,
    datasets: [
      {
        label: "Sales",
        data: salesData.values,
        fill: false,
        borderColor: brandColors.brown,
        tension: 0.4,
        pointBackgroundColor: brandColors.brown,
        borderWidth: 3
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    hover: { mode: null }, // Disable hover resizing to keep it stable
    scales: {
      x: { display: false },
      y: { display: false }
    }
  };

  // Doughnut Chart (Revenue Breakdown)
  const doughnutData = {
    labels: revenueData.labels,
    datasets: [
      {
        data: revenueData.values,
        backgroundColor: [brandColors.brown, brandColors.gold],
        borderWidth: 4,
        borderColor: brandColors.white, // Border makes segments look like distinct 'marks' or 'lines'
        hoverOffset: 0
      }
    ]
  };

  const doughnutOptions = {
    cutout: "80%", // Thinner cutout creates a 'line' effect in the circle
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    animation: { animateRotate: true },
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: brandColors.bg, minHeight: "100vh" }}>
      {/* Top Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <StatCard
            value={revenues}
            label="Revenue"
            color="brown"
            icon="bi-currency-dollar"
            footerText="Revenue"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            value={orders}
            label="Orders"
            color="gold"
            icon="bi-calendar-event"
            footerText="order performance"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            value={pageViews}
            label="Page Visited"
            color="brown"
            icon="bi-file-earmark-text"
            footerText="daily views"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            value={conversionRate}
            label="Conversion Rate"
            color="gold"
            icon="bi-hand-thumbs-up"
            footerText="Conversion Rate"
          />
        </div>
      </div>

      {/* Middle Row */}
      <div className="row g-3 mb-4">
        {/* Sales Per Day */}
        <div className="col-md-6">
          <div className="card shadow border-0 h-100" style={{ backgroundColor: brandColors.white, borderRadius: '12px' }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between mb-2">
                <h6 className="mb-0 fw-bold" style={{ color: brandColors.brown }}>Sales Per Day</h6>
                <span className="badge rounded-pill" style={{ backgroundColor: brandColors.sandal, color: brandColors.brown }}>{salesData.growth}%</span>
              </div>
              <div style={{ height: "120px" }}>
                <Line data={lineData} options={lineOptions} />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h6 className="fw-bold" style={{ color: brandColors.brown }}>{salesData.totalRevenue}</h6>
                  <small className="text-secondary fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>Total Revenue</small>
                </div>
                <div className="text-end">
                  <h6 className="fw-bold" style={{ color: brandColors.gold }}>{salesData.todaySales}</h6>
                  <small className="text-secondary fw-bold text-uppercase" style={{ fontSize: '0.7rem' }}>Today Sales</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-md-6">
          <div className="card shadow border-0 h-100" style={{ borderRadius: '12px', backgroundColor: brandColors.white }}>
            <div className="card-body p-4 text-center">
              <h6 className="mb-4 fw-bold" style={{ color: brandColors.brown }}>Total Revenue Breakdown</h6>
              <div style={{ height: "180px", position: "relative", marginBottom: "25px" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="d-flex justify-content-around mt-2">
                {revenueData.labels.map((label, idx) => (
                  <div key={idx} className="text-center">
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <span
                        className="rounded-circle"
                        style={{ width: '10px', height: '10px', backgroundColor: doughnutData.datasets[0].backgroundColor[idx] }}
                      ></span>
                      <span className="small fw-bold text-secondary text-uppercase">{label}</span>
                    </div>
                    <p
                      className="mb-0 fw-bold"
                      style={{ color: brandColors.brown }}
                    >
                      {revenueData.changes[idx]}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
    </div>
  );
};

export default Dashboard;
