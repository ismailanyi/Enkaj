"use client";

import { CustomButton } from "@/components/custom-button";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

export function SignUpForm() {
  return (
    <div className="space-y-6 max-w-md mx-auto p-6 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-white/10">
      <div className="text-center">
        <Image
          src={logo}
          alt="ENKAJ Logo"
          width={70}
          height={70}
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
        <p className="text-gray-400">Start your journey with ENKAJ</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
        />

        <div className="grid grid-cols-3 gap-2">
          {/* Date Selects */}
          <div className="relative">
            <select className="w-full h-10 rounded-md border border-white/10 bg-zinc-800/50 px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-400">
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
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
              <option value="">Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month.toLowerCase()}>
                  {month}
                </option>
              ))}
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
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={2024 - i}>
                  {2024 - i}
                </option>
              ))}
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

        <CustomButton className="w-full">Sign Up</CustomButton>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomButton
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </CustomButton>
          <CustomButton
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Apple
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
