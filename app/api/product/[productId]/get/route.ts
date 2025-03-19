import { NextResponse } from "next/server";
import prisma from "@/app/prismadb"

export async function GET(request: Request, context: any) {
    const { params } = context;
    const productId = await params.productId
    try {
        const product = prisma.products.findFirst({
            where: {
                productID: productId
            }
        })
        return NextResponse.json({ data: product, message: "Success" }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}