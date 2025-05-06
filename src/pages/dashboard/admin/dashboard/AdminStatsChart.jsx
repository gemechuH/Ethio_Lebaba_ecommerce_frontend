import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminStatsChart = ({ stats }) => {
  // Pie Chart Data
  const pieData = {
    labels: ["Total Orders", "Total Products", "Total Reviews", "Total Users"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats?.stats?.totalOrders,
          stats?.stats?.totalProducts,
          stats?.stats?.totalReviews,
          stats?.stats?.totalUsers,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

 
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 11,
          },
        },
      },
      title: {
        display: true,
        text: "Distribution of Platform Statistics",
        font: {
          size: 14,
        },
      },
    },
  };

  // Line Chart Data
  const monthlyData = new Array(12).fill(0);
  stats?.stats?.monthlyEarnings?.forEach((entry) => {
    monthlyData[entry.month - 1] = parseFloat(entry.earnings);
  });

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Earnings ($)",
        data: monthlyData,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Earnings Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

   return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
       <div className="bg-white p-4 rounded-lg shadow h-[300px] md:h-[400px]">
         <Pie data={pieData} options={pieOptions} />
       </div>
       <div className="bg-white p-4 rounded-lg shadow h-[300px] md:h-[400px]">
         <Line data={lineData} options={lineOptions} />
       </div>
     </div>
   );
};

export default AdminStatsChart;
