import { logs } from "@/app/actions/logs";
import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"



export async function PUT(request: Request, context: any) {
    try {
        const { quantity, reorderLevel, reorderQuantity, sellingPrice, unitPrice, } = await request.json();
        const { inventoryID } = context.params;

        const updatedInventory = await prisma.inventory.update({
            where: { productID: inventoryID },
            data: { quantity: reorderQuantity, reorderLevel, reorderQuantity },
        });


        const updatedProduct = await prisma.products.update({
            where: { productID: inventoryID },
            data: { sellingPrice: sellingPrice, unitPrice: unitPrice, }
        })
        const updated = await { updatedInventory, updatedProduct }
        return NextResponse.json(updated);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating inventory" }, { status: 500 });
    }
}