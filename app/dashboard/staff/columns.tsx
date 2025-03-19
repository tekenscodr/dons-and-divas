"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StaffType = {
    id: string;
    name: string;
    phone: string;
    role: string;
    isActive: boolean;
    createdAt: Date;
}

export const columns: ColumnDef<StaffType>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            return row.original.isActive ? "Active" : "Inactive";
        }
    },
    {
        accessorKey: "createdAt",
        header: "CreatedAt",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            return format(date, 'EEE MMM dd yyyy');
        }
    }
]
