import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/users`,
  headers: { "Content-Type": "application/json" },
});

// Login function
const login = async (userData) => {
  try {
    const response = await API.post("/login", userData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
};

// Signup function
const signup = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed.");
  }
};

// Logout function
const logout = () => {
  localStorage.removeItem("token");
};

export default { login, signup, logout };
