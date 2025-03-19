import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'sonner';

interface CustomerOption {
    value: string; // customerId
    label: string; // customer name + phone
    phone: string;
}

interface CustomerSearchProps {
    index: number;
    register: any;
    setValue: any;
    control: any;
}

interface Customer {
    customerId: string;
    name: string;
    phone: string;
}

export const CustomerSearch = ({ index, register, setValue, control }: CustomerSearchProps) => {
    const [customers, setCustomers] = useState<CustomerOption[]>([]);
    const [isNewCustomer, setIsNewCustomer] = useState(false);
    const [customer, setCustomer] = useState<Customer[]>([]);



    // Add this useEffect after other useEffects:
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/customer/get-customers');
                console.log('Customer response:', response.data); // Debug log

                const mappedCustomer = response.data.map((customer: Customer) => ({
                    value: customer.customerId, // Make sure this matches your API response
                    label: customer.name // Make sure this matches your API response
                }));

                console.log('Mapped customer:', mappedCustomer); // Debug log
                setCustomer(mappedCustomer);
            } catch (error) {
                console.error('Error fetching customer:', error);
                toast.error('Failed to load customer');
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // Fetch registered customers
        axios.get('/api/customer/get-customers')
            .then(response => {
                setCustomers(response.data.map((customer: any) => ({
                    value: customer.customerId,
                    label: `${customer.customerName} (${customer.phone})`,
                    phone: customer.phone
                })));
            })
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id={`newCustomer-${index}`}
                    checked={isNewCustomer}
                    onChange={(e) => setIsNewCustomer(e.target.checked)}
                />
                <Label htmlFor={`newCustomer-${index}`}>New Customer</Label>
            </div>

            {isNewCustomer ? (
                <div className="space-y-2">
                    <div>
                        <Label>Customer Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter customer name"
                            {...register(`fields.${index}.customerName`)}
                        />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            placeholder="Enter phone number"
                            {...register(`fields.${index}.phone`)}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <Label>Select Customer</Label>
                    <Select
                        options={customers}
                        onChange={(selected: any) => {
                            setValue(`fields.${index}.customerId`, selected?.value);
                            setValue(`fields.${index}.phone`, selected?.phone);
                        }}
                        placeholder="Search customer..."
                        isClearable
                    />
                </div>
            )}
        </div>
    );
};