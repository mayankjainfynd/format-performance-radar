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
    { name: "0-30 Days", value: data["0_30_days"], color: "#3B82F6" },
    { name: "31-60 Days", value: data["31_60_days"], color: "#3B82F6" },
    { name: "61-90 Days", value: data["61_90_days"], color: "#F97316" },
    { name: "90+ Days", value: data["90_plus_days"], color: "#3B82F6" },
  ];

  const CustomBar = (props: any) => {
    const { x, y, width, height, value, color } = props;
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={props.fill} />
      </g>
    );
  };

  return (
    <Card className="shadow-sm bg-white rounded-lg border h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-base font-medium">Inventory Aging Distribution</h2>
          <div className="text-sm font-medium text-gray-600">1.24 L Total Quantity</div>
          <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs text-gray-500">?</div>
        </div>
        <Tabs defaultValue="quantity" onValueChange={(v) => setView(v as "quantity" | "sales")} className="h-7">
          <TabsList className="h-7 p-1">
            <TabsTrigger value="quantity" className="h-5 px-2 text-xs">Quantity</TabsTrigger>
            <TabsTrigger value="sales" className="h-5 px-2 text-xs">Sales</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex-1 p-4 min-h-0">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%" minHeight={280}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
              barCategoryGap={30}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={(value) => `${value}k`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}`, "Quantity"]}
              />
              <Bar 
                dataKey="value" 
                name="Inventory Units" 
                radius={[4, 4, 0, 0]} 
                fill="#3B82F6"
                shape={<CustomBar />}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default InventoryAgingChart;
