"use server"
import prisma from "@/app/prismadb"

export async function getProduct(productID: string | '') {
    try {
        const product = await prisma.products.findFirst({
            where: {
                productID: productID
            },
            select: { productName: true }
        })
        return { product }
    } catch (error) {
        return { error }
    }

}

export async function updateInventory(formData: FormData, id: string) {
    try {

        const inventory = await prisma.inventory.update({
            where: { inventoryID: id },
            data: {
                quantity: formData.get("quantity") as unknown as number,
                reorderLevel: formData.get("quantity") as unknown as number,
                reorderQuantity: formData.get("quantity") as unknown as number,
            },
        })
        console.log(inventory)
    } catch (error) {

    }
}

export async function getReorders(productID: string) {
    try {
        const inventoryDetails = await prisma.inventory.findUnique({
            where: { productID: productID },
            select: { reorderLevel: true }
        })
        return inventoryDetails
    } catch (error) {
        console.log(error)
        return error
    }
}


// export const getTotals = async () => {
//     const today = new Date();
//     const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
//     const thisYear = new Date(today.getFullYear(), 0, 1);

//     const dailySales = await prisma.orderDetails.groupBy({
//         by: ['orderID'],
//         where: {
//             createdAt: {
//                 gte: today,
//             },
//         },
//         _sum: {
//             quantity: true,
//             unitPrice: true,
//         },
//     })

//     const dailyProfit = dailySales.reduce((acc, order) => acc + ((order._sum.unitPrice ?? 0) as number * (order._sum.quantity ?? 0)), 0);

//     const weeklySales = await prisma.orderDetails.groupBy({
//         by: ['orderID'],
//         where: {
//             createdAt: {
//                 gte: thisWeek,
//             },
//         },
//         _sum: {
//             quantity: true,
//             unitPrice: true,
//         }
//     });

//     const weeklyProfit = weeklySales.reduce((acc, order) => acc + ((order._sum.unitPrice ?? 0) as number * (order._sum.quantity ?? 0)), 0);

//     const yearlySales = await prisma.orderDetails.groupBy({
//         by: ['orderID'],
//         where: {
//             createdAt: {
//                 gte: thisYear,
//             },
//         },
//         _sum: {
//             quantity: true,
//             unitPrice: true,
//         }
//     });

//     const yearlyProfit = yearlySales.reduce((acc, order) => acc + ((order._sum.unitPrice ?? 0) as number * (order._sum.quantity ?? 0)), 0);

//     return {
//         dailySales: dailySales.reduce((acc, order) => acc + ((order._sum.unitPrice ?? 0) as number * (order._sum.quantity ?? 0)), 0),
//         dailyProfit,
//         weeklySales: weeklySales.reduce((acc, order) => acc + ((order._sum.unitPrice ?? 0) as number * (order._sum.quantity ?? 0)), 0),
//         weeklyProfit,
//         yearlySales: yearlySales.reduce((acc, order) => acc + ((order._sum.unitPrice ?? 0) as number * (order._sum.quantity ?? 0)), 0),
//         yearlyProfit,
//     };
// };


export const getTotals = async () => {
    const totals = await prisma.$transaction([
        prisma.orderDetails.groupBy({
            by: ['createdAt'],
            _sum: {
                quantity: true,
                unitPrice: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        }),
        prisma.products.groupBy({
            by: ['productID'],
            _sum: {
                unitPrice: true,
            },
            orderBy: {
                productID: 'asc',
            },
        }),
    ]);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const weeklyData = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dailyProfit = totals[0].find((order) => order.createdAt.toISOString().split('T')[0] === date.toISOString().split('T')[0])?._sum ?? { unitPrice: 0 }.unitPrice;
        weeklyData.push({
            period: `Day ${i + 1}`,
            profit: dailyProfit,
        });
    }

    const monthlyData = [];
    for (let i = 0; i < 4; i++) {
        const weeklyProfit = weeklyData.slice(i * 7, (i + 1) * 7).reduce((acc, day) => acc + Number(day.profit), 0);
        monthlyData.push({
            period: `Week ${i + 1}`,
            profit: weeklyProfit,
        });
    }

    const yearlyData = [];
    for (let i = 0; i < 12; i++) {
        const monthlyProfit = monthlyData[i].profit;
        yearlyData.push({
            period: `${months[i]}`,
            profit: monthlyProfit,
        });
    }

    return [
        { label: 'Weekly', data: weeklyData },
        { label: 'Monthly', data: monthlyData },
        { label: 'Yearly', data: yearlyData },
    ];
};


export const profitAndSales = async () => {
    try {
        const orders = await prisma.orderDetails.findMany({
            include: {
                Product: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        const dailySales = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
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
                period: dayOfWeek,
                sales: totalSale,
                profit: profit
            });
        }

        return dailySales;
    } catch (error) {
        return error;
    }
}