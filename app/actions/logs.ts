'use server'
import prisma from "@/app/prismadb"
import { cookies, headers } from 'next/headers'

export async function logs(action: string, location: string, user: string) {
    try {

        const savedlog = await prisma.logs.create({
            data: {
                action: action,
                location: location,
                userID: user
            }
        })


    } catch (error) {
        console.log("error")
        throw new Error("error")
    }
}