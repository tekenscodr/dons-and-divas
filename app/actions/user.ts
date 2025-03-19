import axios from "axios";
import { error } from "console";
import { serialize } from "cookie"



export const login = async (username: string, password: string) => {
    const MAX_AGE = 60 * 60 * 24
    try {
        console.log("Hello World")
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            const token = `Bearer on holiday ${data.result.token}`;
            console.log("UserData", data)
            const serialized = serialize("SHOP", token, {
                secure: true,
                sameSite: 'strict',
                maxAge: MAX_AGE,
            })
            document.cookie = serialized
            const userId = data.result.userID; // Grab the userId
            console.log(data, userId)
            return { data, userId };
        } else {
            console.log('Login Failed', response);
            return { error: response, message: 'Login Failed' };
        }
    } catch (error: any) {
        console.log('Error logging in:', error);
        throw new Error('Login Failed... Try Again ', error)
    }
};
export const logout = async () => {
    try {
        await axios.get('/api/clear-cookie')
    } catch (error: any) {
        console.error('Error logging out:', error);
        throw new Error(error);
    }
};

export const getSession = async () => {
    'use client'
    try {
        const data = await sessionStorage.getItem('token')
        console.log(data)
        return data
    } catch (error) {
        console.error('No data found');

    }
}


