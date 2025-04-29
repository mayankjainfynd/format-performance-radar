
import React from "react";
import { KPIs } from "@/types/dashboard";
import { TrendingUp, Store, ShoppingBag, Layers, ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface KpiCardsProps {
  kpis: KPIs;
}

const KpiCards: React.FC<KpiCardsProps> = ({ kpis }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-5 gap-4"} mb-6`}>
      <KpiCard
        title="Total Sales"
        value={kpis.total_sales}
        icon={TrendingUp}
        info="Total sales across all formats"
      />
      <KpiCard
        title="Sales Quantity"
        value={kpis.sales_quantity}
        icon={ShoppingBag}
        info="Total quantity sold across all SKUs"
      />
      <KpiCard
        title="Total Store"
        value={kpis.total_store.toString()}
        icon={Store}
        info="Total number of active stores"
      />
      <KpiCard
        title="On-Hand Inventory"
        value={kpis.on_hand_inventory}
        icon={Layers}
        info="Current inventory at all locations"
      />
      <KpiCard
        title="Turn Over Ratio"
        value={kpis.turnover_ratio}
        icon={TrendingUp}
        info="Inventory turnover rate"
      />
    </div>
  );
};

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  info?: string;
  trend?: "up" | "down";
  percentage?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon: Icon, info, trend, percentage }) => {
  return (
    <Card className="shadow-sm border rounded-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">{title}</span>
          {info && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-4 h-4 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-xs cursor-help">?</div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{info}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="text-xl font-semibold">{value}</div>
        {trend && percentage && (
          <div className={`mt-1 flex items-center text-xs ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}>
            {trend === "up" ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            <span className="ml-1">{percentage}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiCards;
