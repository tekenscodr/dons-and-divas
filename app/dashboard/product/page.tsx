import axios from "axios"
import { ProductType, columns } from "./columns"
import { DataTable } from "./data-table"
import prisma from "@/app/prismadb"
import { unstable_noStore as noStore } from 'next/cache';

async function getData(): Promise<ProductType[]> {
    noStore();
    // Fetch data from your API here.
    const product = await prisma.products.findMany()
    const productData: ProductType[] = []

    if (product == null) {
        return [
        ]
    } else {
        for (const p of product) {
            const inventory = await prisma.inventory.findFirst({
                where: { productID: p.productID }
            })
            productData.push({
                id: p.productID,
                productName: p.productName,
                price: Number(p.sellingPrice),
                stock: inventory ? Number(inventory.quantity) : 0, // Handle null case
                reorderLevel: inventory ? Number(inventory.reorderLevel) : 0 // Handle null case
            })
        }
        return productData
    }
}


export default async function Product() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
