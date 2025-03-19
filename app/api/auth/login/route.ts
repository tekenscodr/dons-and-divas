import { NextRequest, NextResponse } from 'next/server';
import * as auth from '../../../lib/auth';
import prisma from '../../../lib/prismadb';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { phone, password } = body;

        if (!phone || !password) {
            return NextResponse.json(
                { error: 'Missing credentials' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { phone: phone as string }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const isValidPassword = await auth.verifyPassword(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = auth.generateToken({
            userId: user.userID,
            role: user.role,
            phone: user.phone
        });

        return NextResponse.json(
            { token },
            {
                status: 200,
                headers: {
                    'Set-Cookie': `auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
                }
            }
        );

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}