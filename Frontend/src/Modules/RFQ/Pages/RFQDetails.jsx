import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, DollarSign, Users, Clock, CheckCircle, XCircle, AlertTriangle, Download, MessageSquare, Edit2 } from 'lucide-react';
import Button from '../../../components/common/Button';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatusBadge from '../../../components/common/StatusBadge';
import DataTable from '../../../components/common/DataTable';
import ActivityTimeline from '../../../components/timeline/ActivityTimeline';
import Modal from '../../../components/common/Modal';

const RFQDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showApproveModal, setShowApproveModal] = useState(false);

  const rfq = {
    id: 'RFQ-2024-001',
    title: 'IT Equipment Procurement',
    description: 'Procurement of laptops, monitors, and peripherals for the new office expansion. Need high-performance equipment for development team.',
    category: 'IT Equipment',
    status: 'pending',
    budget: 125000,
    deadline: '2024-06-15',
    createdDate: '2024-06-05',
    createdBy: 'John Doe',
    priority: 'high',
    vendor: 'TechCorp Solutions',
    items: [
      { name: 'Laptop - Dell XPS 15', quantity: 25, unitPrice: 1800, total: 45000 },
      { name: 'Monitor - 27" 4K Display', quantity: 30, unitPrice: 450, total: 13500 },
      { name: 'Keyboard & Mouse Set', quantity: 30, unitPrice: 120, total: 3600 },
      { name: 'Docking Station', quantity: 25, unitPrice: 250, total: 6250 },
      { name: 'Webcam HD', quantity: 30, unitPrice: 85, total: 2550 },
    ],
  };

  const quotations = [
    { id: 'QT-2024-045', vendor: 'TechCorp Solutions', amount: 118500, delivery: '14 days', validity: '2024-07-15', status: 'submitted' },
    { id: 'QT-2024-046', vendor: 'GlobalSupply Inc', amount: 122000, delivery: '21 days', validity: '2024-07-10', status: 'submitted' },
    { id: 'QT-2024-047', vendor: 'PrimeParts Ltd', amount: 115000, delivery: '10 days', validity: '2024-07-20', status: 'submitted' },
  ];

  const activities = [
    { title: 'RFQ Created', description: 'RFQ-2024-001 created by John Doe', timestamp: '2024-06-05T10:00:00', icon: 'file', color: 'blue', user: 'John Doe' },
    { title: 'Vendor Invited', description: 'TechCorp Solutions invited to respond', timestamp: '2024-06-05T10:30:00', icon: 'user', color: 'purple', user: 'System' },
    { title: 'Quotation Received', description: 'TechCorp submitted quotation for $118,500', timestamp: '2024-06-06T09:15:00', icon: 'check', color: 'green', user: 'TechCorp' },
    { title: 'Quotation Received', description: 'GlobalSupply submitted quotation for $122,000', timestamp: '2024-06-06T14:30:00', icon: 'check', color: 'green', user: 'GlobalSupply' },
  ];

  const quotationColumns = [
    { key: 'id', title: 'Quotation ID' },
    { key: 'vendor', title: 'Vendor' },
    { key: 'amount', title: 'Amount', render: (val) => `$${val.toLocaleString()}` },
    { key: 'delivery', title: 'Delivery' },
    { key: 'validity', title: 'Valid Until' },
    { key: 'status', title: 'Status', render: (val) => <StatusBadge status={val} /> },
  ];

  const itemColumns = [
    { key: 'name', title: 'Item' },
    { key: 'quantity', title: 'Qty', width: '80px' },
    { key: 'unitPrice', title: 'Unit Price', width: '120px', render: (val) => `$${val.toLocaleString()}` },
    { key: 'total', title: 'Total', width: '120px', render: (val) => `$${val.toLocaleString()}` },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'quotations', label: 'Quotations' },
    { id: 'items', label: 'Items' },
    { id: 'activity', label: 'Activity' },
  ];

  const totalItems = rfq.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/rfqs" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{rfq.id}</h1>
              <StatusBadge status={rfq.status} />
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                rfq.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-slate-100 text-slate-800'
              }`}>
                {rfq.priority} priority
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{rfq.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
          <Button variant="secondary" leftIcon={<MessageSquare className="w-4 h-4" />}>Message</Button>
          <Button leftIcon={<CheckCircle className="w-4 h-4" />} onClick={() => setShowApproveModal(true)}>Approve</Button>
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
            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              <AnalyticsCard title="RFQ Details">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Budget</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">${rfq.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Deadline</p>
                    <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{rfq.deadline}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Responses</p>
                    <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">3 received</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Category</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{rfq.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{rfq.createdDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Created By</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{rfq.createdBy}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Description</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{rfq.description}</p>
                </div>
              </AnalyticsCard>

              <AnalyticsCard title="Line Items" action={<span className="text-sm text-slate-500">{rfq.items.length} items</span>}>
                <DataTable columns={itemColumns} data={rfq.items} pagination={false} />
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700 flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Total Estimated</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">${totalItems.toLocaleString()}</p>
                  </div>
                </div>
              </AnalyticsCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnalyticsCard title="Vendor">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-700 dark:text-primary-400">T</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{rfq.vendor}</p>
                    <p className="text-xs text-slate-500">Primary Vendor</p>
                  </div>
                </div>
              </AnalyticsCard>

              <AnalyticsCard title="Timeline">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Created</span>
                    <span className="text-sm font-medium">{rfq.createdDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Deadline</span>
                    <span className="text-sm font-medium text-red-600">{rfq.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Days Remaining</span>
                    <span className="text-sm font-medium">9 days</span>
                  </div>
                </div>
              </AnalyticsCard>

              <AnalyticsCard title="Actions">
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full justify-center">Edit RFQ</Button>
                  <Button variant="secondary" className="w-full justify-center">Extend Deadline</Button>
                  <Button variant="danger" className="w-full justify-center">Cancel RFQ</Button>
                </div>
              </AnalyticsCard>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'quotations' && (
        <AnalyticsCard title="Received Quotations" action={<Link to="/quotations/compare" className="text-sm text-primary-600">Compare All</Link>}>
          <DataTable columns={quotationColumns} data={quotations} pageSize={10} />
        </AnalyticsCard>
      )}

      {activeTab === 'items' && (
        <AnalyticsCard title="RFQ Items">
          <DataTable columns={itemColumns} data={rfq.items} pagination={false} />
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
        title="Approve RFQ"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowApproveModal(false)}>Cancel</Button>
            <Button onClick={() => setShowApproveModal(false)}>Approve RFQ</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Are you sure you want to approve <strong>{rfq.id}</strong>? This will allow the procurement process to proceed.
        </p>
      </Modal>
    </div>
  );
};

export default RFQDetails;