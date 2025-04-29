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
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 flex items-center justify-center ${collapsed ? "mx-auto" : ""}`}>
            <img
              src="/granary-logo.svg"
              alt="Granary Logo"
              className="w-full h-full [&_path]:stroke-sidebar-foreground [&_circle]:stroke-sidebar-foreground"
            />
          </div>
          {!collapsed && (
            <h1 className="text-xl font-semibold text-sidebar-foreground">Granary</h1>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="py-4">
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
        className={`flex items-center p-2 rounded-md ${
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        } transition-colors ${collapsed ? "justify-center" : "justify-start"}`}
      >
        <Icon className="w-5 h-5 min-w-5" />
        {!collapsed && <span className="ml-3">{label}</span>}
      </a>
    </li>
  );
};

export default Sidebar;
