import jwt from 'jsonwebtoken';
import prisma from "@/app/prismadb"
import { jwtVerify, SignJWT } from 'jose'
import { cookies, headers } from 'next/headers';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { logout } from '@/app/actions/user';

interface UserJwtPayload {
    jti: string
    iat: number
}

const JWT_SECRET = 'your_secret_key_here'; // Change this to your actual secret key
export const getJwtSecretKey = () => {
    const secret = JWT_SECRET
    if (!secret || secret.length === 0) {
        throw new Error("Secret is not set")
    }
    return secret;
}

export function generateToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day
}


// Function to verify a JWT token
export async function verifyToken(token: string) {
    try {
        const decoded = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        console.log(`hey babe ${decoded}`)
        return decoded.payload.aud;
    } catch (error) {
        console.log("Token verification failed" + error)
        throw new Error("Token verification failed");
    }
}


export async function verify(cookie: string) {
    try {
        const authorization = cookie;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error("Token is missing");
        }
        const token = authorization.split(' ')[3];
        const decoded = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        if (!decoded) {
            console.log('Wrong token');
            throw new Error("Wrong token")
        }
        const userId = (decoded.payload.userid) as string
        const user = await axios.get(`http://localhost:3000/api/user/${userId}`)
        if (!user) throw new Error("User not found");
        return userId;
    } catch (error) {
        // await logout();
        console.log('failed')
        return `Error: ${error}`;
    }
}


export async function logoutCookie() {
    try {
        await (await cookies()).delete("SHOP")
        return;
    } catch (error) {
        throw new Error("Failed to logout")
    }
}



// Function to extract payload from a JWT token
export function extractPayload(token: string): any {
    try {
        const decoded = jwt.decode(token) as { [key: string]: any };
        const { exp, iat, ...payload } = decoded;
        // console.log(`hello: ${decoded}`)

        return payload;
    } catch (error) {
        // Token verification failed
        return null;
    }
}
