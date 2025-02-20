import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminPanel = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch posts
                const postsResponse = await fetch("http://localhost:3002/api/posts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!postsResponse.ok) {
                    throw new Error(`Failed to fetch posts. Status: ${postsResponse.status}`);
                }

                const postsData = await postsResponse.json();
                setPosts(Array.isArray(postsData) ? postsData : []);

                // Fetch users from admin endpoint
                const usersResponse = await fetch("http://localhost:3002/api/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!usersResponse.ok) {
                    throw new Error(`Failed to fetch users. Status: ${usersResponse.status}`);
                }

                const usersData = await usersResponse.json();
                setUsers(Array.isArray(usersData) ? usersData : []);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const deletePost = async (id) => {
        try {
            await fetch(`http://localhost:3002/api/posts/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setPosts(posts.filter((post) => post._id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/api/admin/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            
            if (!response.ok) {
                throw new Error(`Failed to delete user. Status: ${response.status}`);
            }
            
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <h2 className="text-center mt-4 text-xl font-semibold">
                Welcome to Admin Panel
            </h2>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8">
                    {/* Posts Column */}
                    <div>
                        <h2 className="text-center mt-4 text-xl font-semibold">
                            Manage Posts
                        </h2>
                        {loading ? (
                            <p className="text-center mt-4">Loading...</p>
                        ) : error ? (
                            <p className="text-center mt-4 text-red-500">Error: {error}</p>
                        ) : posts.length === 0 ? (
                            <p className="text-center mt-4">No posts found.</p>
                        ) : (
                            <ul className="mt-6">
                                {posts.map((post) => (
                                    <li key={post._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                        <h3 className="text-lg font-semibold">{post.title}</h3>
                                        <p className="text-gray-700">{post.description}</p>
                                        <p className="text-sm text-gray-500">📍 {post.location} | 💰 ₹{post.rent}/month</p>
                                        <div className="mt-2">
                                            <button 
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => alert("Edit functionality to be added")}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => deletePost(post._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Users Column */}
                    <div>
                        <h2 className="text-center mt-4 text-xl font-semibold">
                            Manage Users
                        </h2>
                        {loading ? (
                            <p className="text-center mt-4">Loading...</p>
                        ) : error ? (
                            <p className="text-center mt-4 text-red-500">Error: {error}</p>
                        ) : users.length === 0 ? (
                            <p className="text-center mt-4">No users found.</p>
                        ) : (
                            <ul className="mt-6">
                                {users.map((user) => (
                                    <li key={user._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                        <h3 className="text-lg font-semibold">{user.name}</h3>
                                        <p className="text-gray-700">{user.email}</p>
                                        <p className="text-sm text-gray-500">📍 {user.location}</p>
                                        <div className="mt-2">
                                            <button 
                                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                                onClick={() => alert("Edit functionality to be added")}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
