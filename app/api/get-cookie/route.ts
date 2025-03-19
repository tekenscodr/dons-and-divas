import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "../auth/jwt";
import prisma from "@/app/prismadb"
type Params = {
    action: string;
    location: string;
}
export async function POST(req: Request) {
    try {
        const body: Params = await req.json()
        const cookieOPN = await (await cookies()).get('SHOP')?.value
        if (cookieOPN) {
            const response = await verify(cookieOPN)
            console.log(response)

            const savedlog = await prisma.logs.create({
                data: {
                    action: body.action,
                    location: body.location,
                    userID: response
                }
            })
            console.log(savedlog)
            return NextResponse.json(savedlog)
        }
    } catch (error) {
        return NextResponse.json(`Error: ${error}`)
    }
}