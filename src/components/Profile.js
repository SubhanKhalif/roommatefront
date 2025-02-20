import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">🔒 Please log in to view your profile.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 Your Profile</h1>
      <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
      <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
      <p className="text-gray-700"><strong>📍 Location:</strong> {user.location}</p>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md font-semibold shadow-md hover:bg-blue-700 transition duration-300"
      >
        🚀 Go to Dashboard
      </button>
    </div>
  );
};

export default Profile;
