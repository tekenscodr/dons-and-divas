import { PrismaClient } from '@prisma/client';
// import prisma from '../prismadb'


const prisma = new PrismaClient();

export const getDashboardMetrics = async (
    request: Request
): Promise<void> => {
    try {
        const count = await prisma.products.count();


    } catch (error) {

    }
}
