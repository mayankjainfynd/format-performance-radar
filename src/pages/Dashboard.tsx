import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/services/dashboardService";
import { Filters, FormatWiseSales } from "@/types/dashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import FilterBar from "@/components/FilterBar";
import KpiCards from "@/components/KpiCards";
import BusinessFormatTable from "@/components/BusinessFormatTable";
import BiscuitsBricksTable from "@/components/BiscuitsBricksTable";
import ChartGrid from "@/components/ChartGrid";
import ProductsOverviewPage from "@/components/ProductsOverviewPage";

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  // Force sidebarCollapsed to always be true
  const sidebarCollapsed = true;
  const [filters, setFilters] = useState<Filters>({
    format: "All Format",
    store: "All Store",
    location: "All Locations",
    category: "All Categories",
    date_range: {
      start_date: "2024-01-01",
      end_date: "2024-12-31"
    }
  });
  const [submenu, setSubmenu] = useState<'category' | 'products'>('category');

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData", filters],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-600">
            {error ? (error as Error).message : "Failed to load dashboard data"}
          </p>
        </div>
      </div>
    );
  }

  const mainContentClass = sidebarCollapsed ? "ml-16" : "ml-64";

  // Derive formatWiseSalesData from business_format_sales
  const totalSales = data.data.business_format_sales.reduce((sum, item) => {
    const match = item.total_sales.match(/([\d.]+)/);
    return sum + (match ? parseFloat(match[1]) : 0);
  }, 0);
  const formatWiseSalesData: FormatWiseSales[] = data.data.business_format_sales.map(item => {
    const match = item.total_sales.match(/([\d.]+)/);
    const salesValue = match ? parseFloat(match[1]) : 0;
    const sales_percentage = totalSales > 0 ? ((salesValue / totalSales) * 100).toFixed(1) : "0";
    return {
      format_name: item.format_name,
      sales_percentage,
      sales_value: item.total_sales
    };
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#F9FAFB] flex w-full">
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={() => {}} />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <div className="flex flex-1">
            {/* Submenu beside sidebar, below TopBar */}
            <div className="flex flex-col w-48 bg-[#F9FAFB] border-r border-gray-200 py-6 px-2 h-full ml-16">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md mb-2 text-left text-sm font-medium transition-colors ${submenu === 'category' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => setSubmenu('category')}
              >
                Category Overview
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-left text-sm font-medium transition-colors ${submenu === 'products' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
                onClick={() => setSubmenu('products')}
              >
                Products Overview
              </button>
            </div>
            <div className={`flex-1 transition-all duration-300`}> 
              {submenu === 'category' ? (
                <>
                  <FilterBar filters={filters} setFilters={setFilters} />
                  <div className="p-4 md:p-6">
                    <KpiCards kpis={data.data.kpis} />
                    <BusinessFormatTable data={data.data.business_format_sales} />
                    <BiscuitsBricksTable data={data.data.biscuits_bricks} />
                    <ChartGrid charts={data.data.charts} formatWiseSalesData={formatWiseSalesData} />
                    {/* Pagination Navigation (added as shown in the image) */}
                    <div className="flex justify-end items-center gap-2 my-4">
                      <button className="p-1 border rounded hover:bg-gray-100">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button className="p-1 border rounded hover:bg-gray-100">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <ProductsOverviewPage />
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
