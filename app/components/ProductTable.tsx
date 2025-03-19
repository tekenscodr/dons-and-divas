// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
// import AddProduct from "./AddProduct"
// import { Gift, MoreHorizontal } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import AddInventory from "./AddInventory"
// import EditProduct from "./EditProduct"
// import EditInventory from "./EditInventory"
// import { getReorders } from "../utils/actions"
// import { Decimal } from "@prisma/client/runtime/library"

// // type Inventory = {
// //   reorderLevel: number,
// //   quantity: number,
// //   reorderQuantity: number,
// // }

// type Product = {
//   productID: string,
//   productName: string,
//   description: string | null,
//   category: string,
//   unitPrice: Decimal,
//   sellingPrice: Decimal,
//   quantityPerUnit: number,
//   inventory: {
//     quantity: Decimal,
//     reorderLevel: Decimal,
//     reorderQuantity: Decimal,
//   } | null,
//   createdAt: Date,
// }

// const ProductTable = async (props: Product) => {
//   const { productID, productName, description, category, unitPrice, sellingPrice, quantityPerUnit, inventory } = props
//   const reorderLevel = Number(inventory?.reorderLevel) || 0
//   const reorderQty = Number(inventory?.reorderQuantity) || 0;
//   const quantity = Number(inventory?.quantity) || 0;

//   return (
//     <TableBody>
//       <TableRow>
//         <TableCell>{productName}</TableCell>
//         <TableCell>{description}</TableCell>
//         <TableCell>{category}</TableCell>
//         <TableCell>{(unitPrice || 0).toFixed(2)}</TableCell>
//         <TableCell>{(sellingPrice || 0).toFixed(2)}</TableCell>
//         <TableCell>{quantityPerUnit}</TableCell>
//         <TableCell>
//           <span className={`${reorderLevel > quantity ? 'text-white-600 text-center ring-1 ring-red-600 bg-red-500 rounded p-1' :
//             reorderLevel === quantity ? 'text-black text-center ring-1 ring-amber-400 bg-amber-600 rounded p-1' :
//               'text-white text-center ring-1 ring-green-900 bg-green-500 rounded p-1'
//             }`}>

//             {quantity}


//           </span> </TableCell>
//         <TableCell>{Number(reorderLevel)}</TableCell>
//         <TableCell>{Number(reorderQty)}</TableCell>

//         <TableCell className='text-end'>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button size='icon' variant='ghost'>
//                 <MoreHorizontal className='h-4 w-4' />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <div style={{ display: 'flex', flexDirection: 'column' }}>
//                 <DropdownMenuItem asChild>
//                   <EditProduct productID={productID} productName={productName} description={description || ''} category={category} />
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <AddInventory productID={productID} reorderLevel={Number(reorderLevel)} reorderQuantity={0} sellingPrice={Number(sellingPrice)} unitPrice={Number(unitPrice)} />
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <EditInventory productID={productID} reorderLevel={Number(reorderLevel)} reorderQuantity={Number(quantity)} sellingPrice={Number(sellingPrice)} unitPrice={Number(unitPrice)} />
//                 </DropdownMenuItem>
//               </div>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </TableCell>

//       </TableRow>
//     </TableBody>

//   )
// }

// export default ProductTable
