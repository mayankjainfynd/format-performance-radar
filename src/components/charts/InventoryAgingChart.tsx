
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
      <div className="p-4">
        <div className="text-lg font-semibold mb-2">1.24 L Total Quantity</div>
        <div className="h-[250px]">
          <ChartContainer config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                barCategoryGap={40}
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
      </div>
    </Card>
  );
};

export default InventoryAgingChart;
