import React from 'react'
import BarCharts from '@/app/components/BarChart'
import MonthlyRecords from '@/app/components/MonthlyRecords'
import { DataTable } from './DataTable'
import { columns } from "./columns"
import { Sale } from './columns'
import prisma from '../../prismadb'



async function fetchFeed(): Promise<Sale[]> {
    'use server';
    const results = await prisma.orders.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            Receipts: true,
        },
    })

    const resultsWithReceiptNumber = results.map((order) => ({
        // orderID: order.orderID,
        date: order.orderDate.toDateString(),
        total: order.total,
        // paymentStatus: order.paymentStatus,
        // receiptPrinted: order.receiptPrinted,
        // createdAt: order.createdAt,
        invoice: order.Receipts[0].receiptNumber,
    }));

    return resultsWithReceiptNumber

}

const Sales = async () => {
    const data = await fetchFeed()
    return (
        <>
            <div className='flex flex-col p-4 min-h-full w-full overflow-hidden'>
                <div className='mr-2 flex-1'>
                    <BarCharts />
                </div>
                <div className='flex-1 '>
                    <DataTable columns={columns} data={data} />

                </div>
            </div>
            <div>
                {/* <MonthlyRecords /> */}
            </div>
        </>
    )
}

export default Sales
