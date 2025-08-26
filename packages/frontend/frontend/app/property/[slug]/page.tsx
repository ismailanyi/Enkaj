import { CustomButton } from "@/components/custom-button";
import Link from "next/link";
import PropertyGallery from "./_components/PropertyGallery";
import Rating from "./_components/Rating";
import { pageProps, Property, User } from "@/types";
import { getAgentsAssigned, getProperties } from "@/actions/properties";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { formatCurrency } from "@/utils";
import RenderIf from "@/components/RenderIf";
import ShareProperty from "./_components/ShareProperty";
import SubHeader from "@/Layouts/SubHeader";
import Image from "next/image";

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const { slug } = await params;

  const propertyDetails: Property = ((await getProperties(`?slug=${slug}`))
    ?.data ?? [])?.[0];

  const meta = {
    t: propertyDetails?.name || "Enkaj",
    d: propertyDetails.description || "",
  };

  return {
    title: meta.t,
    description: meta.d,
    openGraph: {
      title: meta.t,
      type: "website",
      description: meta.d,

      ...(!!propertyDetails?.media && {
        images: [propertyDetails.media[0]],
      }),
    },
  };
}

export default async function PropertyView({ params }: pageProps) {
  const { slug } = await params;
  if (!slug) return notFound();

  const propertyDetails: Property = ((await getProperties(`?slug=${slug}`))
    ?.data ?? [])[0];

  const agentsAssigned: User[] =
    (await getAgentsAssigned(propertyDetails?.id ?? -1))?.data ?? [];

  return (
    <div className="w-full min-h-screen">
      <SubHeader
        text={propertyDetails.name}
        additonalRender={
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-teal-500 text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Save
            </button>
            <ShareProperty />
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <RenderIf isTrue={propertyDetails.media.length > 0}>
          <PropertyGallery imgs={propertyDetails.media} />
        </RenderIf>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-black">
                  <svg
                    className="w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-black">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center gap-1">
                  <Rating
                    currentRating={Math.round(propertyDetails.rating || 0)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 text-black">
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>
                    {propertyDetails.bathrooms} Bedroom
                    {propertyDetails.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="prose max-w-none text-gray-300">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  About this property
                </h2>
                <p className="text-gray-600 text-md">
                  {propertyDetails.description}
                </p>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Key Features
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {propertyDetails.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-tealGradient rounded-lg"
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Virtual Tour
              </h2>
              <div className="aspect-video bg-tealGradient rounded-lg flex items-center justify-center">
                <span className="text-gray-400">
                  360° Virtual Tour Available
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-tealGradient p-6 rounded-xl border border-gray-700 shadow-lg">
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">
                  {formatCurrency(propertyDetails.price)}
                </span>
              </div>
              <div className="space-y-4">
                <Link
                  href={`/property/${propertyDetails.id}/schedule`}
                  className="no-underline"
                >
                  <CustomButton className="w-full bg-yellow-400 text-black text-background px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Schedule a Visit
                  </CustomButton>
                </Link>

                <CustomButton className="w-full bg-gray-900 text-blue-400 px-6 py-3 rounded-lg border border-teal hover:bg-teal-500 transition-colors">
                  Start Virtual Tour
                </CustomButton>
              </div>

              {agentsAssigned.map((a) => (
                <div className="mt-6" key={a.id}>
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    Contact Agent
                  </h3>
                  <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
                    <RenderIf isTrue={!!a?.image}>
                      <Image
                        src={a.image!}
                        alt="Agent"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </RenderIf>
                    <div>
                      <p className="font-semibold text-white">{a.name}</p>
                      <p className="text-gray-400 text-sm">
                        Property Specialist
                      </p>
                    </div>
                  </div>
                  <a
                    href={a?.phone ? `tel:${a.phone}` : ""}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-teal text-background rounded-lg bg-teal-700 transition-colors text-white"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Call Agent
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
