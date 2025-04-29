
import React from "react";
import { PurchaseVsSales } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PurchaseVsSalesChartProps {
  data: PurchaseVsSales[];
}

const PurchaseVsSalesChart: React.FC<PurchaseVsSalesChartProps> = ({ data }) => {
  const [view, setView] = React.useState<"value" | "quantity">("value");
  
  // Extended data to match the image
  const extendedData = [
    { month: "Jan", purchase_value: 78.0, sales_value: 38.0 },
    { month: "Feb", purchase_value: 80.0, sales_value: 40.0 },
    { month: "Mar", purchase_value: 75.0, sales_value: 42.0 },
    { month: "Apr", purchase_value: 72.0, sales_value: 45.0 },
    { month: "May", purchase_value: 76.0, sales_value: 48.0 },
    { month: "Jun", purchase_value: 78.0, sales_value: 42.0 },
    { month: "Jul", purchase_value: 82.0, sales_value: 40.0 },
    { month: "Aug", purchase_value: 80.0, sales_value: 38.0 },
    { month: "Sep", purchase_value: 77.0, sales_value: 40.0 },
    { month: "Oct", purchase_value: 75.0, sales_value: 42.0 },
    { month: "Nov", purchase_value: 73.0, sales_value: 44.0 },
    { month: "Dec", purchase_value: 78.0, sales_value: 45.0 },
  ];
  
  const chartConfig = {
    purchase: { color: "#3B82F6" }, // Blue line
    sales: { color: "#10B981" }, // Green line
  };

  return (
    <Card className="shadow-sm bg-white rounded-lg border h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-base font-medium">Purchase vs. Sales Comparison</h2>
          <div className="h-5 w-5 rounded-full border flex items-center justify-center ml-2 text-xs text-gray-500">?</div>
        </div>
      </div>
      <div className="p-4 h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={extendedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `${value}M`} 
                ticks={[0, 25, 50, 75, 100, 125, 150]}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} Cr`, undefined]}
                labelFormatter={(label) => {
                  return `2 March 2022`;
                }}
              />
              <Line
                type="monotone"
                dataKey="purchase_value"
                name="Purchase"
                stroke={chartConfig.purchase.color}
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="sales_value"
                name="Sales"
                stroke={chartConfig.sales.color}
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default PurchaseVsSalesChart;
