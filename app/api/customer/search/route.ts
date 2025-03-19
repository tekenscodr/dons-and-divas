import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(request: Request) {
    try {
        const customer = await prisma.customer.findMany();
        console.log(customer)
        return NextResponse.json({ data: customer }, { status: 200 });
    } catch (error) {
        console.log('Error finding customer')
        return NextResponse.json({ error: 'Error while finding customer' }, { status: 400 })

    }
}