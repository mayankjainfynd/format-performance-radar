
import React from "react";
import { FormatWiseSales } from "@/types/dashboard";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

interface FormatWiseSalesChartProps {
  data: FormatWiseSales[];
}

const FormatWiseSalesChart: React.FC<FormatWiseSalesChartProps> = ({ data }) => {
  const COLORS = ["#2563EB", "#16A34A", "#F59E0B", "#EF4444"];
  
  const formatData = data.map(item => ({
    name: item.format_name,
    value: parseFloat(item.sales_percentage.replace('%', '')),
    salesValue: item.sales_value
  }));

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <Card className="shadow-sm bg-white rounded-xl h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Format Wise Sales</h2>
      </div>
      <div className="p-4 h-[300px]">
        <ChartContainer config={{}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip 
                content={<ChartTooltipContent />}
              />
              <Pie
                data={formatData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {formatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

export default FormatWiseSalesChart;
