
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import prisma from "@/app/prismadb"

export const ReceiptContent = (props: any) => {
    const { receiptDetails, attendant } = props;

    if (!receiptDetails) {
        return <div>Loading...</div>;
    }



    const totalPrice = receiptDetails.orderDetails.reduce((acc: number, order: { quantity: any; unitPrice: any; }) => {
        return acc + Number(order.quantity) * Number(order.unitPrice);
    }, 0);

    const date = new Date(receiptDetails.receipt.receiptDate).toDateString();
    console.log(`ODER:::` + attendant.attendant)
    console.log(receiptDetails)
    // const netAmount = 
    return (
        <div className=" mx-auto p-2">
            <div className="text-center mb-4">
                <h1 className="text-lg font-bold">DONS & DIVAS GROOMING</h1>
                <p className="text-gray-600 text-xs">0500953592</p>
                <p className="text-gray-600 text-xs">Dansoman, Moole St. | Exhibition Roundabout</p>

            </div>
            <h1 className="text-xs font-bold mb-0">Receipt</h1>
            <div className="receipt-container bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-600 mb-1 text-xs">Receipt Number: {receiptDetails.receipt.receiptNumber}</p>
                <p className="text-gray-600 mb-1 text-xs">Receipt Date: {date}</p>
                <p className="text-gray-600 mb-2 text-xs">Attendant: {attendant.attendant}</p>

                <h2 className="text-xs font-bold mb-2">Order Details:</h2>
                <table className="w-full mb-2">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left text-xs"> Name</th>
                            <th className="text-right text-xs">Qty</th>
                            <th className="text-right text-xs">Unit</th>
                            <th className="text-right text-xs">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receiptDetails.orderDetails.map((order: { Product: { productName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; quantity: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; unitPrice: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, index: Key | null | undefined) => (
                            <tr key={index} className="border-none">
                                <td className="text-left text-xs">{order.Product.productName}</td>
                                <td className="text-right text-xs">{order.quantity}</td>
                                <td className="text-right text-xs">{order.unitPrice}</td>
                                <td className="text-right text-xs">{Number(order.quantity) * Number(order.unitPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="text-xs font-bold mb-0">Summary:</h2>
                <div className="flex justify-between mb-2">
                    <p className="text-gray-600 text-xs">Subtotal:</p>
                    <p className="font-bold text-xs">{totalPrice}</p>
                </div>
                <div className="flex justify-between mb-0 ">
                    <p className="text-gray-600 text-xs">Tax (0%):</p>
                    <p>0</p>
                </div>
                <div className="flex justify-between font-bold mb-0">
                    <p className="text-xs">Total:</p>
                    <p className="text-xs">{totalPrice}</p>
                </div>

                <div className="text-center">
                    <p className="text-gray-600 text-xs">Thank you for your business!</p>
                </div>
            </div>
        </div>
    );
};

interface ReceiptProps {
    receiptDetails: any;
    onClose: () => void;
    showReceipt: any;
    attendant: any;
}

export const Receipt: React.FC<ReceiptProps> = ({ receiptDetails = {}, showReceipt, onClose, attendant }) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Receipt",
        contentRef: componentRef
    });

    if (!receiptDetails) {
        return <></>
    }

    return (
        <Dialog open={showReceipt}>
            <DialogHeader>
                <DialogTitle>
                    Success!
                </DialogTitle>

            </DialogHeader>
            <DialogContent>

                <p>Receipt saved successfully!</p>
                <DialogFooter className="sm:justify-start">
                    <div className="flex justify-end gap-2">
                        <DialogClose asChild>

                            <Button
                                type="button"
                                onClick={() => {
                                    handlePrint()
                                    onClose()
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded"
                            >
                                Print
                            </Button>
                        </DialogClose>
                        <button
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>


                </DialogFooter>
            </DialogContent>

            {typeof handlePrint === 'function' && (
                <div style={{ display: "none" }}>
                    <div ref={componentRef}>
                        <ReceiptContent receiptDetails={receiptDetails} attendant={attendant} />
                    </div>
                </div>
            )
            }
        </Dialog >
    );
};