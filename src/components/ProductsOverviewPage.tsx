import React, { useState } from "react";
import FilterBar from "@/components/FilterBar";
import KpiCards from "@/components/KpiCards";
import { Card } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Legend } from "recharts";

// Classification Matrix Data
const classificationMatrixData = [
  [
    { label: "AX", value: "25%", color: "#DCFCE7", type: "Strategic", description: "High Revenue, Stable Demand", products: 420 },
    { label: "AY", value: "15%", color: "#DCFCE7", type: "Strategic", description: "High Revenue, Moderate Demand", products: 210 },
    { label: "AZ", value: "10%", color: "#FEF9C3", type: "Regular", description: "High Revenue, Unstable Demand", products: 120 },
  ],
  [
    { label: "BX", value: "10%", color: "#DCFCE7", type: "Strategic", description: "Medium Revenue, Stable Demand", products: 180 },
    { label: "BY", value: "15%", color: "#FEF9C3", type: "Regular", description: "Medium Revenue, Moderate Demand", products: 200 },
    { label: "BZ", value: "10%", color: "#FECACA", type: "Review", description: "Medium Revenue, Unstable Demand", products: 90 },
  ],
  [
    { label: "CX", value: "5%", color: "#FEF9C3", type: "Regular", description: "Low Revenue, Stable Demand", products: 60 },
    { label: "CY", value: "5%", color: "#FECACA", type: "Review", description: "Low Revenue, Moderate Demand", products: 50 },
    { label: "CZ", value: "10%", color: "#FECACA", type: "Review", description: "Low Revenue, Unstable Demand", products: 371 },
  ],
];

const typeColors = {
  Strategic: "#22C55E", // green
  Regular: "#EAB308",   // yellow
  Review: "#EF4444",    // red
};

const ClassificationMatrix = () => {
  const [tooltip, setTooltip] = useState<null | { x: number; y: number; cell: any }>(null);

  return (
    <Card className="shadow-sm bg-white rounded-lg border h-full flex-1 min-w-[420px] max-w-[420px] relative">
      <div className="p-4 border-b flex items-center gap-2">
        <h2 className="text-base font-semibold">Classification Matrix</h2>
        <span className="h-5 w-5 rounded-full border flex items-center justify-center text-xs text-gray-500 cursor-pointer" title="This matrix classifies SKUs by revenue and demand stability.">?</span>
      </div>
      <div className="p-4 pt-6 flex flex-col items-center relative h-[calc(100%-4rem)]">
        {/* Axis labels */}
        <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 select-none">Revenue</span>
        <span className="absolute right-4 top-2 text-xs text-gray-500 select-none">Demand Stability</span>
        {/* Matrix grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
          {classificationMatrixData.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={cell.label}
                className="flex flex-col items-center justify-center rounded-md aspect-square relative cursor-pointer border border-gray-100 hover:shadow"
                style={{ backgroundColor: cell.color }}
                onMouseEnter={e => {
                  const rect = (e.target as HTMLElement).getBoundingClientRect();
                  setTooltip({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, cell });
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-semibold text-base">{cell.label}</span>
                  <span className="h-4 w-4 rounded-full border flex items-center justify-center text-[10px] text-gray-500" title={cell.description}>?</span>
                </div>
                <span className="font-bold text-xl">{cell.value}</span>
              </div>
            ))
          )}
        </div>
        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-white rounded-xl shadow-lg px-4 py-3 text-sm text-gray-800 border"
            style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
          >
            <div className="font-semibold mb-1">{tooltip.cell.label} - {tooltip.cell.description.split(",")[0]}</div>
            <div className="mb-1 text-xs text-gray-500">{tooltip.cell.description}</div>
            <div className="font-medium mt-1">{tooltip.cell.products} Products</div>
          </div>
        )}
        {/* Legend */}
        <div className="flex gap-6 mt-6 text-xs items-center">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: typeColors.Strategic }}></span> Strategic SKU's</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: typeColors.Regular }}></span> Regular SKU's</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full" style={{ background: typeColors.Review }}></span> Review SKU's</span>
        </div>
      </div>
    </Card>
  );
};

// Margin vs Volume Quadrant Data
const marginVsVolumeData = [
  { x: 2, y: 30, category: "Cream Biscuits", name: "ChocoFills Biscuits", margin: 40, sales: "37 Cr" },
  { x: 4, y: 35, category: "Cookies", name: "ChocoChip Cookies", margin: 35, sales: "22 Cr" },
  { x: 6, y: 40, category: "Salted Biscuits", name: "Salted Biscuits", margin: 25, sales: "15 Cr" },
  { x: 8, y: 45, category: "Bakery", name: "Bakery", margin: 20, sales: "10 Cr" },
  { x: 10, y: 50, category: "Cream Biscuits", name: "ChocoFills Biscuits", margin: 45, sales: "40 Cr" },
  { x: 12, y: 55, category: "Cookies", name: "ChocoChip Cookies", margin: 38, sales: "25 Cr" },
  { x: 14, y: 60, category: "Salted Biscuits", name: "Salted Biscuits", margin: 30, sales: "18 Cr" },
  { x: 16, y: 65, category: "Bakery", name: "Bakery", margin: 22, sales: "12 Cr" },
];

