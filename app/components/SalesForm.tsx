'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
// import Select from 'react-select';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Receipt } from './Receipt';
import { logs } from '../actions/logs';
import AddCustomer from './AddCustomer';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';


const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => null
});
interface Option {
  label: string;
  value: string;
  unitPrice: number;
}

interface Attendant {
  value: string;  // attendantId 
  label: string;  // attendantName
}

interface CustomerAttendant {
  attendant: string;
  customer: string;
}


interface ApiUser {
  userID: string;
  username: string;
  email: string;
  role: string;
}

interface Customer {
  customerID: string;
  address: string;
  email: string;
  name: string;
  phone: string;
  companyName: string;
}

interface CustomerOptions {
  value: string;
  label: string;
}

const Price = ({ control, index }: { control: any; index: number }) => {
  const value = useWatch({
    control,
    name: `fields.${index}`,
  });
  return (
    <div className="flex flex-col text-end">
      <p className="text-lg font-medium mt-2">
        GHC{((+value.qty || 0) * (+value.unitPrice || 0))}
      </p>
    </div>
  );
};


const TotalPrice = ({ control }: { control: any }) => {
  const fields = useWatch({
    control,
    name: 'fields',
  });

  const totalPrice = fields.reduce((total: number, field: { qty: number; unitPrice: number; discount: number; }) => {
    const discountAmount = field.discount * field.qty;
    return total + (field.qty * field.unitPrice) - discountAmount;
  }, 0);

  return (
    <div className="flex flex-col text-end">
      <p className="text-lg font-medium mt-2">
        GHC {totalPrice.toFixed(2)}
      </p>
    </div>
  );
};



const ParseTotalPrice = ({ control }: { control: any }) => {
  const fields = useWatch({
    control,
    name: 'fields',
  });

  const totalPrice = fields.reduce((total: number, field: { qty: number; unitPrice: number; discount: number; }) => {
    const discountAmount = field.discount * field.qty;
    return total + (field.qty * field.unitPrice) - discountAmount;
  }, 0);

  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(amount - totalPrice);
  }, [totalPrice, amount]);

  return (
    <Card className="w-[350px] mt-2">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Find the balance to be given</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="How much did customer pay"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <h3 className="text-end font-medium ">Balance: GHC {balance.toFixed(2)}</h3>
      </CardFooter>
    </Card>
  );
};


const SalesForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fields: [{ productName: '', qty: 0.00, unitPrice: 0.00, discount: 0.00 }],
      attendant: '',
      customerId: ''
    },
  });
  const router = useRouter();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [showReceipt, setShowReceipt] = useState(false)
  const [order, setOrder] = useState(null);
  const [attendants, setAttendants] = useState<Attendant[]>([]);
  const [customer, setCustomer] = useState<CustomerOptions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attendant, setAttendant] = useState<CustomerAttendant | null>(null)
  // const getUser = useUserStore()

  // Add this useEffect after other useEffects:
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/get-all');
        console.log('Users response:', response.data); // Debug log

        const mappedAttendants = response.data.map((user: ApiUser) => ({
          value: user.userID, // Make sure this matches your API response
          label: user.username // Make sure this matches your API response
        }));
        console.log('Mapped attendants:', mappedAttendants); // Debug log
        setAttendants(mappedAttendants);
      } catch (error) {
        console.error('Error fetching attendants:', error);
        toast.error('Failed to load attendants');
      }
    };
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


    axios.get('/api/product/get-products')
      .then(response => {
        setOptions(response.data.map((option: { productID: any; productName: any; sellingPrice: any }) => ({
          value: option.productID,
          label: option.productName,
          unitPrice: option.sellingPrice
        })));
      })
      .catch(error => {
        console.error(error);
      });


    fetchCustomers();
    fetchUsers();
  }, [options.find]);


  // Add this useEffect after other useEffects:


  useEffect(() => {
    fields.forEach((field, index) => {
      const productName = field.productName;
      const unitPrice = options.find((option) => option.value === productName)?.unitPrice;
      setValue(`fields.${index}.unitPrice`, unitPrice || 0);
    });
  }, [fields, options, setValue]);



  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      // GET USER
      const user = await localStorage.getItem('user');
      if (user === null) {
        toast.error('User not authenticated');
        router.push('/login');
        return;
      }

      // CREATE ORDER
      const mappedData = data.fields.map((field: any) => {
        options.find((option: any) => option.value === field.productName)?.label;
        return {
          ...field,
          qty: field.qty,
          unitPrice: field.unitPrice,
        };
      });
      data.fields = mappedData;
      data.totalPrice = data.fields.reduce((total: number,
        field: {
          qty: number;
          unitPrice: number;
          discount: number;
        }) => total + (Number(field.qty) *
          (Number(field.unitPrice) - Number(field.discount))
        ), 0);
      console.log(data)
      const attend = await axios.get(`/api/user/${data.attendant}`)
      const username = await attend.data.data.username
      setAttendant({ attendant: username, customer: data.customerID })
      if (attend.data.message == "Success") {
        const response = await axios.post('/api/order/', data);
        if (response.status === 200 || response.status === 201) { // Assuming a 201 status code indicates a successful order creation


          await setOrder(response.data);
          setShowReceipt(true);
          setIsLoading(false);
          toast("Success! ", {
            description: "Sales made.... Order Booked"
          })
          const data = await order;
          console.log('Order:', data)
          // await logs('Sales Made', 'inventory', user?.id || '')
          reset();

        } else {
          setIsLoading(false);
          await logs('Sales Failed', 'inventory', user || '')
          return toast("Aawwnnn! Order Rejected", {
            description: "Order bounced"
          })
        }
      } else {
        setIsLoading(false);
        return toast('Failed', {
          description: 'Select an attendant'
        })
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Failed" + error)
      // await logs('System error', 'inventory', error as any)
      toast("Aawwnnn! Order Rejected", {
        description: "Order bounced" + error
      })
    }
  }



  return (
    <>
      <Receipt
        receiptDetails={order}
        showReceipt={showReceipt}
        onClose={() => { setShowReceipt(false); setOrder(null); }}
        attendant={attendant}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mt-5">
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle>Point of Sale</CardTitle>
              <AddCustomer />
            </div>
          </CardHeader>
          <CardContent>
            {/* Customer Search at the top */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={customer.find((customer) => customer.value === field.value)}
                    onChange={(newValue) => field.onChange((newValue as CustomerOptions).value)}
                    options={customer as any}
                    placeholder="Select Customer"
                    isSearchable
                  />
                )}
              />
            </div>

            {/* Products Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-3 mb-4">
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-col w-full">
                      <Label>Product Name</Label>
                      <Controller
                        name={`fields.${index}.productName`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            className="mt-2"
                            value={options.find((option) => option.value === field.value)}
                            onChange={(newValue) => {
                              field.onChange((newValue as Option).value);
                              setSelectedOption(newValue as Option);
                              const unitPrice = (newValue as Option)?.unitPrice || 0;
                              setValue(`fields.${index}.unitPrice`, unitPrice);
                            }}
                            options={options}
                            isSearchable
                          />
                        )}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label>Qty</Label>
                      <Input
                        type="number"
                        step={0.1}
                        {...register(`fields.${index}.qty`, {
                          valueAsNumber: true
                        })}
                        className="w-full mt-2"
                        placeholder="Quantity"
                      />
                    </div>

                    <div className="flex flex-col">
                      <Label>Discount</Label>
                      <Input
                        type="number"
                        {...register(`fields.${index}.discount`, {
                          valueAsNumber: true
                        })}
                        className="w-full mt-2"
                        placeholder="Discount"
                      />
                    </div>

                    <div className="flex flex-col">
                      <Label>Unit Price</Label>
                      <Input
                        type="number"
                        step={0.01}
                        {...register(`fields.${index}.unitPrice`, {
                          valueAsNumber: true
                        })}
                        className="w-full mt-2"
                        placeholder="Unit price"
                      />
                    </div>
                    <div className="flex items-center justify-center mt-6 ring-1 bg-red-500 ring-red-900 px-2 rounded text-white my-3 ">
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                    <div className="w-1/3"></div>
                    <Price control={control} index={index} />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => append({
                  productName: '',
                  qty: 0,
                  unitPrice: 0,
                  discount: 0
                })}
                className="mt-4"
              >
                Add Product
              </Button>
            </div>

            {/* Attendant Selection at the bottom */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Attendant Information</h3>
              <Controller
                name="attendant"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={attendants.find((attendant) => attendant.value === field.value)}
                    onChange={(newValue) => field.onChange((newValue as Attendant).value)}
                    options={attendants as any}
                    placeholder="Select Attendant"
                    isSearchable
                  />
                )}
              />


            </div>

            <div className="flex flex-row justify-end mt-6">
              <TotalPrice control={control} />
            </div>

          </CardContent>

          <CardFooter className="flex items-center justify-center">
            {/* <FullSubmitButton text='Create Invoice' /> */}

            {isLoading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 animate-spin w-4" />
                Please Wait
              </Button>
            ) : (
              <Button type="submit" className="bg-slate-800 hover:bg-[#39060c] w-full">
                Create Invoice
              </Button>)}
          </CardFooter>
        </Card>
      </form >
      <ParseTotalPrice control={control} />


    </>
  );
};

export default SalesForm;

