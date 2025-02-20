import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    smoking: "No",
    pets: "No",
    cleanliness: "Moderate",
    workFromHome: "No",
    budget: "",
    roommateGender: "Any",
    roommatesCount: 1,
    profilePicture: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setProfile({ ...storedUser });
    }
  }, [navigate]);

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
        const uploadRes = await axios.post("http://localhost:3002/api/users/:id/profile-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      const updatedProfile = { ...profile, profilePicture: imageUrl };

      const { data } = await axios.put("http://localhost:3002/api/users/profile", updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
      setIsEditing(false);
      localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Send verification email
  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:3002/api/users/reset-password", { email: profile.email });
      setMessage("📩 Verification email sent! Check your inbox.");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending email.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      console.log("Sending OTP verification request:", { email: profile.email, otp });
  
      const { data } = await axios.post("http://localhost:3002/api/users/verify-token", {
        email: profile.email,
        otp,
      });
  
      console.log("Response:", data);
      setMessage("✅ OTP verified! Now set your new password.");
      setStep(3);
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "Invalid OTP.");
    }
  };
  
  // Step 3: Update Password
  const handleUpdatePassword = async () => {
    try {
      await axios.put("http://localhost:3002/api/users/update-password", {
        email: profile.email,
        newPassword,
      });
      setMessage("🎉 Password updated successfully! Please log in again.");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating password.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">👤 Your Profile</h1>
      {message && <p className="text-center text-red-500">{message}</p>}
      {loading && <p className="text-center text-blue-500">Updating...</p>}
      <div className="flex justify-center">
        <img src={profile.profilePicture || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
      </div>

      {isEditing ? (
        <>
          <input type="text" name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md mb-2" />
          <input type="text" name="location" value={profile.location} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />
          <select name="smoking" value={profile.smoking} onChange={handleChange} className="w-full p-2 border rounded-md mb-2">
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <select name="pets" value={profile.pets} onChange={handleChange} className="w-full p-2 border rounded-md mb-2">
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
          <select name="cleanliness" value={profile.cleanliness} onChange={handleChange} className="w-full p-2 border rounded-md mb-2">
            <option value="Moderate">Moderate</option>
            <option value="Very Clean">Very Clean</option>
            <option value="Messy">Messy</option>
          </select>
          <input type="number" name="budget" value={profile.budget} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" placeholder="Budget" />
          <select name="roommateGender" value={profile.roommateGender} onChange={handleChange} className="w-full p-2 border rounded-md mb-2">
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="number" name="roommatesCount" value={profile.roommatesCount} onChange={handleChange} className="w-full p-2 border rounded-md mb-2" />
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md mr-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
        </>
      ) : (
        <>
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
        </>
      )}

      <hr className="my-4" />

      <div className="flex gap-2">
        <button onClick={() => setIsChangingPassword(true)} className="bg-red-600 text-white px-4 py-2 rounded-md">
          Change Password
        </button>
        <button 
          onClick={() => navigate("/dashboard")}
          className="bg-purple-600 text-white px-4 py-2 rounded-md"
        >
          Go to Dashboard
        </button>
      </div>

      {isChangingPassword && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          {step === 1 && (
            <>
              <p>Enter your email to receive an OTP:</p>
              <input type="email" value={profile.email} disabled className="w-full p-2 border rounded-md mt-2" />
              <button onClick={handleSendEmail} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2">
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p>Enter the OTP sent to your email:</p>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 border rounded-md mt-2" />
              <button onClick={handleVerifyOtp} className="bg-green-600 text-white px-4 py-2 rounded-md mt-2">
                Verify OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p>Enter your new password:</p>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded-md mt-2" />
              <button onClick={handleUpdatePassword} className="bg-green-600 text-white px-4 py-2 rounded-md mt-2">
                Update Password
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;

