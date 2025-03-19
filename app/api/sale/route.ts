import { NextResponse } from "next/server"
import prisma from "../../lib/prismadb"
import { UUID as uuid } from 'crypto';

export async function POST(request: Request, context: any) {
    try {

    } catch (error) {
        console.error('Sale error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}