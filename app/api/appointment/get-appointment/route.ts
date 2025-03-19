import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(request: Request, context: any) {
    try {
        const appointment = await prisma.appointment.findMany()
        return NextResponse.json(appointment, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching appointment', error: error }, { status: 500 })
    }
}