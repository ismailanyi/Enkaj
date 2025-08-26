import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OccupancyGraph } from "@/components/occupancy-graph"

const rentData = [
  { id: 1, property: "Luxury Apartment", tenant: "John Doe", amount: 2500, dueDate: "2023-07-01", status: "Paid" },
  { id: 2, property: "Cozy Cottage", tenant: "Jane Smith", amount: 1800, dueDate: "2023-07-05", status: "Pending" },
  { id: 3, property: "City Loft", tenant: "Mike Johnson", amount: 2200, dueDate: "2023-07-03", status: "Overdue" },
]

const rentStatusData = [
  { name: "Paid", value: 2500, color: "#008080" },
  { name: "Pending", value: 1800, color: "#fbbf24" },
  { name: "Overdue", value: 2200, color: "#e11d48" },
]

export default function RentTrackingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Rent Tracking</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rent Status</CardTitle>
          </CardHeader>
          <CardContent>
            <OccupancyGraph data={rentStatusData} title="Rent Payment Status" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Rent Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">$7,500</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">$1,800</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overdue Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">$2,200</div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Rent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentData.map((rent) => (
                  <TableRow key={rent.id}>
                    <TableCell>{rent.property}</TableCell>
                    <TableCell>{rent.tenant}</TableCell>
                    <TableCell>${rent.amount}</TableCell>
                    <TableCell>{rent.dueDate}</TableCell>
                    <TableCell>{rent.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

