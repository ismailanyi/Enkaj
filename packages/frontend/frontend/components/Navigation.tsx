"use client";

import React, { useState } from "react";

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </g>
  </svg>
);

const Building2 = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Zm0-10H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4m-4 4h4m-4 4h4m-4 4h4"
    ></path>
  </svg>
);

export function Navigation({
  isScrolled,
  searchQuery,
  setSearchQuery,
}: {
  isScrolled: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
        <nav
          className={`max-w-7xl mx-auto transition-all duration-300 ${
            isScrolled ? "bg-white shadow-lg" : "bg-white/80 backdrop-blur-md"
          } rounded-full border border-gray-200/50`}
        >
          <div className="px-4">
            <div className="flex items-center h-12">
              {/* Left section */}
              <div className="flex items-center flex-shrink-0">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-full hover:bg-gray-100/80 focus:outline-none text-gray-600 -ml-1"
                  aria-label="Menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 12h16M4 6h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                <span className="ml-2 text-lg font-bold text-teal-600 font-roboto">
                  Enkaj
                </span>
              </div>

              {/* Right section - Profile */}
              <div className="flex items-center flex-shrink-0 ml-auto">
                <button className="p-2 rounded-full hover:bg-gray-100/80 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Side Navigation */}
      <div
        className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div
          className={`absolute left-0 top-0 h-full w-[280px] bg-white transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-teal-600">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="text-grey-600"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 6L6 18M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="space-y-1">
              <NavItem icon={<HomeIcon />} text="Home" />
              <NavItem icon={<Building2 />} text="Properties" />

              {/* User Type Selection */}
              <div className="py-4 mt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-600 mb-2 px-4">
                  I am a...
                </h3>
                <NavItem
                  icon={<HomeIcon />}
                  text="Home Seeker"
                  description="Find your perfect home"
                />
                <NavItem
                  icon={<Building2 />}
                  text="Property Owner"
                  description="Manage your properties"
                />
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <NavItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </g>
                    </svg>
                  }
                  text="Settings"
                />
                <NavItem
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9"
                      ></path>
                    </svg>
                  }
                  text="Logout"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NavItem({
  icon,
  text,
  description,
}: {
  icon: React.ReactNode;
  text: string;
  description?: string;
}) {
  return (
    <a
      href="#"
      className="flex items-start space-x-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
    >
      <span className="text-gray-500 mt-0.5">{icon}</span>
      <div>
        <span className="block">{text}</span>
        {description && (
          <span className="text-xs text-gray-500">{description}</span>
        )}
      </div>
    </a>
  );
}
