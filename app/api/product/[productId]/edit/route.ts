import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function PUT(request: Request, context: any) {
    try {
        const { params } = context
        const productId = await params.productId
        const data = await request.json()
        console.log(data)
        const updatedProduct = await prisma.products.update({
            where: {
                productID: productId
            },
            data: data

        })
        return NextResponse.json(updatedProduct)
    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }

}