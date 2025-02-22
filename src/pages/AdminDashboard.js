import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userResponse, postResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/api/admin/users/count`),
          fetch(`${process.env.REACT_APP_API_URL}/api/admin/posts/count`)
        ]);

        if (!userResponse.ok || !postResponse.ok) {
          throw new Error("Failed to fetch statistics");
        }

        const [usersCount, postsCount] = await Promise.all([
          userResponse.json(),
          postResponse.json()
        ]);

        setStats({ users: usersCount.total, posts: postsCount.total });
      } catch (error) {
        console.error("Error fetching stats:", error.message);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <h1 className="text-center mt-4 text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex justify-center space-x-8 mt-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl">{stats.users}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold">Total Posts</h2>
          <p className="text-3xl">{stats.posts}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
