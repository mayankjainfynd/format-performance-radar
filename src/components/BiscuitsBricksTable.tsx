
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
import { ArrowDown, ArrowUp } from "lucide-react";

interface BiscuitsBricksTableProps {
  data: BiscuitsBricks[];
}

const BiscuitsBricksTable: React.FC<BiscuitsBricksTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = React.useState<keyof BiscuitsBricks>("category_name");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof BiscuitsBricks) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
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
  }, [data, sortColumn, sortDirection]);

  return (
    <Card className="shadow-sm mb-6 overflow-hidden">
      <div className="p-4 bg-white border-b">
        <h2 className="text-lg font-semibold">Biscuits Bricks</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader
                column="category_name"
                label="Category Name"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="number_of_products"
                label="Products"
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
                label="Sales Qty"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="margin"
                label="Margin %"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="sales_contribution"
                label="Sales Contrib."
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="margin_contribution"
                label="Margin Contrib."
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{row.category_name}</TableCell>
                <TableCell>{row.number_of_products}</TableCell>
                <TableCell>{row.total_sales}</TableCell>
                <TableCell>{row.sales_quantity}</TableCell>
                <TableCell>{row.margin}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {row.sales_contribution}
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {row.sales_contribution}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {row.margin_contribution}
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                      {row.margin_contribution}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      className="cursor-pointer hover:bg-muted/50"
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
