import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import prisma from '../../prismadb'
import SignForm from '@/app/register/form'
import Unauthorized from '@/app/components/Unauthorized'


const fetchFeed = async () => {
    const results = await prisma.user.findMany({
        orderBy: {
            username: 'asc'
        }
    });
    return results
}

const page = async () => {
    const data = await fetchFeed()
    return (
        <div>
            <div className='flex items-center justify-between'>
                <SignForm />
            </div>
            <Card>
                <CardHeader className='px-7'>
                    <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" text-black">ID</TableHead>
                                <TableHead className="text-black">Username</TableHead>
                                <TableHead className=" text-black">Role</TableHead>
                                <TableHead className="text-black">Date</TableHead>

                            </TableRow>
                        </TableHeader>
                        {data.map((item, i) => (
                            <TableBody key={i}>
                                <TableRow>
                                    <TableCell className="font-medium">{(item.userID).split('-')[0]}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell >{item.role}</TableCell>
                                    <TableCell >{(item.createdAt).toDateString()}</TableCell>

                                </TableRow>
                            </TableBody>
                        ))}
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default page
