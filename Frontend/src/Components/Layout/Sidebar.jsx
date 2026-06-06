import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Receipt,
  ShoppingCart,
  Activity,
  BarChart3,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Users",
    icon: Users,
    path: "/users",
  },
  {
    title: "Vendors",
    icon: Building2,
    path: "/vendors",
  },
  {
    title: "RFQ",
    icon: FileText,
    path: "/rfq",
  },
  {
    title: "Quotations",
    icon: Receipt,
    path: "/quotations",
  },
  {
    title: "Purchase Orders",
    icon: ShoppingCart,
    path: "/purchase-orders",
  },
  {
    title: "Invoices",
    icon: Receipt,
    path: "/invoices",
  },
  {
    title: "Activity Logs",
    icon: Activity,
    path: "/activity-logs",
  },
  {
    title: "Reports",
    icon: BarChart3,
    path: "/reports",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r">

      <div className="p-6 border-b">

        <h1 className="text-2xl font-bold">
          VendorBridge
        </h1>

      </div>

      <nav className="p-4 space-y-2">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-100"
                }`
              }
            >
              <Icon size={18} />

              {menu.title}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}