const categoryColors: Record<string, string> = {
  "Cream Biscuits": "#6366F1",
  "Cookies": "#06B6D4",
  "Salted Biscuits": "#F59E42",
  "Bakery": "#10B981",
};

const MarginVsVolumeQuadrant = () => (
  <Card className="shadow-sm bg-white rounded-lg border h-full flex-1 min-w-[420px] max-w-[420px]">
    <div className="p-4 border-b flex items-center justify-between">
      <h2 className="text-base font-medium">Margin vs Volume Quadrant</h2>
      <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs text-gray-500">?</div>
    </div>
    <div className="p-4 h-[calc(100%-4rem)]">
      <ChartContainer config={{}}>
        <ResponsiveContainer width="100%" height="100%" minHeight={280}>
          <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Sales Volume (Cr)" 
              tick={{ fontSize: 12 }}
              height={40}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Margin %" 
              tick={{ fontSize: 12 }}
              width={40}
            />
            <ZAxis type="number" dataKey="margin" range={[60, 200]} name="Margin" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow text-xs">
                    <div className="font-semibold">{d.name}</div>
                    <div>Margin: <b>{d.margin}%</b></div>
                    <div>Sales: <b>{d.sales}</b></div>
                  </div>
                );
              }
              return null;
            }} />
            {Object.keys(categoryColors).map((cat) => (
              <Scatter
                key={cat}
                name={cat}
                data={marginVsVolumeData.filter((d) => d.category === cat)}
                fill={categoryColors[cat]}
              />
            ))}
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{
                paddingTop: '10px'
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  </Card>
);

const ProductTable = () => (
  <div className="bg-white rounded-lg shadow p-4 mt-6">
    <div className="flex items-center justify-between mb-2">
      <div className="flex gap-4">
        <button className="text-sm font-medium border-b-2 border-blue-600 text-blue-700 px-2 pb-1">Sales</button>
        <button className="text-sm font-medium text-gray-500 px-2 pb-1">Inventory</button>
      </div>
      <div className="relative">
        <input type="text" placeholder="Search..." className="pl-9 h-[32px] w-64 rounded-md border border-input bg-background" />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 font-medium text-gray-500">Product Code</th>
            <th className="px-4 py-2 font-medium text-gray-500">Product Name</th>
            <th className="px-4 py-2 font-medium text-gray-500">Category</th>
            <th className="px-4 py-2 font-medium text-gray-500">Sub-Category</th>
            <th className="px-4 py-2 font-medium text-gray-500">Micro Category</th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows */}
          <tr>
            <td className="px-4 py-2">4913197809</td>
            <td className="px-4 py-2">SUNF DARK FANTASY CHOCFLS BISC 300g CBD</td>
            <td className="px-4 py-2">Biscuits & Branded Bakery</td>
            <td className="px-4 py-2">Biscuits</td>
            <td className="px-4 py-2">Cream Biscuits</td>
          </tr>
          <tr>
            <td className="px-4 py-2">4924868060</td>
            <td className="px-4 py-2">SUNF DRK FNTSY CHOCO FLS COOKIE 600g CBD</td>
            <td className="px-4 py-2">Biscuits & Branded Bakery</td>
            <td className="px-4 py-2">Biscuits</td>
            <td className="px-4 py-2">Cream Biscuits</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
      <span>Showing 11-20 of 150 results</span>
      <div className="flex gap-2">
        <button className="p-1 border rounded hover:bg-gray-100">&lt;</button>
        <button className="p-1 border rounded hover:bg-gray-100">&gt;</button>
      </div>
      <div>
        <label className="mr-2">Rows per page</label>
        <select className="border rounded px-2 py-1">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
    </div>
  </div>
);

// Format Wise Sales Data
export const formatWiseSalesData = [
  { 
    name: "Smart Bazaar", 
    value: 20.8, 
    salesValue: 11.50,
    unit: "Cr"
  },
  { 
    name: "FreshPik", 
    value: 17.7, 
    salesValue: 9.75,
    unit: "Cr"
  },
  { 
    name: "Reliance Smart", 
    value: 16.1, 
    salesValue: 8.90,
    unit: "Cr"
  },
  { 
    name: "JioMart", 
    value: 14.0, 
    salesValue: 7.75,
    unit: "Cr"
  },
  { 
    name: "JioMart Digital", 
    value: 12.2, 
    salesValue: 6.75,
    unit: "Cr"
  },
];

// Calculate total sales value
const totalSalesValue = formatWiseSalesData.reduce((sum, item) => sum + item.salesValue, 0);

const ProductsOverviewPage: React.FC = () => {
  const [filters, setFilters] = useState({
    format: "All Format",
    store: "All Store",
    location: "All Locations",
    category: "All Categories",
    date_range: {
      start_date: "2024-01-01",
      end_date: "2024-12-31"
    }
  });

  // Use the calculated total sales value
  const kpis = {
    total_sales: `₹${totalSalesValue.toFixed(2)} Cr`,
    sales_quantity: "2.38 L",
    total_store: 450,
    on_hand_inventory: "1.24 L",
    turnover_ratio: "3:2"
  };

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} title="Products Overview" />
      <div className="p-4 md:p-6">
        <KpiCards kpis={kpis} />
        <div className="flex gap-4 mt-6 flex-wrap">
          <ClassificationMatrix />
          <MarginVsVolumeQuadrant />
        </div>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductsOverviewPage; 