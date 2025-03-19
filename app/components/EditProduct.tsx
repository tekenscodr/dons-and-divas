
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
import { useState } from 'react'

type secret = {
    productID: string,
    productName: string,
    description: string,
    category: string,
}

type FormFields = {
    productID: '',
    productName: '',
    description: '',
    category: '',

}

const EditProduct = (props: secret) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);


    const onSubmit = async (data: any) => {
        try {
            const response = await axios.put(`/api/product/${props.productID}/edit`, data);
            const user = await localStorage.getItem('user')
            await logs('Added Product', 'inventory', user || '')
            router.push('/dashboard/product')
            await setIsOpen(false);
            reset()
            return toast("Success", {
                description: "Your data has been edited!",
            })
        } catch (error) {
            console.error('Error creating product:', error);
            return toast("Failed", {
                description: "There was a problem with your request." + error,
            });
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className=" text-white text-start w-full bg-black"> Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription className='text-black'>
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Label>
                                Product Name
                            </Label>
                            <Input
                                id="productId"
                                defaultValue={props.productName}
                                {...register('productName')}

                            />
                            {errors.productName && (
                                <div className="text-red-500">{errors.productName.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Description
                            </Label>
                            <Input
                                id="description"
                                defaultValue={props.description}
                                {...register('description')}

                            />
                            {errors.description && (
                                <div className="text-red-500">{errors.description.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label>
                                Category
                            </Label>
                            <Input
                                id="category"
                                defaultValue={props.category}
                                {...register('category')}

                            />
                            {errors.category && (
                                <div className="text-red-500">{errors.category.message}</div>
                            )}
                        </div>

                        <Button type="submit" size="sm" className="px-3 text-white bg-blue-900 p-2 rounded-md">
                            Save
                        </Button>
                    </div>
                </form>

                <DialogFooter className="sm:justify-start">
                    <p>Design by Tekens Technologies</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditProduct
