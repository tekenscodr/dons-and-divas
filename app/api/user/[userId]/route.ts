import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(req: Request, context: any) {
    const { params } = await context;

    const userId = await params.userId as string;
    if (!userId) {
        return NextResponse.json({ error: 'User ID is missing' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                userID: userId
            }
        });
        if (!user) {
            return NextResponse.json({ error: 'User not found' });
        }
        // console.log(user)
        return NextResponse.json({ message: 'User found', user });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' });

    }

}