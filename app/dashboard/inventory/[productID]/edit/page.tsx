import EditInventory from '@/app/components/EditInventory';
import EditProduct from '@/app/components/EditProduct';
import React from 'react'

export default async function Page({
    params,
}: {
    params: Promise<{ productID: string }>
}
) {
    const { productID } = await params;
    return (
        <div>
            <EditInventory productID={productID} />
        </div>
    )
}