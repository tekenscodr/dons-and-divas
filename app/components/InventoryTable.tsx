import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import AddInventory from "./AddInventory";
import Link from "next/link";
import { type Inventory } from "@prisma/client";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Row from "./TableRow";
import EditInventory from "./EditInventory";

const Inventory = async (props: Inventory) => {
  const { inventoryID, productID, quantity, reorderLevel, reorderQuantity } = props;
  const getProduct = async () => {
    const response = await axios.get(`/api/product/${productID}`);
    return response.data
  }
  // const queryClient = new QueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: ['products'],
  //   queryFn: getProduct
  // })
  return (
    <HydrationBoundary >
      <TableBody>
        <TableRow>
          <TableCell>{inventoryID}</TableCell>
          <Row productId={productID} />
          <TableCell>
            <p className={`${Number(reorderLevel) > Number(quantity) ? 'text-white-600 text-center ring-1 ring-red-600 bg-red-500 rounded' :
              Number(reorderLevel) === Number(quantity) ? 'text-black text-center ring-1 ring-amber-400 bg-amber-600 rounded' :
                'text-white text-center ring-1 ring-green-900 bg-green-500 rounded'
              }`}> {Number(quantity)}</p>

          </TableCell>
          <TableCell>{Number(reorderLevel)}</TableCell>
          <TableCell>{Number(reorderQuantity)}</TableCell>
          <TableCell className='text-end'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='icon' variant='ghost'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  {/* <EditInventory inventoryID={inventoryID} reorderLevel={reorderLevel} reorderQuantity={reorderQuantity} sellingPrice={0} unitPrice={0} /> */}
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </HydrationBoundary>
  );
};

export default Inventory;