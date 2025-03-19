import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(request: Request, context: any) {
    try {
        const getServices = await prisma.products.findMany({
            where: {
                type: "Service"
            }
        })
        if (getServices.length === 0) {
            return NextResponse.json({ error: 'No services found' }, { status: 404 })
        }
        console.log(getServices)
        return NextResponse.json({ data: getServices }, { status: 200 })
    } catch (error) {
        return NextResponse.json({}, { status: 500 })
    }
}