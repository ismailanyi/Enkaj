import { CustomButton } from "@/components/custom-button";
import Image from "next/image";
import Link from "next/link";

const featuredProperties = [
  {
    id: 1,
    title: "Modern Apartment in City Center",
    location: "Nairobi, Kenya",
    price: "50,000",
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.5,
    area: "1,200 sq ft",
    image:
      "https://a0.muscache.com/im/pictures/4cc440bd-c5f2-4508-a37e-aec2a24ffd2d.jpg?im_w=1200&im_format=avif",
  },
  {
    id: 2,
    title: "Spacious Family Home with Garden",
    location: "Mombasa, Kenya",
    price: "75,000",
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.2,
    area: "2,500 sq ft",
    image:
      "https://a0.muscache.com/im/pictures/a215e2a5-c08c-4946-b853-efee03641ce3.jpg?im_w=1200&im_format=avif",
  },
  {
    id: 3,
    title: "Luxury Penthouse with Ocean View",
    location: "Diani, Kenya",
    price: "120,000",
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.8,
    area: "1,800 sq ft",
    image:
      "https://a0.muscache.com/im/pictures/a215e2a5-c08c-4946-b853-efee03641ce3.jpg?im_w=1200&im_format=avif",
  },
];

export function FeaturedProperties() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Featured Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProperties.map((property) => (
          <div
            key={property.id}
            className="bg-background-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10"
          >
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>

              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400 mr-1"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 8.89l.94 3.11h2.82l-2.27 1.62l.93 3.01L12 14.79l-2.42 1.84l.93-3.01L8.24 12h2.82zM12 2l-2.42 8H2l6.17 4.41L5.83 22L12 17.31L18.18 22l-2.35-7.59L22 10h-7.58z"
                  ></path>
                </svg>
                <span>{property.rating.toFixed(1)}</span>
              </div>

              <p className="text-gray-400 mb-2 text-sm">{property.location}</p>
              <p className="text-cyan-400 font-bold mb-4">
                KES {property.price}
              </p>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-gray-800">
                  {property.bedrooms} Beds
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-gray-800">
                  {property.bathrooms} Baths
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400 text-gray-800">
                  {property.area}
                </span>
              </div>
              <Link href={`/property/${1}`} className="no-underline">
                <CustomButton className="w-full">View Details</CustomButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
