
import React from "react";
import { KPIs } from "@/types/dashboard";
import { TrendingUp, Store, ShoppingBag, Layers, ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface KpiCardsProps {
  kpis: KPIs;
}

const KpiCards: React.FC<KpiCardsProps> = ({ kpis }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-5 gap-6"} mb-6`}>
      <KpiCard
        title="Total Sales"
        value={kpis.total_sales}
        icon={TrendingUp}
        trend="up"
        percentage="8.2%"
      />
      <KpiCard
        title="Sales Quantity"
        value={kpis.sales_quantity}
        icon={ShoppingBag}
        trend="up"
        percentage="5.1%"
      />
      <KpiCard
        title="Total Stores"
        value={kpis.total_store.toString()}
        icon={Store}
        trend="up"
        percentage="2.3%"
      />
      <KpiCard
        title="On-Hand Inventory"
        value={kpis.on_hand_inventory}
        icon={Layers}
        trend="down"
        percentage="3.7%"
      />
      <KpiCard
        title="Turnover Ratio"
        value={kpis.turnover_ratio}
        icon={TrendingUp}
        trend="up"
        percentage="4.5%"
      />
    </div>
  );
};

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  trend: "up" | "down";
  percentage: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon: Icon, trend, percentage }) => {
  return (
    <Card className="shadow-md rounded-xl min-h-[120px]">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="flex items-center justify-center mb-2">
          <Icon className="text-gray-600 w-5 h-5" />
          <span className="ml-2 text-sm text-gray-500">{title}</span>
        </div>
        <div className="text-2xl font-semibold mb-1">{value}</div>
        <div className={`flex items-center justify-center ${
          trend === "up" ? "text-green-600" : "text-red-600"
        }`}>
          {trend === "up" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend === "up" ? "bg-green-100" : "bg-red-100"
          }`}>
            {percentage}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCards;
