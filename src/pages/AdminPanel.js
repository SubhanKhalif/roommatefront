import React from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminPanel = () => {
  return (
    <div>
      <AdminNavbar />
      <h1 className="text-center mt-4 text-2xl font-bold">Admin Panel</h1>
      <p className="text-center text-gray-600">Manage users, posts, and view statistics.</p>
    </div>
  );
};

export default AdminPanel;
