"use client"
import React, { useEffect, useState } from 'react'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    LabelList,
    Line,
    LineChart,
    PolarAngleAxis,
    RadialBar,
    RadialBarChart,
    Rectangle,
    ReferenceLine,
    XAxis,
    YAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getTotals, profitAndSales } from '../utils/actions'
import { icons } from 'lucide-react'


const chartConfig = {
    profit: {
        label: "profit",
        color: '#9b9b9b',
    },
    sales: {
        label: "sales",
        color: "#000000"
    }
} satisfies ChartConfig;

const chartData = [
    { fig: "profit", visitors: 187, fill: "var(--color-profit)" },
    { fig: "safari", visitors: 200, fill: "var(--color-sales)" },
]



const BarCharts = () => {
    const [data, setData] = useState<{ period: string, sales: number, profit: number }[]>([]);

    useEffect(() => {
        profitAndSales().then((result: any) => {
            setData(result as { period: string, sales: number, profit: number }[]);
        });
    }, []);
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Profit/Loss & Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                        <BarChart accessibilityLayer data={data}>
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />

                            <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
                            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                            <ChartLegend content={<ChartLegendContent />} />

                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default BarCharts
