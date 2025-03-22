import { NextResponse } from "next/server";
import prisma from "@/app/prismadb"

interface Fields {
    inventoryID: string,
    reorderLevel: number,
    reorderQuantity: number;
    sellingPrice: number;
    unitPrice: number;
}
export async function GET(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
) {

    const { productId } = await params;
    console.log(productId)
    try {
        const product = await prisma.products.findFirst({
            where: {
                productID: productId
            }
        })
        const inventory = await prisma.inventory.findFirst({
            where: {
                productID: productId
            }
        })
        if (!product || !inventory) return NextResponse.json({ message: "Failed to display" }, { status: 501 });

        const data = await {
            inventoryID: inventory.inventoryID,
            reorderLevel: inventory.reorderLevel,
            reorderQuantity: inventory.reorderQuantity,
            sellingPrice: product.sellingPrice,
            unitPrice: product.unitPrice,
        }
        return NextResponse.json({ data: data, message: "Success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}