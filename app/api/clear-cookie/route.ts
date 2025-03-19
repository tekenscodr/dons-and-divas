import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await (await cookies()).delete('SHOP')
        console.log("removed")
        return NextResponse.json({ remove: "removed" })

    } catch (error) {
        return NextResponse.json(error)
    }
}