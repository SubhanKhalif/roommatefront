import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Admin Panel Logo */}
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/admin/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
          <Link to="/admin/users" className="hover:text-gray-400">
            Manage Users
          </Link>
          <Link to="/admin/posts" className="hover:text-gray-400">
            Manage Posts
          </Link>
          <Link to="/landingpage" className="hover:text-gray-400">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
