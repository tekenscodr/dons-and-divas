import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import prisma from '../prismadb'
import { PageProps } from '../dashboard/inventory/page'
import SalesTable from './SalesTable'
import Pagined from './Pagination'

const fetchFeed = async ({ take = 6, page = 1, query = '' }) => {
    'use server';
    const skip = (page - 1) * take;
    const results = await prisma.orders.findMany({
        take,
        skip,
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            Receipts: true,
        },
    })
    const total = await prisma.orders.count();

    const resultsWithReceiptNumber = results.map((order) => ({
        orderID: order.orderID,
        orderDate: order.orderDate,
        total: order.total,
        paymentStatus: order.paymentStatus,
        receiptPrinted: order.receiptPrinted,
        createdAt: order.createdAt,
        receiptNumber: order.Receipts[0].receiptNumber,
    }));
    return {
        data: resultsWithReceiptNumber,
        metadata: {
            hasNextPage: skip + take < total,
            totalPages: Math.ceil(total / take)
        }
    }
}


const SalesWrapper = async (props: PageProps) => {
    const { data, metadata } = await fetchFeed({ take: 6, page: Number(props.searchParams?.page) || 1, query: props.searchParams?.query || '' });
    const query = props.searchParams?.query || '';
    if (data.length === 0) {
        return (
            <div>
                <Card>
                    <CardHeader className='px-7'>
                        <CardTitle>Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>No data available.</p>
                    </CardContent>
                    <Pagined page={props.searchParams?.page} totalPages={metadata.totalPages} hasNextPage={metadata.hasNextPage} />

                </Card>
            </div>
        )
    }

    return (
        <div>
            <Card>
                <CardHeader className='px-7'>
                    <CardTitle>Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" text-black">Invoice</TableHead>
                                <TableHead className="text-black">Date</TableHead>
                                <TableHead className="text-right text-black">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        {data.map((item, i) => (
                            <SalesTable key={i} {...item} />
                        ))}
                    </Table>
                </CardContent>
                <Pagined page={props.searchParams?.page} totalPages={metadata.totalPages} hasNextPage={metadata.hasNextPage} />
            </Card>
        </div>
    )
}

export default SalesWrapper
