import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function POST(request: Request, context: any) {
    try {
        const data = await request.json()
        console.log('Data:', data)

        const { date, time, customerID, productName } = data
        if (!date || !time || !customerID || !productName) {
            return NextResponse.json({ message: 'Invalid request data' }, {
                status
                    : 400
            })
        }
        console.log(data.date, data.time, data.customerID, data.productName)
        const appointment = await prisma.appointment.create({
            data: {
                date: data.date,
                time: data.time,
                customerID: data.customerID,
                service: data.productName

            }
        })
        console.log('Appointment:', appointment)
        return NextResponse.json(appointment, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Error creating appointment', error: error }, { status: 500 })
    }
}