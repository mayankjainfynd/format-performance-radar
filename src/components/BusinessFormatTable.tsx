
import React from "react";
import { BusinessFormatSales } from "@/types/dashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

interface BusinessFormatTableProps {
  data: BusinessFormatSales[];
}

const BusinessFormatTable: React.FC<BusinessFormatTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = React.useState<keyof BusinessFormatSales>("format_name");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");
  
  // Add more sample data rows to demonstrate pagination
  const extendedData = [
    ...data,
    {
      format_name: "JioMart",
      number_of_products: 1500,
      number_of_locations: 200,
      sales_quantity: "3.00 L",
      total_sales: "₹8.90 Cr",
      sales_target: "₹15.23 Cr",
      gross_profit: "13.22%",
      gross_profit_target: "15.22%"
    },
    {
      format_name: "Reliance Smart",
      number_of_products: 1000,
      number_of_locations: 200,
      sales_quantity: "3.00 L",
      total_sales: "₹6.75 Cr",
      sales_target: "₹15.23 Cr",
      gross_profit: "13.22%",
      gross_profit_target: "15.22%"
    }
  ];

  const handleSort = (column: keyof BusinessFormatSales) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    return [...extendedData].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      // For numeric string values that contain symbols (₹, %, etc.)
      if (typeof valueA === "string" && typeof valueB === "string") {
        const numA = parseFloat(valueA.replace(/[^\d.-]/g, ""));
        const numB = parseFloat(valueB.replace(/[^\d.-]/g, ""));

        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDirection === "asc" ? numA - numB : numB - numA;
        }

        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // For plain numbers
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Default string comparison
      const strA = String(valueA);
      const strB = String(valueB);
      return sortDirection === "asc"
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA);
    });
  }, [extendedData, sortColumn, sortDirection]);

  // Get icon for each format
  const getFormatIcon = (formatName: string) => {
    const iconColor = formatName === "Smart Bazaar" ? "bg-red-500" : 
                     formatName === "FreshPik" ? "bg-green-400" :
                     formatName === "JioMart" ? "bg-red-600" :
                     "bg-red-500";
    
    return <div className={`w-5 h-5 rounded-sm mr-2 ${iconColor}`}></div>;
  };

  return (
    <Card className="shadow-sm mb-6 overflow-hidden border rounded-lg">
      <div className="p-4 bg-white border-b">
        <h2 className="text-lg">Business Format Sales</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-t">
              <SortableHeader
                column="format_name"
                label="Format Name"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="number_of_products"
                label="No. of Products"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="number_of_locations"
                label="No. of Locations"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="sales_quantity"
                label="Sales Quantity"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="total_sales"
                label="Total Sales"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="sales_target"
                label="Sales Target"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="gross_profit"
                label="Gross Profit"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="gross_profit_target"
                label="Gross Profit Target"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50 border-b">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {getFormatIcon(row.format_name)}
                    {row.format_name}
                  </div>
                </TableCell>
                <TableCell>{row.number_of_products}</TableCell>
                <TableCell>{row.number_of_locations}</TableCell>
                <TableCell>{row.sales_quantity}</TableCell>
                <TableCell>{row.total_sales}</TableCell>
                <TableCell>{row.sales_target}</TableCell>
                <TableCell>{row.gross_profit}</TableCell>
                <TableCell>{row.gross_profit_target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center p-4 text-sm">
          <div>Showing 11-20 of 150 results</div>
          <div className="flex items-center gap-2">
            <div>Rows per page</div>
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <div className="flex ml-4">
              <button className="p-1 border rounded hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1 border rounded hover:bg-gray-100 ml-1">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface SortableHeaderProps<T> {
  column: keyof T;
  label: string;
  currentSort: keyof T;
  direction: "asc" | "desc";
  onSort: (column: keyof T) => void;
}

function SortableHeader<T>({
  column,
  label,
  currentSort,
  direction,
  onSort,
}: SortableHeaderProps<T>) {
  return (
    <TableHead
      className="cursor-pointer hover:bg-gray-100 text-xs font-medium text-gray-500"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center">
        {label}
        {column === currentSort && (
          <span className="ml-1">
            {direction === "asc" ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
          </span>
        )}
      </div>
    </TableHead>
  );
}

export default BusinessFormatTable;
