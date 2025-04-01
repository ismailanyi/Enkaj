"use client";

import { CustomButton } from "@/components/custom-button";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export function ProfileForm() {
  return (
    <div className="space-y-6 max-w-md mx-auto p-6 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-zinc-800 mx-auto mb-4 relative overflow-hidden">
          <Image
            src={logo}
            alt="ENKAJ Logo"
            width={70}
            height={70}
            className="mx-auto"
          />
        </div>
        <h1 className="text-2xl font-semibold">Profile Information</h1>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Bio</label>
          <textarea
            placeholder="Tell us about yourself"
            rows={4}
            className="w-full rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Location</label>
          <input
            type="text"
            placeholder="Your location"
            className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Email</label>
          <input
            type="email"
            placeholder="Email@Enkaj.com"
            className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyan-400">Phone</label>
          <input
            type="tel"
            placeholder="+254 XXX XXX XXX"
            className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <CustomButton className="w-full">Save Changes</CustomButton>
      </div>
    </div>
  );
}
