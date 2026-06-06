import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  FileText,
  FileSpreadsheet,
  ShoppingCart,
  Receipt,
  Activity,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Vendors",
      path: "/vendors",
      icon: <Building2 size={20} />,
    },
    {
      name: "RFQs",
      path: "/rfqs",
      icon: <FileText size={20} />,
    },
    {
      name: "Quotations",
      path: "/quotations",
      icon: <FileSpreadsheet size={20} />,
    },
    {
      name: "Purchase Orders",
      path: "/purchase-orders",
      icon: <ShoppingCart size={20} />,
    },
    {
      name: "Invoices",
      path: "/invoices",
      icon: <Receipt size={20} />,
    },
    {
      name: "Activity Logs",
      path: "/activity-logs",
      icon: <Activity size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <Bell size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className={`
      bg-slate-950
      text-white
      border-r
      border-slate-800
      transition-all
      duration-300
      ${collapsed ? "w-20" : "w-72"}
      `}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">
                VendorBridge
              </h2>

              <p className="text-xs text-slate-400">
                Procurement System
              </p>
            </div>
          )}

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
            p-2
            rounded-lg
            hover:bg-slate-800
            "
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                mb-2
                transition
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }
                `
              }
            >
              {item.icon}

              {!collapsed && (
                <span>{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          {!collapsed ? (
            <div>
              <p className="font-medium">
                Procurement Admin
              </p>

              <p className="text-xs text-slate-400">
                admin@vendorbridge.com
              </p>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 mx-auto" />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;