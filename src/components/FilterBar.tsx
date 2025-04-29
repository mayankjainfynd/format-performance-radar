import React from "react";
import { Filters } from "@/types/dashboard";
import { Search, Calendar, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  return (
    <div className="bg-white z-50 sticky top-0 px-4 md:px-6 py-4 border-b shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Category Overview</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 h-9 w-64 rounded-md border border-input bg-background text-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <FilterSelect
          value={filters.format}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, format: value }))}
          options={[
            { value: "all", label: "All Format" },
            { value: "smart-bazaar", label: "Smart Bazaar" },
            { value: "freshpik", label: "FreshPik" },
            { value: "jiomart", label: "JioMart" },
            { value: "reliance-smart", label: "Reliance Smart" }
          ]}
        />
        <FilterSelect
          value={filters.store}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, store: value }))}
          options={[
            { value: "all", label: "All Store" },
            { value: "north", label: "North Region" },
            { value: "south", label: "South Region" },
            { value: "east", label: "East Region" },
            { value: "west", label: "West Region" }
          ]}
        />
        <FilterSelect
          value={filters.location}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
          options={[
            { value: "all", label: "All Locations" },
            { value: "mumbai", label: "Mumbai" },
            { value: "delhi", label: "Delhi" },
            { value: "bangalore", label: "Bangalore" },
            { value: "chennai", label: "Chennai" }
          ]}
        />
        <FilterSelect
          value={filters.category}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
          options={[
            { value: "all", label: "All Categories" },
            { value: "dairy-eggs", label: "Dairy & Eggs" },
            { value: "beverages", label: "Beverages" },
            { value: "snacks", label: "Snacks" },
            { value: "bakery", label: "Bakery" }
          ]}
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
    </div>
  );
};

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onValueChange,
  options,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-9 min-w-[140px] bg-background">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = () => {
  return (
    <button className="flex items-center gap-2 text-sm border border-input rounded-md px-3 h-9 bg-background hover:bg-accent transition-colors">
      <Calendar className="h-4 w-4 text-gray-400" />
      <span>Jan 01, 2024</span>
      <span className="text-gray-400">→</span>
      <span>Dec 31, 2024</span>
    </button>
  );
};

export default FilterBar;
