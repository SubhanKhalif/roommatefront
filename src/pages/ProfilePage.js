import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ChatBox from "../components/ChatBox";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, config);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (currentUser) {
      fetchUser();
    }
  }, [userId, currentUser]);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center text-gray-600">
          🔒 Please <span className="text-blue-500 font-semibold">log in</span> to view profiles.
        </p>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10">Loading user profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img 
          src={user.profilePicture || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-2xl text-center font-bold mt-4">{user.name}</h2>
        <p className="text-center text-gray-500">@{user.username}</p>
        <p className="text-center text-gray-700 mt-2">{user.bio || "No bio available."}</p>
        <p className="text-center text-gray-500">📍 {user.location}</p>

        {/* Additional Profile Information */}
        <div className="mt-6 space-y-2">
          <p><strong>🚬 Smoking:</strong> {user.smoking || "Not specified"}</p>
          <p><strong>🐾 Pets:</strong> {user.pets || "Not specified"}</p>
          <p><strong>🧹 Cleanliness:</strong> {user.cleanliness || "Not specified"}</p>
          <p><strong>💰 Budget:</strong> {user.budget || "Not specified"}</p>
          <p><strong>🏠 Roommate Gender:</strong> {user.roommateGender || "Not specified"}</p>
          <p><strong>👥 Number of Roommates:</strong> {user.roommatesCount || "Not specified"}</p>
        </div>

        {/* Contact Button */}
        <div className="text-center mt-6">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowChat(true)}
          >
            Message
          </button>
        </div>

        {showChat && <ChatBox currentUser={{ _id: currentUser._id }} />}
      </div>
    </div>
  );
};

export default ProfilePage;
