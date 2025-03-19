import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import React from 'react'

const MonthlyRecords = () => {

  return (
    <div>
      <Table>
        <TableHeader>All Sales</TableHeader>
        <TableCaption>Find all Sales for every month</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Month & Year</TableCell>
            <TableCell>Total Sales</TableCell>
            <TableCell>Total Purchases</TableCell>
            <TableCell>Totale Profit</TableCell>
          </TableRow>
        </TableHead>

      </Table>
    </div>
  )
}

export default MonthlyRecords
