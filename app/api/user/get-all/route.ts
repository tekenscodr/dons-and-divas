import prisma from "@/app/prismadb"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const users = await prisma.user.findMany({
            where: {
                role: 'Attendant',
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.error()
    }
}