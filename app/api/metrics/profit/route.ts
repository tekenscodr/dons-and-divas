import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function GET(req: Request) {
    try {
        const orders = await prisma.orderDetails.findMany({
            include: {
                Product: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const dailySales = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dailyOrders = orders.filter((order) => {
                return order.createdAt.toISOString().split('T')[0] === date.toISOString().split('T')[0];
            });
            const totalSale = dailyOrders.reduce((acc, order) => {
                return acc + (Number(order.unitPrice) * Number(order.quantity));
            }, 0);
            const totalCost = dailyOrders.reduce((acc, order) => {
                return acc + (Number(order.Product.unitPrice) * Number(order.quantity));
            }, 0);
            const profit = totalSale - totalCost;
            dailySales.push({
                period: `Day ${i + 1}`,
                sales: totalSale,
                profit: profit
            });
        }

        return NextResponse.json(dailySales);
    } catch (error) {
        return NextResponse.json(error);
    }
}



// try {
//     // Query the data using Prisma
//     const orderDetails = await prisma.orderDetails.groupBy({
//         by: ['createdAt'],
//         _sum: {
//             quantity: true,
//             unitPrice: true,
//         },
//         orderBy: {
//             createdAt: 'desc',
//         },
//     });

//     const products = await prisma.products.groupBy({
//         by: ['productID'],
//         _sum: {
//             unitPrice: true,
//         },
//         orderBy: {
//             productID: 'asc',
//         },
//     });

//     console.log(orderDetails)
//     // Do the calculations in TypeScript
//     const weeklyData = [];
//     for (let i = 0; i < 7; i++) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const dailyProfit = orderDetails.find((order) => order.createdAt.toISOString().split('T')[0] === date.toISOString().split('T')[0])?._sum.unitPrice || 0;
//         weeklyData.push({
//             period: `Day ${i + 1}`,
//             profit: dailyProfit,
//         });
//     }

//     const monthlyData = [];
//     for (let i = 0; i < 4; i++) {
//         const weeklyProfit = weeklyData.slice(i * 7, (i + 1) * 7).reduce((acc, day) => acc + Number(day.profit), 0);
//         monthlyData.push({
//             period: `Week ${i + 1}`,
//             profit: weeklyProfit,
//         });
//     }
//     const months = [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December',
//     ];
//     const yearlyData = [];
//     for (let i = 0; i < 12; i++) {
//         const monthlyProfit = monthlyData[i].profit;
//         yearlyData.push({
//             period: `${months[i]}`,
//             profit: monthlyProfit,
//         });
//     }

//     const results = [
//         { label: 'Weekly', data: weeklyData },
//         { label: 'Monthly', data: monthlyData },
//         { label: 'Yearly', data: yearlyData },
//     ];

//     return NextResponse.json(weeklyData)
// } catch (error) {
//     return NextResponse.json(error)

// }
// }