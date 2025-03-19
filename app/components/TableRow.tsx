"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { TableCell } from '@/components/ui/table';
import { getProduct } from '../utils/actions';

type Props = {
    productId: string | "";
};

const Row = ({ productId }: Props) => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['product', productId], // Include productId in the queryKey
        queryFn: () => getProduct(productId),
    });


    return (
        <>
            {isLoading && <TableCell><div>Loading...</div></TableCell>}
            {error && <TableCell><div>Error: {error.message}</div></TableCell>}
            {data && <TableCell>{data?.product?.productName}</TableCell>}
        </>
    )
}

export default Row
