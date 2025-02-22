import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import PostCard from "../components/PostCard";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedRent, setUpdatedRent] = useState("");

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Search filter
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Open edit modal
  const handleEdit = (post) => {
    setEditingPost(post);
    setUpdatedTitle(post.title);
    setUpdatedDescription(post.description);
    setUpdatedLocation(post.location);
    setUpdatedRent(post.rent);
  };

  // Update post
  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${editingPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          title: updatedTitle, 
          description: updatedDescription,
          location: updatedLocation,
          rent: updatedRent
        }),
      });

      if (response.ok) {
        setPosts(posts.map((post) => 
          post._id === editingPost._id ? { 
            ...post, 
            title: updatedTitle, 
            description: updatedDescription,
            location: updatedLocation,
            rent: updatedRent
          } : post
        ));
        setEditingPost(null);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Delete post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h1 className="text-center mt-4 text-2xl font-bold">Manage Posts</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search posts..."
        className="block mx-auto p-2 border rounded mt-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Posts List */}
      <div className="mt-6">
        {filteredPosts.map((post) => (
          <div key={post._id} className="relative">
            <PostCard post={post} />
            <div className="absolute top-2 right-2 flex space-x-2">
              <button onClick={() => handleEdit(post)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>

            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Description:</label>
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Location:</label>
            <input
              type="text"
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block mb-2">Rent (₹):</label>
            <input
              type="number"
              value={updatedRent}
              onChange={(e) => setUpdatedRent(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex space-x-2">
              <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
              <button onClick={() => setEditingPost(null)} className="bg-gray_500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
