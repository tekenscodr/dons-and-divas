import { NextResponse } from "next/server";
import prisma from "@/app/prismadb"

export async function GET(request: Request, context: any) {
    const { params } = context;
    const productId = await params.productId
    try {
        return prisma.products.findFirst({
            where: {
                productID: productId
            }
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}