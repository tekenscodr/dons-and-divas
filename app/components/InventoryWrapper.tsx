// import React from 'react'
// import InventoryTable from '../components/InventoryTable'
// import prisma from '../prismadb'
// import { PageProps } from '../dashboard/inventory/page';
// import Pagination from './Pagination';
// import Pagined from './Pagination';
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
// import Search from './Search';

// const fetchFeed = async ({ take = 10, page = 1, query = '' }) => {
//     'use server';
//     const skip = (page - 1) * take;
//     const results = await prisma.inventory.findMany({
//         take,
//         skip,
//         where: {
//             productID: {
//                 in: (await prisma.products.findMany({
//                     select: { productID: true },
//                     where: {
//                         OR: [
//                             { productName: { contains: query } },
//                         ],
//                     },
//                 })).map((product) => product.productID),
//             },
//         }
//     })

//     const total = await prisma.inventory.count();

//     return {
//         data: results,
//         metadata: {
//             hasNextPage: skip + take < total,
//             totalPages: Math.ceil(total / take)
//         }
//     }
// }


// const InventoryWrapper = async (props: PageProps) => {
//     const { data, metadata } = await fetchFeed({ take: 10, page: Number(props.searchParams?.page) || 1, query: props.searchParams?.query || '' });
//     const query = props.searchParams?.query || '';
//     const lowerCaseTerm = query.toLowerCase();

//     if (data.length === 0) {
//         return (
//             <div>
//                 <div className='flex items-center justify-between'>
//                     <Search placeholder="Search Inventory.." />
//                 </div>
//                 <Card>
//                     <CardHeader className='px-7'>
//                         <CardTitle>Inventory</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <p>No data available.</p>
//                     </CardContent>
//                 </Card>
//             </div>
//         )
//     }



//     return (
//         <div>
//             <Card>
//                 <Search placeholder="Search Inventory.." />
//                 <CardHeader className='px-7'>
//                     <CardTitle>Inventory</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Id</TableHead>
//                                 <TableHead>Product</TableHead>
//                                 <TableHead>Qty</TableHead>
//                                 <TableHead>Reoder Level</TableHead>
//                                 <TableHead>Reoder Quantity</TableHead>
//                                 <TableHead className='text-end'>Action</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         {data.map((item, i) => (
//                             <InventoryTable key={i} {...item} />
//                         ))}
//                     </Table>
//                 </CardContent>
//                 <Pagined page={props.searchParams?.page} totalPages={metadata.totalPages} hasNextPage={metadata.hasNextPage} />
//             </Card>
//         </div>
//     )
// }
// export default InventoryWrapper
