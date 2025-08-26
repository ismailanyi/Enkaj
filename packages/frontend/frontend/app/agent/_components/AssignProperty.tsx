"use client";
import React, { useState } from "react";

const clients = [
  {
    id: 1,
    name: "Sarah Johnson",
  },
  {
    id: 2,
    name: "Michael Chen",
  },
  {
    id: 3,
    name: "Emma Wilson",
  },
  {
    id: 4,
    name: "John Smith",
  },
];

const AssignProperty: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState("");
  return (
    <div className="mt-4 border-t pt-4">
      <h4 className="text-sm font-medium text-gray-900">Assign Property</h4>
      <div className="mt-2 flex items-center space-x-4">
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Select client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignProperty;
