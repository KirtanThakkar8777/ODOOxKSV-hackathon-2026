import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Auth Pages
import Login from '../modules/user/pages/Login';
import Register from '../modules/user/pages/Register';

// Dashboard Pages
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import Notifications from '../pages/Notifications';
import Settings from '../pages/Settings';

// Vendor Pages
import VendorManagement from '../modules/vendor/pages/VendorManagement';
import VendorDetails from '../modules/vendor/pages/VendorDetails';
import AddVendor from '../modules/vendor/pages/AddVendor';
import EditVendor from '../modules/vendor/pages/EditVendor';

// RFQ Pages
import RFQManagement from '../modules/rfq/pages/RFQManagement';
import RFQDetails from '../modules/rfq/pages/RFQDetails';
import CreateRFQ from '../modules/rfq/pages/CreateRFQ';

// Quotation Pages
import QuotationManagement from '../modules/quotation/pages/QuotationManagement';
import QuotationDetails from '../modules/quotation/pages/QuotationDetails';
import QuotationComparison from '../modules/quotation/pages/QuotationComparison';

// Purchase Order Pages
import PurchaseOrders from '../modules/purchaseOrder/pages/PurchaseOrders';
import PurchaseOrderDetails from '../modules/purchaseOrder/pages/PurchaseOrderDetails';
import CreatePurchaseOrder from '../modules/purchaseOrder/pages/CreatePurchaseOrder';

// Invoice Pages
import InvoiceManagement from '../modules/invoice/pages/InvoiceManagement';
import InvoiceDetails from '../modules/invoice/pages/InvoiceDetails';
import GenerateInvoice from '../modules/invoice/pages/GenerateInvoice';

// Activity Log Pages
import ActivityLogs from '../modules/activityLog/pages/ActivityLogs';
import AuditTrail from '../modules/activityLog/pages/AuditTrail';

// User Pages
import Profile from '../modules/user/pages/Profile';
import Users from '../modules/user/pages/Users';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Vendor Routes */}
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/vendors/add" element={<AddVendor />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
          <Route path="/vendors/:id/edit" element={<EditVendor />} />

          {/* RFQ Routes */}
          <Route path="/rfqs" element={<RFQManagement />} />
          <Route path="/rfqs/create" element={<CreateRFQ />} />
          <Route path="/rfqs/:id" element={<RFQDetails />} />

          {/* Quotation Routes */}
          <Route path="/quotations" element={<QuotationManagement />} />
          <Route path="/quotations/compare" element={<QuotationComparison />} />
          <Route path="/quotations/:id" element={<QuotationDetails />} />

          {/* Purchase Order Routes */}
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/purchase-orders/create" element={<CreatePurchaseOrder />} />
          <Route path="/purchase-orders/:id" element={<PurchaseOrderDetails />} />

          {/* Invoice Routes */}
          <Route path="/invoices" element={<InvoiceManagement />} />
          <Route path="/invoices/generate" element={<GenerateInvoice />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />

          {/* Activity Log Routes */}
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/audit-trail" element={<AuditTrail />} />

          {/* User Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />

          {/* Other Pages */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;