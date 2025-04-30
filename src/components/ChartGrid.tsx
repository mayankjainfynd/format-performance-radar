import React from "react";
import { Charts, FormatWiseSales } from "@/types/dashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import PurchaseVsSalesChart from "./charts/PurchaseVsSalesChart";
import TargetVsSalesChart from "./charts/TargetVsSalesChart";
import FormatWiseSalesChart from "./charts/FormatWiseSalesChart";
import InventoryAgingChart from "./charts/InventoryAgingChart";

interface ChartGridProps {
  charts: Charts;
  formatWiseSalesData: FormatWiseSales[];
}

const ChartGrid: React.FC<ChartGridProps> = ({ charts, formatWiseSalesData }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-6"} mb-6`}>
      <PurchaseVsSalesChart data={charts.purchase_vs_sales} />
      <TargetVsSalesChart data={charts.target_vs_sales} />
      <FormatWiseSalesChart data={formatWiseSalesData} />
      <InventoryAgingChart data={charts.inventory_aging_distribution} />
    </div>
  );
};

export default ChartGrid;
