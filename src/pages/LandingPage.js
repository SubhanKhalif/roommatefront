import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/posts");
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.signupTime) - new Date(a.signupTime)
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Find Your Perfect Roommate</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          className="p-3 w-1/2 border rounded-lg"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

      {/* Post Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="text-center text-gray-500 col-span-3">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
