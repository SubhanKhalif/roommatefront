import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", description: "", location: "", rent: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // Store created posts

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3002/api/users/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("You must be logged in to create a post.");
        setLoading(false);
        return;
      }

      const config = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      };

      const postWithUser = { 
        ...post, 
        user: { 
          _id: user._id, 
          name: user.name, 
          username: user.username, 
          profilePicture: user.profilePicture 
        } 
      };

      const { data } = await axios.post("http://localhost:3002/api/posts/create", postWithUser, config);

      setSuccessMessage("Post created successfully!");
      setPost({ title: "", description: "", location: "", rent: "" });

      // Add new post to local state
      setPosts([data, ...posts]);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        {/* User Info Section */}
        <div className="flex items-center mb-4">
          {user && (
            <>
              <img 
                src={user.profilePicture || "https://via.placeholder.com/150"} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </>
          )}
        </div>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {/* Create Post Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            required
          ></textarea>

          <input
            type="text"
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Rent Amount"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            value={post.rent}
            onChange={(e) => setPost({ ...post, rent: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>

      {/* Display Created Posts */}
      <div className="mt-8 w-full max-w-lg">
        {posts.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-2">
              <img 
                src={p.user.profilePicture || "https://via.placeholder.com/150"} 
                alt="User Profile" 
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="text-md font-bold">{p.user.name}</h3>
                <p className="text-sm text-gray-500">@{p.user.username}</p>
              </div>
            </div>
            <h4 className="text-lg font-semibold">{p.title}</h4>
            <p className="text-gray-700">{p.description}</p>
            <p className="text-sm text-gray-500">📍 {p.location} | 💰 ₹{p.rent}/month</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
