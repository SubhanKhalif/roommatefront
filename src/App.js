import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Search from "./pages/Search";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManagePosts from "./pages/ManagePosts";
import MessengerHome from "./pages/MessengerHome";
import ChatPage from "./pages/ChatPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/landingpage" element={<LandingPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/posts" element={<ManagePosts />} />

          {/* Messenger Routes */}
          <Route path="/messenger" element={<MessengerHome />} />
          <Route path="/chat/:userId" element={<ChatPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
