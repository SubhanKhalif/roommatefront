import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Open edit modal
  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedLocation(user.location);
  };

  // Update user
  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName, email: updatedEmail, location: updatedLocation }),
      });

      if (response.ok) {
        setUsers(users.map((user) => (user._id === editingUser._id ? { ...user, name: updatedName, email: updatedEmail, location: updatedLocation } : user)));
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h1 className="text-center mt-4 text-2xl font-bold">Manage Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        className="block mx-auto p-2 border rounded mt-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Users List */}
      <ul className="mt-6">
        {filteredUsers.map((user) => (
          <li key={user._id} className="bg-white p-4 rounded-lg shadow-md mb-4 relative">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-700">{user.email}</p>
            <p className="text-sm text-gray-500">📍 {user.location}</p>

            <div className="absolute top-2 right-2 flex space-x-2">
              <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <label className="block mb-2">Name:</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Location:</label>
            <input
              type="text"
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex space-x-2">
              <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
              <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
