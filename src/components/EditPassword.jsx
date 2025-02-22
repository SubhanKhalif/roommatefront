import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditPassword = ({ email, logout }) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/reset-password`, { email });
      setMessage("📩 Verification email sent! Check your inbox.");
      setStep(2);
    } catch (error) {
      setMessage("Error sending email.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/verify-token`, { email, otp });
      setMessage("✅ OTP verified! Now set your new password.");
      setStep(3);
    } catch (error) {
      setMessage("Invalid OTP.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/users/update-password`, { email, newPassword });
      setMessage("🎉 Password updated successfully! Please log in again.");
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage("Error updating password.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {message && <p className="text-red-500">{message}</p>}

      {step === 1 && (
        <>
          <p>Enter your email to receive an OTP:</p>
          <input type="email" value={email} disabled className="w-full p-2 border rounded-md mt-2" />
          <button onClick={handleSendEmail} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2">Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 border rounded-md mt-2" />
          <button onClick={handleVerifyOtp} className="bg-green-600 text-white px-4 py-2 rounded-md mt-2">Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded-md mt-2" />
          <button onClick={handleUpdatePassword} className="bg-green-600 text-white px-4 py-2 rounded-md mt-2">Update Password</button>
        </>
      )}
    </div>
  );
};

export default EditPassword;
