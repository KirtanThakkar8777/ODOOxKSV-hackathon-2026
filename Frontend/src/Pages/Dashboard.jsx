import {
  DollarSign,
  Building2,
  FileText,
  ShoppingCart,
} from "lucide-react";

import StatCard from "../Components/card/StatCard";
import AnalyticsCard from "../components/card/AnalyticsCard";
import ExecutiveCard from "../components/card/ExecutiveCard";

import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";

import ActivityTimeline from "../components/timeline/ActivityTimeline";

const Dashboard = () => {
  const spendData = [
    { month: "Jan", value: 120000 },
    { month: "Feb", value: 160000 },
    { month: "Mar", value: 180000 },
    { month: "Apr", value: 220000 },
    { month: "May", value: 210000 },
    { month: "Jun", value: 280000 },
  ];

  const vendorData = [
    { name: "IT", value: 35 },
    { name: "Office", value: 20 },
    { name: "Manufacturing", value: 25 },
    { name: "Services", value: 15 },
  ];

  const approvalData = [
    { name: "Approved", value: 72 },
    { name: "Pending", value: 18 },
    { name: "Rejected", value: 10 },
  ];

  const activities = [
    {
      id: 1,
      title: "New Vendor Approved",
      description:
        "ABC Technologies approved by Procurement Manager",
      time: "10 min ago",
    },
    {
      id: 2,
      title: "RFQ Created",
      description:
        "RFQ-2025-001 created for office equipment",
      time: "45 min ago",
    },
    {
      id: 3,
      title: "Purchase Order Issued",
      description:
        "PO-2025-019 sent to vendor",
      time: "2 hours ago",
    },
    {
      id: 4,
      title: "Invoice Received",
      description:
        "Invoice uploaded by vendor",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Executive Procurement Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Real-time procurement insights and vendor management
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-5">
        <StatCard
          title="Total Spend"
          value="$2.8M"
          growth="+12.5%"
          icon={<DollarSign />}
        />

        <StatCard
          title="Active Vendors"
          value="248"
          growth="+8.2%"
          icon={<Building2 />}
        />

        <StatCard
          title="Open RFQs"
          value="42"
          growth="+15.8%"
          icon={<FileText />}
        />

        <StatCard
          title="Purchase Orders"
          value="184"
          growth="+6.4%"
          icon={<ShoppingCart />}
        />
      </div>

      {/* Executive Cards */}

      <div className="grid grid-cols-3 gap-5">
        <ExecutiveCard
          title="Monthly Spend"
          amount="$485,000"
          subtitle="Current month expenditure"
          color="blue"
        />

        <ExecutiveCard
          title="Cost Savings"
          amount="$82,400"
          subtitle="Achieved through negotiations"
          color="green"
        />

        <ExecutiveCard
          title="Pending Approvals"
          amount="24"
          subtitle="Awaiting management review"
          color="orange"
        />
      </div>

      {/* Analytics */}

      <div className="grid grid-cols-2 gap-5">
        <AnalyticsCard title="Spend Analysis">
          <LineChart data={spendData} />
        </AnalyticsCard>

        <AnalyticsCard title="Category Spend">
          <BarChart data={vendorData} />
        </AnalyticsCard>
      </div>

      {/* Second Row */}

      <div className="grid grid-cols-3 gap-5">
        <AnalyticsCard title="Approval Status">
          <DonutChart data={approvalData} />
        </AnalyticsCard>

        <AnalyticsCard title="Recent Activities">
          <ActivityTimeline
            activities={activities}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Pending Actions">
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="font-medium">
                Vendor Approval
              </p>
              <p className="text-sm text-slate-500">
                12 vendors awaiting review
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="font-medium">
                RFQ Evaluation
              </p>
              <p className="text-sm text-slate-500">
                8 quotations pending evaluation
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="font-medium">
                Invoice Verification
              </p>
              <p className="text-sm text-slate-500">
                5 invoices pending approval
              </p>
            </div>
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
};

export default Dashboard;