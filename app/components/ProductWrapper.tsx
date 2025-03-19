// import React from 'react'
// import InventoryTable from '../components/InventoryTable'
// import prisma from '../prismadb'
// import { PageProps } from '../dashboard/inventory/page';
// import Pagination from './Pagination';
// import Pagined from './Pagination';
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
// import AddProduct from './AddProduct';
// // import ProductTable from './ProductTable';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import Search from './Search';
// import Product from './ProductTable';
// import ProductTable from './ProductTable';

// const fetchFeed = async ({ take = 10, page = 1, query = '' }) => {
//     'use server';
//     const skip = (page - 1) * take;
//     // const lowerCaseQuery = query.toLowerCase();
//     const results = await prisma.products.findMany({
//         take,
//         skip,
//         include: {
//             inventory: {
//                 select: {
//                     quantity: true,
//                     reorderLevel: true,
//                     reorderQuantity: true,
//                 },
//             },
//         },
//         where: {
//             productName: {
//                 contains: query,
//                 mode: 'insensitive',
//             },
//         },
//     });
//     const total = await prisma.products.count();

//     return {
//         data: results,
//         metadata: {
//             hasNextPage: skip + take < total,
//             totalPages: Math.ceil(total / take)
//         }
//     }
// }


// const ProductWrapper = async (props: PageProps) => {
//     const { data, metadata } = await fetchFeed({ take: 10, page: Number(props.searchParams?.page) || 1, query: props.searchParams?.query || '' });
//     const query = props.searchParams?.query || '';
//     // console.log(props.searchParams?.query); // Add this line

//     const filteredData = Array.isArray(data) ? data.filter((item) => {
//         return item.productName.toLowerCase().includes(query.toLowerCase())
//     }) : []

//     if (Array.isArray(filteredData) && filteredData.length === 0) {

//         return (
//             <div>
//                 <div className='flex items-center justify-between'>
//                     <Search placeholder="Search Product.." />

//                     <AddProduct />
//                 </div>
//                 <Card>
//                     <CardHeader className='px-7'>
//                         <CardTitle>Product</CardTitle>
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
//             <div className='flex items-center justify-between'>
//                 <Search placeholder="Search Product.." />

//                 <AddProduct />
//             </div>
//             <Card>

//                 <CardHeader className='px-7'>
//                     <CardTitle>Products</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Product Name</TableHead>
//                                 <TableHead>Description</TableHead>
//                                 <TableHead>Category</TableHead>
//                                 <TableHead>Unit Price</TableHead>
//                                 <TableHead>Selling Price</TableHead>
//                                 <TableHead>Quantity Per Unit</TableHead>
//                                 <TableHead>Quantity</TableHead>
//                                 <TableHead>Reorder Level</TableHead>
//                                 <TableHead>Reorder Quantity</TableHead>
//                                 <TableHead className='text-end'>Action</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         {Array.isArray(filteredData) && filteredData.map((item, i) => (
//                             <ProductTable key={i} {...item} />


//                         ))}
//                     </Table>
//                 </CardContent>
//                 <Pagined page={props.searchParams?.page} totalPages={metadata.totalPages} hasNextPage={metadata.hasNextPage} />
//             </Card>
//         </div>
//     )
// }

// export default ProductWrapper