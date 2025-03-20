import { NextResponse } from "next/server";
import prisma from "@/app/prismadb"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
) {


    const { productId } = await params;
    const id = await productId
    try {
        const product = prisma.products.findFirst({
            where: {
                productID: id
            }
        })
        return NextResponse.json({ data: product, message: "Success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}