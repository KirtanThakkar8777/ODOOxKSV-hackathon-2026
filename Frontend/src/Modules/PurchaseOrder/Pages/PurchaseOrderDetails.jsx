import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Calendar, DollarSign, Truck, CheckCircle, XCircle, Download, FileText, Building2, Star, Package, MapPin, Phone, Mail } from 'lucide-react';
import Button from '../../../components/common/Button';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatusBadge from '../../../components/common/StatusBadge';
import DataTable from '../../../components/common/DataTable';
import ActivityTimeline from '../../../components/timeline/ActivityTimeline';
import Modal from '../../../components/common/Modal';

const PurchaseOrderDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const order = {
    id: 'PO-2024-045',
    rfq: 'RFQ-2024-001',
    rfqTitle: 'IT Equipment Procurement',
    vendor: 'TechCorp Solutions',
    vendorRating: 4.8,
    amount: 118500,
    deliveryDate: '2024-06-20',
    status: 'pending',
    paymentTerms: 'Net 30',
    shippingAddress: '123 Corporate Ave, New York, NY 10001',
    createdDate: '2024-06-06',
    createdBy: 'John Doe',
    approvedBy: null,
    approvedDate: null,
    notes: 'Priority delivery required for new office setup.',
    items: [
      { name: 'Laptop - Dell XPS 15', quantity: 25, unitPrice: 1700, total: 42500, received: 0 },
      { name: 'Monitor - 27" 4K Display', quantity: 30, unitPrice: 420, total: 12600, received: 0 },
      { name: 'Keyboard & Mouse Set', quantity: 30, unitPrice: 110, total: 3300, received: 0 },
      { name: 'Docking Station', quantity: 25, unitPrice: 240, total: 6000, received: 0 },
      { name: 'Webcam HD', quantity: 30, unitPrice: 80, total: 2400, received: 0 },
    ],
  };

  const activities = [
    { title: 'PO Created', description: 'Purchase Order PO-2024-045 created from RFQ-2024-001', timestamp: '2024-06-06T10:00:00', icon: 'cart', color: 'blue', user: 'John Doe' },
    { title: 'Quotation Approved', description: 'Quotation QT-2024-045 approved for $118,500', timestamp: '2024-06-06T09:30:00', icon: 'check', color: 'green', user: 'Sarah Smith' },
    { title: 'RFQ Approved', description: 'RFQ-2024-001 approved for procurement', timestamp: '2024-06-05T14:00:00', icon: 'file', color: 'purple', user: 'John Doe' },
    { title: 'Quotation Received', description: 'TechCorp submitted quotation for $118,500', timestamp: '2024-06-06T09:15:00', icon: 'check', color: 'green', user: 'TechCorp' },
  ];

  const itemColumns = [
    { key: 'name', title: 'Item' },
    { key: 'quantity', title: 'Ordered', width: '100px' },
    { key: 'unitPrice', title: 'Unit Price', width: '120px', render: (val) => `$${val.toLocaleString()}` },
    { key: 'total', title: 'Total', width: '120px', render: (val) => `$${val.toLocaleString()}` },
    { key: 'received', title: 'Received', width: '100px', render: (val, row) => (
      <span className={`text-sm ${val === row.quantity ? 'text-green-600 font-medium' : 'text-slate-600'}`}>{val} / {row.quantity}</span>
    )},
  ];

  const totalAmount = order.items.reduce((sum, item) => sum + item.total, 0);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'items', label: 'Items' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/purchase-orders" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{order.id}</h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">From {order.rfq} - {order.rfqTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
          {order.status === 'pending' && (
            <Button leftIcon={<CheckCircle className="w-4 h-4" />} onClick={() => setShowApproveModal(true)}>Approve</Button>
          )}
          {order.status === 'approved' && (
            <Button leftIcon={<Package className="w-4 h-4" />} onClick={() => setShowReceiveModal(true)}>Receive Items</Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-dark-700">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AnalyticsCard title="Order Details">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">${order.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Delivery Date</p>
                    <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                      <Truck className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{order.deliveryDate}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Payment Terms</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{order.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{order.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created By</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{order.createdBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Items</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{order.items.length} items</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Notes</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{order.notes}</p>
                </div>
              </AnalyticsCard>

              <AnalyticsCard title="Shipping Address">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Delivery Address</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{order.shippingAddress}</p>
                  </div>
                </div>
              </AnalyticsCard>
            </div>

            <div className="space-y-6">
              <AnalyticsCard title="Vendor">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-700 dark:text-primary-400">T</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{order.vendor}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-slate-500">{order.vendorRating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    +1 (555) 234-5678
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400" />
                    james@techcorp.com
                  </div>
                </div>
              </AnalyticsCard>

              <AnalyticsCard title="Order Progress">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Status</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-dark-600 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all" 
                      style={{ width: order.status === 'completed' ? '100%' : order.status === 'approved' ? '60%' : order.status === 'in_progress' ? '40%' : '20%' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Created</span>
                    <span>Approved</span>
                    <span>Shipped</span>
                    <span>Received</span>
                  </div>
                </div>
              </AnalyticsCard>

              <AnalyticsCard title="Actions">
                <div className="space-y-2">
                  {order.status === 'pending' && (
                    <Button className="w-full justify-center" leftIcon={<CheckCircle className="w-4 h-4" />} onClick={() => setShowApproveModal(true)}>Approve PO</Button>
                  )}
                  <Button variant="secondary" className="w-full justify-center">Edit PO</Button>
                  <Link to={`/invoices/generate?po=${order.id}`} className="block">
                    <Button variant="secondary" className="w-full justify-center" leftIcon={<FileText className="w-4 h-4" />}>Generate Invoice</Button>
                  </Link>
                </div>
              </AnalyticsCard>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'items' && (
        <AnalyticsCard title="Order Items">
          <DataTable columns={itemColumns} data={order.items} pagination={false} />
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700 flex justify-end">
            <div className="text-right">
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">${totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </AnalyticsCard>
      )}

      {activeTab === 'delivery' && (
        <AnalyticsCard title="Delivery Tracking">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-dark-700/50">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">In Transit</p>
                <p className="text-sm text-slate-500">Expected delivery: {order.deliveryDate}</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { date: '2024-06-06', time: '10:00 AM', status: 'Order Created', location: 'New York, NY', completed: true },
                { date: '2024-06-07', time: '02:30 PM', status: 'Order Approved', location: 'New York, NY', completed: true },
                { date: '2024-06-08', time: '09:00 AM', status: 'Shipped', location: 'San Francisco, CA', completed: order.status !== 'pending' },
                { date: '2024-06-20', time: 'Expected', status: 'Out for Delivery', location: 'New York, NY', completed: false },
              ].map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-green-500' : 'bg-slate-300'}`} />
                    {index < 3 && <div className={`w-0.5 flex-1 ${step.completed ? 'bg-green-500' : 'bg-slate-300'}`} />}
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{step.status}</p>
                    <p className="text-xs text-slate-500">{step.date} at {step.time} • {step.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnalyticsCard>
      )}

      {activeTab === 'activity' && (
        <AnalyticsCard title="Activity Timeline">
          <ActivityTimeline activities={activities} />
        </AnalyticsCard>
      )}

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="Approve Purchase Order"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowApproveModal(false)}>Cancel</Button>
            <Button onClick={() => setShowApproveModal(false)}>Approve PO</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Approve <strong>{order.id}</strong> for <strong>${order.amount.toLocaleString()}</strong> to {order.vendor}? This will send the order to the vendor.
        </p>
      </Modal>

      {/* Receive Modal */}
      <Modal
        isOpen={showReceiveModal}
        onClose={() => setShowReceiveModal(false)}
        title="Receive Items"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowReceiveModal(false)}>Cancel</Button>
            <Button onClick={() => setShowReceiveModal(false)}>Confirm Receipt</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Confirm receipt of items for <strong>{order.id}</strong>?
          </p>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-dark-700/50">
                <span className="text-sm text-slate-700 dark:text-slate-300">{item.name}</span>
                <span className="text-sm font-medium">{item.quantity} units</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PurchaseOrderDetails;