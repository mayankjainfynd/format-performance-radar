
import React from "react";
import { Charts } from "@/types/dashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import PurchaseVsSalesChart from "./charts/PurchaseVsSalesChart";
import TargetVsSalesChart from "./charts/TargetVsSalesChart";
import FormatWiseSalesChart from "./charts/FormatWiseSalesChart";
import InventoryAgingChart from "./charts/InventoryAgingChart";

interface ChartGridProps {
  charts: Charts;
}

const ChartGrid: React.FC<ChartGridProps> = ({ charts }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6 mb-6`}>
      <PurchaseVsSalesChart data={charts.purchase_vs_sales} />
      <TargetVsSalesChart data={charts.target_vs_sales} />
      <FormatWiseSalesChart data={charts.format_wise_sales} />
      <InventoryAgingChart data={charts.inventory_aging_distribution} />
    </div>
  );
};

export default ChartGrid;
