// Same as previous implementation
import { sign, verify, decode, JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: object): string {
    return sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | string {
    return verify(token, JWT_SECRET);
}

export function decodeToken(token: string): JwtPayload | null {
    try {
        return decode(token) as JwtPayload;
    } catch (error) {
        return null;
    }
}