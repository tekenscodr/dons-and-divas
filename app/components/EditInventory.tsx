'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { logs } from '../actions/logs'
import { useEffect, useState } from 'react'

type secret = {
    productID: string;
}

type FormFields = {
    inventoryID: '',
    reorderLevel: number,
    reorderQuantity: number;
    sellingPrice: number;
    unitPrice: number;
}

interface Fields {
    inventoryID: string,
    reorderLevel: number,
    reorderQuantity: number;
    sellingPrice: number;
    unitPrice: number;
}

const EditInventory = (props: secret) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState<Fields | null>()

    useEffect(() => {
        const fetchFeed = async () => {
            const product = await axios.get(`/api/inventory/${props.productID}/get`)
            const p = await product.data.data;
            console.log(p)
            const fetchedProduct = {
                inventoryID: p.inventoryID,
                reorderLevel: p.reorderLevel,
                reorderQuantity: p.reorderQuantity,
                sellingPrice: p.sellingPrice,
                unitPrice: p.unitPrice
            };

            setItem(fetchedProduct);
        }
        fetchFeed();

    }, [props.productID]);

    const onSubmit = async (data: any) => {
        try {
            console.log(data)
            const response = await axios.put(`/api/inventory/${props.productID}/edit`, data);
            console.log(response);
            const user = await localStorage.getItem('user')
            await logs('Edited Inventory', 'inventory', user || '')
            router.push('/dashboard/product')
            await setIsOpen(false);
            reset();
            return toast("Success", {
                description: "Your data has been edited!",
            })
        } catch (error) {
            console.error('Error creating product:', error);
            return toast("Uh oh! Something went wrong.", {
                description: "There was a problem with your request." + error,
            });
        }
    };
    return (
        <>
            {item ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>
                                Inventory
                            </Label>
                            <Input
                                id="inventoryId"
                                defaultValue={props.productID}
                                readOnly
                                {...register('inventoryID')}

                            />
                            {errors.inventoryID && (
                                <div className="text-red-500">{errors.inventoryID.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Reorder Level
                            </Label>
                            <Input
                                defaultValue={item.reorderLevel}
                                type='number'
                                id="reorderLevel"
                                {...register('reorderLevel', {
                                    required: "Reorder level is required",
                                    valueAsNumber: true

                                })}
                                placeholder="Reorder Level"
                            />
                            {errors.reorderLevel && (
                                <div className="text-red-500">{errors.reorderLevel.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Reorder Quantity
                            </Label>
                            <Input
                                defaultValue={item.reorderQuantity}
                                type='number'
                                id="reorderQty"
                                {...register('reorderQuantity', {
                                    required: "Reorder Quantity is required",
                                    valueAsNumber: true

                                })}
                                placeholder="Reorder Quantity"
                            />
                            {errors.reorderQuantity && (
                                <div className="text-red-500">{errors.reorderQuantity.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Selling Price
                            </Label>
                            <Input
                                defaultValue={item.sellingPrice}
                                type='number'
                                id="sellingPrice"
                                step={0.1}
                                {...register('sellingPrice', {
                                    required: "Selling Price is required",

                                })}
                                placeholder="Selling Price"
                            />
                            {errors.sellingPrice && (
                                <div className="text-red-500">{errors.sellingPrice.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Cost Price
                            </Label>
                            <Input
                                defaultValue={item.unitPrice}
                                type='number'
                                id="unitPrice"
                                step={0.1}
                                {...register('unitPrice', {
                                    required: "Cost Price is required",

                                })}
                                placeholder="Cost Price"
                            />
                            {errors.unitPrice && (
                                <div className="text-red-500">{errors.unitPrice.message}</div>
                            )}
                        </div>
                        <Button type="submit" size="sm" className="px-3 text-white bg-blue-900 p-2 rounded-md"
                            onClick={() => setIsOpen(true)}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            ) : (<p className='flex flex-col items-center justify-center'>Loading</p>)
            }

        </>
    )
}

export default EditInventory
