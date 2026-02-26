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

  // Safe growth calculation helper
  const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return current > 0 ? "100" : "0";
    return (((current - previous) / previous) * 100).toFixed(2);
  };

  const revenueGrowth = calculateGrowth(metrics?.totalRevenue, metrics?.previousRevenue);
  const orderGrowth = calculateGrowth(metrics?.totalOrders, metrics?.previousOrders);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', width: '100%' }}>
      <Dashboard
        revenues={`₹${metrics?.totalRevenue ?? 0}`}
        orders={`${metrics?.totalOrders ?? 0}`}
        pageViews={`${metrics?.pageVisits ?? 0}`}
        conversionRate={`${metrics?.conversionRate ?? 0}`}
        salesData={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          values: metrics?.dailyRevenue ?? Array(7).fill(0),
          totalRevenue: `${metrics?.totalRevenue ?? 0}`,
          todaySales: `${metrics?.totalOrders ?? 0}`,
          growth: revenueGrowth
        }}
        revenueData={{
          labels: ["Revenue", "Order"],
          values: [metrics?.totalRevenue || 0, metrics?.totalOrders || 0],
          changes: [revenueGrowth, orderGrowth]
        }}
      />
    </div>
  );
};

export default AdminDashboard;