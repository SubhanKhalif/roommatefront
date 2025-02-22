import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", location: "", isAdmin1: false });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData);
      login(data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Signup failed:", error.response.data);
        alert(error.response.data.message || "Signup failed! Please check your details.");
      } else {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin1"
              className="mr-2"
              onChange={(e) => setFormData({ ...formData, isAdmin1: e.target.checked })}
            />
            <label htmlFor="isAdmin1" className="text-gray-700">Admin बनें</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
