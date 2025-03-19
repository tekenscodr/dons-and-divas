import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const {
            productId,
            quantity,
            reorderLevel,
            reorderQuantity
        } = await data;

        const inventoryRecord = await prisma.inventory.create({
            data: {
                quantity: parseInt(quantity),
                reorderLevel: parseInt(reorderLevel),
                reorderQuantity: parseInt(reorderQuantity),
                Product: {
                    connect: {
                        productID: productId
                    }
                }
            }
        });
        console.log(inventoryRecord);
        return NextResponse.json(inventoryRecord)
    } catch (error) {
        console.error(error);
        return NextResponse.json(error)

    }
}


