
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/services/dashboardService";
import { Filters } from "@/types/dashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "@/components/ui/tooltip";

import Sidebar from "@/components/Sidebar";
import FilterBar from "@/components/FilterBar";
import KpiCards from "@/components/KpiCards";
import BusinessFormatTable from "@/components/BusinessFormatTable";
import BiscuitsBricksTable from "@/components/BiscuitsBricksTable";
import ChartGrid from "@/components/ChartGrid";

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardData", filters],
    queryFn: fetchDashboardData,
  });

  // Update sidebar state when mobile state changes
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
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

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#F9FAFB] flex w-full">
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        
        <div className={`flex-1 transition-all duration-300 ${isMobile ? "" : mainContentClass}`}>
          <FilterBar filters={filters} setFilters={setFilters} />
          
          <div className="p-6">
            <KpiCards kpis={data.data.kpis} />
            <BusinessFormatTable data={data.data.business_format_sales} />
            <BiscuitsBricksTable data={data.data.biscuits_bricks} />
            <ChartGrid charts={data.data.charts} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
