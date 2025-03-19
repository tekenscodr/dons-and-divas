import React from 'react'
import { DataTable } from './data-table'
import { columns, StaffType } from './columns'
import prisma from '../../lib/prismadb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getData(): Promise<StaffType[]> {
    const staff = prisma.user.findMany()
    console.log(staff)
    return staff
}

const page = async () => {
    const data = await getData()

    return (
        <>
            <div className="p-4 m-2 flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl font-semibold">Staff</h1>
                    <Link href="/register" passHref>
                        <Button>Add Staff</Button>
                    </Link>
                </div>
                <DataTable columns={columns} data={data} />89
            </div>
        </>
    )
}

export default page