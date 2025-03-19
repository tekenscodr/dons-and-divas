import prisma from "@/app/prismadb"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BarCharts from "./BarChart";
import { CreditCard, DollarSign, Layers3, PersonStanding } from "lucide-react";


const calculateInventoryMetrics = async () => {
  const totalProduct = await prisma.products.count();
  const inventoryWithUnitPrice = await prisma.inventory.findMany({
    include: {
      Product: {
        select: {
          unitPrice: true,
        },
      },
    },
  });

  const totalStoreValue = inventoryWithUnitPrice.reduce((acc, item) => {
    return acc + (Number(item.quantity) * Number(item.Product.unitPrice));
  }, 0);
  const inventoryData = await prisma.inventory.findMany();

  const outOfStock = inventoryData.filter(item => Number(item.quantity) < Number(item.reorderLevel)).length;
  const users = await prisma.user.count()

  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  const salesForToday = await prisma.orders.findMany({
    where: {
      orderDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    select: {
      total: true,
    },
  });

  const totalSalesAmount = salesForToday.reduce((acc, sale) => acc + Number(sale.total), 0);

  return {
    totalProduct,
    totalStoreValue,
    outOfStock,
    users,
    totalSalesAmount,
  };


};

const TopCards = async () => {
  const metrics = await calculateInventoryMetrics();

  return (
    <div className='flex flex-col gap-6 mb-3'>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* <div className="p-1">
          <BarCharts />
        </div> */}
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-end ">Ghc {metrics.totalSalesAmount.toFixed(2)}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Store Value
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-end  text-2xl font-bold">Ghc {metrics.totalStoreValue.toFixed(2)}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Out of Stock
            </CardTitle>
            <Layers3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-end  text-2xl font-bold">{metrics.outOfStock}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <PersonStanding className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-end  text-2xl font-bold"> {metrics.users}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>

      </div>
    </div>


  )
}

export default TopCards