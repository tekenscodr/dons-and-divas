'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from "axios"
import Select from 'react-select';
import { SubmitButton } from '../components/SubmitButton'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type Props = {}

const SignForm = (props: Props) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        role: "",


    })

    const router = useRouter()


    const options = [
        { value: 'Attendant', label: 'Attendant' },
        { value: 'Admin', label: 'Admin' },
    ]


    const Register = () => {
        const data = {
            username: user.username,
            password: user.password,
            email: user.email,
            phone: user.phone,
            role: user.role,
        }
        axios.post('/api/register', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                router.push('/dashboard/users')
            })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className=" text-white bg-blue-900 hover:bg-blue-800 my-2"> Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription className='text-black'>
                    </DialogDescription>
                </DialogHeader>
                <form action={Register}>
                    <div className='p-10 rounded-lg shadow-lg px-8 '>
                        <h4 className="font-medium text-lg py-3 mb-4">Sign Up </h4>
                        <div className='flex flex-col'>
                            <label htmlFor='' className='mb-2'>Username</label>
                            <input
                                type="text"
                                className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                                id='name'
                                value={user.username}
                                placeholder='name'
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='' className='mb-2'>Email</label>
                            <input
                                type="text"
                                className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                                id='email'
                                value={user.email}
                                placeholder='email'
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='' className='mb-2'>Phone Number</label>
                            <input
                                type="text"
                                className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                                id='phone'
                                value={user.phone}
                                placeholder='phone'
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor='' className='mb-2'>Password</label>
                            <input
                                type="password"
                                className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                                id='password'
                                value={user.password}
                                placeholder='password'
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>



                        <div className='flex flex-col'>
                            <label htmlFor='' className='mb-2'>Role</label>
                            <Select
                                className='p-2  rounded-lg w-full mb-4 focus:outline-none  text-black'
                                onChange={(e) => setUser({ ...user, role: e?.value || '' })}
                                options={options}
                            />
                        </div>



                        <DialogClose asChild>
                            <div className='flex flex-col '>
                                <SubmitButton text='Register Now' />

                                <Link href='/login' className='text-sm text-center mt-5 text-neutral-600'>Already have an Account?</Link>

                            </div>
                        </DialogClose>
                    </div>
                </form>
                <DialogFooter className="sm:justify-start">
                    <p>Design by Tekens Technologies</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SignForm