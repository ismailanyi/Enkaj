"use client";
import React from "react";

const bookings = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    propertyAddress: "123 Maple Street, New York, NY 10001",
    dateTime: "2024-02-20T14:00:00",
    status: "confirmed",
    propertyType: "2 Bedroom Apartment",
    clientPhone: "+1 (555) 123-4567",
    clientEmail: "sarah.j@email.com",
    price: "$450,000",
  },
  {
    id: 2,
    clientName: "Michael Chen",
    propertyAddress: "456 Oak Avenue, New York, NY 10002",
    dateTime: "2024-02-21T11:30:00",
    status: "pending",
    propertyType: "3 Bedroom House",
    clientPhone: "+1 (555) 987-6543",
    clientEmail: "m.chen@email.com",
    price: "$750,000",
  },
  {
    id: 3,
    clientName: "Emma Wilson",
    propertyAddress: "789 Pine Road, New York, NY 10003",
    dateTime: "2024-02-19T16:15:00",
    status: "completed",
    propertyType: "Studio Apartment",
    clientPhone: "+1 (555) 246-8135",
    clientEmail: "emma.w@email.com",
    price: "$295,000",
  },
];

const Bookings: React.FC<any> = () => {
  return bookings.map((booking) => (
    <div key={booking.id} className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">{booking.clientName}</h3>
          <p className="text-gray-500">{booking.propertyAddress}</p>
        </div>
        <div className="flex items-center space-x-2">
          {booking.status === "confirmed" && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Confirmed
            </span>
          )}
          {booking.status === "pending" && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
          )}
          {booking.status === "completed" && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              Completed
            </span>
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-gray-600">{booking.propertyType}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-600">
            {new Date(booking.dateTime).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span className="text-gray-600">{booking.clientPhone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-600">{booking.clientEmail}</span>
        </div>
      </div>
      {/* <div className="mt-4 flex items-center justify-between border-t pt-4">
        <div className="text-lg font-semibold text-gray-900">
          {booking.price}
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          View Details
        </button>
      </div> */}
    </div>
  ));
};

export default Bookings;
