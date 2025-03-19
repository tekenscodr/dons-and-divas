'use client'
import Select from 'react-select';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AddCustomer from './AddCustomer';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewCustomerIcon from './NewCustomerIcon';

interface CustomerOptions {
    value: string;
    label: string;
}
interface Customer {
    customerID: string;
    address: string;
    email: string;
    name: string;
    phone: string;
    companyName: string;
}

interface Option {
    label: string;
    value: string;
    unitPrice: number;
}

const AppointmentForm = () => {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            productName: '',
            date: '',
            time: '',
            customerID: '',
        }
    });

    const [options, setOptions] = useState<Option[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [customer, setCustomer] = useState<CustomerOptions[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customer/get-customers');
                console.log('Customer response:', response.data.data); // Debug log

                const mappedCustomer = response.data.data.map((customer: Customer) => ({
                    value: customer.customerID, // Make sure this matches your API response
                    label: customer.phone // Make sure this matches your API response
                }));
                console.log('Mapped customer:', mappedCustomer); // Debug log
                setCustomer(mappedCustomer);
            } catch (error) {
                console.error('Error fetching customer:', error);
                toast.error('Failed to load customer');
            }
        };

        fetchCustomers();
    }, []);

    useEffect(() => {
        axios.get('/api/service/get-services')
            .then(response => {
                console.log(response.data);
                setOptions(response.data.data.map((option: { productID: any; productName: any; sellingPrice: any }) => ({
                    value: option.productName,
                    label: option.productName + `      GHC${option.sellingPrice}`,
                    unitPrice: option.sellingPrice
                })));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const onSubmit = async (data: any) => {
        try {
            console.log(data)
            const response = await axios.post('/api/appointment/add', data);
            console.log(response.data);
            toast.success('Appointment booked successfully');
            reset();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Appointment failed to book');
        }
    }

    return (
        <div className='w-full max-w-3xl mx-auto p-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="mt-5">
                    <CardHeader>
                        <div className="flex flex-col items-center">
                            <CardTitle>DONS & DIVAS</CardTitle>
                            <CardDescription>Book an appointment with us!</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="flex flex-col gap-2">
                                <div className="mt-6">
                                    <Label>Type your phone</Label>
                                    <div className="flex md:flex-row justify-between gap-3 mt-4 mb-4">
                                        <div className="w-full md:w-4/5 ">
                                            <Controller
                                                name="customerID"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        value={customer.find((customer) => customer.value === field.value)}
                                                        onChange={(newValue) => field.onChange(newValue?.value)}
                                                        options={customer}
                                                        placeholder="Select Customer"
                                                        isSearchable
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="w-full md:w-1/5 ">
                                            <NewCustomerIcon />
                                        </div>
                                    </div>
                                    <Label>Service Name</Label>
                                    <Controller
                                        name="productName"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                className="mt-2"
                                                value={options.find((option) => option.value === field.value)}
                                                onChange={(newValue) => {
                                                    field.onChange(newValue?.value);
                                                    setSelectedOption(newValue);
                                                }}
                                                options={options}
                                                isSearchable
                                            />
                                        )}
                                    />
                                    <div className="flex flex-col mt-4 mb-4">
                                        <Label>Date</Label>
                                        <Input
                                            type="date"
                                            {...register('date')}
                                            className="w-full mt-2"
                                            placeholder="Select Date"
                                        />
                                    </div>
                                    <div className="flex flex-col mt-4 mb-4">
                                        <Label>Time</Label>
                                        <Input
                                            type="time"
                                            {...register('time')}
                                            className="w-full mt-2"
                                            placeholder="Select Time"
                                        />
                                    </div>
                                </div>
                            </div>
                            {isLoading ? (
                                <Button className="w-full">
                                    <Loader2 className="mr-2 h-4 animate-spin w-4" />
                                    Please Wait
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-slate-800 hover:bg-[#39060c] w-full">
                                    Book appointment
                                </Button>)}
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}

export default AppointmentForm