import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"
import { useId } from "react";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const id = userId;
    try {
        const user = await prisma.user.findFirst({
            where: {
                userID: id
            }
        })
        return NextResponse.json({ data: user, message: "Success" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' });

    }

}

