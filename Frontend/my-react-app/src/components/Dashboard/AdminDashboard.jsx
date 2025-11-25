import React, { useEffect, useState } from 'react';
import DashboardLayout from '../Dashboard/DashboardLayout';
import Dashboard from './productManager/Dashboard';
import axios from 'axios';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/metrics`)
      .then(res => setMetrics(res.data));
  }, []);
 
  
  return (
    <>
       <Dashboard
      revenues={`₹${metrics?.totalRevenue ?? 0}`}
      orders={`${metrics?.totalOrders?? 0}`}
      pageViews={`${metrics?.pageVisits?? 0}`}
      conversionRate={`${metrics?.conversionRate?? 0}`}
      salesData = {{
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        values: metrics?.dailyRevenue ?? [],
        totalRevenue: `₹${metrics?.totalRevenue ?? 0}`,
        todaySales: `${metrics?.totalOrders ?? 0}`,
        growth: metrics?.previousRevenue > 0
          ? (((metrics.totalRevenue - metrics.previousRevenue) / metrics.previousRevenue) * 100).toFixed(2)
          : 0
      }}
      revenueData={{
        labels: ["Revenue", "Order"],
        values: [metrics?.totalRevenue,metrics?.totalOrders],
        changes: [
        ((metrics?.totalRevenue - metrics?.previousRevenue) / metrics?.previousRevenue) * 100,
        ((metrics?.totalOrders - metrics?.previousOrders) / metrics?.previousOrders) * 100
      ]
      }}
      // trafficSources={[
      //   { label: "Direct", value: 80, color: "primary" },
      //   { label: "Social", value: 50, color: "secondary" },
      //   { label: "Referral", value: 20, color: "info" },
      //   { label: "Bounce", value: 60, color: "dark" },
      //   { label: "Internet", value: 40, color: "success" }
      // ]}
      // realty={-0.99}
      // infra={-7.66}
    />
 </>
  );
};

export default AdminDashboard;