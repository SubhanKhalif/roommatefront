import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ setIsEditing, setIsChangingPassword }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setProfile(storedUser);
    }
  }, [navigate]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 Your Profile</h1>
      <div className="flex justify-center">
        <img src={profile.profilePicture || `${process.env.REACT_APP_API_URL}/default-avatar.png`} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
      </div>

      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>📍 Location:</strong> {profile.location}</p>
      <p><strong>🚬 Smoking:</strong> {profile.smoking}</p>
      <p><strong>🐾 Pets:</strong> {profile.pets}</p>
      <p><strong>🧹 Cleanliness:</strong> {profile.cleanliness}</p>
      <p><strong>💰 Budget:</strong> {profile.budget}</p>
      <p><strong>🏠 Roommate Gender:</strong> {profile.roommateGender}</p>
      <p><strong>👥 Number of Roommates:</strong> {profile.roommatesCount}</p>

      <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">Edit Profile</button>
      <button onClick={() => setIsChangingPassword(true)} className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 ml-2">Change Password</button>
    </div>
  );
};

export default ProfileInfo;
