
import React from "react";
import { PurchaseVsSales } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

interface PurchaseVsSalesChartProps {
  data: PurchaseVsSales[];
}

const PurchaseVsSalesChart: React.FC<PurchaseVsSalesChartProps> = ({ data }) => {
  const [view, setView] = React.useState<"value" | "quantity">("value");
  
  const chartConfig = {
    purchase: { color: "#2563EB" }, // Accent blue
    sales: { color: "#16A34A" }, // Green
  };

  return (
    <Card className="shadow-sm bg-white rounded-xl h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Purchase vs Sales</h2>
          <Tabs defaultValue="value" onValueChange={(v) => setView(v as "value" | "quantity")}>
            <TabsList>
              <TabsTrigger value="value">Value</TabsTrigger>
              <TabsTrigger value="quantity">Quantity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="p-4 h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Line
                type="monotone"
                dataKey="purchase_value"
                name="Purchase"
                stroke={chartConfig.purchase.color}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="sales_value"
                name="Sales"
                stroke={chartConfig.sales.color}
                activeDot={{ r: 8 }}
                strokeWidth={2}
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
