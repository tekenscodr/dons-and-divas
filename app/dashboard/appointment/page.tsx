import React from 'react'
import { Appointment, columns } from "./columns"
import { DataTable } from "./data-table"
import prisma from "@/app/prismadb"


async function getData(): Promise<Appointment[]> {
    const resp = await prisma.appointment.findMany()
    console.log(resp)
    const appointmentData: Appointment[] = []

    if (resp == null) {
        return []
    } else {
        for (const d of resp) {
            const customer = await prisma.customer.findFirst({
                where: { customerID: d.customerID }
            })
            if (!customer) {
                continue
            }
            appointmentData.push({
                id: d.appointmentID,
                date: d.date,
                time: d.time,
                status: d.status,
                service: d.service,
                createdAt: d.createdAt?.toDateString() || '',
                customerID: customer.name
            })
        }
        return appointmentData
    }
}

const page = async () => {

    const data = await getData()
    console.log(data)

    return (
        <div className='bg-white'>
            <p className="font-semibold text-2xl p-2 mb-6">Appointments</p>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default page