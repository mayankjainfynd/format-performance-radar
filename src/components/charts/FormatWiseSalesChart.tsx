import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormatWiseSales } from "@/types/dashboard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface FormatWiseSalesChartProps {
  data: FormatWiseSales[];
}

const parseSalesValue = (salesValue: string) => {
  // Expects format like "₹11.50 Cr"
  const match = salesValue.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
};

const FormatWiseSalesChart: React.FC<FormatWiseSalesChartProps> = ({ data }) => {
  // Calculate total sales value from the prop
  const totalSalesValue = data.reduce((sum, item) => sum + parseSalesValue(item.sales_value), 0);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Format Wise Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.map(item => ({
                  name: item.format_name,
                  value: parseFloat(item.sales_percentage),
                  salesValue: parseSalesValue(item.sales_value),
                  unit: item.sales_value.replace(/.*\s/, "")
                }))}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(_value: number, name: string, props: any) => {
                  const item = data.find(d => d.format_name === name);
                  return [item?.sales_value, name];
                }}
              />
              <Legend
                formatter={(value: string) => {
                  const item = data.find(d => d.format_name === value);
                  return `${value} (${item?.sales_value})`;
                }}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-semibold"
              >
                ₹{totalSalesValue.toFixed(2)} Cr
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormatWiseSalesChart;
