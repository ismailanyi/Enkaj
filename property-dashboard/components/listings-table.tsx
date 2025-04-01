import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const mockListings = [
  { id: 1, title: "Luxury Apartment", location: "New York", price: "$2,500,000", status: "Active" },
  { id: 2, title: "Cozy Cottage", location: "Los Angeles", price: "$500,000", status: "Pending" },
  { id: 3, title: "Modern Office Space", location: "Chicago", price: "$1,200,000", status: "Active" },
  { id: 4, title: "Beachfront Villa", location: "Miami", price: "$3,800,000", status: "Active" },
  { id: 5, title: "Mountain Retreat", location: "Denver", price: "$950,000", status: "Pending" },
]

export function ListingsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockListings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell>{listing.title}</TableCell>
            <TableCell>{listing.location}</TableCell>
            <TableCell>{listing.price}</TableCell>
            <TableCell>{listing.status}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

