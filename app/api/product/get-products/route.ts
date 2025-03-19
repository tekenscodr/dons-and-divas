import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(request: Request) {
    try {
        const products = await prisma.products.findMany();

        // Early return for empty products
        if (!products?.length) {
            return NextResponse.json([]);
        }

        const productsWithQuantity = [];

        for (const product of products) {
            const inventory = await prisma.inventory.findFirst({
                where: {
                    productID: product.productID,
                    quantity: {
                        gt: 0
                    }
                }
            });

            // Only add products with available inventory
            if (inventory) {
                productsWithQuantity.push({
                    ...product,
                    quantity: inventory.quantity
                });
            }
        }

        return NextResponse.json(productsWithQuantity);
    } catch (error) {
        console.error('[GET_PRODUCTS_ERROR]', error);
        return NextResponse.error();
    }
}