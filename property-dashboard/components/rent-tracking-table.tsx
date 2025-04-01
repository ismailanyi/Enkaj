"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CompanyBranding } from "./company-branding"

type RentData = {
  id: number
  property: string
  tenant: string
  amount: number
  dueDate: string
  status: "Paid" | "Pending" | "Overdue"
}

const initialRentData: RentData[] = [
  {
    id: 1,
    property: "Kilimani Apartments",
    tenant: "John Kamau",
    amount: 85000,
    dueDate: "2023-07-01",
    status: "Paid",
  },
  {
    id: 2,
    property: "Westlands Heights",
    tenant: "Jane Wanjiku",
    amount: 120000,
    dueDate: "2023-07-05",
    status: "Pending",
  },
  {
    id: 3,
    property: "Lavington Court",
    tenant: "Michael Omondi",
    amount: 95000,
    dueDate: "2023-07-03",
    status: "Overdue",
  },
  { id: 4, property: "Karen Estate", tenant: "Sarah Muthoni", amount: 150000, dueDate: "2023-07-10", status: "Paid" },
  {
    id: 5,
    property: "Kileleshwa Gardens",
    tenant: "David Kiprop",
    amount: 110000,
    dueDate: "2023-07-15",
    status: "Pending",
  },
]

export function RentTrackingTable() {
  const [rentData, setRentData] = useState<RentData[]>(initialRentData)
  const [companyLogo, setCompanyLogo] = useState<string>("")
  const [signature, setSignature] = useState<string>("")

  const handleStatusChange = (id: number, newStatus: "Paid" | "Pending" | "Overdue") => {
    setRentData(rentData.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
  }

  const handleBrandingSave = (logo: string, sig: string) => {
    setCompanyLogo(logo)
    setSignature(sig)
  }

  const handlePrint = () => {
    const printContent = document.getElementById("rent-tracking-table")
    const windowPrint = window.open("", "", "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0")

    if (windowPrint) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Rent Tracking Report</title>
            <style>
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              .header { text-align: center; margin-bottom: 20px; }
              .signature { margin-top: 40px; text-align: right; }
            </style>
          </head>
          <body>
            <div class="header">
              ${companyLogo ? `<img src="${companyLogo}" alt="Company Logo" style="max-height: 100px;" />` : ""}
              <h1>Rent Tracking Report</h1>
            </div>
            ${printContent?.innerHTML || ""}
            <div class="signature">
              ${signature ? `<img src="${signature}" alt="Signature" style="max-height: 60px;" />` : ""}
              <p>Property Manager's Signature</p>
            </div>
          </body>
        </html>
      `)
      windowPrint.document.close()
      windowPrint.focus()
      windowPrint.print()
      windowPrint.close()
    }
  }

  const formatCurrency = (amount: number) => {
    return `Ksh ${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      <CompanyBranding onSave={handleBrandingSave} />
      <div className="flex justify-end">
        <Button onClick={handlePrint}>Print Report</Button>
      </div>
      <div id="rent-tracking-table">
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
                <TableCell>{formatCurrency(rent.amount)}</TableCell>
                <TableCell>{rent.dueDate}</TableCell>
                <TableCell>
                  <Select
                    value={rent.status}
                    onValueChange={(value: "Paid" | "Pending" | "Overdue") => handleStatusChange(rent.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

