/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from '../actions/user';
import { SubmitButton } from '../components/SubmitButton';
import { toast } from 'sonner';
import { useUserStore } from '../store/user';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {}

type FormFields = {
    username: string,
    password: string,

}

const Signinform = (props: Props) => {
    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<FormFields>()
    // const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const loginF: SubmitHandler<FormFields> = async (data) => {
        try {
            // setIsLoading(true);
            const response = await login(data.username, data.password)
            if (response.message === "Login Failed") {

                console.log("Login Failed", response);
                return toast("Awwnnn!!", {
                    description: "Try again Error while logging in"
                })
            }
            router.push('/dashboard')
            console.log('LOGIN', response.data)
            const user = await response.userId
            console.log(`User.... ${user}`)
            // setIsLoading(false);
            await localStorage.setItem('user', user)
            await localStorage.setItem('role', response.data.result.role)
            reset()
            toast("Hurray!!", {
                description: "You're logged in"
            })
        } catch (error) {
            // setIsLoading(false);
            console.log('Error while logging in', error)
            toast("Awwnnn!!", {
                description: "Try again Error while logging in"
            })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(loginF)}>
                <div className='flex flex-col items-center justify-center min-h-screen py-2'>
                    <div className='p-10 rounded-lg shadow-lg flex flex-col'>
                        <h1 className='text-xl font-medium mb-4'>Sign In</h1>
                        <label htmlFor="" className='mb-2'>Username</label>
                        <input
                            type="text"
                            className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                            id='username'
                            placeholder='username'
                            {...register('username', {
                            })} />
                        <label htmlFor="" className='mb-2'>Password</label>
                        <input
                            type="password"
                            className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                            id='password'
                            placeholder='password'
                            {...register('password', {
                            })} />
                        {/* {isLoading ? (
                            <Button className="w-full">
                                <Loader2 className="mr-2 h-4 animate-spin w-4" />
                                Please Wait
                            </Button>
                        ) : (
                            <Button type="submit" className="bg-slate-800 hover:bg-[#39060c] w-full">
                                Login
                            </Button>)} */}
                        <SubmitButton text='Login' />
                    </div>
                </div>
            </form>

        </>

    )
}

export default Signinform