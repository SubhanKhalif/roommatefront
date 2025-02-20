import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-4">📌 Navigation</h2>
      <ul className="space-y-3">
        <li>
          <Link
            to="/dashboard"
            className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-blue-500 transition duration-200"
          >
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="block py-2 px-4 bg-gray-800 rounded-md hover:bg-blue-500 transition duration-200"
          >
            👤 Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
