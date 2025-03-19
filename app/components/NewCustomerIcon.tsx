import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SubmitButton } from './SubmitButton';
import axios from 'axios';
import { Loader2, PlusCircle } from "lucide-react";
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';


const NewCustomerIcon = () => {
    const { register, handleSubmit, reset } = useForm();
    const { pending } = useFormStatus();


    const onSubmit = async (data: any) => {
        try {
            console.log(data);
            const customer = await axios.post('/api/customer/add-customer', data.customer)
            if (customer.status === 201) {
                await toast("Success", {
                    description: "Customer added"
                })
                reset()
            } else {
                await toast("Failed", {
                    description: "Customer Failed to be added"
                })
            }
        } catch (error) {
            console.error('Error adding customer:', error);

        }
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="items-center font-bold text-2xl text-green-500 bg-transparent ring-1 hover:bg-transparent">
                        <PlusCircle className="h-6 w-6" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Add Customer</DialogTitle>
                    <form >
                        <div className="space-y-4">
                            <div className="grid w-full gap-2">
                                <Label htmlFor="customerName">Customer Name</Label>
                                <Input
                                    id="customerName"
                                    type="text"
                                    {...register('customer.customerName', {
                                        required: 'Customer name is required'
                                    })}
                                />
                            </div>

                            <div className="flex flex-row gap-3">
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        {...register('customer.phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9+\-\s()]*$/,
                                                message: 'Please enter a valid phone number'
                                            }
                                        })}
                                    />
                                </div>

                                {/* Optional Email field */}
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register('customer.email', {
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="grid w-full gap-2">
                                <Label htmlFor="customerAddress">Customer Address</Label>
                                <Input
                                    id="customerAddress"
                                    type="text"
                                    {...register('customer.customerAddress', {
                                        required: 'Customer address is required'
                                    })}
                                />
                            </div>
                            <div className="grid w-full gap-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input
                                    id="companyName"
                                    type="text"
                                    {...register('customer.companyName', {
                                        required: 'Company name is required'
                                    })}
                                />
                            </div>

                            {pending ? (
                                <Button disabled >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit(onSubmit)} className="bg-black hover:bg-gray-900 text-white">
                                    Add Customer
                                </Button>
                            )}
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default NewCustomerIcon