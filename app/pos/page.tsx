import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

const page = () => {

    return (
        <div className='flex flex-row justify-start'>
            <Link href={''}>
                <Card className='flex flex-col items-center justify-center bg-blue-950 text-white cursor-pointer'>
                    <CardContent>
                        <CardTitle>Spa</CardTitle>
                    </CardContent>
                </Card>
            </Link>
            <Link href={''}>
                <Card className='flex flex-col items-center bg-blue-950 text-white cursor-pointer'>
                    <CardContent>
                        <CardTitle>Massage</CardTitle>
                    </CardContent>
                </Card>
            </Link>
            <Link href={''}>
                <Card className='flex flex-col items-center bg-blue-950 text-white cursor-pointer'>
                    <CardContent>
                        <CardTitle>Nails</CardTitle>
                    </CardContent>
                </Card>
            </Link>
            <Link href={''}>
                <Card className='flex flex-col items-center bg-blue-950 text-white cursor-pointer'>
                    <CardContent>
                        <CardTitle>Hair</CardTitle>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default page