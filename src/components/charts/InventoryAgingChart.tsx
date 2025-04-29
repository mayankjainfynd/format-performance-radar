
import React from "react";
import { InventoryAgingDistribution } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

interface InventoryAgingChartProps {
  data: InventoryAgingDistribution;
}

const InventoryAgingChart: React.FC<InventoryAgingChartProps> = ({ data }) => {
  const chartData = [
    { name: "0-30 days", value: data["0_30_days"] },
    { name: "31-60 days", value: data["31_60_days"] },
    { name: "61-90 days", value: data["61_90_days"] },
    { name: "90+ days", value: data["90_plus_days"] },
  ];

  const chartConfig = {
    value: { color: "#2563EB" }, // Accent blue
  };
  
  return (
    <Card className="shadow-sm bg-white rounded-xl h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Inventory Aging</h2>
      </div>
      <div className="p-4 h-[300px]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="value" name="Inventory Units" fill={chartConfig.value.color} radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default InventoryAgingChart;
