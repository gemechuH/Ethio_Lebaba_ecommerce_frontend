import React from "react";
import { FaShoppingBag, FaMoneyBillWave, FaBox } from "react-icons/fa";

const UserStats = ({ stats }) => {
  if (!stats) return null;

  const statCards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <FaShoppingBag className="text-blue-500 text-2xl" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Spent",
      value: `$${Number(stats?.totalSpent || 0).toFixed(2)}`,
      icon: <FaMoneyBillWave className="text-green-500 text-2xl" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Products Purchased",
      value: stats?.totalOrders || 0,
      icon: <FaBox className="text-purple-500 text-2xl" />,
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-700 mt-2">
                {card.value}
              </p>
            </div>
            <div className="p-3 rounded-full bg-white shadow-sm">
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
