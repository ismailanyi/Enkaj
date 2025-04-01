"use client";

import React, { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-xl mx-auto relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
        />
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m20 20l-4.05-4.05m0 0a7 7 0 1 0-9.9-9.9a7 7 0 0 0 9.9 9.9"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
