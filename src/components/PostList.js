import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🏠 Available Roommate Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-lg">No posts available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
