import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb"

export async function GET(request: Request) {
    try {
        const customer = await prisma.customer.findMany();
        if (!customer) {
            return NextResponse.json({ message: 'Customer not found', data: customer }, { status: 404 },);
        } else {
            return NextResponse.json({ message: 'Customer found', data: customer }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.error();
    }
}