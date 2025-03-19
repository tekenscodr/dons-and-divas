import prisma from "@/app/prismadb"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json()
    const {
        username,
        password,
        phone,
        email,
        role,
    } = body

    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                phone,
                password: hashedPassword,
                role: role
            }
        })
        return NextResponse.json(user)
    } catch {
        return NextResponse.error()
    }
}