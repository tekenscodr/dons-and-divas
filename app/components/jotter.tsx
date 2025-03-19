// 'use client'
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { ChangeEvent, useState } from 'react';

// import { useForm } from 'react-hook-form';


// type Field = {
//     productName: string;
//     qty: number;
//     unitPrice: number;
// };

// type FormData = {
//     fields: Field[];
// };

// const jotter = () => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm<FormData>();

//     const [fields, setFields] = useState<Field[]>([{ productName: '', qty: 0, unitPrice: 0 }]);

//     const handleAddField = () => {
//         setFields([...fields, { productName: '', qty: 0, unitPrice: 0 }]);
//     };

//     const handleRemoveField = (index: number) => {
//         setFields(fields.filter((field, i) => i !== index));
//     };

//     const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
//         setFields(
//             fields.map((field, i) =>
//                 i === index ? { ...field, [event.target.name]: event.target.value } : field
//             )
//         );
//     };

//     const onSubmit = async (data: FormData) => {
//         console.log(data);
//         // Call createOrder function here
//     };

//     return (
//         <form>
//             <Card className="mt-5 ">
//                 <CardHeader>
//                     <CardTitle>Point of Sale</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     {fields.map((field, index) => (
//                         <div key={index} >
//                             {index === 0 && (
//                                 <div className="flex flex-row gap-3">
//                                     <div className="flex flex-col">
//                                         <Label>Product Name</Label>
//                                         <Input
//                                             type="text"
//                                             name="productName"
//                                             className="w-full mt-2"
//                                             value={field.productName}
//                                             placeholder="Product name"
//                                             onChange={(event) => handleInputChange(index, event)}
//                                         />
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <Label>Qty</Label>
//                                         <Input
//                                             type="number"
//                                             name="qty"
//                                             className="w-full mt-2"
//                                             value={field.qty}
//                                             placeholder="Quantity"
//                                             onChange={(event) => handleInputChange(index, event)}
//                                         />
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <Label>Unit Price</Label>
//                                         <Input
//                                             type="number"
//                                             name="unitPrice"
//                                             value={field.unitPrice}
//                                             className="w-full mt-2"
//                                             placeholder="Unit price"
//                                             onChange={(event) => handleInputChange(index, event)}
//                                         />
//                                     </div>

//                                     <div className="flex items-center justify-center mt-6 ring-1 bg-red-500 ring-red-900 px-2 rounded text-white my-3 ">
//                                         <button type="button" onClick={() => handleRemoveField(index)}>
//                                             Remove
//                                         </button>
//                                     </div>
//                                     <div className="w-1/3"></div>
//                                     <div className="flex flex-col text-end">
//                                         <Label>Amount</Label>
//                                         <p className="text-lg font-medium mt-2">GHC{field.qty * field.unitPrice}
//                                         </p>
//                                     </div>

//                                 </div>
//                             )}
//                             {index > 0 && (
//                                 <div className="flex flex-row gap-3">
//                                     <div className="flex flex-col">
//                                         <Input
//                                             type="text"
//                                             name="productName"
//                                             className="w-full mt-2"
//                                             value={field.productName}
//                                             placeholder="Product name"
//                                             onChange={(event) => handleInputChange(index, event)}
//                                         />
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <Input
//                                             type="number"
//                                             name="qty"
//                                             className="w-full mt-2"
//                                             value={field.qty}
//                                             placeholder="Quantity"
//                                             onChange={(event) => handleInputChange(index, event)}
//                                         />
//                                     </div>
//                                     <div className="flex flex-col">
//                                         <Input
//                                             type="number"
//                                             name="unitPrice"
//                                             value={field.unitPrice}
//                                             className="w-full mt-2"
//                                             placeholder="Unit price"
//                                             onChange={(event) => handleInputChange(index, event)}
//                                         />
//                                     </div>
//                                     <div className="flex items-center justify-center mt-6 ring-1 bg-red-500 ring-red-900 px-2 rounded text-white my-3">
//                                         <button type="button" onClick={() => handleRemoveField(index)}>
//                                             Remove
//                                         </button>
//                                     </div>
//                                     <div className="w-1/3"></div>
//                                     <div className="flex flex-col text-end mt-2">
//                                         <p className="text-lg font-medium ">GHC{field.qty * field.unitPrice}</p>
//                                     </div>

//                                 </div>

//                             )}

//                         </div>

//                     ))}
//                     <div className='flex flex-row justify-between mt-10 ml-3'>
//                         <button className="bg-blue-800 text-white rounded-lg m-5 p-2 mt-2"
//                             type="button" onClick={handleAddField}>
//                             Add Field
//                         </button>
//                         <div className="flex flex-col text-end">
//                             <p className="text-lg font-medium mt-2">
//                                 GHC {fields.reduce((total, field) => total + field.qty * field.unitPrice, 0)}
//                             </p>
//                         </div>
//                     </div>
//                 </CardContent>
//                 <CardFooter className='flex items-center justify-center'>
//                     <Button type='submit' className='bg-slate-800 text-white p-2 rounded-lg w-full'>Create Invoice</Button>
//                 </CardFooter>
//             </Card>

//         </form>
//     );
// };
// export default jotter




// const Price = ({ control, index }) => {
//   const value = useWatch({
//     control,
//     name: `items[${index}]`,
//     defaultValue: {}
//   })
// }