
import React from "react";
import { Filters } from "@/types/dashboard";
import { Filter, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const isMobile = useIsMobile();
  const [showFilters, setShowFilters] = React.useState(!isMobile);

  return (
    <div className="bg-white z-50 sticky top-0 px-4 md:px-6 py-4 border-b shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Category Overview</h1>
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 h-[32px] w-64 rounded-md border border-input bg-background"
            />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4">
          <FilterDropdown
            label="Format"
            value={filters.format}
            onChange={(value) => setFilters((prev) => ({ ...prev, format: value }))}
            options={["All Format", "Smart Bazaar", "FreshPik", "JioMart", "Reliance Smart"]}
          />
          <FilterDropdown
            label="Store"
            value={filters.store}
            onChange={(value) => setFilters((prev) => ({ ...prev, store: value }))}
            options={["All Store", "North Region", "South Region", "East Region", "West Region"]}
          />
          <FilterDropdown
            label="Location"
            value={filters.location}
            onChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
            options={["All Locations", "Mumbai", "Delhi", "Bangalore", "Chennai"]}
          />
          <FilterDropdown
            label="Category"
            value={filters.category}
            onChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
            options={["All Categories", "Dairy & Eggs", "Beverages", "Snacks", "Bakery"]}
          />
          <DateRangeFilter
            startDate={filters.date_range.start_date}
            endDate={filters.date_range.end_date}
            onChange={(start, end) =>
              setFilters((prev) => ({
                ...prev,
                date_range: { start_date: start, end_date: end },
              }))
            }
          />
        </div>
      )}
    </div>
  );
};

interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[32px] rounded-md border border-input bg-background px-3 py-1 text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-400" />
        <div className="flex items-center text-sm">
          <span>Jan 01, 2024</span>
          <span className="mx-2">→</span>
          <span>Dec 31, 2024</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
