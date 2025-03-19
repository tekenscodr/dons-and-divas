import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(request: Request, context: any) {
    try {
        const inventory = await prisma.inventory.findMany({ take: 10 })
        return NextResponse.json(inventory)

    } catch (error) {
        console.log(error)
        return NextResponse.error()
    }

}