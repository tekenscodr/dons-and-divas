import { NextResponse } from "next/server";
import prisma from "@/app/prismadb"


export async function GET(
    request: Request,
    { params }: { params: Promise<{ receiptID: string }> }
) {
    const { receiptID } = await params;
    try {
        const receipt = await prisma.receipts.findFirst({
            where: { receiptID: receiptID },
        })
        if (!receipt) return NextResponse.json({ message: "Could not find receipt data" }, { status: 404 });
        const orderDetails = await prisma.orderDetails.findMany({
            where: { orderID: receipt.orderID },
            include: { Product: true, },
        })
        if (!orderDetails) return NextResponse.json({ message: "Could not find order details data" }, { status: 404 });

        const order = await prisma.orders.findFirst({
            where: { orderID: receipt.orderID }
        })
        if (!order) return NextResponse.json({ message: "Attendant not found" }, { status: 404 })
        const attendant = await prisma.user.findFirst({
            where: { userID: order?.attendant }
        })
        const receiptDetails = await { receipt, orderDetails }
        return NextResponse.json({ data: { receiptDetails, attendant: attendant ? attendant.username : "Boss" }, message: "Success", status: 200 }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error, message: "Failed", status: 500 }, { status: 500 })
    }
}
