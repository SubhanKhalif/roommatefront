import { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setProfile(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Authorization failed: No token found");
        return;
      }

      let imageUrl = profile.profilePicture;
      if (profileImage) {
        const formData = new FormData();
        formData.append("image", profileImage);
        const uploadRes = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/:id/profile-image`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      const updatedProfile = { ...profile, profilePicture: imageUrl };

      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/profile`, updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">✏️ Edit Profile</h1>
      {message && <p className="text-red-500">{message}</p>}
      {loading && <p className="text-blue-500">Updating...</p>}

      <div className="flex justify-center mb-4">
        <img src={profile.profilePicture || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full" />
      </div>

      <label><strong>Profile Picture:</strong></label>
      <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>Name:</strong></label>
      <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>Email:</strong></label>
      <input type="email" name="email" value={profile.email} disabled className="w-full p-2 border rounded-md mb-2 bg-gray-200" />

      <label><strong>📍 Location:</strong></label>
      <input type="text" name="location" value={profile.location} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>🚬 Smoking:</strong></label>
      <input type="text" name="smoking" value={profile.smoking} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>🐾 Pets:</strong></label>
      <input type="text" name="pets" value={profile.pets} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>🧹 Cleanliness:</strong></label>
      <input type="text" name="cleanliness" value={profile.cleanliness} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>💰 Budget:</strong></label>
      <input type="text" name="budget" value={profile.budget} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>🏠 Roommate Gender:</strong></label>
      <input type="text" name="roommateGender" value={profile.roommateGender} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <label><strong>👥 Number of Roommates:</strong></label>
      <input type="text" name="roommatesCount" value={profile.roommatesCount} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />

      <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md mt-4">Save</button>
    </div>
  );
};

export default EditProfile;
