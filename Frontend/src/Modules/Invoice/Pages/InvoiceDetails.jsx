import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Receipt, Calendar, DollarSign, CheckCircle, Clock, Download, FileText, Building2, Star, Truck, CreditCard, Printer } from 'lucide-react';
import Button from '../../../components/common/Button';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatusBadge from '../../../components/common/StatusBadge';
import DataTable from '../../../components/common/DataTable';
import ActivityTimeline from '../../../components/timeline/ActivityTimeline';
import Modal from '../../../components/common/Modal';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [showPayModal, setShowPayModal] = useState(false);

  const invoice = {
    id: 'INV-2024-089',
    po: 'PO-2024-045',
    vendor: 'TechCorp Solutions',
    vendorRating: 4.8,
    amount: 118500,
    tax: 0,
    total: 118500,
    dueDate: '2024-07-20',
    status: 'unpaid',
    paymentTerms: 'Net 30',
    invoiceDate: '2024-06-20',
    createdBy: 'System',
    notes: 'Payment due within 30 days of invoice date.',
    items: [
      { name: 'Laptop - Dell XPS 15', quantity: 25, unitPrice: 1700, total: 42500 },
      { name: 'Monitor - 27" 4K Display', quantity: 30, unitPrice: 420, total: 12600 },
      { name: 'Keyboard & Mouse Set', quantity: 30, unitPrice: 110, total: 3300 },
      { name: 'Docking Station', quantity: 25, unitPrice: 240, total: 6000 },
      { name: 'Webcam HD', quantity: 30, unitPrice: 80, total: 2400 },
    ],
  };

  const activities = [
    { title: 'Invoice Generated', description: 'Invoice INV-2024-089 generated from PO-2024-045', timestamp: '2024-06-20T10:00:00', icon: 'file', color: 'blue', user: 'System' },
    { title: 'PO Completed', description: 'Purchase Order PO-2024-045 marked as completed', timestamp: '2024-06-20T09:30:00', icon: 'check', color: 'green', user: 'John Doe' },
    { title: 'Items Received', description: 'All items received for PO-2024-045', timestamp: '2024-06-20T09:00:00', icon: 'cart', color: 'purple', user: 'Warehouse' },
  ];

  const itemColumns = [
    { key: 'name', title: 'Item' },
    { key: 'quantity', title: 'Qty', width: '80px' },
    { key: 'unitPrice', title: 'Unit Price', width: '120px', render: (val) => `$${val.toLocaleString()}` },
    { key: 'total', title: 'Total', width: '120px', render: (val) => `$${val.toLocaleString()}` },
  ];

  const totalAmount = invoice.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/invoices" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{invoice.id}</h1>
              <StatusBadge status={invoice.status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">For {invoice.po} - {invoice.vendor}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" leftIcon={<Printer className="w-4 h-4" />}>Print</Button>
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Download PDF</Button>
          {invoice.status === 'unpaid' && (
            <Button leftIcon={<CreditCard className="w-4 h-4" />} onClick={() => setShowPayModal(true)}>Record Payment</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <AnalyticsCard title="Invoice Details">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Invoice Date</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{invoice.invoiceDate}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Due Date</p>
                <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">{invoice.dueDate}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Payment Terms</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{invoice.paymentTerms}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Purchase Order</p>
                <Link to={`/purchase-orders/${invoice.po}`} className="text-sm font-medium text-primary-600 hover:underline">{invoice.po}</Link>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created By</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{invoice.createdBy}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Days Until Due</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">14 days</p>
              </div>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Invoice Items">
            <DataTable columns={itemColumns} data={invoice.items} pagination={false} />
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700">
              <div className="flex justify-end space-y-2">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tax</span>
                    <span className="font-medium">${invoice.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Shipping</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-dark-700 flex justify-between">
                    <span className="text-base font-semibold text-slate-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">${invoice.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Notes">
            <p className="text-sm text-slate-600 dark:text-slate-300">{invoice.notes}</p>
          </AnalyticsCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AnalyticsCard title="Vendor">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-700 dark:text-primary-400">T</span>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{invoice.vendor}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-slate-500">{invoice.vendorRating}</span>
                </div>
              </div>
            </div>
            <Link to="/vendors/1">
              <Button variant="secondary" className="w-full justify-center">View Vendor</Button>
            </Link>
          </AnalyticsCard>

          <AnalyticsCard title="Payment Status">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Amount Due</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">${invoice.status === 'paid' ? '0' : invoice.total.toLocaleString()}</span>
              </div>
              {invoice.status === 'unpaid' && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700 dark:text-yellow-400">Payment due in 14 days</span>
                  </div>
                </div>
              )}
              {invoice.status === 'paid' && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-400">Paid on 2024-07-15</span>
                  </div>
                </div>
              )}
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Actions">
            <div className="space-y-2">
              {invoice.status === 'unpaid' && (
                <Button className="w-full justify-center" leftIcon={<CreditCard className="w-4 h-4" />} onClick={() => setShowPayModal(true)}>Record Payment</Button>
              )}
              <Button variant="secondary" className="w-full justify-center" leftIcon={<Download className="w-4 h-4" />}>Download PDF</Button>
              <Button variant="secondary" className="w-full justify-center" leftIcon={<Printer className="w-4 h-4" />}>Print Invoice</Button>
            </div>
          </AnalyticsCard>
        </div>
      </div>

      {/* Pay Modal */}
      <Modal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        title="Record Payment"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowPayModal(false)}>Cancel</Button>
            <Button onClick={() => setShowPayModal(false)}>Record Payment</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Record payment for <strong>{invoice.id}</strong> from {invoice.vendor}.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Payment Date</label>
              <input type="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Amount</label>
              <input type="number" className="input-field" defaultValue={invoice.total} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Payment Method</label>
            <select className="input-field">
              <option>Bank Transfer</option>
              <option>Credit Card</option>
              <option>Check</option>
              <option>Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Reference Number</label>
            <input type="text" className="input-field" placeholder="Transaction reference..." />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InvoiceDetails;