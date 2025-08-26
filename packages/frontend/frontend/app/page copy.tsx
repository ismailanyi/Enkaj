import { PropertyCard } from "@/components/PropertyCard";
import { Navbar } from "@/Layouts/Navbar";
import SearchBar from "./_components/SearchBar";
import { Property } from "@/types";
import { getProperties } from "@/actions/properties";

const ArrowRight = () => (
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
      d="M5 12h14m-7-7l7 7l-7 7"
    ></path>
  </svg>
);

/* function SearchBar({
  searchQuery,
  setSearchQuery,
  isSticky,
  filterOptions,
  setFilterOptions,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSticky: boolean;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div
      className={`relative ${
        isSticky ? "" : "bg-white/10 backdrop-blur-md p-4 rounded-xl"
      }`}
    >
      <div className="relative">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <Search size={20} className="text-gray-600" />
          </button>
          {showFilters && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg p-4 z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 rounded-lg border"
                      value={filterOptions.priceRange.min}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          priceRange: {
                            ...filterOptions.priceRange,
                            min: Number(e.target.value),
                          },
                        })
                      }
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 rounded-lg border"
                      value={filterOptions.priceRange.max || ""}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          priceRange: {
                            ...filterOptions.priceRange,
                            max: Number(e.target.value) || null,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full px-3 py-2 rounded-lg border"
                    value={filterOptions.location}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border"
                    value={filterOptions.propertyType}
                    onChange={(e) =>
                      setFilterOptions({
                        ...filterOptions,
                        propertypropertyType: e.target.value,
                      })
                    }
                  >
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="student">Student Housing</option>
                    <option value="storage">Storage</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bedrooms
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border"
                      value={filterOptions.bedrooms || ""}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          bedrooms: Number(e.target.value) || null,
                        })
                      }
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}+
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bathrooms
                    </label>
                    <select
                      className="w-full px-3 py-2 rounded-lg border"
                      value={filterOptions.bathrooms || ""}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          bathrooms: Number(e.target.value) || null,
                        })
                      }
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num}+
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} */

function CategoryCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow min-w-[200px] flex-shrink-0">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-teal-50 rounded-full text-teal-600">{icon}</div>
        <div>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default async function HomeP() {
  const SAMPLE_PROPERTIES: Property[] = (await getProperties())?.data ?? [];
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900">
        <div className="relative flex flex-col items-center justify-center px-4 py-12 md:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-teal-500 mb-4">
              Enkaj | Home
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Your Perfect Space, Anytime, Anywhere
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-teal-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition-colors shadow-lg flex items-center justify-center space-x-2">
                <span>Book a Demo</span>
                <ArrowRight />
              </button>
              <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg flex items-center justify-center space-x-2">
                <span>Join Waitlist</span>
                <ArrowRight />
              </button>
            </div>

            {/* Search Bar */}
            <SearchBar />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 ">
        {/* Property Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Browse by Category
          </h2>
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              <CategoryCard
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
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
                }
                title="Residential"
                description="Find your dream home"
              />
              <CategoryCard
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
                      d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Zm0-10H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4m-4 4h4m-4 4h4m-4 4h4"
                    ></path>
                  </svg>
                }
                title="Commercial"
                description="Prime business locations"
              />
              <CategoryCard
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
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6"></path>
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                    </g>
                  </svg>
                }
                title="Student Housing"
                description="Comfortable student accommodation"
              />
              <CategoryCard
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
                      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35M6 18h12M6 14h12"></path>
                      <path d="M6 10h12v12H6z"></path>
                    </g>
                  </svg>
                }
                title="Storage Facilities"
                description="Secure storage solutions"
              />
            </div>
          </div>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SAMPLE_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </>
  );
}
