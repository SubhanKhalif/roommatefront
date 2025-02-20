import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (!user) return;
  
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
  
        const { data } = await axios.get("http://localhost:3002/api/posts/user", config);
        setUserPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
  
    fetchUserPosts();
  }, [user]);
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🎉 Welcome, {user ? user.name : "Guest"}!
      </h1>

      {user ? (
        <>
          <button 
            onClick={() => setShowCreatePost(!showCreatePost)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md mb-6 hover:bg-blue-700 transition"
          >
            {showCreatePost ? 'Hide Post Form' : 'Create Post'}
          </button>

          {showCreatePost && (
            <div className="bg-white shadow-md p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">✍️ Create a Roommate Post</h2>
              <CreatePost />
            </div>
          )}

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Your Posts</h2>

          {userPosts.length === 0 ? (
            <p className="text-center text-gray-500">⚠️ You haven't posted anything yet.</p>
          ) : (
            <div className="grid gap-4">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">
          🔒 Please <span className="text-blue-500 font-semibold">log in</span> to create and view your posts.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
