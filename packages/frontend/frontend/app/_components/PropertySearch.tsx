"use client";

import { CustomButton } from "@/components/custom-button";
import { useState } from "react";

export function PropertySearch() {
  const [activeTab, setActiveTab] = useState("rent");

  return (
    <div className="w-full max-w-4xl mx-auto bg-background-900/50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/10">
      {/* Tabs */}
      <div className="flex space-x-1 rounded-lg bg-zinc-800/50 p-1 mb-6">
        {["rent", "buy", "lease", "devlpmt"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors
              ${
                activeTab === tab
                  ? "bg-cyan-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <select className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-400">
              <option value="">Property Type</option>
              <option value="apartment">Apartment/Flat</option>
              <option value="house">House</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Vacant Land/Plot</option>
              <option value="commercial">Commercial Property</option>
            </select>
            <svg
              className="absolute right-3 top-3 h-4 w-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Location"
            defaultValue="Nairobi"
            className="flex-1 h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <select className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-400">
              <option value="">Min Price</option>
              <option value="10000">10,000</option>
              <option value="20000">20,000</option>
              <option value="30000">30,000</option>
            </select>
            <svg
              className="absolute right-3 top-3 h-4 w-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="relative">
            <select className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-400">
              <option value="">Max Price</option>
              <option value="50000">50,000</option>
              <option value="100000">100,000</option>
              <option value="150000">150,000</option>
            </select>
            <svg
              className="absolute right-3 top-3 h-4 w-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <select className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-400">
              <option value="">Bedrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
            <svg
              className="absolute right-3 top-3 h-4 w-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="relative">
            <select className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-400">
              <option value="">Bathrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
            </select>
            <svg
              className="absolute right-3 top-3 h-4 w-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <CustomButton className="w-full">Search Properties</CustomButton>
      </div>
    </div>
  );
}
