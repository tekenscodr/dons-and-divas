"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointment = {
  id: string
  date: string
  time: string
  customerID: string
  service: string
  status: 'Pending' | 'Completed' | 'Cancelled'
  createdAt: string
}

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "customerID",
    header: "Customer",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "createdAt",
    header: "Created At"
  }

]
