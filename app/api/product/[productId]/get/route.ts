import { NextResponse } from "next/server";
import prisma from "@/app/prismadb"

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
        console.log(product)
        return NextResponse.json({ data: product, message: "Success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}