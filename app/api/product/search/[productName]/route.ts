import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(request: Request, context: any) {
    try {
        const { params } = context
        const productName = await params.productname
        const product = await prisma.products.findFirst({
            where: {
                productName: productName
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }

}