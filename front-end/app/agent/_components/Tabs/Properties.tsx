import React from "react";
import AssignProperty from "../AssignProperty";

type Props = {
  properties: {
    id: number;
    address: string;
    type: string;
    price: string;
    status: string;
    tenant: {
      name: string;
      email: string;
      phone: string;
      moveInDate: string;
      leaseEnd: string;
    };
    image: string;
  }[];
};

const Properties: React.FC<any> = ({ properties }) => {
  return properties.map((property: any) => (
    <div
      key={property.id}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <div className="flex">
        <div className="w-1/3">
          <img
            src={property.image}
            alt={property.address}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {property.address}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{property.type}</p>
            </div>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === "occupied"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {property.status === "occupied" ? "Occupied" : "Available"}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-md font-bold text-gray-900">
                {property.price}
              </span>
            </div>
          </div>
          {property.tenant ? (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium text-gray-900">
                Current Tenant
              </h4>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {property.tenant.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {property.tenant.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {property.tenant.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Lease:{" "}
                    {new Date(property.tenant.moveInDate).toLocaleDateString()}{" "}
                    - {new Date(property.tenant.leaseEnd).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Revoke Property
              </button>
            </div>
          ) : (
            <AssignProperty />
          )}
        </div>
      </div>
    </div>
  ));
};

export default Properties;
