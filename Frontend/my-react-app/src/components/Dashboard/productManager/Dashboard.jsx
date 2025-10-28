
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
   
  const lineData = {
    labels: salesData.labels,
    datasets: [
      {
        label: "Sales",
        data: salesData.values,
        fill: false,
        borderColor: "#ffffff",
        tension: 0.4,
        pointBackgroundColor: "#ffffff"
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
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
        backgroundColor: ["#ff4d4d", "#007bff"],
        borderWidth: 2
      }
    ]
  };
console.log('donut',revenueData)
  const doughnutOptions = {
    cutout: "70%",
    plugins: { legend: { display: false } }
  };

  return (
    <div className="container my-4" style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      {/* Top Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          {/* <div className="card text-center shadow">
            <div className="card-body">
              <h4 className="text-warning">${earnings}</h4>
              <p className="mb-1">All Earnings</p>
              <span className="badge bg-warning text-dark">
                10% changes on profit
              </span>
            </div>
          </div> */}
          <StatCard
               value={revenues}
                label="Revenue"
                color="warning" // Bootstrap orange
                icon="bi-currency-dollar"
                footerText="Revenue"
                />

        </div>

        <div className="col-md-3">
          <StatCard
            value={orders}
            label="Orders"
            color="danger"
            icon="bi-calendar-event"
            footerText="order performance"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            value={pageViews}
            label="Page Visited"
            color="success"
            icon="bi-file-earmark-text"
            footerText="daily views"
          />
        </div>

        <div className="col-md-3">
          <StatCard
            value={conversionRate}
            label="Conversion Rate"
            color="primary"
            icon="bi-hand-thumbs-up"
            footerText="Conversion Rate"
          />
        </div>
      </div>

      {/* Middle Row */}
      <div className="row g-3 mb-4">
        {/* Sales Per Day */}
        <div className="col-md-6">
          <div className="card shadow bg-primary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h6>Sales Per Day</h6>
                <span>{salesData.growth}%</span>
              </div>
              <Line data={lineData} options={lineOptions} height={100} />
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <h6>${salesData.totalRevenue}</h6>
                  <small>Total Revenue</small>
                </div>
                <div>
                  <h6>{salesData.todaySales}</h6>
                  <small>Today Sales</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body text-center">
              <h6 className="mb-3">Total Revenue</h6>
              <div style={{ width: "160px", margin: "0 auto" }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              <div className="d-flex justify-content-around mt-3">
                {revenueData.labels.map((label, idx) => (
                  <div key={idx}>
                    <span
                      style={{ color: doughnutData.datasets[0].backgroundColor[idx] }}
                    >
                      ●
                    </span>{" "}
                    {label}
                    <p
                      className={`mb-0 ${
                        revenueData.changes[idx] > 0
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {revenueData.changes[idx]}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
       
      </div>

      {/* Bottom Row */}
      
    </div>
  );
};

export default Dashboard;
