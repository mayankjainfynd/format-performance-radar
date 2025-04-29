import React from "react";
import { InventoryAgingDistribution } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InventoryAgingChartProps {
  data: InventoryAgingDistribution;
}

const InventoryAgingChart: React.FC<InventoryAgingChartProps> = ({ data }) => {
  const [view, setView] = React.useState<"quantity" | "sales">("quantity");

  const chartData = [
    { 
      name: "0-30 Days", 
      value: 45000, 
      color: "#3B82F6",
      aging: "Fresh inventory, optimal for sales",
      percentage: "40%"
    },
    { 
      name: "31-60 Days", 
      value: 32000, 
      color: "#3B82F6",
      aging: "Moderate aging, monitor closely",
      percentage: "28%"
    },
    { 
      name: "61-90 Days", 
      value: 24000, 
      color: "#F97316",
      aging: "Aging inventory, consider promotions",
      percentage: "21%"
    },
    { 
      name: "90+ Days", 
      value: 12000, 
      color: "#3B82F6",
      aging: "Critical aging, immediate action needed",
      percentage: "11%"
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg border shadow-sm">
          <p className="font-medium text-sm">{data.name}</p>
          <p className="text-sm text-gray-600 mt-1">{data.aging}</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span>Quantity: {(data.value/1000).toFixed(1)}k</span>
            <span className="text-gray-500">|</span>
            <span>Share: {data.percentage}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col h-[400px]">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-base font-medium">Inventory Aging Distribution</h2>
            <div className="h-5 w-5 rounded-full border flex items-center justify-center ml-2 text-xs text-gray-500">?</div>
          </div>
          <Tabs defaultValue="quantity" onValueChange={(v) => setView(v as "quantity" | "sales")}>
            <TabsList>
              <TabsTrigger value="quantity">Quantity</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 p-4">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              barCategoryGap={40}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tickFormatter={(value) => `${value/1000}k`}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar 
                dataKey="value" 
                name="Inventory Units" 
                radius={[4, 4, 0, 0]} 
                fill="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default InventoryAgingChart;
