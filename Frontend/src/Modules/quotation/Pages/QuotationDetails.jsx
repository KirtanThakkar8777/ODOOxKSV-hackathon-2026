import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote, Calendar, DollarSign, Clock, CheckCircle, XCircle, Download, Star, Building2, FileText, TrendingDown, TrendingUp } from 'lucide-react';
import Button from '../../../components/common/Button';
import AnalyticsCard from '../../../components/cards/AnalyticsCard';
import StatusBadge from '../../../components/common/StatusBadge';
import DataTable from '../../../components/common/DataTable';
import Modal from '../../../components/common/Modal';

const QuotationDetails = () => {
  const { id } = useParams();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const quotation = {
    id: 'QT-2024-045',
    rfq: 'RFQ-2024-001',
    rfqTitle: 'IT Equipment Procurement',
    vendor: 'TechCorp Solutions',
    vendorRating: 4.8,
    amount: 118500,
    delivery: '14 days',
    validity: '2024-07-15',
    status: 'submitted',
    submittedDate: '2024-06-06',
    terms: 'Net 30 payment terms. Free shipping included. Installation support provided.',
    notes: 'Vendor offers extended warranty at no additional cost.',
    items: [
      { name: 'Laptop - Dell XPS 15', quantity: 25, unitPrice: 1700, total: 42500, originalPrice: 1800 },
      { name: 'Monitor - 27" 4K Display', quantity: 30, unitPrice: 420, total: 12600, originalPrice: 450 },
      { name: 'Keyboard & Mouse Set', quantity: 30, unitPrice: 110, total: 3300, originalPrice: 120 },
      { name: 'Docking Station', quantity: 25, unitPrice: 240, total: 6000, originalPrice: 250 },
      { name: 'Webcam HD', quantity: 30, unitPrice: 80, total: 2400, originalPrice: 85 },
    ],
  };

  const itemColumns = [
    { key: 'name', title: 'Item' },
    { key: 'quantity', title: 'Qty', width: '80px' },
    { key: 'unitPrice', title: 'Unit Price', width: '120px', render: (val, row) => (
      <div>
        <span className="text-sm font-medium">${val.toLocaleString()}</span>
        <span className="text-xs text-slate-400 line-through ml-2">${row.originalPrice.toLocaleString()}</span>
      </div>
    )},
    { key: 'total', title: 'Total', width: '120px', render: (val) => `$${val.toLocaleString()}` },
  ];

  const totalAmount = quotation.items.reduce((sum, item) => sum + item.total, 0);
  const originalTotal = quotation.items.reduce((sum, item) => sum + (item.quantity * item.originalPrice), 0);
  const savings = originalTotal - totalAmount;
  const savingsPercent = ((savings / originalTotal) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/quotations" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500 dark:text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{quotation.id}</h1>
              <StatusBadge status={quotation.status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">For {quotation.rfq} - {quotation.rfqTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
          <Button variant="danger" leftIcon={<XCircle className="w-4 h-4" />} onClick={() => setShowRejectModal(true)}>Reject</Button>
          <Button leftIcon={<CheckCircle className="w-4 h-4" />} onClick={() => setShowApproveModal(true)}>Approve</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <AnalyticsCard title="Quotation Items">
            <DataTable columns={itemColumns} data={quotation.items} pagination={false} />
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-dark-700">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">Original Estimate</p>
                  <p className="text-lg font-medium text-slate-600 line-through">${originalTotal.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Quotation Total</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">${totalAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                  You save ${savings.toLocaleString()} ({savingsPercent}%) compared to original estimate
                </span>
              </div>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Terms & Notes">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Terms & Conditions</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{quotation.terms}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Additional Notes</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{quotation.notes}</p>
              </div>
            </div>
          </AnalyticsCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AnalyticsCard title="Vendor Information">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <span className="text-lg font-bold text-primary-700 dark:text-primary-400">T</span>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">{quotation.vendor}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-slate-500">{quotation.vendorRating}</span>
                </div>
              </div>
            </div>
            <Link to="/vendors/1">
              <Button variant="secondary" className="w-full justify-center">View Vendor Profile</Button>
            </Link>
          </AnalyticsCard>

          <AnalyticsCard title="Quotation Details">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Submitted</span>
                <span className="text-sm font-medium">{quotation.submittedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Delivery</span>
                <span className="text-sm font-medium">{quotation.delivery}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Valid Until</span>
                <span className="text-sm font-medium">{quotation.validity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Payment Terms</span>
                <span className="text-sm font-medium">Net 30</span>
              </div>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Actions">
            <div className="space-y-2">
              <Button className="w-full justify-center" leftIcon={<CheckCircle className="w-4 h-4" />} onClick={() => setShowApproveModal(true)}>Approve Quotation</Button>
              <Button variant="secondary" className="w-full justify-center">Request Revision</Button>
              <Button variant="danger" className="w-full justify-center" leftIcon={<XCircle className="w-4 h-4" />} onClick={() => setShowRejectModal(true)}>Reject</Button>
            </div>
          </AnalyticsCard>
        </div>
      </div>

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="Approve Quotation"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowApproveModal(false)}>Cancel</Button>
            <Button onClick={() => setShowApproveModal(false)}>Approve & Create PO</Button>
          </>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">
          Approve <strong>{quotation.id}</strong> from {quotation.vendor} for <strong>${quotation.amount.toLocaleString()}</strong>? This will create a Purchase Order.
        </p>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Quotation"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowRejectModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setShowRejectModal(false)}>Reject</Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to reject <strong>{quotation.id}</strong> from {quotation.vendor}?
          </p>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Reason for Rejection (Optional)</label>
            <textarea className="input-field min-h-[100px] resize-none" placeholder="Enter reason..." />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuotationDetails;