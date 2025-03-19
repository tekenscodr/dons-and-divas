// import { logs } from "@/app/actions/logs";
// import prisma from "../../prismadb"
// import bcrypt from "bcryptjs"
// import { NextResponse } from "next/server";
// import axios from "axios";

// type User = {
//     username: string;
//     password: string;
// }

// export async function POST(req: Request) {
//     const body = await req.json()
//     const userData: User = body

//     try {
//         //hash password
//         const hashedPassword = await bcrypt.hash(userData.password, 10)

//         const user = await prisma.user.create({
//             data: {
//                 username: userData.username,
//                 password: hashedPassword,
//             }
//         })


//         // Check if data is parsed to DB
//         if (!user) return NextResponse.json({ error: 'User not found' });
//         // Else return

//         await axios.post('/api/get-cookie', {
//             action: "register",
//             location: "users",
//         })
//         return NextResponse.json({ message: 'Register successful', user });

//     } catch (error) {
//         console.error('Error during login:', error);
//         return NextResponse.json({ error: 'Internal Server Error' });
//     }

// }