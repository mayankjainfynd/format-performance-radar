
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
import { ArrowDown, ArrowUp } from "lucide-react";

interface BusinessFormatTableProps {
  data: BusinessFormatSales[];
}

const BusinessFormatTable: React.FC<BusinessFormatTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = React.useState<keyof BusinessFormatSales>("format_name");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof BusinessFormatSales) => {
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
        <h2 className="text-lg font-semibold">Business Format Sales</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader
                column="format_name"
                label="Format Name"
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
                column="number_of_locations"
                label="Locations"
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
                label="GP %"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
              <SortableHeader
                column="gross_profit_target"
                label="GP Target"
                currentSort={sortColumn}
                direction={sortDirection}
                onSort={handleSort}
              />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/50">
                <TableCell className="font-medium">{row.format_name}</TableCell>
                <TableCell>{row.number_of_products}</TableCell>
                <TableCell>{row.number_of_locations}</TableCell>
                <TableCell>{row.sales_quantity}</TableCell>
                <TableCell>{row.total_sales}</TableCell>
                <TableCell>{row.sales_target}</TableCell>
                <TableCell>{row.gross_profit}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{row.gross_profit_target}</span>
                    {parseFloat(row.gross_profit) < parseFloat(row.gross_profit_target) ? (
                      <span className="text-red-600 flex items-center text-xs">
                        <ArrowDown className="h-3 w-3 mr-1" />
                        {(parseFloat(row.gross_profit_target) - parseFloat(row.gross_profit)).toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-green-600 flex items-center text-xs">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        {(parseFloat(row.gross_profit) - parseFloat(row.gross_profit_target)).toFixed(2)}%
                      </span>
                    )}
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

export default BusinessFormatTable;
