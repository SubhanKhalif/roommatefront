import React from "react";

const PostCard = ({ post }) => {
  const user = post.user || {}; // Ensure user is defined
  const profilePicture = user.profilePicture || "https://via.placeholder.com/150";
  const username = user.username || "Anonymous";
  const name = user.name || "Unknown User";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* User Info */}
      <div className="flex items-center mb-2">
        <img 
          src={profilePicture} 
          alt="User Profile" 
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="text-md font-bold">{name}</h3>
          <p className="text-sm text-gray-500">@{username}</p>
        </div>
      </div>

      {/* Post Details */}
      <h4 className="text-lg font-semibold">{post.title}</h4>
      <p className="text-gray-700">{post.description}</p>
      <p className="text-sm text-gray-500">📍 {post.location} | 💰 ₹{post.rent}/month</p>
    </div>
  );
};

export default PostCard;
