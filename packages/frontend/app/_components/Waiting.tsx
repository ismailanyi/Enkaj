"use client";
import { addToWaitingList, saveDemoBooking } from "@/actions/bookings";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const Waiting = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [demoDate, setDemoDate] = useState<string>(getCurrentDateTime());

  const [showDemoForm, setShowDemoForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const targetDate = new Date("2025-03-01").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission

    const sentBooking = await saveDemoBooking({
      name,
      email,
      demoDate,
    });

    if (!sentBooking.success) {
      if (sentBooking?.message) {
        toast.dismiss();
        toast.error(sentBooking.message);
      }

      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setShowDemoForm(false);
      setSubmitted(false);
      setDemoDate("");
      setEmail("");
      setName("");
    }, 3000);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the waitlist submission

    const addedToWL = await addToWaitingList(email);

    if (!addedToWL.success) {
      if (addedToWL?.message) {
        toast.dismiss();
        toast.error(addedToWL.message);
      }

      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDemoDate(e.target.value);
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-['Roboto']">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="max-w-xl mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto mb-8 text-white animate-pulse"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M10 2h4m-2 12l3-3"></path>
              <circle cx="12" cy="14" r="8"></circle>
            </g>
          </svg>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white text-center">
            Enkaj | Home
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6 text-gray-300 text-center">
            Your Perfect Space, Anytime, Anywhere
          </h2>
          <p className="text-xl md:text-2xl text-white leading-relaxed mb-12">
            Enkaj is a comprehensive real estate web application that
            streamlines the entire process of finding and booking ideal spaces.
            It empowers users to effortlessly search, shortlist, and reserve
            their desired properties, while also providing robust management
            tools for property owners and managers to efficiently oversee their
            portfolios.
          </p>

          {/* TikTok Link */}
          <div className="flex justify-center">
            <a
              href="https://www.tiktok.com/@enkaaj?_t=ZM-8twXXrGUNlN&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors
                   transform hover:scale-110 transition-all duration-300
                   flex items-center gap-2 text-lg font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              Follow us on TikTok
            </a>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 min-h-screen bg-white p-8 flex items-center justify-center relative">
        <div className="max-w-xl mx-auto">
          {/* Countdown Timer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-lg p-4 shadow-md"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gray-800">
                  {item.value}
                </div>
                <div className="text-sm uppercase tracking-wider text-gray-600">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              className="px-8 py-4 bg-yellow-400 text-black rounded-lg font-semibold 
                     transform hover:scale-105 transition-all duration-300 ease-in-out
                     shadow-lg hover:shadow-yellow-400/50
                     animate-[bounce_1s_ease-in-out_infinite]"
              onClick={() => setShowDemoForm(true)}
            >
              Book a Demo
            </button>
          </div>

          {/* Waitlist Form */}
          <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 
                     text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400
                     transform transition-all duration-300 focus:scale-105"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold 
                      hover:bg-teal-600 transition-all duration-300
                      transform hover:scale-105"
              >
                Join Waitlist
              </button>
            </div>
            {submitted && (
              <p className="text-green-500 text-center mt-2">
                Thank you for joining our waitlist!
              </p>
            )}
          </form>
        </div>

        {/* Demo Form Modal */}
        {showDemoForm && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Book a Demo</h3>
                <button
                  onClick={() => setShowDemoForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {/* <X className="w-6 h-6" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 6L6 18M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              {!submitted ? (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Demo Date
                    </label>
                    <input
                      type="datetime-local"
                      id="date"
                      value={demoDate}
                      min={getCurrentDateTime()}
                      onChange={handleDateChange}
                      //   value={demoDate}
                      //   onChange={(e) => setDemoDate(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold 
                         hover:bg-yellow-500 transition-all duration-300"
                  >
                    Schedule Demo
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-green-500 text-lg font-medium">
                    Thank you! We'll be in touch soon to confirm your demo.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Waiting;
