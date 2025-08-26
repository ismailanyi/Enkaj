"use client";

import React, { useState } from "react";
import type { Property } from "../types";
import { formatCurrency } from "@/utils";
import Link from "next/link";

// Helper function to format currency

export function PropertyCard({ property }: { property: Property }) {
  const [showMessage, setShowMessage] = useState(false);
  // Convert USD to KES (approximate exchange rate)
  const priceInKES = property.price;

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <Link
          href={`/property/${property.slug}`}
          style={{ textDecoration: "none" }}
        >
          <div className="relative h-48">
            <img
              src={property.media?.[0]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
              {property.propertyType}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-gray-500 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M19 10c0 3.976-7 11-7 11s-7-7.024-7-11s3.134-7 7-7s7 3.024 7 7"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </g>
                </svg>
                <span>{property.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <a
                  href="tel:+254743072618"
                  className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                  title="Call agent"
                > */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19.95 21q-3.225 0-6.287-1.438t-5.425-3.8q-2.363-2.362-3.8-5.425T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.225t.325.575l.65 3.5q.05.35-.013.638T9.4 8.45L6.975 10.9q1.05 1.8 2.638 3.375T13.1 17l2.35-2.35q.225-.225.588-.338t.712-.062l3.45.7q.35.075.575.338T21 15.9v4.05q0 .45-.3.75t-.75.3ZM6.025 9l1.65-1.65L7.25 5H5.025q.125 1.025.35 2.025T6.025 9ZM19 18.95v-2.2l-2.35-.475l-1.675 1.675q.975.425 1.987.675T19 18.95Zm-4-1.025ZM6.025 9Z"
                  ></path>
                </svg>
                {/*  </a> */}
                <button
                  onClick={() => setShowMessage(true)}
                  className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
                  title="Message agent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m6 18l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-.85-2H20V4H4v13.125zM4 16V4z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              {property.name}
            </h3>
            <p className="text-gray-600 text-xs mb-4 line-clamp-2">
              {property.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="flex items-center space-x-1 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M2 19v-6q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v6h-2v-2H4v2zm11-9h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8zm-1 5h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
                    ></path>
                  </svg>
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M5.385 2.75c-.903 0-1.635.732-1.635 1.635v6.865H22a.75.75 0 0 1 0 1.5h-.268q.01.067.014.136q.005.088.004.18v.039c0 .375 0 .595-.016.84c-.142 2.236-1.35 4.302-3.101 5.652l.038.068l1 2a.75.75 0 1 1-1.342.67l-.968-1.935a7.36 7.36 0 0 1-3.228.805h-.007c-.74.028-1.464.045-2.126.045s-1.386-.017-2.126-.045h-.007a7.36 7.36 0 0 1-3.228-.805l-.968 1.935a.75.75 0 1 1-1.342-.67l1-2l.038-.068c-1.751-1.35-2.96-3.416-3.101-5.652a13 13 0 0 1-.016-.84v-.355H2a.75.75 0 0 1 0-1.5h.25V4.385a3.135 3.135 0 0 1 6.046-1.164l.11.275a3.84 3.84 0 0 1 2.466.192a3.97 3.97 0 0 1 2.132 2.213a.75.75 0 0 1-.401.963L6.643 9.43a.75.75 0 0 1-.995-.413a4.18 4.18 0 0 1 .02-3.107a4.1 4.1 0 0 1 1.379-1.774l-.144-.358A1.635 1.635 0 0 0 5.385 2.75m-1.302 10h-.1a.25.25 0 0 0-.233.25v.083c0 .402 0 .574.013.767c.185 2.922 2.695 5.528 5.607 5.823c.195.02.303.023.56.033c.728.027 1.433.044 2.07.044s1.342-.017 2.07-.044c.257-.01.365-.014.56-.034c2.912-.294 5.422-2.9 5.608-5.822c.012-.193.012-.365.012-.767v-.099q0-.003 0 0a.25.25 0 0 0-.234-.233q.002 0 0 0H20l-.082-.001zm6.2-7.682a2.36 2.36 0 0 0-1.976.053a2.57 2.57 0 0 0-1.25 1.354a2.7 2.7 0 0 0-.19 1.226l4.38-1.886a2.4 2.4 0 0 0-.965-.747"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M18 18H6V6h12m0-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
                    ></path>
                  </svg>
                  <span>{property.area} sqft</span>
                </div>
              </div>
              <span className="text-md font-bold text-teal-600 text-xs">
                {formatCurrency(priceInKES)}
              </span>
            </div>
          </div>
        </Link>

        {/* Message Modal */}
        {showMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-md font-semibold mb-4">
                Contact About Property
              </h3>
              <textarea
                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-teal-500"
                rows={4}
                placeholder="Write your message here..."
              ></textarea>
              <div className="flex justify-end space-x-3 text-sm">
                <button
                  onClick={() => setShowMessage(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle send message
                    setShowMessage(false);
                  }}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
