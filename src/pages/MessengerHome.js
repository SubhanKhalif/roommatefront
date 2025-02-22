import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MessengerHome = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, config);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center text-gray-600">
          🔒 Please <span className="text-blue-500 font-semibold">log in</span> to view messages.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-4 border-r">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              <Link
                to={`/chat/${user._id}`}
                className="flex items-center p-3 bg-white rounded-lg shadow-md hover:bg-gray-200"
              >
                <img
                  src={user.profilePicture || "https://via.placeholder.com/50"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area Placeholder */}
      <div className="w-2/3 flex items-center justify-center text-gray-400">
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default MessengerHome;
