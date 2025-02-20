import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = query
          ? `http://localhost:3002/api/posts/search?location=${query}`
          : `http://localhost:3002/api/posts`; // Fetch all if query is empty

        const { data } = await axios.get(url);
        setResults(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [query]);

  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🔍 Search Roommates</h2>

      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Enter location..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length === 0 ? (
        <p className="text-center text-gray-500">⚠️ No results found</p>
      ) : (
        <div className="grid gap-4">
          {results.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
