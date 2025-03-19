import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log(body)
        const customer = await prisma.customer.create({
            data: {
                name: body.customerName,
                phone: body.phone,
                email: body.email,
                companyName: body.companyName,
                address: body.customerAddress
            }
        });
        console.log(customer)
        return NextResponse.json({ data: customer }, { status: 201 });
    } catch (error) {
        console.error('[GET_CUSTOMER_ERROR]', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}