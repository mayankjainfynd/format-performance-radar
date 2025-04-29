
import React from "react";
import { BiscuitsBricks } from "@/types/dashboard";
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

interface BiscuitsBricksTableProps {
  data: BiscuitsBricks[];
}

const BiscuitsBricksTable: React.FC<BiscuitsBricksTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = React.useState<keyof BiscuitsBricks>("category_name");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  // Extended data for demonstration purposes
  const extendedData = [
    ...data,
    {
      category_name: "Snacks & Chips",
      number_of_products: 1500,
      total_sales: "₹12.53 Cr",
      sales_quantity: "2.40 L",
      margin: "13.22%",
      sales_contribution: "13.22%",
      margin_contribution: "13.22%"
    },
    {
      category_name: "Fresh Produce",
      number_of_products: 1000,
      total_sales: "₹12.53 Cr",
      sales_quantity: "2.40 L",
      margin: "13.22%",
      sales_contribution: "13.22%",
      margin_contribution: "13.22%"
    },
    {
      category_name: "Meat & Seafood",
      number_of_products: 700,
      total_sales: "₹12.53 Cr",
      sales_quantity: "2.40 L",
      margin: "13.22%",
      sales_contribution: "13.22%",
      margin_contribution: "13.22%"
    },
    {
      category_name: "Bakery",
      number_of_products: 600,
      total_sales: "₹12.53 Cr",
      sales_quantity: "3.00 L",
      margin: "13.22%",
      sales_contribution: "13.22%",
      margin_contribution: "13.22%"
    },
    {
      category_name: "Frozen Foods",
      number_of_products: 900,
      total_sales: "₹12.53 Cr",
      sales_quantity: "3.00 L",
      margin: "13.22%",
      sales_contribution: "13.22%",
      margin_contribution: "13.22%"
    },
    {
      category_name: "Canned Goods",
      number_of_products: 800,
      total_sales: "₹12.53 Cr",
      sales_quantity: "3.00 L",
      margin: "13.22%",
      sales_contribution: "13.22%",
      margin_contribution: "13.22%"
    },
    {
      category_name: "Condiments & Sauces",
      number_of_products: 500,
      total_sales: "₹12.53 Cr",
      sales_quantity: "3.00 L",
      margin: "13.22%",
      sales_contribution: "13.22%",
      margin_contribution: "13.22%"
    }
  ];

  const handleSort = (column: keyof BiscuitsBricks) => {
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

  return (
    <Card className="shadow-sm mb-6 overflow-hidden border rounded-lg">
      <div className="p-4 bg-white border-b">
        <h2 className="text-lg">Biscuits Bricks</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-b border-t">
              <SortableHeader
                column="category_name"
                label="Category Name"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="number_of_products"
                label="Number of Products"
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
                column="sales_quantity"
                label="Sales Quantity"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="margin"
                label="Margin"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="sales_contribution"
                label="Sales Contribution"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="margin_contribution"
                label="Margin Contribution"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-50 border-b">
                <TableCell className="font-medium">{row.category_name}</TableCell>
                <TableCell>{row.number_of_products}</TableCell>
                <TableCell>{row.total_sales}</TableCell>
                <TableCell>{row.sales_quantity}</TableCell>
                <TableCell>{row.margin}</TableCell>
                <TableCell>{row.sales_contribution}</TableCell>
                <TableCell>{row.margin_contribution}</TableCell>
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

export default BiscuitsBricksTable;
