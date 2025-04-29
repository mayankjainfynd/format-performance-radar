
export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface Filters {
  format: string;
  store: string;
  location: string;
  category: string;
  date_range: DateRange;
}

export interface KPIs {
  total_sales: string;
  sales_quantity: string;
  total_store: number;
  on_hand_inventory: string;
  turnover_ratio: string;
}

export interface BusinessFormatSales {
  format_name: string;
  number_of_products: number;
  number_of_locations: number;
  sales_quantity: string;
  total_sales: string;
  sales_target: string;
  gross_profit: string;
  gross_profit_target: string;
}

export interface BiscuitsBricks {
  category_name: string;
  number_of_products: number;
  total_sales: string;
  sales_quantity: string;
  margin: string;
  sales_contribution: string;
  margin_contribution: string;
}

export interface PurchaseVsSales {
  month: string;
  purchase_value: number;
  sales_value: number;
}

export interface TargetVsSales {
  month: string;
  target_value: number;
  sales_value: number;
}

export interface FormatWiseSales {
  format_name: string;
  sales_percentage: string;
  sales_value: string;
}

export interface InventoryAgingDistribution {
  "0_30_days": number;
  "31_60_days": number;
  "61_90_days": number;
  "90_plus_days": number;
}

export interface Charts {
  purchase_vs_sales: PurchaseVsSales[];
  target_vs_sales: TargetVsSales[];
  format_wise_sales: FormatWiseSales[];
  inventory_aging_distribution: InventoryAgingDistribution;
}

export interface DashboardData {
  filters: Filters;
  kpis: KPIs;
  business_format_sales: BusinessFormatSales[];
  biscuits_bricks: BiscuitsBricks[];
  charts: Charts;
}

export interface DashboardResponse {
  status: string;
  timestamp: string;
  data: DashboardData;
}
