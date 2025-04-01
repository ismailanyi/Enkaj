import SubHeader from "@/Layouts/SubHeader";
import Pickers from "./_components/Pickers";
import { getAgentsAssigned } from "@/actions/properties";
import { pageProps, User } from "@/types";
import { notFound } from "next/navigation";

export default async function SchedulePage({ params }: pageProps) {
  const { slug: propertyId } = await params;
  if (!propertyId) return notFound();

  const agentsAssigned: User[] =
    (await getAgentsAssigned(Number(propertyId ?? -1)))?.data ?? [];

  return (
    <div className="w-full min-h-screen">
      <SubHeader additonalRender={<div></div>} />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-lg lg:text-xl font-bold mb-8 text-center text-teal">
          Schedule your visit
        </h1>

        {agentsAssigned.length > 0 ? (
          <Pickers propertyId={propertyId} agents={agentsAssigned} />
        ) : (
          <div className="text-center">
            There are no agents assinged to this property
          </div>
        )}
      </div>
    </div>
  );
}
