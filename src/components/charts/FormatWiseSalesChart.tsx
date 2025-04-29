
import React from "react";
import { FormatWiseSales } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";

interface FormatWiseSalesChartProps {
  data: FormatWiseSales[];
}

const FormatWiseSalesChart: React.FC<FormatWiseSalesChartProps> = ({ data }) => {
  // Extended data to match the image
  const extendedData = [
    { name: "Smart Bazaar", value: 20.8, salesValue: "₹11.50 Cr" },
    { name: "FreshPik", value: 17.7, salesValue: "₹9.75 Cr" },
    { name: "Reliance Smart", value: 16.1, salesValue: "₹8.90 Cr" },
    { name: "JioMart", value: 14.0, salesValue: "₹7.75 Cr" },
    { name: "JioMart Digital", value: 12.2, salesValue: "₹6.75 Cr" },
  ];

  const COLORS = ["#4338CA", "#10B981", "#8B5CF6", "#3B82F6", "#8884d8"];
  
  const centerText = {
    value: "₹55.23 Cr",
    label: "Total"
  };

  return (
    <Card className="shadow-sm bg-white rounded-lg border h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-base font-medium">Format Wise Sales</h2>
          <div className="h-5 w-5 rounded-full border flex items-center justify-center ml-2 text-xs text-gray-500">?</div>
        </div>
      </div>
      <div className="p-4 h-[300px] relative">
        <ChartContainer config={{}}>
          {/* Wrap PieChart in a single element to satisfy TypeScript */}
          <PieChart>
            <Pie
              data={extendedData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              paddingAngle={2}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                return (
                  <text x={x} y={y} fill="#111827" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(1)}%`}
                  </text>
                );
              }}
            >
              {extendedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                return [`${value}%`, name];
              }}
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle" 
              formatter={(value, entry) => {
                const item = extendedData.find(d => d.name === value);
                return (
                  <span className="text-xs">
                    {value} ({item?.salesValue})
                  </span>
                );
              }}
            />
          </PieChart>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm font-bold">{centerText.value}</div>
          <div className="text-xs text-gray-500">{centerText.label}</div>
        </div>
      </div>
    </Card>
  );
};

export default FormatWiseSalesChart;
