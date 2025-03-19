import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function POST(request: Request, context: any) {
    try {
        const { params } = context
        const productId = await params.productId
        const data = await request.json()
        console.log(data)

        const ifExists = await prisma.inventory.findFirst({
            where: { productID: productId }
        })
        if (ifExists) {
            const updateProduct = await prisma.products.update({
                where: { productID: productId },
                data: data
            })
            return NextResponse.json(updateProduct)
        } else {
            const product = await prisma.inventory.create({
                data: data
            })
            return NextResponse.json(product)
        }


    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }

}