import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OccupancyGraph } from "@/components/occupancy-graph";
import { WelcomeMessage } from "@/components/welcome-message";
import { TabView } from "@/components/tab-view";
import { RentTrackingTable } from "@/components/rent-tracking-table";
import { TaskManager } from "@/components/task-manager";
import { MessageCenter } from "@/components/message-center";
import { ChatBot } from "@/components/chat-bot";
import { PropertiesListTable } from "@/components/properties-list-table";
import { getListings } from "@/services/listings";
import { Property } from "@/types/properties";
import { CreateListingForm } from "@/components/create-listing-form";

const occupancyData = [
  { name: "Occupied", value: 75, color: "#008080" },
  { name: "Vacant", value: 25, color: "#e11d48" },
];

const rentStatusData = [
  { name: "Paid", value: 2500, color: "#008080" },
  { name: "Pending", value: 1800, color: "#fbbf24" },
  { name: "Overdue", value: 2200, color: "#e11d48" },
];

const properties = [
  { name: "TYLo", units: 50 },
  { name: "Enkaj Homes", units: 75 },
  { name: "Couture Heights", units: 60 },
  { name: "Rugsan Heights", units: 69 },
];

type PageProps = {
  // params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const propertiesList = (await getListings())?.data as Property[];

  const tabs = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <OccupancyGraph data={occupancyData} title="Property Occupancy" />
            </CardContent>
          </Card>
          <Card className="md:col-span-1 md:row-span-2">
            <CardHeader>
              <CardTitle>Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div
                    key={property.name}
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-lg font-semibold">{property.name}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{property.units}</p>
                      <p className="text-sm text-gray-500">units</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">189</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">23</div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Rent Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <OccupancyGraph
                data={rentStatusData}
                title="Rent Payment Status"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">12,234</div>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      value: "create-listing",
      label: "Create Listing",
      content: <CreateListingForm />,
    },
    {
      value: "properties-list-table",
      label: "Properties List",
      content: <PropertiesListTable propertiesList={propertiesList} />,
    },
    {
      value: "rent-tracking",
      label: "Rent",
      content: <RentTrackingTable />,
    },

    {
      value: "tasks",
      label: "Tasks",
      content: <TaskManager />,
    },
    {
      value: "messages",
      label: "Messages",
      content: <MessageCenter />,
    },
  ];

  return (
    <div className="space-y-6">
      <WelcomeMessage />
      <TabView defaultTab={Number(searchParams.tab) ?? 0} tabs={tabs} />
      <ChatBot />
    </div>
  );
}
