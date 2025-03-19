import { NextRequest, NextResponse } from "next/server"
import { cookies, headers } from 'next/headers'
import { verify } from "./app/api/auth/jwt";
import axios from "axios";



export async function middleware(request: Request, req: NextRequest) {
    const cookieOPN = await (await cookies()).get('SHOP')?.value
    if (cookieOPN) {
        const response = await verify(cookieOPN)
        console.log(response)
        if (!response || response == undefined || response.includes('JWTExpired')) {
            await axios.get('localhost:3000/api/clear-cookie').catch((error) => {
                console.error('Axios error:', error.message);
                console.error('Axios error config:', error.config);
                console.error('Axios error response:', error.response);
            });
            return NextResponse.redirect(new URL('/login', request.url))
        } else {
            return NextResponse.next()
        }
    } else {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/dashboard/:path*']
}

