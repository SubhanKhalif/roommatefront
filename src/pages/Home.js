import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">Roommate Finder</span>
        </h1>
        <p className="text-lg md:text-xl font-light mb-6">
          Find the perfect roommate with ease. Connect with people, post requests, and discover a compatible living partner.
        </p>
        <div className="flex gap-4">
          <a
            href="/signup"
            className="bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-yellow-400"
          >
            Get Started
          </a>
          <a
            href="/search"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 hover:bg-gray-100"
          >
            Search Roommates
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
