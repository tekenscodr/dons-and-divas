import { NextResponse } from "next/server"
import prisma from "@/app/prismadb"

export async function POST(request: Request) {
    try {
        const data = await request.json()
        console.log(data)
        const { productName, description, category, unitPrice, sellingPrice, quantityPerUnit, reorderLevel, quantity, unit, type } = await data;

        const ifExists = await prisma.products.findFirst({
            where: {
                productName: data.productName
            }
        })
        if (ifExists) NextResponse.error();

        // Use transaction for atomic operations
        const result = await prisma.$transaction(async (tx) => {
            // Create product
            const product = await tx.products.create({
                data: {
                    productName,
                    description,
                    category,
                    unitPrice,
                    sellingPrice,
                    quantityPerUnit,
                    type
                }
            });

            // Create inventory based on product type
            if (type === 'Service') {
                await tx.inventory.create({
                    data: {
                        productID: product.productID,
                        reorderLevel: 10,
                        reorderQuantity: 10,
                        quantity: 10,
                    }
                });
            } else {
                await tx.inventory.create({
                    data: {
                        productID: product.productID,
                        reorderLevel,
                        reorderQuantity: quantity,
                        quantity,

                    }
                });
            }

        }, {
            maxWait: 5000, // 5 seconds max waiting time
            timeout: 10000 // 10 seconds transaction timeout
        });

        return NextResponse.json({ data: result, message: "Success" }, { status: 201 });


    } catch (error: any) {
        console.error('Product creation error:', error);
        return NextResponse.json(
            { error: "Failed to create product", message: error.message },
            { status: 500 }
        );
    }

}