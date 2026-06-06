import { Routes, Route, Navigate } from "react-router-dom";



import Dashboard from "./Pages/Dashboard";
import AuthLayout from "./Layouts/AuthLayout";
import Login from "./Modules/User/Page/Login";
import Register from "./Modules/User/Page/Register";
import DashboardLayout from "./Layouts/DashboardLayout";
import VendorManagement from "./Modules/Vendor/Page/VendorManagement";
import RFQManagement from "./Modules/RFQ/Pages/RFQManagement";
import QuotationManagement from "./Modules/quotation/Pages/QuotationManagement";
import PurchaseOrders from "./Modules/PurchaseOrder/Pages/PurchaseOrders";
import InvoiceManagement from "./Modules/Invoice/Pages/InvoiceManagement";
import ActivityLogs from "./Modules/ActivityLogs/Page/ActivityLogs";
import Reports from "./Pages/Reports";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import ProtectedRoute from "./Routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />

        <Route path="/vendors" element={<VendorManagement />} />
        <Route path="/rfqs" element={<RFQManagement />} />
        <Route path="/quotations" element={<QuotationManagement />} />
        <Route path="/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/invoices" element={<InvoiceManagement />} />
        <Route path="/activity-logs" element={<ActivityLogs />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;