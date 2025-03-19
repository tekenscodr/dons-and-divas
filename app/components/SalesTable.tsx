import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
type Orders = {
  orderID: string;
  orderDate: Date;
  total: any;
  paymentStatus: string;
  receiptPrinted: boolean;
  createdAt: Date;
  receiptNumber: string;
}

const SalesTable = (props: Orders) => {
  const { orderID, orderDate, total, paymentStatus, receiptPrinted, receiptNumber } = props
  return (

    <TableBody>
      <TableRow>
        <TableCell className="font-medium">{receiptNumber} </TableCell>
        <TableCell>{orderDate.toDateString()}</TableCell>
        <TableCell className="text-right">{total.toFixed(2)}</TableCell>
      </TableRow>
    </TableBody>

  )
}

export default SalesTable
