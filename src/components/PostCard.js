import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const user = post.user || {}; // Ensure user data exists
  const profilePicture = user.profilePicture || `${process.env.REACT_APP_API_URL}/default-avatar.png`;
  const email = user.email || "anonymous@gmail.com";
  const name = user.name || "Unknown User";

  // Navigate to user's profile on click
  const handleUserClick = () => {
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {/* User Info - Clickable */}
      <div className="flex items-center mb-2 cursor-pointer" onClick={handleUserClick}>
        <img 
          src={profilePicture} 
          alt="User Profile" 
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="text-md font-bold hover:underline">{name}</h3>
          <p className="text-sm text-gray-500">{email}</p>
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
