import React from "react";
import { useSelector } from "react-redux";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi";
import { ClimbingBoxLoader } from "react-spinners";
import AdminStats from "./AdminStats";
import AdminStatsChart from "./AdminStatsChart";

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClimbingBoxLoader />
      </div>
    );
  if (!stats) return <div>no stats found</div>;
  if (error) return <div>failed to load stats</div>;

  return (
    <div className="min-h-screen w-full max-w-[1400px] mx-auto px-4 py-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Hello {user?.userName}! Welcome to the admin dashboard
        </p>

        <div className="space-y-8">
          <AdminStats stats={stats} />
          <AdminStatsChart stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default AdminDMain;
