"use client";
import React, { useState } from "react";
import Properties from "./Tabs/Properties";
import Bookings from "./Tabs/Bookings";

const properties = [
  {
    id: 1,
    address: "123 Maple Street, New York, NY 10001",
    type: "2 Bedroom Apartment",
    price: "$450,000",
    status: "occupied",
    tenant: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      moveInDate: "2024-01-15",
      leaseEnd: "2024-12-31",
    },
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 2,
    address: "456 Oak Avenue, New York, NY 10002",
    type: "3 Bedroom House",
    price: "$750,000",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 3,
    address: "789 Pine Road, New York, NY 10003",
    type: "Studio Apartment",
    price: "$295,000",
    status: "occupied",
    tenant: {
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+1 (555) 987-6543",
      moveInDate: "2023-08-01",
      leaseEnd: "2024-07-31",
    },
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
];

const ActiveTab = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Property Management
            </h1>
            <div className="flex space-x-4">
              {/* <button
                onClick={() => setActiveTab("properties")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "properties"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Properties
              </button> */}
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "bookings"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Bookings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {activeTab === "properties" ? (
            <Properties properties={properties} />
          ) : (
            <Bookings />
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveTab;
