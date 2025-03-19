// app/api/staff/register/route.ts
import { hashPassword } from '../../../lib/auth';
import prisma from '../../..//lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const phoneRegex = /^0[235][0-9]{8}$/; // Ghanaian phone number pattern

const schema = z.object({
    name: z.string().min(2).max(100),
    role: z.enum(['admin', 'staff']),
    phone: z.string().regex(phoneRegex),
    password: z.string().min(6).max(100),
});

export async function POST(req: NextRequest) {
    try {
        // Validate Content-Type
        const contentType = req.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            return NextResponse.json(
                { error: 'Invalid content type' },
                { status: 415 }
            );
        }

        // Parse and validate request body
        const body = await req.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const { name, role, phone, password } = validation.data;

        // Check for existing staff
        const existingStaff = await prisma.user.findUnique({
            where: { phone },
            select: { userID: true },
        });

        if (existingStaff) {
            return NextResponse.json(
                { error: 'Staff member already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create staff record
        const newStaff = await prisma.user.create({
            data: {
                username,
                role,
                phone,
                password: hashedPassword,
            },
            select: {
                userID: true,
                username: true,
                role: true,
                phone: true,
                createdAt: true,
            },
        });

        return NextResponse.json(newStaff, { status: 201 });

    } catch (error: any) {
        // Log detailed error for debugging
        console.log('[STAFF_REGISTRATION_ERROR]', error.message);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}