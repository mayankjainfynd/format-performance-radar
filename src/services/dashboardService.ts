
import { DashboardResponse } from "@/types/dashboard";

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  // In a real application, this would be an actual API call
  // For now, we'll return the mock data
  return {
    status: "success",
    timestamp: "2025-04-29T12:00:00Z",
    data: {
      filters: {
        format: "All Format",
        store: "All Store",
        location: "All Locations",
        category: "All Categories",
        date_range: {
          start_date: "2024-01-01",
          end_date: "2024-12-31"
        }
      },
      kpis: {
        total_sales: "₹55.23 Cr",
        sales_quantity: "2.38 L",
        total_store: 450,
        on_hand_inventory: "1.24 L",
        turnover_ratio: "3:2"
      },
      business_format_sales: [
        {
          format_name: "Smart Bazaar",
          number_of_products: 500,
          number_of_locations: 200,
          sales_quantity: "1.00 L",
          total_sales: "₹11.50 Cr",
          sales_target: "₹15.23 Cr",
          gross_profit: "13.22%",
          gross_profit_target: "15.22%"
        },
        {
          format_name: "FreshPik",
          number_of_products: 1200,
          number_of_locations: 200,
          sales_quantity: "2.40 L",
          total_sales: "₹9.75 Cr",
          sales_target: "₹15.23 Cr",
          gross_profit: "13.22%",
          gross_profit_target: "15.22%"
        }
      ],
      biscuits_bricks: [
        {
          category_name: "Dairy & Eggs",
          number_of_products: 500,
          total_sales: "₹12.53 Cr",
          sales_quantity: "1.00 L",
          margin: "13.22%",
          sales_contribution: "13.22%",
          margin_contribution: "13.22%"
        },
        {
          category_name: "Beverages",
          number_of_products: 1200,
          total_sales: "₹12.53 Cr",
          sales_quantity: "1.00 L",
          margin: "13.22%",
          sales_contribution: "13.22%",
          margin_contribution: "13.22%"
        }
      ],
      charts: {
        purchase_vs_sales: [
          { month: "January", purchase_value: 72.0, sales_value: 35.5 },
          { month: "February", purchase_value: 70.0, sales_value: 36.0 },
          { month: "March", purchase_value: 75.0, sales_value: 40.0 },
          { month: "April", purchase_value: 68.0, sales_value: 42.5 },
          { month: "May", purchase_value: 78.0, sales_value: 45.0 },
          { month: "June", purchase_value: 82.0, sales_value: 50.0 }
        ],
        target_vs_sales: [
          { month: "January", target_value: 75.0, sales_value: 34.5 },
          { month: "February", target_value: 73.5, sales_value: 36.0 },
          { month: "March", target_value: 78.0, sales_value: 40.0 },
          { month: "April", target_value: 80.0, sales_value: 42.5 },
          { month: "May", target_value: 85.0, sales_value: 45.0 },
          { month: "June", target_value: 90.0, sales_value: 50.0 }
        ],
        format_wise_sales: [
          { format_name: "Smart Bazaar", sales_percentage: "20.8%", sales_value: "₹11.50 Cr" },
          { format_name: "FreshPik", sales_percentage: "17.7%", sales_value: "₹9.75 Cr" },
          { format_name: "Express", sales_percentage: "30.5%", sales_value: "₹16.82 Cr" },
          { format_name: "Online", sales_percentage: "31.0%", sales_value: "₹17.16 Cr" }
        ],
        inventory_aging_distribution: {
          "0_30_days": 45000,
          "31_60_days": 32000,
          "61_90_days": 25000,
          "90_plus_days": 12000
        }
      }
    }
  };
};
