import React from "react";
import { Store, TrendingUp, CalendarRange, Package, Settings, ShoppingCart, Users, BarChart3, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const isMobile = useIsMobile();
  
  if (isMobile && collapsed) {
    return null;
  }

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-sidebar min-h-screen flex flex-col fixed left-0 top-0 bottom-0 shadow-md transition-all duration-300 z-40`}
    >
      <div className="flex flex-col items-center pt-4">
        <img src="/granary-logo.svg" alt="Granary" className="h-8 w-8 mb-2" />
      </div>
      <div className="flex items-center justify-between py-4 px-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            {/* Removed logo and text from expanded sidebar */}
          </div>
        ) : (
          <div 
            className="flex items-center justify-center w-full cursor-pointer hover:opacity-80 transition-opacity"
            onClick={toggleSidebar}
          >
            {/* Removed logo from collapsed sidebar */}
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground ${collapsed ? 'hidden' : ''}`}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="py-4 mt-[-1rem]">
          <ul className="space-y-2 px-2">
            <NavItem icon={Home} label="Home" collapsed={collapsed} />
            <NavItem icon={TrendingUp} label="Dashboard" collapsed={collapsed} active />
            <NavItem icon={Store} label="Stores" collapsed={collapsed} />
            <NavItem icon={Package} label="Products" collapsed={collapsed} />
            <NavItem icon={ShoppingCart} label="Orders" collapsed={collapsed} />
            <NavItem icon={BarChart3} label="Reports" collapsed={collapsed} />
            <NavItem icon={CalendarRange} label="Calendar" collapsed={collapsed} />
            <NavItem icon={Users} label="Users" collapsed={collapsed} />
            <NavItem icon={Settings} label="Settings" collapsed={collapsed} />
          </ul>
        </nav>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  collapsed: boolean;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, collapsed, active }) => {
  return (
    <li>
      <a
        href="#"
        className={
          `flex items-center p-2 rounded-md transition-colors justify-center ` +
          (collapsed ? "flex-col " : "flex-row ") +
          (active
            ? "bg-sidebar-accent text-sidebar-accent-foreground "
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground ")
        }
      >
        <Icon className="w-5 h-5 min-w-5" />
        {collapsed ? (
          <span className="mt-1 text-[10px] leading-tight text-center text-sidebar-foreground/70">{label}</span>
        ) : (
          <span className="ml-3">{label}</span>
        )}
      </a>
    </li>
  );
};

export default Sidebar;
